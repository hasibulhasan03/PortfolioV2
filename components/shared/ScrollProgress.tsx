"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/stores/scrollStore";

const SECTIONS = [
  { id: "hero", label: "00 / Hero" },
  { id: "about", label: "01 / About" },
  { id: "architecture", label: "02 / Architecture" },
  { id: "capabilities", label: "03 / Capabilities" },
  { id: "services", label: "04 / Services" },
  { id: "experience", label: "05 / Experience" },
  { id: "projects", label: "06 / Projects" },
  { id: "certificates", label: "07 / Certificates" },
  { id: "education", label: "08 / Education" },
  { id: "contact", label: "09 / Contact" }
];

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - window.innerHeight) || 1;
      const p = Math.min(Math.max(window.scrollY / total, 0), 1);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }

      // Determine active section
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.4) idx = i;
      }
      setActiveIdx(idx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        aria-hidden
        className="fixed left-0 right-0 top-0"
        style={{
          height: 1,
          background: "var(--border)",
          zIndex: 9996,
          pointerEvents: "none"
        }}
      >
        <div
          ref={barRef}
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, var(--accent) 0%, var(--accent) 75%, rgba(200,87,26,0.4) 100%)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            willChange: "transform"
          }}
        />
      </div>

      {/* Section dot index — left edge, hidden on narrow */}
      <nav
        aria-label="Section navigation"
        className="fixed hide-narrow"
        style={{
          right: "clamp(0.75rem, 2vw, 1.4rem)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          zIndex: 9995,
          mixBlendMode: "difference"
        }}
      >
        {SECTIONS.map((s, i) => {
          const isActive = i === activeIdx;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor="view"
              aria-label={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
                cursor: "none"
              }}
            >
              <span
                className="font-mono nav-label"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: isActive ? "var(--accent)" : "var(--text-sec)",
                  textTransform: "uppercase",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(8px)",
                  transition: "opacity 240ms ease, transform 240ms ease, color 240ms ease"
                }}
              >
                {s.label}
              </span>
              <span
                aria-hidden
                style={{
                  width: isActive ? 16 : 6,
                  height: 1,
                  background: isActive ? "var(--accent)" : "var(--text-sec)",
                  transition: "width 240ms ease, background 240ms ease"
                }}
              />
            </a>
          );
        })}
      </nav>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hide-narrow) {
            display: none !important;
          }
        }
        a:hover .nav-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </>
  );
}
