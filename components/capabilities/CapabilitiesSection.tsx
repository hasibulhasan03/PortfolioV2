"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPython,
  SiCisco,
  SiLinux,
  SiWireshark,
  SiFlutter,
  SiPhp,
  SiGit,
  SiPostman,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiDart
} from "react-icons/si";
import type { IconType } from "react-icons";
import MagneticButton from "@/components/shared/MagneticButton";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: IconType;
  proficiency: "core" | "fluent" | "working";
  blurb: string;
}

const SKILLS: Skill[] = [
  { id: "react", name: "React", category: "Frontend", icon: SiReact, proficiency: "core", blurb: "Component architecture · hooks discipline" },
  { id: "next", name: "Next.js", category: "Frontend", icon: SiNextdotjs, proficiency: "core", blurb: "App Router · server components" },
  { id: "ts", name: "TypeScript", category: "Lang", icon: SiTypescript, proficiency: "core", blurb: "Strict contracts · inference-led" },
  { id: "js", name: "JavaScript", category: "Lang", icon: SiJavascript, proficiency: "core", blurb: "ES-current · async fluency" },
  { id: "tw", name: "Tailwind", category: "Frontend", icon: SiTailwindcss, proficiency: "fluent", blurb: "Utility-first · token systems" },
  { id: "node", name: "Node.js", category: "Backend", icon: SiNodedotjs, proficiency: "core", blurb: "Service runtime · streams" },
  { id: "express", name: "Express", category: "Backend", icon: SiExpress, proficiency: "fluent", blurb: "Routing · middleware · REST" },
  { id: "php", name: "PHP", category: "Backend", icon: SiPhp, proficiency: "fluent", blurb: "Server scripting · CMS-ready" },
  { id: "py", name: "Python", category: "Lang", icon: SiPython, proficiency: "fluent", blurb: "Pipelines · ML scaffolding" },
  { id: "mongo", name: "MongoDB", category: "Database", icon: SiMongodb, proficiency: "fluent", blurb: "Document modeling · aggregation" },
  { id: "mysql", name: "MySQL", category: "Database", icon: SiMysql, proficiency: "fluent", blurb: "Schema design · indexing" },
  { id: "cisco", name: "Cisco IOS", category: "Network", icon: SiCisco, proficiency: "core", blurb: "Banking-tier ops · VLAN" },
  { id: "linux", name: "Linux", category: "OS", icon: SiLinux, proficiency: "fluent", blurb: "Daily driver · server ops" },
  { id: "wireshark", name: "Wireshark", category: "Network", icon: SiWireshark, proficiency: "fluent", blurb: "Forensics · packet analysis" },
  { id: "flutter", name: "Flutter", category: "Mobile", icon: SiFlutter, proficiency: "fluent", blurb: "Cross-platform delivery" },
  { id: "dart", name: "Dart", category: "Lang", icon: SiDart, proficiency: "fluent", blurb: "Flutter companion lang" },
  { id: "git", name: "Git", category: "Tools", icon: SiGit, proficiency: "core", blurb: "Branching · rebase discipline" },
  { id: "postman", name: "Postman", category: "Tools", icon: SiPostman, proficiency: "fluent", blurb: "Contract testing · API exploration" }
];

// Split into two columns of skills for the dual marquees
const COL_A = SKILLS.slice(0, 9);
const COL_B = SKILLS.slice(9);

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Network",
  "Mobile",
  "Lang",
  "Tools"
];

function ProficiencyDots({ level }: { level: Skill["proficiency"] }) {
  const filled = level === "core" ? 3 : level === "fluent" ? 2 : 1;
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: 999,
            background: i < filled ? "var(--accent)" : "rgba(240,236,228,0.18)"
          }}
        />
      ))}
    </div>
  );
}

function SkillTile({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <figure className="skill-marq-tile" data-cursor="view">
      <div className="skill-marq-tile__head">
        <div className="skill-marq-tile__icon">
          <Icon size={22} color="var(--text-pri)" aria-hidden />
        </div>
        <ProficiencyDots level={skill.proficiency} />
      </div>
      <div>
        <div className="skill-marq-tile__name">{skill.name}</div>
        <div className="skill-marq-tile__cat">{skill.category}</div>
      </div>
      <div className="skill-marq-tile__blurb">{skill.blurb}</div>
    </figure>
  );
}

interface VerticalMarqueeProps {
  skills: Skill[];
  direction: "up" | "down";
  speed?: number;
}

