"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerStore } from "@/stores/pointerStore";

type Variant = "default" | "view" | "open" | "button" | "text" | "hidden";

const dataAttrToVariant: Record<string, Variant> = {
  view: "view",
  open: "open",
  button: "button",
  text: "text",
  hidden: "hidden"
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const [enabled, setEnabled] = useState(true);
  const setVariantStore = usePointerStore((s) => s.setVariant);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) {
      setEnabled(false);
      document.body.style.cursor = "auto";
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx;
    let dy = ry;
    let cx = rx;
    let cy = ry;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
    };

    const tick = () => {
      // Dot snaps tightly to cursor
      cx += (dx - cx) * 0.6;
      cy += (dy - cy) * 0.6;
      // Ring lags magnetically
      rx += (dx - rx) * 0.15;
      ry += (dy - ry) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const detectVariant = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return setVariant("default");
      const el = target.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const v = el.getAttribute("data-cursor") || "default";
        setVariant(dataAttrToVariant[v] || "default");
        return;
      }
      // Project cards / interactive containers
      if (target.closest("a, button, [role='button']")) {
        setVariant("button");
        return;
      }
      if (target.closest("input, textarea")) {
        setVariant("text");
        return;
      }
      setVariant("default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", detectVariant, { passive: true });
    raf = requestAnimationFrame(tick);

    const onLeave = () => setVariant("hidden");
    const onEnter = () => setVariant("default");
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", detectVariant);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  useEffect(() => {
    setVariantStore(variant);
  }, [variant, setVariantStore]);

  if (!enabled) return null;

  // Variant-specific ring styling
  const ringStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    pointerEvents: "none",
    zIndex: 9998,
    width: 28,
    height: 28,
    border: "1px solid rgba(240,236,228,0.6)",
    borderRadius: 999,
    background: "rgba(240,236,228,0.06)",
    transition:
      "width 220ms ease, height 220ms ease, background 220ms ease, border-color 220ms ease, border-radius 220ms ease, opacity 220ms ease",
    mixBlendMode: "difference",
    willChange: "transform, width, height, opacity"
  };
  const dotStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    pointerEvents: "none",
    zIndex: 9999,
    width: 4,
    height: 4,
    borderRadius: 999,
    background: "var(--text-pri)",
    transition: "opacity 200ms ease, background 200ms ease",
    willChange: "transform, opacity"
  };

  let label: string | null = null;
  switch (variant) {
    case "view":
      ringStyle.width = 56;
      ringStyle.height = 56;
      ringStyle.background = "transparent";
      ringStyle.borderColor = "var(--text-pri)";
      label = "VIEW";
      break;
    case "open":
      ringStyle.width = 86;
      ringStyle.height = 36;
      ringStyle.borderRadius = 999;
      ringStyle.background = "var(--accent)";
      ringStyle.borderColor = "var(--accent)";
      label = "OPEN →";
      break;
    case "button":
      ringStyle.width = 48;
      ringStyle.height = 48;
      ringStyle.background = "var(--text-pri)";
      ringStyle.borderColor = "var(--text-pri)";
      dotStyle.background = "var(--void)";
      break;
    case "text":
      ringStyle.opacity = 0;
      dotStyle.background = "var(--accent)";
      dotStyle.width = 2;
      dotStyle.height = 22;
      dotStyle.borderRadius = 0;
      break;
    case "hidden":
      ringStyle.opacity = 0;
      dotStyle.opacity = 0;
      break;
  }

  return (
    <>
      <div ref={ringRef} aria-hidden style={ringStyle}>
        {label && (
          <span
            className="font-mono"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              letterSpacing: "0.25em",
              color: variant === "open" ? "var(--void)" : "var(--text-pri)",
              textTransform: "uppercase",
              mixBlendMode: "normal"
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div ref={dotRef} aria-hidden style={dotStyle} />
    </>
  );
}
