"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic primitive — used for every interactive pill in the footer
const MagneticPill = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    as?: "a" | "button";
    href?: string;
    target?: string;
    rel?: string;
    onClick?: (e: React.MouseEvent) => void;
  }
>(({ as = "a", className, children, ...props }, fwdRef) => {
  const localRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = localRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          rotationX: -y * 0.1,
          rotationY: x * 0.1,
          scale: 1.04,
          duration: 0.4,
          ease: "power2.out"
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.4)"
        });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, el);
    return () => ctx.revert();
  }, []);

  const setRef = (n: HTMLElement | null) => {
    localRef.current = n;
    if (typeof fwdRef === "function") fwdRef(n);
    else if (fwdRef) (fwdRef as React.MutableRefObject<HTMLElement | null>).current = n;
  };

  if (as === "button") {
    return (
      <button
        ref={setRef as React.RefCallback<HTMLButtonElement>}
        className={className}
        data-cursor="button"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      ref={setRef as React.RefCallback<HTMLAnchorElement>}
      className={className}
      data-cursor="view"
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
});
MagneticPill.displayName = "MagneticPill";

const MarqueeRow = () => (
  <div
    className="footer-marquee-row"
    style={{
      display: "flex",
      gap: "clamp(2rem, 4vw, 3rem)",
      alignItems: "center",
      paddingInline: "clamp(2rem, 4vw, 3rem)"
    }}
  >
    <span>Available · Q3 2025</span>
    <span style={{ color: "var(--accent)" }}>✦</span>
    <span>Senior Engineering Roles</span>
    <span style={{ color: "var(--text-sec)" }}>✦</span>
    <span>Network Architecture Consulting</span>
    <span style={{ color: "var(--accent)" }}>✦</span>
    <span>Operation Leadership</span>
    <span style={{ color: "var(--text-sec)" }}>✦</span>
    <span>Dhaka · Remote</span>
    <span style={{ color: "var(--accent)" }}>✦</span>
  </div>
);

