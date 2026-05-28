"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

interface Role {
  title: string;
  period: string;
}

interface Entry {
  id: string;
  company: string;
  year: string;
  span: string;
  location: string;
  status?: "current" | "past";
  summary: string;
  roles: Role[];
  tags: string[];
}

const ENTRIES: Entry[] = [
  {
    id: "softvence",
    company: "Softvence Omega",
    year: "2025—NOW",
    span: "Sep 2025 — Present",
    location: "Mohakhali · Dhaka",
    status: "current",
    summary:
      "Joined as Frontend Software Engineer; promoted to Operation Leader after eight months. Two roles, one company, continuous progression.",
    roles: [
      { title: "Operation Leader", period: "Mar 2026 — Now" },
      { title: "Software Engineer · Frontend", period: "Sep 2025 — Apr 2026" }
    ],
    tags: ["React", "CMS", "Leadership", "Architecture Review"]
  },
  {
    id: "ucb",
    company: "United Commercial Bank PLC",
    year: "2025",
    span: "May 2025 — Aug 2025",
    location: "Bulus Centre · Gulshan",
    status: "past",
    summary:
      "IT Operations across UCB's national footprint — 700+ ATMs, 230+ branches under Bangladesh Bank ICT Security Guidelines v4.0.",
    roles: [{ title: "IT Operations Intern", period: "May 2025 — Aug 2025" }],
    tags: ["Cisco", "MikroTik", "Nagios", "Banking IT"]
  }
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-exp-reveal]"),
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
        "[data-exp-card]"
      );
      cards.forEach((c, i) => {
        gsap.from(c, {
          scrollTrigger: { trigger: c, start: "top 85%" },
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 1,
          ease: "expo.out"
        });
      });

      // Spine draw
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding:
          "clamp(4rem, 9vh, 8rem) clamp(1.25rem, 5vw, 5rem) clamp(4rem, 9vh, 8rem)"
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
          WebkitTextStroke: "1px rgba(200,87,26,0.05)",
          whiteSpace: "nowrap"
        }}
      >
        FIELD
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-end flex-wrap"
          style={{ gap: "1.5rem", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <div>
            <span
              data-exp-reveal
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
              05 — EXPERIENCE
            </span>
            <h2
              id="experience-heading"
              data-exp-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)"
              }}
            >
              Field record,{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                kept short.
              </em>
            </h2>
          </div>
          <div
            data-exp-reveal
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
            02 companies · 03 roles · 01 trajectory
          </div>
        </div>

        {/* Timeline */}
        <div
          className="exp-timeline"
          style={{
            position: "relative",
            paddingLeft: "clamp(2.5rem, 5vw, 4rem)"
          }}
        >
          {/* Spine */}
          <div
            ref={railRef}
            aria-hidden
            style={{
              position: "absolute",
              left: "clamp(0.85rem, 1.6vw, 1.2rem)",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border)",
              transform: "scaleY(0)",
              transformOrigin: "top center"
            }}
          />

          <div
            className="flex flex-col"
            style={{ gap: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            {ENTRIES.map((entry, i) => (
              <motion.article
                key={entry.id}
                data-exp-card
                whileHover={{ x: 4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="exp-card"
              >
                {/* Spine dot */}
                <span
                  aria-hidden
                  className="exp-card__dot"
                  data-current={entry.status === "current"}
                />
                {/* Connector dash */}
                <span
                  aria-hidden
                  className="exp-card__dash"
                />

                <div className="exp-card__inner">
                  {/* Top row */}
                  <div className="exp-card__row">
                    <div className="exp-card__heading">
                      <h3 className="exp-card__company font-display">
                        {entry.company}
                      </h3>
                      <div
                        className="font-mono exp-card__meta"
                      >
                        <span>{entry.span}</span>
                        <span aria-hidden className="exp-card__meta-dot">
                          ·
                        </span>
                        <span>{entry.location}</span>
                        {entry.status === "current" && (
                          <span className="exp-card__current">CURRENT</span>
                        )}
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="exp-card__year font-display"
                    >
                      {entry.year}
                    </div>
                  </div>

                  {/* Roles */}
                  <ul className="exp-card__roles">
                    {entry.roles.map((r, idx) => (
                      <li key={r.title} data-current={idx === 0 && entry.status === "current"}>
                        <span className="exp-card__role-name font-display">
                          {r.title}
                        </span>
                        <span className="exp-card__role-period font-mono">
                          {r.period}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Summary */}
                  <p className="exp-card__summary">{entry.summary}</p>

                  {/* Tags */}
                  <div className="exp-card__tags">
                    {entry.tags.map((t) => (
                      <span key={t} className="font-mono exp-card__tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.exp-card) {
          position: relative;
          will-change: transform;
        }
        :global(.exp-card__dot) {
          position: absolute;
          left: calc(-1 * clamp(2.5rem, 5vw, 4rem) + clamp(0.6rem, 1.2vw, 0.92rem));
          top: 22px;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: var(--void);
          border: 1px solid var(--accent);
          z-index: 2;
        }
        :global(.exp-card__dot[data-current="true"]) {
          background: var(--accent);
          box-shadow: 0 0 14px var(--accent);
        }
        :global(.exp-card__dash) {
          position: absolute;
          left: calc(-1 * clamp(2.5rem, 5vw, 4rem) + clamp(1.4rem, 2.4vw, 1.85rem));
          top: 27px;
          width: clamp(1rem, 2.4vw, 1.6rem);
          height: 1px;
          background: var(--border);
        }

        :global(.exp-card__inner) {
          display: flex;
          flex-direction: column;
          gap: clamp(0.85rem, 1.5vw, 1.2rem);
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          border: 1px solid var(--border);
          background:
            linear-gradient(180deg, rgba(15, 15, 15, 0.85) 0%, rgba(8, 8, 8, 0.95) 100%);
          transition: border-color 320ms ease, background 320ms ease;
        }
        :global(.exp-card:hover .exp-card__inner) {
          border-color: var(--accent);
          background:
            linear-gradient(180deg, rgba(200, 87, 26, 0.05) 0%, rgba(8, 8, 8, 0.95) 70%);
        }

        :global(.exp-card__row) {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }
        :global(.exp-card__heading) {
          flex: 1;
          min-width: 200px;
        }
        :global(.exp-card__company) {
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: var(--text-pri);
          margin: 0 0 0.5rem;
        }
        :global(.exp-card__meta) {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-sec);
        }
        :global(.exp-card__meta-dot) {
          color: var(--accent);
        }
        :global(.exp-card__current) {
          margin-left: 6px;
          padding: 0.25rem 0.55rem;
          border: 1px solid var(--accent);
          background: rgba(200, 87, 26, 0.1);
          color: var(--accent);
          font-size: 9px;
        }

        :global(.exp-card__year) {
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: transparent;
          -webkit-text-stroke: 1px var(--accent);
          flex-shrink: 0;
        }

        :global(.exp-card__roles) {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: clamp(0.75rem, 1.4vw, 1rem) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        :global(.exp-card__roles li) {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        :global(.exp-card__role-name) {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--text-pri);
        }
        :global(.exp-card__roles li[data-current="true"] .exp-card__role-name) {
          color: var(--accent);
        }
        :global(.exp-card__roles li[data-current="true"] .exp-card__role-name::before) {
          content: "→ ";
          color: var(--accent);
        }
        :global(.exp-card__role-period) {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--text-sec);
          text-transform: uppercase;
        }

        :global(.exp-card__summary) {
          margin: 0;
          color: var(--text-sec);
          font-size: clamp(0.9rem, 1.05vw, 1rem);
          line-height: 1.6;
          max-width: 60ch;
        }
        :global(.exp-card__tags) {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        :global(.exp-card__tag) {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-pri);
          padding: 0.35rem 0.6rem;
          border: 1px solid var(--border);
        }
      `}</style>
    </section>
  );
}
