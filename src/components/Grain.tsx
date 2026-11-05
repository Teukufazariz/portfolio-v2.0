"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 r;
uniform float t, m, dark;
uniform float sa, sb, sk; // the section shape fading out, the one fading in, and how far (0–1)
uniform float x; // which of the two pictures shows: 0 the first, 1 the second, between them a crossfade
uniform vec4 box0, box1;
uniform float light0, light1;
uniform vec3 ink;
uniform sampler2D img0, img1;

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

// Smooth union: neighbouring spheres melt into each other instead of meeting at a crease.
float smin(float a, float b, float w) {
  float h = clamp(.5 + .5 * (b - a) / w, 0., 1.);
  return mix(b, a, h) - w * h * (1. - h);
}

// The section the visitor is reading, as a shape made of as many spheres as the section has items.
// Returns (signed distance, scale); scale shrinks the noise and the rim for the small spheres.
// 0 hero and 6 contact: the one big sphere. 1 timeline: 9 projects. 2 experience: 3 places.
// 3 tools: 9 categories. 4 education: 1 degree. 5 awards: 2.
vec2 shape(float id, vec2 p, float asp, float wide) {
  // On a portrait screen the big sphere would sit under the text, so it shrinks into the lower right corner.
  vec2 c = mix(vec2(.3 * asp, -.38), vec2(.42 * asp, .06), wide);
  if (id < .5) return vec2(length(p - c) - mix(.36, .62, wide), 1.);
  if (id > 5.5) return vec2(length(p - c) - mix(.29, .5, wide), 1.);
  // The small ones share a stage: the right half on wide screens, a band along the bottom on portrait ones.
  vec2 lo = mix(vec2(-.5 * asp + .04, -.47), vec2(.02, -.4), wide);
  vec2 sz = mix(vec2(asp - .08, .3), vec2(.5 * asp - .08, .8), wide);
  float u = min(sz.x, sz.y), d = 1e3;
  for (int i = 0; i < 9; i++) {
    float f = float(i);
    vec2 q; // position in the stage, 0–1
    float rad; // radius, in stage units
    if (id < 1.5) { q = vec2(f / 8., .15 + .7 * f / 8.); rad = .045; } // climbing toward now, like the bars
    else if (id < 2.5) { if (i > 2) break; q = vec2(.15 + .35 * f, .5); rad = .013 * (i == 0 ? 7. : i == 1 ? 10. : 9.); } // sized by months there
    else if (id < 3.5) { q = vec2(.2 + .3 * mod(f, 3.), .2 + .3 * floor(f / 3.)); rad = .09; } // 3 × 3
    else if (id < 4.5) { if (i > 0) break; q = vec2(.5); rad = .22; }
    else { if (i > 1) break; q = vec2(.35 + .3 * f, .6 - .2 * f); rad = .17; }
    d = smin(d, length(p - lo - q * sz) - rad * u, .03);
  }
  return vec2(d, .2);
}

