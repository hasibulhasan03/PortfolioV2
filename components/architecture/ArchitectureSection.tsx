"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiTypescript,
  SiCisco,
  SiLinux,
  SiWireshark,
  SiPython,
  SiTensorflow,
  SiJupyter,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiPostman
} from "react-icons/si";
import type { IconType } from "react-icons";
import {
  ARCHITECTURE_DARK,
  ATMOSPHERE_COOL,
  ATMOSPHERE_WARM
} from "@/components/shared/placeholders";

interface Pillar {
  id: "engineer" | "network" | "ai";
  layer: string;
  index: string;
  title: string;
  short: string;
  headline: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  cover: string;
  icons: IconType[];
}

const PILLARS: Pillar[] = [
  {
    id: "engineer",
    layer: "L7 — APPLICATION",
    index: "01",
    title: "Software Engineering",
    short: "Application layer",
    headline: "Production-grade web platforms.",
    description:
      "Strict separation between transport, domain, and presentation. Type-safe contracts, observable systems, tested boundaries — never just shipped, always shipped well.",
    bullets: [
      "Type-safe REST contracts with runtime validation",
      "Component systems engineered for re-use, not novelty",
      "Integration-first testing across service boundaries",
      "CI / CD pipelines with reproducible builds"
    ],
    metrics: [
      { label: "STACK", value: "MERN" },
      { label: "FOCUS", value: "RELIABILITY" },
      { label: "TESTS", value: "INTEGRATION" }
    ],
    cover: ARCHITECTURE_DARK,
    icons: [SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiMongodb, SiMysql]
  },
  {
    id: "network",
    layer: "L2 / L3 — TRANSPORT",
    index: "02",
    title: "Network Infrastructure",
    short: "Transport layer",
    headline: "Banking-tier architecture under SLA.",
    description:
      "VLAN segmentation, OSPF / BGP routing, MikroTik and Cisco edge configuration, ATM uplink fault containment, Nagios-driven monitoring — engineered to fail loudly and recover fast.",
    bullets: [
      "Tier-2 escalations across multi-branch topology",
      "Wireshark forensics on intermittent VLAN events",
      "SNMP + Nagios with PagerDuty escalation paths",
      "Disaster-recovery rehearsal cadence"
    ],
    metrics: [
      { label: "TIER", value: "BANKING" },
      { label: "SLA", value: "99.95%" },
      { label: "ESCALATIONS", value: "TIER-2" }
    ],
    cover: ATMOSPHERE_COOL,
    icons: [SiCisco, SiLinux, SiWireshark, SiDocker, SiGit, SiPostman]
  },
  {
    id: "ai",
    layer: "L8 — INTELLIGENCE",
    index: "03",
    title: "AI / ML Research",
    short: "Intelligence layer",
    headline: "Pipelines that earn their numbers.",
    description:
      "Applied research into supervised and self-supervised pipelines: dataset curation, baseline calibration, reproducible training, post-hoc evaluation. Less hype, more validation curves.",
    bullets: [
      "Reproducible runs with deterministic seeds",
      "Eval harnesses calibrated against baselines",
      "Bias measurement integrated into the pipeline",
      "Notebook-to-production handoff playbooks"
    ],
    metrics: [
      { label: "MODE", value: "APPLIED" },
      { label: "ARTIFACTS", value: "REPRODUCIBLE" },
      { label: "BIAS", value: "MEASURED" }
    ],
    cover: ATMOSPHERE_WARM,
    icons: [SiPython, SiTensorflow, SiJupyter, SiScikitlearn]
  }
];

// All tools used across all 3 pillars — for the dual-row marquee
const ROW_1: IconType[] = [
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiMongodb, SiMysql,
  SiCisco, SiLinux, SiWireshark
];
const ROW_2: IconType[] = [
  SiPython, SiTensorflow, SiJupyter, SiScikitlearn, SiDocker, SiGit, SiPostman
];

function repeated<T>(arr: T[], times: number): T[] {
  return Array.from({ length: times }).flatMap(() => arr);
}