function VerticalMarquee({
  skills,
  direction,
  speed = 38
}: VerticalMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-velocity-coupled skew
  useEffect(() => {
    if (!trackRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const el = trackRef.current;
    const ctx = gsap.context(() => {
      let velTween: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 1000, 4);
          velTween?.kill();
          velTween = gsap.to(el, {
            "--marq-skew": `${v * 0.6}deg`,
            duration: 0.4,
            ease: "power3.out"
          });
        }
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`skill-marq skill-marq--${direction}`}>
      <div
        ref={trackRef}
        className="skill-marq__track"
        style={{
          animationDuration: `${speed}s`
        }}
      >
        {[0, 1].map((repeat) => (
          <div key={repeat} className="skill-marq__inner">
            {skills.map((s) => (
              <SkillTile key={`${repeat}-${s.id}`} skill={s} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState("Frontend");

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-cap-reveal]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          opacity: 0,
          y: 26,
          filter: "blur(8px)",
          duration: 0.95,
          stagger: 0.07,
          ease: "expo.out"
        }
      );

      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(".skill-marq"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          opacity: 0,
          y: 50,
          duration: 1.1,
          stagger: 0.15,
          ease: "expo.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding:
          "clamp(4rem, 8vh, 7rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 6vh, 5rem)"
      }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
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
        STACK
      </div>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <div className="cap-stage">
          {/* LEFT — content column */}
          <div className="cap-left">
            <span
              data-cap-reveal
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
                style={{ width: 32, height: 1, background: "var(--accent)" }}
              />
              03 — CAPABILITIES
            </span>

            <h2
              id="capabilities-heading"
              data-cap-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)",
                marginBottom: "clamp(1.25rem, 2.5vw, 2rem)",
                maxWidth: "12ch"
              }}
            >
              The toolbox,{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                in motion.
              </em>
            </h2>

            <p
              data-cap-reveal
              style={{
                color: "var(--text-sec)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                lineHeight: 1.65,
                maxWidth: "44ch",
                marginBottom: "clamp(2rem, 4vw, 2.75rem)"
              }}
            >
              Eighteen tools across{" "}
              <span style={{ color: "var(--text-pri)" }}>frontend</span>,{" "}
              <span style={{ color: "var(--text-pri)" }}>backend</span>,{" "}
              <span style={{ color: "var(--text-pri)" }}>networking</span>, and{" "}
              <span style={{ color: "var(--text-pri)" }}>mobile</span>. The
              proficiency dots are honest — three for daily use, two for
              fluent, one for working knowledge.
            </p>

            {/* Category chip stack */}
            <div
              data-cap-reveal
              className="cap-cats"
              role="tablist"
              aria-label="Skill categories"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === c}
                  onMouseEnter={() => setActiveCat(c)}
                  onClick={() => setActiveCat(c)}
                  data-cursor="view"
                  className={`cap-cat ${activeCat === c ? "is-active" : ""}`}
                >
                  <span className="cap-cat__dot" aria-hidden />
                  <span className="cap-cat__label">{c}</span>
                  <span className="cap-cat__count">
                    {SKILLS.filter((s) => s.category === c).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Active category preview */}
            <div data-cap-reveal className="cap-active">
              <div
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: 10
                }}
              >
                — Showing · {activeCat}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="cap-active__list"
                >
                  {SKILLS.filter((s) => s.category === activeCat).map((s) => (
                    <span key={s.id} className="cap-active__chip">
                      <s.icon size={12} color="var(--accent)" aria-hidden />
                      {s.name}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA */}
            <MagneticButton
              as="a"
              href="#contact"
              className="font-mono cap-cta"
            >
              <span>BRING YOUR PROBLEM</span>
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>

          {/* RIGHT — dual vertical marquees */}
          <div className="cap-right">
            <VerticalMarquee skills={COL_A} direction="up" speed={42} />
            <VerticalMarquee skills={COL_B} direction="down" speed={38} />
            {/* Top + bottom fade overlays */}
            <div className="cap-right__fade cap-right__fade--top" aria-hidden />
            <div
              className="cap-right__fade cap-right__fade--bottom"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .cap-stage {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.75rem, 3.5vw, 3rem);
          align-items: stretch;
        }
        @media (min-width: 980px) {
          .cap-stage {
            grid-template-columns: 1.05fr 1fr;
          }
        }
        .cap-left {
          display: flex;
          flex-direction: column;
          padding-block: clamp(1rem, 2vw, 1.5rem);
        }

        .cap-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
        }
        :global(.cap-cat) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 0.85rem;
          border: 1px solid var(--border);
          background: rgba(8, 8, 8, 0.6);
          color: var(--text-sec);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: none;
          transition:
            border-color 240ms ease,
            color 240ms ease,
            background 240ms ease;
        }
        :global(.cap-cat:hover),
        :global(.cap-cat.is-active) {
          border-color: var(--accent);
          color: var(--text-pri);
          background: rgba(200, 87, 26, 0.08);
        }
        :global(.cap-cat__dot) {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--text-sec);
          transition: background 240ms ease;
        }
        :global(.cap-cat.is-active .cap-cat__dot) {
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }
        :global(.cap-cat__count) {
          color: var(--accent);
          opacity: 0.7;
        }

        .cap-active {
          margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
          padding: clamp(1rem, 2vw, 1.5rem);
          border: 1px solid var(--border);
          background: rgba(8, 8, 8, 0.55);
        }
        :global(.cap-active__list) {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        :global(.cap-active__chip) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.45rem 0.7rem;
          border: 1px solid var(--accent);
          background: rgba(200, 87, 26, 0.06);
          color: var(--text-pri);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        :global(.cap-cta) {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.5rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          background: transparent;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          align-self: flex-start;
          transition:
            background 240ms ease,
            color 240ms ease;
        }
        :global(.cap-cta:hover) {
          background: var(--accent);
          color: var(--void);
        }

        .cap-right {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0.85rem, 1.5vw, 1.25rem);
          height: clamp(560px, 78vh, 760px);
          overflow: hidden;
          padding-block: clamp(0.5rem, 1vw, 0.85rem);
        }
        .cap-right__fade {
          position: absolute;
          left: 0;
          right: 0;
          height: 14%;
          pointer-events: none;
          z-index: 4;
        }
        .cap-right__fade--top {
          top: 0;
          background: linear-gradient(180deg, var(--void), transparent);
        }
        .cap-right__fade--bottom {
          bottom: 0;
          background: linear-gradient(0deg, var(--void), transparent);
        }

        :global(.skill-marq) {
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        :global(.skill-marq__track) {
          display: flex;
          flex-direction: column;
          gap: clamp(0.85rem, 1.5vw, 1.2rem);
          will-change: transform;
          animation-name: marqUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform: skewY(var(--marq-skew, 0deg));
          transition: transform 0.4s ease;
        }
        :global(.skill-marq--down .skill-marq__track) {
          animation-name: marqDown;
        }
        :global(.skill-marq__inner) {
          display: flex;
          flex-direction: column;
          gap: clamp(0.85rem, 1.5vw, 1.2rem);
        }

        @keyframes marqUp {
          from {
            transform: translateY(0) skewY(var(--marq-skew, 0deg));
          }
          to {
            transform: translateY(-50%) skewY(var(--marq-skew, 0deg));
          }
        }
        @keyframes marqDown {
          from {
            transform: translateY(-50%) skewY(var(--marq-skew, 0deg));
          }
          to {
            transform: translateY(0) skewY(var(--marq-skew, 0deg));
          }
        }

        :global(.skill-marq-tile) {
          margin: 0;
          padding: clamp(0.95rem, 1.6vw, 1.2rem);
          background:
            linear-gradient(180deg, rgba(15, 15, 15, 0.9) 0%, rgba(8, 8, 8, 0.95) 100%);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          transition:
            border-color 280ms ease,
            background 280ms ease,
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: none;
        }
        :global(.skill-marq-tile:hover) {
          border-color: var(--accent);
          background:
            linear-gradient(180deg, rgba(200, 87, 26, 0.1) 0%, rgba(8, 8, 8, 0.95) 60%);
          transform: translateY(-3px);
        }
        :global(.skill-marq-tile__head) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        :global(.skill-marq-tile__icon) {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(8, 8, 8, 0.6);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :global(.skill-marq-tile__name) {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 500;
          color: var(--text-pri);
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        :global(.skill-marq-tile__cat) {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          margin-top: 4px;
        }
        :global(.skill-marq-tile__blurb) {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-sec);
          line-height: 1.5;
          padding-top: 0.55rem;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 720px) {
          .cap-right {
            grid-template-columns: 1fr;
            height: 560px;
          }
          .cap-right > :nth-child(2) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
