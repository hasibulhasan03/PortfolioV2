"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFlutter,
  SiDart,
  SiPython,
  SiTensorflow,
  SiEthereum
} from "react-icons/si";
import type { IconType } from "react-icons";

interface Certificate {
  id: string;
  index: string;
  title: string;
  authority: string;
  year: string;
  duration: string;
  description: string;
  modules: string[];
  icons: IconType[];
}

const CERTIFICATES: Certificate[] = [
  {
    id: "mern",
    index: "01",
    title: "Full-Stack Web Development with MERN",
    authority: "Programming Hero",
    year: "2024",
    duration: "08 mo",
    description:
      "MongoDB schema modeling, Express middleware, React component architecture, Node.js production deployment. Capstone shipped end-to-end.",
    modules: ["MongoDB", "Express", "React", "Node", "REST", "Auth"],
    icons: [SiReact, SiNodedotjs, SiMongodb]
  },
  {
    id: "flutter",
    index: "02",
    title: "Mobile App Development with Flutter",
    authority: "Self-paced cohort",
    year: "2024",
    duration: "06 mo",
    description:
      "Cross-platform mobile delivery with Flutter and Dart. State management patterns, native bridge work, release pipelines.",
    modules: ["Flutter", "Dart", "Provider", "Bridges", "Release"],
    icons: [SiFlutter, SiDart]
  },
  {
    id: "blockchain-ml",
    index: "03",
    title: "Blockchain & Machine Learning",
    authority: "Cross-discipline track",
    year: "2024",
    duration: "04 mo",
    description:
      "Foundations across two domains. Capstone explored on-chain data feeds into reproducible model training loops.",
    modules: ["Python", "TensorFlow", "Smart Contracts", "Eval"],
    icons: [SiPython, SiTensorflow, SiEthereum]
  }
];

interface CardProps {
  cert: Certificate;
  index: number;
}

function CertCard({ cert, index }: CardProps) {
  const Icon = cert.icons[0];
  return (
    <motion.article
      data-cert-card
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="cert-card-min"
    >
      {/* Accent rule */}
      <div className="cert-card-min__rule" aria-hidden />

      {/* Header */}
      <div className="cert-card-min__head">
        <div className="cert-card-min__index font-mono">{cert.index}</div>
        <div className="cert-card-min__year font-mono">
          {cert.year} · {cert.duration}
        </div>
      </div>

      {/* Authority */}
      <div className="cert-card-min__authority font-mono">
        — {cert.authority}
      </div>

      {/* Title */}
      <h3 className="cert-card-min__title font-display">{cert.title}</h3>

      {/* Description */}
      <p className="cert-card-min__desc">{cert.description}</p>

      {/* Modules — clean inline list */}
      <div className="cert-card-min__modules">
        {cert.modules.map((m, i) => (
          <span key={m} className="font-mono">
            {m}
            {i < cert.modules.length - 1 && (
              <span aria-hidden className="cert-card-min__sep">
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="cert-card-min__footer">
        <div className="cert-card-min__icons">
          {cert.icons.map((I, i) => (
            <I key={i} size={16} color="var(--text-sec)" aria-hidden />
          ))}
        </div>
        <a
          href="#contact"
          data-cursor="view"
          className="font-mono cert-card-min__view"
        >
          REQUEST PROOF
          <span aria-hidden>→</span>
        </a>
      </div>

      <style jsx>{`
        :global(.cert-card-min) {
          position: relative;
          background: rgba(8, 8, 8, 0.55);
          border: 1px solid var(--border);
          padding: clamp(1.5rem, 2.6vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 1.8vw, 1.4rem);
          transition: border-color 280ms ease, background 280ms ease;
          will-change: transform;
        }
        :global(.cert-card-min:hover) {
          border-color: var(--accent);
          background: rgba(15, 15, 15, 0.78);
        }
        :global(.cert-card-min__rule) {
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 32px;
          background: var(--accent);
          transition: height 320ms ease;
        }
        :global(.cert-card-min:hover .cert-card-min__rule) {
          height: 64px;
        }

        :global(.cert-card-min__head) {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        :global(.cert-card-min__index) {
          font-size: 11px;
          letter-spacing: 0.3em;
          color: var(--accent);
          text-transform: uppercase;
        }
        :global(.cert-card-min__year) {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--text-sec);
          text-transform: uppercase;
        }

        :global(.cert-card-min__authority) {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-sec);
        }

        :global(.cert-card-min__title) {
          margin: 0;
          font-size: clamp(1.2rem, 1.7vw, 1.45rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--text-pri);
        }

        :global(.cert-card-min__desc) {
          margin: 0;
          color: var(--text-sec);
          font-size: clamp(0.875rem, 1vw, 0.95rem);
          line-height: 1.6;
        }

        :global(.cert-card-min__modules) {
          padding: clamp(0.75rem, 1.4vw, 1rem) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-pri);
          line-height: 1.8;
        }
        :global(.cert-card-min__sep) {
          color: var(--accent);
          margin-inline: 0.5rem;
          opacity: 0.7;
        }

        :global(.cert-card-min__footer) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }
        :global(.cert-card-min__icons) {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        :global(.cert-card-min__view) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--accent);
          text-transform: uppercase;
          cursor: none;
          transition: gap 240ms ease;
        }
        :global(.cert-card-min__view:hover) {
          gap: 14px;
        }
      `}</style>
    </motion.article>
  );
}

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-cert-reveal]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          opacity: 0,
          y: 22,
          filter: "blur(8px)",
          duration: 0.9,
          stagger: 0.06,
          ease: "expo.out"
        }
      );
      gsap.from("[data-cert-card]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      aria-labelledby="certificates-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 9vh, 8rem) clamp(1.25rem, 5vw, 5rem)"
      }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "8%",
          left: "-2%",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 18vw, 22rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.04)",
          whiteSpace: "nowrap",
          zIndex: 0
        }}
      >
        SEALED
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
          className="flex justify-between items-end flex-wrap"
          style={{ gap: "1.5rem", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <div>
            <span
              data-cert-reveal
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "var(--accent)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(1rem, 2vw, 1.5rem)"
              }}
            >
              <span
                aria-hidden
                style={{ width: 32, height: 1, background: "var(--accent)" }}
              />
              07 — CERTIFICATIONS
            </span>
            <h2
              id="certificates-heading"
              data-cert-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)"
              }}
            >
              Sealed,{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                signed.
              </em>
            </h2>
          </div>
          <p
            data-cert-reveal
            style={{
              color: "var(--text-sec)",
              maxWidth: "38ch",
              fontSize: "clamp(0.95rem, 1.05vw, 1rem)"
            }}
          >
            Three formal training tracks · completed alongside production work.
          </p>
        </div>

        <div className="cert-grid-min">
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .cert-grid-min {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (min-width: 720px) {
          .cert-grid-min {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1180px) {
          .cert-grid-min {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