export default function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      className="cinematic-footer-wrapper"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      }}
    >
      <footer
        role="contentinfo"
        className="cinematic-footer"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: "var(--void)",
          color: "var(--text-pri)",
          fontFamily: "var(--font-display)"
        }}
      >
        {/* Aurora glow */}
        <div className="cf-aurora" aria-hidden />
        {/* Grid wash */}
        <div className="cf-grid" aria-hidden />

        {/* Giant background text */}
        <div
          ref={giantTextRef}
          aria-hidden
          className="cf-giant"
        >
          HASIBUL
        </div>

        {/* Diagonal marquee */}
        <div
          aria-hidden
          className="cf-marquee"
          style={{
            position: "absolute",
            top: "clamp(3rem, 7vh, 5rem)",
            left: 0,
            width: "100%",
            transform: "rotate(-2deg) scale(1.1)",
            zIndex: 10,
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "rgba(8,8,8,0.6)",
            backdropFilter: "blur(10px)",
            paddingBlock: "0.75rem",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-sec)"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "cfScroll 38s linear infinite",
              willChange: "transform"
            }}
          >
            <MarqueeRow />
            <MarqueeRow />
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>

        {/* Center content */}
        <div
          className="cf-center"
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "clamp(1.25rem, 5vw, 5rem)",
            marginTop: "clamp(4rem, 10vh, 6rem)",
            width: "100%",
            maxWidth: 1280,
            marginInline: "auto",
            textAlign: "center"
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              color: "var(--accent)",
              textTransform: "uppercase",
              marginBottom: "clamp(1rem, 2vw, 1.5rem)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12
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
            10 — END OF LINE
            <span
              aria-hidden
              style={{
                width: 32,
                height: 1,
                background: "var(--accent)"
              }}
            />
          </div>

          <h2
            ref={headingRef}
            className="cf-heading"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 7rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              maxWidth: "16ch"
            }}
          >
            Ready to{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--accent)",
                fontWeight: 400
              }}
            >
              build something
            </em>{" "}
            that lasts?
          </h2>

          <div
            ref={linksRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1rem, 2vw, 1.5rem)",
              alignItems: "center"
            }}
          >
            {/* Primary actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "clamp(0.85rem, 2vw, 1rem)"
              }}
            >
              <MagneticPill
                href="mailto:hellohasibulhasan09@gmail.com"
                className="cf-pill cf-pill--primary font-mono"
              >
                <span aria-hidden>✦</span>
                START A CONVERSATION
              </MagneticPill>
              <MagneticPill
                href="tel:+8801643183705"
                className="cf-pill font-mono"
              >
                <span aria-hidden>✆</span>
                +880 1643 183705
              </MagneticPill>
            </div>

            {/* Secondary nav */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "clamp(0.5rem, 1.4vw, 0.85rem)"
              }}
            >
              {[
                { label: "GITHUB", href: "https://github.com/" },
                { label: "LINKEDIN", href: "https://linkedin.com/in/" },
                { label: "ABOUT", href: "#about" },
                { label: "WORK", href: "#projects" },
                { label: "CERTS", href: "#certificates" },
                { label: "CONTACT", href: "#contact" }
              ].map((s) => (
                <MagneticPill
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="cf-pill cf-pill--ghost font-mono"
                >
                  {s.label}
                </MagneticPill>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="cf-bottom"
          style={{
            position: "relative",
            zIndex: 20,
            paddingBlock: "clamp(1.5rem, 3vw, 2rem)",
            paddingInline: "clamp(1.25rem, 5vw, 4rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderTop: "1px solid var(--border)",
            background: "rgba(8,8,8,0.65)",
            backdropFilter: "blur(8px)"
          }}
        >
          <div
            className="cf-bottom-row font-mono"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-sec)"
            }}
          >
            <span>© 2025 — MD. HASIBUL HASAN</span>

            <div
              className="cf-craft"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.5rem 1rem",
                border: "1px solid var(--border)",
                borderRadius: 999,
                background: "rgba(15,15,15,0.8)"
              }}
            >
              <span>CRAFTED WITH</span>
              <span
                aria-hidden
                style={{
                  color: "var(--accent)",
                  fontSize: 13,
                  animation: "cfHeartbeat 2s ease-in-out infinite"
                }}
              >
                ♥
              </span>
              <span>BY</span>
              <span
                style={{
                  color: "var(--text-pri)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em"
                }}
              >
                HASIBUL
              </span>
            </div>

            <MagneticPill
              as="button"
              onClick={scrollToTop}
              className="cf-pill cf-pill--icon font-mono"
            >
              <span aria-hidden>↑</span> BACK TO TOP
            </MagneticPill>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "var(--text-sec)",
              textTransform: "uppercase",
              opacity: 0.7,
              textAlign: "center"
            }}
          >
            Built with Next.js · GSAP · Framer Motion · Tailwind ·
            ScrollTrigger · Engineered to age well.
          </div>
        </div>

        <style jsx>{`
          @keyframes cfBreathe {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
            100% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
          }
          @keyframes cfScroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes cfHeartbeat {
            0%, 100% { transform: scale(1); }
            15%, 45% { transform: scale(1.3); }
            30% { transform: scale(1); }
          }
          .cf-aurora {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 80vw;
            height: 60vh;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            filter: blur(80px);
            background:
              radial-gradient(circle at 50% 50%,
                rgba(200,87,26,0.18) 0%,
                rgba(58,90,140,0.12) 40%,
                transparent 70%);
            animation: cfBreathe 8s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
          }
          .cf-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(to right, rgba(240,236,228,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(240,236,228,0.04) 1px, transparent 1px);
            background-size: 60px 60px;
            mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
            pointer-events: none;
            z-index: 0;
          }
          .cf-giant {
            position: absolute;
            bottom: -3vh;
            left: 50%;
            transform: translateX(-50%);
            font-size: 26vw;
            line-height: 0.75;
            font-weight: 900;
            letter-spacing: -0.05em;
            color: transparent;
            -webkit-text-stroke: 1px rgba(240,236,228,0.05);
            background: linear-gradient(180deg, rgba(240,236,228,0.10) 0%, transparent 60%);
            -webkit-background-clip: text;
            background-clip: text;
            white-space: nowrap;
            user-select: none;
            pointer-events: none;
            z-index: 0;
          }
          .cf-heading {
            font-family: var(--font-display);
            background: linear-gradient(180deg, var(--text-pri) 0%, rgba(240,236,228,0.4) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 24px rgba(240,236,228,0.08));
          }
          :global(.cf-pill) {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 0.95rem 1.5rem;
            border: 1px solid var(--border);
            border-radius: 999px;
            background:
              linear-gradient(145deg, rgba(240,236,228,0.04), rgba(240,236,228,0.01));
            backdrop-filter: blur(16px);
            color: var(--text-sec);
            font-size: 11px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            transition:
              border-color 320ms ease,
              color 320ms ease,
              background 320ms ease,
              box-shadow 320ms ease;
            cursor: none;
            box-shadow:
              0 10px 28px -10px rgba(0,0,0,0.6),
              inset 0 1px 1px rgba(240,236,228,0.06);
            white-space: nowrap;
          }
          :global(.cf-pill:hover) {
            border-color: var(--accent);
            color: var(--text-pri);
            background:
              linear-gradient(145deg, rgba(200,87,26,0.12), rgba(240,236,228,0.02));
            box-shadow:
              0 18px 36px -10px rgba(0,0,0,0.7),
              inset 0 1px 1px rgba(240,236,228,0.18);
          }
          :global(.cf-pill--primary) {
            border-color: var(--accent);
            color: var(--accent);
            background:
              linear-gradient(145deg, rgba(200,87,26,0.18), rgba(200,87,26,0.04));
          }
          :global(.cf-pill--primary:hover) {
            background: var(--accent);
            color: var(--void);
          }
          :global(.cf-pill--ghost) {
            padding: 0.7rem 1.1rem;
            font-size: 10px;
          }
          :global(.cf-pill--icon) {
            padding: 0.7rem 1.1rem;
            font-size: 10px;
          }
          @media (max-width: 720px) {
            .cf-bottom-row {
              flex-direction: column;
              gap: 1rem;
              text-align: center;
            }
            .cf-marquee {
              top: 5vh !important;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}
