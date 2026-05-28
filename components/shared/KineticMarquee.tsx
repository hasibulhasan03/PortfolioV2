"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface KineticMarqueeProps {
  words: string[];
  speed?: number;
  reverse?: boolean;
  italic?: boolean;
  variant?: "outline" | "fill";
}

// Scroll-velocity-coupled kinetic marquee. Pure CSS animation as a base, with
// optional GSAP scroll-velocity push for that runway-show feel.
export default function KineticMarquee({
  words,
  speed = 60,
  reverse = false,
  italic = false,
  variant = "outline"
}: KineticMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Speed up briefly on scroll velocity
      let velTween: gsap.core.Tween | null = null;
      const onUpdate = (self: ScrollTrigger) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 800, 4);
        const dir = self.direction === 1 ? 1 : -1;
        if (innerRef.current) {
          velTween?.kill();
          velTween = gsap.to(innerRef.current, {
            "--vel-skew": `${(reverse ? -dir : dir) * v * 1.4}deg`,
            duration: 0.4,
            ease: "power3.out"
          });
        }
      };
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate
      });
    }, trackRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(1.25rem, 2.5vw, 2rem) 0",
        userSelect: "none"
      }}
    >
      <div
        ref={innerRef}
        className="kinetic-track"
        style={{
          display: "flex",
          gap: "clamp(2rem, 4vw, 3.5rem)",
          whiteSpace: "nowrap",
          willChange: "transform",
          animationName: "kineticScroll",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
          fontFamily: "var(--font-display)",
          fontStyle: italic ? "italic" : "normal",
          fontWeight: 600,
          fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          // Skew updated by scroll velocity
          transform: "skewX(var(--vel-skew, 0deg))",
          transition: "transform 0.4s ease"
        }}
      >
        {Array.from({ length: 4 }).map((_, repeat) => (
          <div
            key={repeat}
            style={{
              display: "inline-flex",
              gap: "clamp(2rem, 4vw, 3.5rem)",
              alignItems: "center"
            }}
          >
            {words.map((w, j) => {
              const isAccent = j % 2 === 1;
              return (
                <span
                  key={`${repeat}-${j}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "clamp(1.25rem, 3vw, 2.5rem)"
                  }}
                >
                  <span
                    style={{
                      color:
                        variant === "fill"
                          ? isAccent
                            ? "var(--accent)"
                            : "var(--text-pri)"
                          : "transparent",
                      WebkitTextStroke:
                        variant === "outline"
                          ? `1px ${isAccent ? "var(--accent)" : "rgba(240,236,228,0.5)"}`
                          : "0"
                    }}
                  >
                    {w}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 999,
                      background: isAccent ? "var(--accent)" : "var(--text-pri)",
                      flexShrink: 0,
                      boxShadow: isAccent
                        ? "0 0 16px rgba(200,87,26,0.5)"
                        : "none"
                    }}
                  />
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes kineticScroll {
          from {
            transform: translateX(0) skewX(var(--vel-skew, 0deg));
          }
          to {
            transform: translateX(-50%) skewX(var(--vel-skew, 0deg));
          }
        }
      `}</style>
    </div>
  );
}
