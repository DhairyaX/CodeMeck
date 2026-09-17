"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

// ── Vertex shader ─────────────────────────────────────────────
const vertexShader = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// ── Fragment shader (LiquidChrome) ────────────────────────────
const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec3 uBaseColor;
  uniform float uAmplitude;
  uniform float uFrequencyX;
  uniform float uFrequencyY;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec4 renderImage(vec2 uvCoord) {
    vec2 fragCoord = uvCoord * uResolution.xy;
    vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

    for (float i = 1.0; i < 10.0; i++) {
      uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
      uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
    }

    vec2 diff = (uvCoord - uMouse);
    float dist = length(diff);
    float falloff = exp(-dist * 20.0);
    float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
    uv += (diff / (dist + 0.0001)) * ripple * falloff;

    vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
    return vec4(color, 1.0);
  }

  void main() {
    vec4 col = vec4(0.0);
    int samples = 0;
    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
        col += renderImage(vUv + offset);
        samples++;
      }
    }
    gl_FragColor = col / float(samples);
  }
`;

// ── Tuned defaults for CodeMeck dark palette ──────────────────
// baseColor drives the chromatic output. Very low values keep it
// dark and subtle; slight green tint echoes the #A3FF6F accent.
const BASE_COLOR: [number, number, number] = [0.06, 0.08, 0.06];
const SPEED = 0.18;
const AMPLITUDE = 0.28;
const FREQUENCY_X = 3.0;
const FREQUENCY_Y = 3.0;

export default function LiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion — render one static frame
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── OGL setup ──────────────────────────────────────────────
    const renderer = new Renderer({ antialias: true, alpha: false });
    const gl = renderer.gl;
    gl.clearColor(0.03, 0.04, 0.05, 1);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ]),
        },
        uBaseColor: { value: new Float32Array(BASE_COLOR) },
        uAmplitude: { value: AMPLITUDE },
        uFrequencyX: { value: FREQUENCY_X },
        uFrequencyY: { value: FREQUENCY_Y },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // ── Canvas styling ─────────────────────────────────────────
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    // ── Resize ─────────────────────────────────────────────────
    function resize() {
      const w = container!.offsetWidth;
      const h = container!.offsetHeight;
      renderer.setSize(w, h);
      const res = program.uniforms.uResolution.value as Float32Array;
      res[0] = gl.canvas.width;
      res[1] = gl.canvas.height;
      res[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener("resize", resize);
    resize();

    // ── Mouse / touch ──────────────────────────────────────────
    function handleMouseMove(e: MouseEvent) {
      // Normalise against viewport (container is fixed full-viewport)
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = e.clientX / window.innerWidth;
      mouse[1] = 1 - e.clientY / window.innerHeight;
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = touch.clientX / window.innerWidth;
      mouse[1] = 1 - touch.clientY / window.innerHeight;
    }

    // Listen on window — container has pointer-events:none so it can't receive events directly
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ── Animation loop ─────────────────────────────────────────
    let animId: number;

    function update(t: number) {
      animId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * SPEED;
      renderer.render({ scene: mesh });
    }

    if (prefersReduced) {
      // Single static frame for reduced-motion users
      program.uniforms.uTime.value = 1.5;
      renderer.render({ scene: mesh });
    } else {
      animId = requestAnimationFrame(update);
    }

    container.appendChild(canvas);

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      (
        gl.getExtension("WEBGL_lose_context") as WEBGL_lose_context | null
      )?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0, position: "fixed" }}
    />
  );
}