// A project's picture: light areas are dense in dark mode, dark areas in light mode.
// A mostly white image (a diagram) always draws its dark lines, or dark mode would show a solid slab.
float pic(sampler2D img, vec4 box, float light, vec2 px) {
  vec2 q = (px - box.xy) / box.zw;
  float l = dot(texture2D(img, vec2(q.x, 1. - q.y)).rgb, vec3(.299, .587, .114));
  float edge = smoothstep(0., .06, min(min(q.x, 1. - q.x), min(q.y, 1. - q.y)) + (noise(px * .02) - .5) * .05);
  return smoothstep(.05, .95, mix(1. - l, l, dark * (1. - light))) * edge;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 p = (px - .5 * r) / r.y;

  // The old and new section shapes, blended. Its edge breathes with slow noise and catches a bright rim.
  float asp = r.x / r.y;
  float wide = step(1., asp);
  vec2 A = shape(sa, p, asp, wide), B = shape(sb, p, asp, wide);
  float e = sk; // linear: sk already eases out
  float sc = mix(A.y, B.y, e);
  // The wobble shrinks with the square of the scale, or it would be as big as the small spheres and melt them together.
  float d = mix(A.x, B.x, e) + (fbm(p * 1.8 / sc + vec2(t * .04, -t * .03)) - .5) * .3 * sc * sc;
  float form = smoothstep(.25 * sc, -.35 * sc, d) * fbm(p * 2.2 / sc - vec2(t * .03, t * .02)) * .45 + exp(-abs(d) * 14. / sc) * .75;

  // The hovered project's picture, crossfading into the next one when the pointer moves to another bar.
  float shot = mix(pic(img0, box0, light0, px), pic(img1, box1, light1, px), smoothstep(0., 1., x));
  float dens = mix(form, shot, smoothstep(0., 1., m));
  // Each pixel lights with probability dens, reshuffled 24 times a second: film grain.
  // Fainter on white (dark = 0), where dark dots behind body text read as noise.
  float a = step(hash(px + mod(floor(t * 24.), 97.) * 17.31), dens * .8) * mix(.24, .38, wide) * mix(.6, 1., dark);
  gl_FragColor = vec4(ink * a, a);
}`;

/**
 * Film grain behind the page, after Keita Yamada's p5aholic.me: a drifting sphere of dots.
 * As the visitor reaches each section marked with data-shape, the sphere morphs into that section's shape:
 * as many spheres as the section has items (9 projects, 3 places, 9 tool groups, 1 degree, 2 awards).
 * Hovering a project on the timeline (it fires a "grain" event with the image URL, or null)
 * dissolves the shape and re-forms the grain into that project's screenshot; moving to another bar
 * crossfades straight into the next screenshot.
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
    const [uR, uT, uM, uDark, uInk, uX, uSa, uSb, uSk] = ["r", "t", "m", "dark", "ink", "x", "sa", "sb", "sk"].map(u);
    const uLight = [u("light0"), u("light1")];
    const uBox = [u("box0"), u("box1")];

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

    // Two pictures, one per texture unit, so one can crossfade into the next.
    for (const i of [0, 1]) {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      for (const [k, v] of [
        [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
        [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
        [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
      ]) gl.texParameteri(gl.TEXTURE_2D, k, v);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      gl.uniform1i(u(`img${i}`), i);
    }

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const images = new Map<string, HTMLImageElement>();
    let want: string | null = null; // image the visitor is pointing at
    const slots: (string | null)[] = [null, null]; // image in each texture
    const aspects = [16 / 9, 16 / 9];
    let front = 0; // the slot being faded in
    let x = 0; // the shader's x
    let mix = 0;
    let raf = 0;
    let last = performance.now();
    const start = last;
    let [sa, sb, sk] = [0, 0, 1]; // see the shader

    // The section being read: the last [data-shape] whose top has passed 40% of the screen
    // (any lower and the short Awards section takes over while Education is still being read),
    // or the last one at the bottom of the page, which the short contact section never reaches.
    const pick = () => {
      const els = document.querySelectorAll<HTMLElement>("[data-shape]");
      let id = 0;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.4) id = Number(el.dataset.shape);
      });
      if (els.length && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
        id = Number(els[els.length - 1].dataset.shape);
      }
      return id;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Scroll-triggered: the shape morphs straight to the section on screen, never through the ones scrolled past,
      // easing out over about 0.4 s. Reduced motion: it switches at once.
      // ponytail: a section change mid-morph restarts from whichever shape dominates, a small jump on very fast scrolls.
      const goal = pick();
      if (goal !== sb) [sa, sb, sk] = [sk < 0.5 ? sa : sb, goal, 0];
      sk = still.matches || sk > 0.999 ? 1 : sk + (1 - sk) * (1 - Math.exp(-dt * 10));
      gl.uniform1f(uSa, sa);
      gl.uniform1f(uSb, sb);
      gl.uniform1f(uSk, sk);

      const img = want ? images.get(want) : undefined;
      if (img?.complete && !img.naturalWidth) want = null; // failed to load
      // A new picture goes into the slot not being shown and fades in over the old one.
      // ponytail: a third bar hovered mid-crossfade replaces the half-faded picture at once; the grain hides the jump.
      if (want && want !== slots[front] && img?.complete) {
        const k = 1 - front;
        if (slots[k] !== want) {
          gl.activeTexture(gl.TEXTURE0 + k);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.uniform1f(uLight[k], brightness(img) > 0.6 ? 1 : 0);
          aspects[k] = img.naturalWidth / img.naturalHeight;
          slots[k] = want;
        }
        front = k;
        if (mix < 0.02) x = k; // nothing on screen yet: form straight into it
      }
      const target = want && want === slots[front] ? 1 : 0;
      const step = still.matches ? 1 : dt * 4;
      mix += Math.max(-step, Math.min(step, target - mix));
      x += Math.max(-step, Math.min(step, front - x));

      // The picture sits on the right, like the sphere, at most 56% wide and 80% tall.
      const W = c.width, H = c.height;
      aspects.forEach((aspect, i) => {
        let w = W * 0.56, h = w / aspect;
        if (h > H * 0.8) [h, w] = [H * 0.8, H * 0.8 * aspect];
        gl.uniform4f(uBox[i], W - w - W * 0.05, (H - h) / 2, w, h);
      });
      gl.uniform1f(uM, mix);
      gl.uniform1f(uX, x);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!still.matches || mix !== target || x !== front || sk !== 1) raf = requestAnimationFrame(frame);
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
    addEventListener("scroll", kick, { passive: true }); // the frame picks the section; this wakes it under reduced motion
    return () => {
      removeEventListener("scroll", kick);
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
