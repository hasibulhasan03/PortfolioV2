"use client";

import { useEffect, useRef } from "react";

// Site-wide interactive background. Combines a fixed dot grid, a soft cursor
// spotlight, and a faint scroll-tied gradient wash. Sits beneath all content
// (z-index: 0). Pure DOM + CSS, no canvas, no R3F.
export default function InteractiveBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${cx}px`);
        spotlightRef.current.style.setProperty("--my", `${cy}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed inset-0"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        background: "var(--void)"
      }}
    >
      {/* Base radial wash — adds depth to the void */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(58,90,140,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 25% 80%, rgba(200,87,26,0.08) 0%, transparent 55%)"
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(240,236,228,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3))",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3))"
        }}
      />

      {/* Larger sparse grid for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.55) 1px, transparent 1px)",
          backgroundSize: "180px 180px",
          opacity: 0.35
        }}
      />

      {/* Cursor spotlight — accent halo */}
      <div
        ref={spotlightRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 460px at var(--mx, 50%) var(--my, 50%), rgba(200,87,26,0.10) 0%, rgba(200,87,26,0.04) 30%, transparent 65%)",
          mixBlendMode: "screen",
          willChange: "background"
        }}
      />

      {/* Top + bottom vignette so sections feel framed */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "20vh",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55), transparent)"
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "20vh",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55), transparent)"
        }}
      />
    </div>
  );
}
