"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PORTRAIT_FRONT,
  PORTRAIT_PROFILE,
  ATMOSPHERE_COOL
} from "@/components/shared/placeholders";

const FACTS = [
  { k: "Based In", v: "Kathalbagan · Dhaka" },
  { k: "Education", v: "BSc CSE · BAIUST · 2025" },
  { k: "Currently", v: "Operation Leader · Softvence" },
  { k: "Domains", v: "Web · Network · IT Ops" }
];

const PRINCIPLES = [
  {
    n: "01",
    t: "Reliability before velocity",
    d: "Code is read more often than it ships. Boundaries, contracts, and observability win every release."
  },
  {
    n: "02",
    t: "Network is product",
    d: "If the link drops, the feature is gone. Infrastructure choices shape user experience."
  },
  {
    n: "03",
    t: "Models are tools",
    d: "Build evaluation pipelines first, models second. Confidence comes from validation, not vibes."
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-reveal]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out"
        }
      );

      // Card lift on scroll
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-card]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          opacity: 0,
          y: 60,
          rotateX: 8,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out"
        }
      );

      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "transparent",
        padding:
          "clamp(5rem, 12vh, 11rem) clamp(1.25rem, 5vw, 5rem) clamp(5rem, 12vh, 11rem)"
      }}
    >
      {/* Background massive name */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 18vw, 22rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.05)",
          whiteSpace: "nowrap"
        }}
      >
        ABOUT
      </div>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <div
          className="flex items-end justify-between flex-wrap"
          style={{
            gap: "1.5rem",
            marginBottom: "clamp(3rem, 6vw, 5rem)"
          }}
        >
          <div>
            <span
              data-reveal
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "var(--accent)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(1.25rem, 2.5vw, 2rem)"
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 32,
                  height: 1,
                  background: "var(--accent)"
                }}
              />
              01 — INTRODUCTION
            </span>
            <h2
              ref={headlineRef}
              data-reveal
              id="about-heading"
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)",
                maxWidth: "16ch"
              }}
            >
              An engineer fluent at <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                every layer
              </em>{" "}
              of the stack.
            </h2>
          </div>
          <div
            data-reveal
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "var(--text-sec)",
              textTransform: "uppercase",
              maxWidth: "26ch",
              textAlign: "right"
            }}
          >
            Software engineer · Network specialist · AI/ML researcher
          </div>
        </div>

        {/* Main card grid */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(1rem, 2vw, 1.5rem)"
          }}
        >
          {/* Portrait card */}
          <motion.div
            data-card
            layoutId="portrait"
            className="relative overflow-hidden"
            style={{
              aspectRatio: "0.78 / 1",
              border: "1px solid var(--border)",
              background: `linear-gradient(180deg, rgba(15,15,15,0.4), rgba(8,8,8,0.95)), url("${ATMOSPHERE_COOL}") center/cover`,
              willChange: "transform, opacity"
            }}
          >
            <div
              ref={portraitRef}
              style={{
                position: "absolute",
                inset: 0,
                willChange: "transform"
              }}
            >
              <img
                src="/images/about-portrait.webp"
                alt="MD. Hasibul Hasan"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PORTRAIT_FRONT;
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top"
                }}
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.7) 100%)"
              }}
            />
            <div
              className="absolute"
              style={{
                left: "1.25rem",
                bottom: "1.25rem",
                right: "1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    marginBottom: 6
                  }}
                >
                  PORTRAIT.001
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                    color: "var(--text-pri)",
                    fontWeight: 500
                  }}
                >
                  MD. Hasibul Hasan
                </div>
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: "var(--text-sec)",
                  textTransform: "uppercase"
                }}
              >
                25.05.2025
              </div>
            </div>
          </motion.div>

          {/* Bio card */}
          <div
            data-card
            className="relative"
            style={{
              padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.6) 0%, rgba(8,8,8,0.4) 100%)",
              border: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "clamp(1.5rem, 3vw, 2.25rem)"
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: "clamp(1.25rem, 2.5vw, 2rem)"
                }}
              >
                — STATEMENT
              </div>
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1.15rem, 1.8vw, 1.55rem)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "var(--text-pri)",
                  letterSpacing: "-0.005em"
                }}
              >
                I work where{" "}
                <span style={{ color: "var(--accent)" }}>application code</span>{" "}
                meets the wires it runs on. Two years across MERN platforms, bank-grade
                network rooms, and applied ML notebooks taught me one thing — the
                interesting bugs always live at the seams.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "var(--border)",
                border: "1px solid var(--border)"
              }}
            >
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  style={{
                    background: "rgba(8,8,8,0.85)",
                    padding: "1rem 1.1rem"
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.3em",
                      color: "var(--text-sec)",
                      textTransform: "uppercase",
                      marginBottom: 6
                    }}
                  >
                    {f.k}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                      color: "var(--text-pri)",
                      fontWeight: 500
                    }}
                  >
                    {f.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side panel — small profile + signature */}
          <div
            data-card
            className="relative overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              background:
                "linear-gradient(135deg, rgba(200,87,26,0.12) 0%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.95) 100%)",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1.25rem, 2.5vw, 2rem)",
              minHeight: "clamp(280px, 36vw, 480px)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "var(--accent)",
                  textTransform: "uppercase"
                }}
              >
                — SIGNATURE
              </div>
              <div
                aria-hidden
                style={{
                  width: 12,
                  height: 12,
                  border: "1px solid var(--accent)",
                  transform: "rotate(45deg)"
                }}
              />
            </div>

            <div style={{ flex: 1, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.6
                }}
              >
                <img
                  src={PORTRAIT_PROFILE}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    mixBlendMode: "screen"
                  }}
                />
              </div>
            </div>

            <div>
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 2.4vw, 2rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--text-pri)",
                  marginBottom: 8
                }}
              >
                Hasibul.
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: "var(--text-sec)",
                  textTransform: "uppercase"
                }}
              >
                Engineer at large
              </div>
            </div>
          </div>
        </div>

        {/* Principles row */}
        <div
          style={{
            marginTop: "clamp(3rem, 5vw, 5rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)"
          }}
        >
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              data-card
              className="group"
              style={{
                background: "var(--void)",
                padding: "clamp(1.75rem, 3vw, 2.5rem)",
                cursor: "default",
                transition: "background 320ms ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,87,26,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--void)")}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: "clamp(1rem, 2vw, 1.5rem)"
                }}
              >
                {p.n}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--text-pri)",
                  marginBottom: "clamp(0.6rem, 1.2vw, 0.85rem)",
                  lineHeight: 1.2
                }}
              >
                {p.t}
              </h3>
              <p
                className="fluid-body"
                style={{
                  color: "var(--text-sec)",
                  fontSize: "clamp(0.875rem, 1vw, 0.95rem)",
                  lineHeight: 1.65
                }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 980px) {
          :global(.about-grid) {
            grid-template-columns: 1fr 1.3fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
}
