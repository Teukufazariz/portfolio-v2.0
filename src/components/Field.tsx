"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The live background: two slow lights, plus a third that trails the pointer,
// under a film-grain layer (.grain, a tiled PNG moved by CSS). The lights are
// smooth, so the canvas is drawn at a sixth of the viewport and scaled up. One palette per page mood, in dark and in light. In light the
// "lights" are tints subtracted from paper, so the same shader serves both.

type Palette = number[]; // bg(3) a(3) b(3) c(3)
const pal = (bg: number[], a: number[], b: number[], c: number[]): Palette => [...bg, ...a, ...b, ...c];
// Each page has a warm light at the top right and a cool one at the bottom left, on warm black.
// Light-theme values are tints subtracted from the paper.
const DARK = [0.043, 0.039, 0.035], LIGHT = [0.937, 0.914, 0.863];
const GLOW_D = [0.2, 0.15, 0.1], GLOW_L = [0.05, 0.05, 0.05];
const MOODS: Record<string, { dark: Palette; light: Palette }> = {
  home:     { dark: pal(DARK, [0.4, 0.15, 0.06], [0.02, 0.11, 0.13], GLOW_D), light: pal(LIGHT, [0.035, -0.07, -0.16], [-0.13, -0.07, -0.03], GLOW_L) },
  aform:    { dark: pal(DARK, [0.32, 0.185, 0.045], [0.04, 0.12, 0.07], GLOW_D), light: pal(LIGHT, [0.03, -0.03, -0.2], [-0.1, -0.04, -0.1], GLOW_L) },
  planpal:  { dark: pal(DARK, [0.03, 0.19, 0.22], [0.11, 0.08, 0.24], GLOW_D), light: pal(LIGHT, [-0.16, -0.05, -0.02], [-0.07, -0.1, 0.02], GLOW_L) },
  nanovest: { dark: pal(DARK, [0.36, 0.1, 0.16], [0.04, 0.08, 0.2], GLOW_D), light: pal(LIGHT, [0.03, -0.12, -0.09], [-0.14, -0.09, 0.0], GLOW_L) },
};

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes; uniform float uT, uScroll, uExp, uPK; uniform vec2 uP; uniform vec3 uBg, uA, uB, uC;
float hash(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float vn(vec2 p){ vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<4;i++){ v+=vn(p)*a; p=p*2.03+vec2(3.1,1.7); a*=.5; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/uRes; float asp=uRes.x/uRes.y; vec2 p=(uv-.5)*vec2(asp,1.); float t=uT*.07;
  vec2 l1=vec2(.34*asp+.16*sin(t*.7+uScroll*.5),.17+.14*cos(t*.9)+.12*sin(uScroll*.37));
  vec2 l2=vec2(-.4*asp+.14*cos(t*.5),-.33+.1*sin(t*.6)+.14*cos(uScroll*.29));
  vec2 lp=(uP-.5)*vec2(asp,1.);
  float n=fbm(p*1.5+vec2(t*.4,-t*.25));
  float a=exp(-dot(p-l1,p-l1)/.2)*(.45+.9*n);
  float b=exp(-dot(p-l2,p-l2)/.3)*(.5+.7*n);
  float c=exp(-dot(p-lp,p-lp)/.06)*uPK;
  vec3 col=uBg+(uA*a+uB*b+uC*c)*uExp;
  o=vec4(col,1.);
}`;

const themeNow = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const moodNow = () => MOODS[document.querySelector("main")?.dataset.mood ?? "home"] ?? MOODS.home;

export default function Field() {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef<Palette>(MOODS.home.dark);
  const repaint = useRef<() => void>(() => {});
  const path = usePathname();

  // A new page may carry a new mood; the loop eases towards it.
  useEffect(() => {
    target.current = moodNow()[themeNow()];
    repaint.current();
  }, [path]);

  useEffect(() => {
    const canvas = ref.current!;
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = matchMedia("(max-width: 760px)").matches;
    let gl: WebGL2RenderingContext | null = null;
    let U: Record<string, WebGLUniformLocation | null> = {};
    let raf = 0, last = performance.now(), drawn = 0;
    const cur = [...target.current];
    const ptr = { x: 0.6, y: 0.6, tx: 0.6, ty: 0.6, k: 0, tk: 0 };
    const t0 = performance.now();

    function setup() {
      gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return; // the CSS gradient on <body> stays visible
      const sh = (type: number, src: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src); gl!.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, "#version 300 es\nin vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }"));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.bindAttribLocation(prog, 0, "p");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl = null; return; }
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      U = Object.fromEntries(["uRes", "uT", "uScroll", "uExp", "uPK", "uP", "uBg", "uA", "uB", "uC"].map((n) => [n, gl!.getUniformLocation(prog, n)]));
      resize();
    }

    function resize() {
      if (!gl) return;
      // About 240 x 150 on a laptop. The browser's upscale is smooth and the grain layer hides any banding.
      const scale = small ? 1 / 8 : 1 / 6;
      canvas.width = Math.max(2, Math.round(innerWidth * scale));
      canvas.height = Math.max(2, Math.round(innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    }

    function draw(now: number) {
      if (!gl) return;
      const intro = reduce || root.classList.contains("skip-intro") ? 1 : Math.min(1, (now - t0) / 1400);
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uT, reduce ? 9 : now / 1000);
      gl.uniform1f(U.uScroll, scrollY / Math.max(1, innerHeight));
      gl.uniform1f(U.uExp, 0.25 + 0.75 * intro * intro);
      gl.uniform2f(U.uP, ptr.x, ptr.y);
      gl.uniform1f(U.uPK, ptr.k);
      gl.uniform3f(U.uBg, cur[0], cur[1], cur[2]);
      gl.uniform3f(U.uA, cur[3], cur[4], cur[5]);
      gl.uniform3f(U.uB, cur[6], cur[7], cur[8]);
      gl.uniform3f(U.uC, cur[9], cur[10], cur[11]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.hidden) return;
      const ease = 1 - Math.exp(-dt * 3.2);
      ptr.x += (ptr.tx - ptr.x) * ease; ptr.y += (ptr.ty - ptr.y) * ease; ptr.k += (ptr.tk - ptr.k) * ease;
      const fade = 1 - Math.exp(-dt * 4);
      for (let i = 0; i < 12; i++) cur[i] += (target.current[i] - cur[i]) * fade;
      // The lights drift slowly, so 30 fps is enough unless the pointer light is moving.
      const pointerBusy = Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) + Math.abs(ptr.tk - ptr.k) > 0.002;
      if (!pointerBusy && now - drawn < 32) return;
      drawn = now;
      draw(now);
    }

    // Under reduced motion there is no loop: one still frame, redrawn when something changes.
    repaint.current = () => {
      if (!reduce) return;
      for (let i = 0; i < 12; i++) cur[i] = target.current[i];
      draw(performance.now());
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ptr.tx = e.clientX / innerWidth; ptr.ty = 1 - e.clientY / innerHeight; ptr.tk = 1;
    };
    const onLeave = () => { ptr.tk = 0; };
    const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); };
    const onRestored = () => { setup(); if (!reduce) raf = requestAnimationFrame(tick); };
    const themeWatch = new MutationObserver(() => { target.current = moodNow()[themeNow()]; repaint.current(); });

    target.current = moodNow()[themeNow()];
    for (let i = 0; i < 12; i++) cur[i] = target.current[i];
    setup();
    if (gl && !reduce) raf = requestAnimationFrame(tick);
    addEventListener("resize", resize);
    if (!small && !reduce) {
      addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    themeWatch.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      themeWatch.disconnect();
      repaint.current = () => {};
    };
  }, []);

  return (
    <>
      <canvas id="field" ref={ref} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
