"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 r;
uniform float t, m, dark, light;
uniform vec4 box;
uniform vec3 ink;
uniform sampler2D img;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + 1.), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= .5; }
  return v;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 p = (px - .5 * r) / r.y;

  // A large sphere off to the right: its edge breathes with slow noise and catches a bright rim.
  // On a portrait screen it would sit under the text, so it shrinks into the lower right corner.
  float wide = step(1., r.x / r.y);
  vec2 c = mix(vec2(.3 * r.x / r.y, -.38), vec2(.42 * r.x / r.y, .06), wide);
  float d = length(p - c) - mix(.36, .62, wide) + (fbm(p * 1.8 + vec2(t * .04, -t * .03)) - .5) * .3;
  float sphere = smoothstep(.25, -.35, d) * fbm(p * 2.2 - vec2(t * .03, t * .02)) * .45 + exp(-abs(d) * 14.) * .75;

  // The hovered project's image: light areas are dense in dark mode, dark areas in light mode.
  // A mostly white image (a diagram) always draws its dark lines, or dark mode would show a solid slab.
  vec2 q = (px - box.xy) / box.zw;
  float l = dot(texture2D(img, vec2(q.x, 1. - q.y)).rgb, vec3(.299, .587, .114));
  float edge = smoothstep(0., .06, min(min(q.x, 1. - q.x), min(q.y, 1. - q.y)) + (noise(px * .02) - .5) * .05);
  float pic = smoothstep(.05, .95, mix(1. - l, l, dark * (1. - light))) * edge;

  float dens = mix(sphere, pic, smoothstep(0., 1., m));
  // Each pixel lights with probability dens, reshuffled 24 times a second: film grain.
  float a = step(hash(px + mod(floor(t * 24.), 97.) * 17.31), dens * .8) * mix(.24, .38, wide);
  gl_FragColor = vec4(ink * a, a);
}`;

/**
 * Film grain behind the page, after Keita Yamada's p5aholic.me: a drifting sphere of dots.
 * Hovering a project on the timeline (it fires a "grain" event with the image URL, or null)
 * dissolves the sphere and re-forms the grain into that project's screenshot.
 * It is one fragment shader, no particles: each pixel is lit with a probability equal to the local density.
 */
export default function Grain() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const gl = c?.getContext("webgl", { antialias: false });
    if (!c || !gl) return; // no WebGL: the page simply has no grain

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(prog, 0, "p");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One triangle that covers the screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const [uR, uT, uM, uDark, uLight, uBox, uInk] = ["r", "t", "m", "dark", "light", "box", "ink"].map(u);

    // Average brightness of an image, from an 8×8 downscale.
    const probe = Object.assign(document.createElement("canvas"), { width: 8, height: 8 }).getContext("2d", {
      willReadFrequently: true,
    });
    const brightness = (img: HTMLImageElement) => {
      if (!probe) return 0;
      probe.drawImage(img, 0, 0, 8, 8);
      const px = probe.getImageData(0, 0, 8, 8).data;
      let sum = 0;
      for (let i = 0; i < px.length; i += 4) sum += 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      return sum / 64 / 255;
    };

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    for (const [k, v] of [
      [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
      [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
      [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
      [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
    ]) gl.texParameteri(gl.TEXTURE_2D, k, v);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const images = new Map<string, HTMLImageElement>();
    let want: string | null = null; // image the visitor is pointing at
    let shown: string | null = null; // image in the texture
    let aspect = 16 / 9;
    let mix = 0;
    let raf = 0;
    let last = performance.now();
    const start = last;

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const img = want ? images.get(want) : undefined;
      if (img?.complete && !img.naturalWidth) want = null; // failed to load
      // Dissolve to the sphere, swap the picture while nothing shows it, then re-form.
      if (want !== shown && mix < 0.02 && img?.complete) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform1f(uLight, brightness(img) > 0.6 ? 1 : 0);
        aspect = img.naturalWidth / img.naturalHeight;
        shown = want;
      }
      const target = want && want === shown ? 1 : 0;
      const step = still.matches ? 1 : dt * 4;
      mix += Math.max(-step, Math.min(step, target - mix));

      // The picture sits on the right, like the sphere, at most 56% wide and 80% tall.
      const W = c.width, H = c.height;
      let w = W * 0.56, h = w / aspect;
      if (h > H * 0.8) [h, w] = [H * 0.8, H * 0.8 * aspect];
      gl.uniform4f(uBox, W - w - W * 0.05, (H - h) / 2, w, h);
      gl.uniform1f(uM, mix);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!still.matches || mix !== target || want !== shown) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const size = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      c.width = Math.round(innerWidth * dpr);
      c.height = Math.round(innerHeight * dpr);
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uR, c.width, c.height);
      kick();
    };
    // Grain is drawn in the current ink colour, read from the CSS custom property.
    const theme = () => {
      // Safari shortens "#ffffff" to "#fff", so accept both.
      let hex = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim().slice(1);
      if (hex.length === 3) hex = hex.replace(/./g, "$&$&");
      const n = /^[0-9a-f]{6}$/i.test(hex) ? parseInt(hex, 16) : 0;
      gl.uniform3f(uInk, ((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
      gl.uniform1f(uDark, n > 0x808080 ? 1 : 0);
      kick();
    };
    const onGrain = (e: Event) => {
      want = (e as CustomEvent<string | null>).detail;
      if (want && !images.has(want)) {
        const img = new Image();
        img.onload = kick;
        img.src = want;
        images.set(want, img);
      }
      kick();
    };

    size();
    theme();
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(theme);
    observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    scheme.addEventListener("change", theme);
    still.addEventListener("change", kick);
    addEventListener("resize", size);
    addEventListener("grain", onGrain);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      scheme.removeEventListener("change", theme);
      still.removeEventListener("change", kick);
      removeEventListener("resize", size);
      removeEventListener("grain", onGrain);
    };
  }, []);

  return <canvas ref={canvas} className="grain" aria-hidden="true" />;
}