function IconCircle({ Icon }: { Icon: IconType }) {
  return (
    <div
      className="arch-marquee__icon"
      aria-hidden
    >
      <Icon size={24} color="var(--text-pri)" />
    </div>
  );
}

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-arch-reveal]"),
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
      const cards = sectionRef.current!.querySelectorAll<HTMLElement>(
        "[data-pillar-card]"
      );
      cards.forEach((c) => {
        gsap.from(c, {
          scrollTrigger: { trigger: c, start: "top 80%" },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "expo.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const active = PILLARS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="architecture"
      aria-labelledby="architecture-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 5rem) clamp(2rem, 5vh, 4rem)"
      }}
    >
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
          WebkitTextStroke: "1px rgba(200,87,26,0.06)",
          whiteSpace: "nowrap",
          zIndex: 0
        }}
      >
        SYSTEM
      </div>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-end flex-wrap"
          style={{ gap: "1.5rem", marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div>
            <span
              data-arch-reveal
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
              02 — ARCHITECTURE
            </span>
            <h2
              data-arch-reveal
              id="architecture-heading"
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
              Three layers,{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                one engineer.
              </em>
            </h2>
          </div>
          <p
            data-arch-reveal
            className="fluid-body"
            style={{
              color: "var(--text-sec)",
              maxWidth: "44ch",
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)"
            }}
          >
            A discipline most people choose between, treated here as a stack.
            Application logic sits on a network that has to stay up; intelligence
            rides on top of both.
          </p>
        </div>

        {/* Pillar selector tabs */}
        <div
          data-arch-reveal
          className="arch-tabs"
          role="tablist"
          aria-label="Architecture layers"
        >
          {PILLARS.map((p, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={isActive}
                data-cursor="view"
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                className={`arch-tab ${isActive ? "is-active" : ""}`}
              >
                <span
                  className="arch-tab__index font-mono"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-sec)"
                  }}
                >
                  / {p.index}
                </span>
                <span
                  className="arch-tab__title font-display"
                  style={{
                    color: isActive ? "var(--text-pri)" : "var(--text-sec)"
                  }}
                >
                  {p.title}
                </span>
                <span
                  className="arch-tab__layer font-mono"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-sec)",
                    opacity: isActive ? 1 : 0.5
                  }}
                >
                  {p.layer}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active pillar — large editorial card */}
        <div
          data-pillar-card
          className="arch-pillar"
        >
          {/* Cover side */}
          <div className="arch-pillar__cover">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-cover`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{
                  background: `url("${active.cover}") center/cover`
                }}
              />
            </AnimatePresence>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.85) 100%)"
              }}
            />

            {/* Top labels */}
            <div className="arch-pillar__cover-top">
              <span
                className="font-mono arch-chip"
                style={{
                  color: "var(--accent)",
                  borderColor: "var(--accent)"
                }}
              >
                {active.layer}
              </span>
              <span
                className="font-mono arch-chip"
                style={{
                  color: "var(--text-pri)"
                }}
              >
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(PILLARS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Stamp number */}
            <div
              aria-hidden
              className="font-display arch-pillar__stamp"
            >
              /{active.index}
            </div>

            {/* Bottom icons */}
            <div className="arch-pillar__cover-icons">
              {active.icons.map((Icon, i) => (
                <div
                  key={i}
                  className="arch-pillar__icon"
                  style={{
                    transitionDelay: `${i * 30}ms`
                  }}
                >
                  <Icon size={20} color="var(--text-pri)" aria-hidden />
                </div>
              ))}
            </div>
          </div>

          {/* Content side */}
          <div className="arch-pillar__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-content`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
                style={{
                  gap: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  height: "100%"
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
                  — {active.short}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: "var(--text-pri)"
                  }}
                >
                  {active.headline}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                    lineHeight: 1.65,
                    color: "var(--text-sec)"
                  }}
                >
                  {active.description}
                </p>
                <ul className="arch-pillar__bullets">
                  {active.bullets.map((b) => (
                    <li key={b}>
                      <span aria-hidden className="arch-pillar__bullet-mark">
                        ◢
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="arch-pillar__metrics">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="arch-pillar__metric">
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.3em",
                          color: "var(--text-sec)",
                          textTransform: "uppercase",
                          marginBottom: 4
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 12,
                          letterSpacing: "0.15em",
                          color: "var(--text-pri)",
                          fontVariantNumeric: "tabular-nums"
                        }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .arch-marquee {
          position: relative;
          padding: clamp(1.25rem, 2.5vw, 2rem) 0;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(15,15,15,0.4), rgba(8,8,8,0.7));
        }
        .arch-marquee__row {
          display: flex;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          width: max-content;
          will-change: transform;
        }
        .arch-marquee__row--ltr {
          animation: archScrollLtr 36s linear infinite;
        }
        .arch-marquee__row--rtl {
          animation: archScrollRtl 30s linear infinite;
          margin-top: clamp(0.85rem, 1.5vw, 1.2rem);
        }
        @keyframes archScrollLtr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes archScrollRtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        :global(.arch-marquee__icon) {
          flex-shrink: 0;
          width: clamp(48px, 5vw, 64px);
          height: clamp(48px, 5vw, 64px);
          border-radius: 999px;
          background: rgba(15,15,15,0.85);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 220ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1);
        }
        :global(.arch-marquee__icon:hover) {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .arch-marquee__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(60px, 8vw, 120px);
          pointer-events: none;
          z-index: 2;
        }
        .arch-marquee__fade--left {
          left: 0;
          background: linear-gradient(90deg, var(--void), transparent);
        }
        .arch-marquee__fade--right {
          right: 0;
          background: linear-gradient(-90deg, var(--void), transparent);
        }

        .arch-tabs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }
        @media (min-width: 720px) {
          .arch-tabs {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .arch-tab {
          background: rgba(15,15,15,0.85);
          padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 2.5vw, 1.75rem);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-start;
          text-align: left;
          cursor: none;
          position: relative;
          transition: background 320ms ease;
          border: none;
          font-family: inherit;
        }
        .arch-tab:hover,
        .arch-tab.is-active {
          background: rgba(200,87,26,0.06);
        }
        .arch-tab.is-active::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--accent);
        }
        .arch-tab__index {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: color 320ms ease;
        }
        .arch-tab__title {
          font-size: clamp(1.1rem, 1.6vw, 1.4rem);
          font-weight: 500;
          letter-spacing: -0.015em;
          transition: color 320ms ease;
        }
        .arch-tab__layer {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: color 320ms ease, opacity 320ms ease;
        }

        .arch-pillar {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          overflow: hidden;
          min-height: clamp(420px, 60vh, 600px);
        }
        @media (min-width: 980px) {
          .arch-pillar {
            grid-template-columns: 1fr 1fr;
          }
        }
        .arch-pillar__cover {
          position: relative;
          background: var(--void);
          min-height: clamp(320px, 50vh, 520px);
          overflow: hidden;
        }
        .arch-pillar__cover-top {
          position: absolute;
          top: clamp(1rem, 2vw, 1.5rem);
          left: clamp(1rem, 2vw, 1.5rem);
          right: clamp(1rem, 2vw, 1.5rem);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 3;
          gap: 0.75rem;
        }
        :global(.arch-chip) {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(6px);
          padding: 0.4rem 0.7rem;
          border: 1px solid var(--border);
        }
        .arch-pillar__stamp {
          position: absolute;
          left: clamp(1rem, 2vw, 1.5rem);
          bottom: clamp(5.5rem, 9vw, 7.5rem);
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px var(--accent);
          z-index: 3;
        }
        .arch-pillar__cover-icons {
          position: absolute;
          left: clamp(1rem, 2vw, 1.5rem);
          right: clamp(1rem, 2vw, 1.5rem);
          bottom: clamp(1rem, 2vw, 1.5rem);
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          z-index: 3;
        }
        .arch-pillar__icon {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 220ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1);
        }
        .arch-pillar__icon:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .arch-pillar__content {
          background: rgba(8,8,8,0.92);
          padding: clamp(1.75rem, 3.5vw, 2.75rem);
          display: flex;
          flex-direction: column;
        }
        .arch-pillar__bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .arch-pillar__bullets li {
          display: flex;
          gap: 0.7rem;
          align-items: flex-start;
          font-size: clamp(0.875rem, 0.95vw, 0.95rem);
          color: var(--text-pri);
          line-height: 1.55;
        }
        .arch-pillar__bullet-mark {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .arch-pillar__metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin-top: auto;
        }
        .arch-pillar__metric {
          background: rgba(15,15,15,0.85);
          padding: 0.85rem 1rem;
        }
      `}</style>
    </section>
  );
}
