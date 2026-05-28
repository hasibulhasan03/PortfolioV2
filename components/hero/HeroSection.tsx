"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollStore } from "@/stores/scrollStore";
import { PORTRAIT_FRONT } from "@/components/shared/placeholders";

const ROLES = [
  "SOFTWARE ENGINEER",
  "NETWORK ENGINEER",
  "OPERATION LEADER",
  "FULL STACK DEVELOPER"
];

const FLOATING_BADGES = [
  { text: "MERN STACK", x: "12%", y: "22%" },
  { text: "CISCO · MIKROTIK", x: "78%", y: "30%" },
  { text: "BANKING IT", x: "8%", y: "70%" },
  { text: "REST API", x: "82%", y: "78%" }
];

interface HeroSectionProps {
  active: boolean;
}

export default function HeroSection({ active }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subnameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const accentBlockRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [roleIdx, setRoleIdx] = useState(0);
  const hasScrolled = useScrollStore((s) => s.hasScrolled);

  // Cycle roles
  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % ROLES.length),
      2400
    );
    return () => clearInterval(id);
  }, [active]);

  // Pointer parallax for portrait + backplate
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (portraitRef.current) {
        portraitRef.current.style.setProperty("--px", `${cx * 18}`);
        portraitRef.current.style.setProperty("--py", `${cy * 14}`);
      }
      if (nameRef.current) {
        nameRef.current.style.setProperty("--px", `${cx * -10}`);
        nameRef.current.style.setProperty("--py", `${cy * -6}`);
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  // Entrance
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(nameRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(subnameRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(taglineRef.current, { opacity: 0, y: 18 });
      gsap.set(accentBlockRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });
      gsap.set(marqueeRef.current, { opacity: 0 });
      gsap.set(portraitRef.current, { opacity: 0, y: 40 });

      // Char-split the backplate name for staggered reveal
      const nameChars =
        nameRef.current?.querySelectorAll<HTMLElement>("[data-name-char]");
      if (nameChars) {
        gsap.set(nameChars, {
          opacity: 0,
          y: 60,
          rotateX: -45,
          filter: "blur(12px)"
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(portraitRef.current, { opacity: 1, y: 0, duration: 1.4 })
        .to(nameRef.current, { clipPath: "inset(0 0 0% 0)", duration: 1.4 }, "<0.05")
        .to(
          nameChars ?? [],
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.06,
            ease: "expo.out"
          },
          "<0.1"
        )
        .to(
          subnameRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 1.1 },
          "<0.2"
        )
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.3")
        .to(accentBlockRef.current, { scaleX: 1, duration: 1.1 }, "<")
        .to(marqueeRef.current, { opacity: 1, duration: 0.8 }, "<0.3");

      if (reduced || !sectionRef.current || !portraitRef.current) return;

      // Subtle scroll parallax — portrait drifts up slightly but stays visible
      // through the entire hero section. No fade-out.
      gsap.to(portraitRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      // Backplate name drifts up at half speed
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "transparent"
      }}
    >
      {/* Top bar */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-between"
        style={{
          padding: "clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 4vw, 2.5rem)",
          zIndex: 6
        }}
      >
        <div
          className="font-mono"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-pri)"
          }}
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "var(--accent)",
              boxShadow: "0 0 12px var(--accent)"
            }}
          />
          MD. HASIBUL HASAN
          <span
            aria-hidden
            style={{ width: 24, height: 1, background: "var(--border)" }}
          />
          <span style={{ color: "var(--text-sec)" }}>DHAKA · BD</span>
        </div>
        <div
          className="font-mono hide-narrow"
          style={{
            display: "flex",
            gap: "1rem",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "var(--text-sec)",
            textTransform: "uppercase"
          }}
        >
          <span>v.2025.05</span>
          <span style={{ color: "var(--accent)" }}>●</span>
          <span style={{ color: "var(--text-pri)" }}>[ PORTFOLIO — 2025 ]</span>
        </div>
      </div>

      {/* MASSIVE backplate name */}
      <div
        ref={nameRef}
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "50%",
          left: "50%",
          transform:
            "translate(-50%, -50%) translate3d(calc(var(--px, 0) * 1px), calc(var(--py, 0) * 1px), 0)",
          width: "100%",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 19vw, 24rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.08)",
          whiteSpace: "nowrap",
          zIndex: 1,
          willChange: "transform, clip-path"
        }}
      >
        {"HASIBUL".split("").map((c, i) => (
          <span
            key={i}
            data-name-char
            style={{
              display: "inline-block",
              willChange: "transform, opacity, filter",
              transformStyle: "preserve-3d"
            }}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Sub-name */}
      <div
        ref={subnameRef}
        aria-hidden
        className="absolute pointer-events-none font-mono select-none"
        style={{
          top: "calc(50% + clamp(8rem, 13vw, 16rem))",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--text-sec)",
          zIndex: 2,
          whiteSpace: "nowrap"
        }}
      >
        — SOFTWARE · NETWORK · OPERATION —
      </div>

      {/* Single portrait, scroll parallax */}
      <motion.div
        ref={portraitRef as React.RefObject<HTMLDivElement>}
        layoutId="portrait"
        className="absolute"
        style={{
          bottom: "clamp(4rem, 10vh, 8rem)",
          left: "50%",
          height: "95dvh",
          aspectRatio: "0.72 / 1",
          maxWidth: "min(56vw, 720px)",
          transform:
            "translateX(-50%) translate3d(calc(var(--px, 0) * 1px), calc(var(--py, 0) * 1px), 0)",
          willChange: "transform, opacity",
          zIndex: 4,
          pointerEvents: "none"
        }}
      >
        <img
          src="/images/hero-01.png"
          alt="MD. Hasibul Hasan"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))"
          }}
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src = PORTRAIT_FRONT)
          }
        />
      </motion.div>

      {/* Floating accent badges */}
      {FLOATING_BADGES.map((b, i) => (
        <motion.div
          key={b.text}
          aria-hidden
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: 1.4 + i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute font-mono hide-narrow"
          style={{
            left: b.x,
            top: b.y,
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-pri)",
            background: "rgba(15,15,15,0.7)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(6px)",
            padding: "0.5rem 0.85rem",
            zIndex: 5,
            pointerEvents: "none"
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--accent)",
              marginRight: 8,
              boxShadow: "0 0 10px var(--accent)"
            }}
          />
          {b.text}
        </motion.div>
      ))}

      {/* Tagline + role cycler */}
      <div
        ref={taglineRef}
        className="absolute"
        style={{
          left: "clamp(1.25rem, 4vw, 2.5rem)",
          bottom: "clamp(7rem, 14vh, 10rem)",
          maxWidth: "32ch",
          zIndex: 6
        }}
      >
        <div
          ref={accentBlockRef}
          aria-hidden
          style={{
            width: 48,
            height: 2,
            background: "var(--accent)",
            marginBottom: "1rem"
          }}
        />
        <h1
          id="hero-heading"
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--text-pri)",
            marginBottom: "1.25rem"
          }}
        >
          Building systems
          <br />
          <span style={{ color: "var(--accent)" }}>that outlast trends.</span>
        </h1>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--text-sec)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 18,
            overflow: "hidden"
          }}
        >
          <span style={{ color: "var(--accent)" }}>
            {String(roleIdx + 1).padStart(2, "0")}/04
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={ROLES[roleIdx]}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: "var(--text-pri)" }}
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Right-side stats */}
      <div
        className="absolute hide-narrow"
        style={{
          right: "clamp(1.25rem, 4vw, 2.5rem)",
          bottom: "clamp(7rem, 14vh, 10rem)",
          textAlign: "right",
          zIndex: 6
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-sec)"
          }}
        >
          <div style={{ marginBottom: 6 }}>
            <span style={{ opacity: 0.55 }}>YEARS</span>{" "}
            <span style={{ color: "var(--text-pri)" }}>02+</span>
          </div>
          <div style={{ marginBottom: 6 }}>
            <span style={{ opacity: 0.55 }}>SHIPPED</span>{" "}
            <span style={{ color: "var(--text-pri)" }}>12 PROJECTS</span>
          </div>
          <div>
            <span style={{ opacity: 0.55 }}>STACK</span>{" "}
            <span style={{ color: "var(--accent)" }}>MERN · CISCO</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div
        ref={marqueeRef}
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background:
            "linear-gradient(180deg, transparent, rgba(15,15,15,0.6))",
          padding: "0.85rem 0",
          overflow: "hidden",
          zIndex: 6
        }}
      >
        <div
          aria-hidden
          className="font-mono"
          style={{
            display: "flex",
            gap: "3rem",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-sec)",
            whiteSpace: "nowrap",
            animation: "heroMarquee 32s linear infinite",
            willChange: "transform"
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              style={{ display: "inline-flex", gap: "3rem", alignItems: "center" }}
            >
              <span style={{ color: "var(--accent)" }}>●</span> CURRENTLY
              OPERATION LEADER · SOFTVENCE OMEGA{" "}
              <span style={{ color: "var(--text-pri)" }}>—</span> EX UCB IT
              OPERATIONS{" "}
              <span style={{ color: "var(--text-pri)" }}>—</span> AVAILABLE FOR
              SENIOR ENGINEERING ROLES{" "}
              <span style={{ color: "var(--accent)" }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {active && !hasScrolled && (
          <motion.div
            key="scrollcue"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute font-mono"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "calc(2.5rem + 8px)",
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--text-sec)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 7,
              pointerEvents: "none"
            }}
          >
            <span
              aria-hidden
              className="scroll-pulse"
              style={{ width: 1, height: 22, background: "var(--text-sec)" }}
            />
            SCROLL TO EXPLORE
            <span
              aria-hidden
              className="scroll-pulse"
              style={{ width: 1, height: 22, background: "var(--text-sec)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hide-narrow) {
            display: none !important;
          }
        }
        @keyframes heroMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
