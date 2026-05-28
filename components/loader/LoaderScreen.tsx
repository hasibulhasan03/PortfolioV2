"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderScreenProps {
  onComplete: () => void;
}

const TOTAL_MS = 3000;
const LETTERS = ["H", "A", "S", "I", "B", "U", "L"];

export default function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const [count, setCount] = useState(0);
  const [removed, setRemoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setCount(100);
      const t = setTimeout(() => {
        setRemoved(true);
        onCompleteRef.current();
      }, 80);
      return () => clearTimeout(t);
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          const out = gsap.timeline({
            onComplete: () => {
              setRemoved(true);
              onCompleteRef.current();
            }
          });
          out
            .to(".loader-letter", {
              opacity: 0,
              y: -10,
              stagger: 0.04,
              duration: 0.35,
              ease: "power2.in"
            })
            .to(
              ".loader-ring",
              {
                scale: 1.6,
                opacity: 0,
                duration: 0.6,
                ease: "expo.in"
              },
              "<0.05"
            )
            .to(
              [counterRef.current, subRef.current, lineRef.current],
              { opacity: 0, duration: 0.3, ease: "power1.in" },
              "<"
            )
            .to(
              container,
              { autoAlpha: 0, duration: 0.4, ease: "power1.in" },
              "-=0.2"
            );
        }
      });

      tl.to(".loader-ring-stage", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "expo.out"
      })
        .fromTo(
          ".loader-letter",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.out",
            onComplete: () => {
              const stage = document.querySelector(".loader-ring-stage");
              stage?.classList.add("is-revealed");
            }
          },
          "+=0.3"
        )
        .from(
          subRef.current,
          { opacity: 0, y: 8, duration: 0.5, ease: "expo.out" },
          "<0.2"
        )
        .from(
          counterRef.current,
          { opacity: 0, duration: 0.4, ease: "power1.out" },
          "<"
        )
        .to(
          ".loader-progress-fill",
          {
            scaleX: 1,
            duration: TOTAL_MS / 1000,
            ease: "power2.inOut",
            onUpdate() {
              setCount(Math.floor(this.progress() * 100));
            }
          },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (removed) return null;

  const padded = String(count).padStart(3, "0");

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${count}%`}
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: "var(--void)", pointerEvents: "all" }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.55) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          opacity: 0.4
        }}
      />

      {/* Top-left meta */}
      <div
        className="absolute font-mono"
        style={{
          top: "clamp(1.5rem, 4vw, 2.5rem)",
          left: "clamp(1.5rem, 4vw, 2.5rem)",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--text-sec)",
          textTransform: "uppercase",
          display: "flex",
          gap: 10,
          alignItems: "center"
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--accent)",
            boxShadow: "0 0 14px var(--accent)"
          }}
        />
        SYS — INIT
      </div>

      <div
        className="absolute font-mono"
        style={{
          top: "clamp(1.5rem, 4vw, 2.5rem)",
          right: "clamp(1.5rem, 4vw, 2.5rem)",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--text-sec)",
          textTransform: "uppercase"
        }}
      >
        PORTFOLIO · 2025
      </div>

      {/* Centered loader composition */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(2rem, 4vw, 3rem)"
        }}
      >
        <div
          className="loader-ring-stage"
          style={{ opacity: 0, transform: "scale(0.86)" }}
        >
          <div className="loader-wrapper" aria-hidden>
            {LETTERS.map((l, i) => (
              <span key={i} className="loader-letter">
                {l}
              </span>
            ))}
            <div className="loader-ring" />
          </div>
        </div>

        <div
          ref={subRef}
          className="font-mono"
          style={{
            fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "var(--text-sec)",
            textAlign: "center"
          }}
        >
          MD. HASIBUL HASAN <span style={{ color: "var(--accent)" }}>·</span>{" "}
          PORTFOLIO 2025
        </div>
      </div>

      {/* Bottom progress hairline + counter */}
      <div
        className="absolute"
        style={{
          left: "clamp(1.5rem, 4vw, 2.5rem)",
          right: "clamp(1.5rem, 4vw, 2.5rem)",
          bottom: "clamp(1.5rem, 4vw, 2.5rem)"
        }}
      >
        <div
          ref={lineRef}
          aria-hidden
          style={{
            position: "relative",
            height: 1,
            background: "var(--border)",
            marginBottom: 14
          }}
        >
          <div
            className="loader-progress-fill"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, var(--accent) 0%, var(--accent) 80%, rgba(200,87,26,0.4))",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              willChange: "transform"
            }}
          />
        </div>
        <div
          className="flex justify-between items-end font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "var(--text-sec)",
            textTransform: "uppercase"
          }}
        >
          <span>BOOTING TYPESETTING · WARMING SCROLL · STAGING ASSETS</span>
          <span
            ref={counterRef}
            style={{
              color: "var(--text-pri)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 12
            }}
          >
            {padded} / 100
          </span>
        </div>
      </div>

      <style jsx>{`
        .loader-wrapper {
          position: relative;
          width: clamp(180px, 22vw, 280px);
          height: clamp(180px, 22vw, 280px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.05rem, 0.4vw, 0.3rem);
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .loader-letter {
          display: inline-block;
          font-size: clamp(1.2rem, 1.8vw, 1.7rem);
          color: var(--text-pri);
          opacity: 0;
          will-change: transform, opacity;
          z-index: 2;
        }
        .loader-ring-stage.is-revealed .loader-letter {
          animation: loaderLetterAnim 2s infinite;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(2) {
          animation-delay: 0.1s;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(3) {
          animation-delay: 0.2s;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(4) {
          animation-delay: 0.3s;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(5) {
          animation-delay: 0.4s;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(6) {
          animation-delay: 0.5s;
        }
        .loader-ring-stage.is-revealed .loader-letter:nth-child(7) {
          animation-delay: 0.6s;
        }

        .loader-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background: radial-gradient(
            circle at center,
            transparent 55%,
            rgba(0, 0, 0, 0.6) 70%
          );
          animation: loaderRingRotate 2s linear infinite;
          will-change: transform, box-shadow;
          z-index: 1;
        }

        @keyframes loaderRingRotate {
          0% {
            transform: rotate(90deg);
            box-shadow: 0 10px 20px 0 rgba(255, 255, 255, 0.04) inset,
              0 20px 30px 0 rgba(200, 87, 26, 0.45) inset,
              0 60px 60px 0 rgba(107, 45, 13, 0.7) inset;
          }
          50% {
            transform: rotate(270deg);
            box-shadow: 0 10px 20px 0 rgba(255, 255, 255, 0.06) inset,
              0 20px 10px 0 rgba(200, 87, 26, 0.6) inset,
              0 40px 60px 0 rgba(58, 90, 140, 0.4) inset;
          }
          100% {
            transform: rotate(450deg);
            box-shadow: 0 10px 20px 0 rgba(255, 255, 255, 0.04) inset,
              0 20px 30px 0 rgba(200, 87, 26, 0.45) inset,
              0 60px 60px 0 rgba(107, 45, 13, 0.7) inset;
          }
        }

        @keyframes loaderLetterAnim {
          0%,
          100% {
            opacity: 0.42;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.18) translateY(-2px);
            color: var(--accent);
          }
          40% {
            opacity: 0.72;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
