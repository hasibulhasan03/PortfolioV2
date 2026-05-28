"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ARCHITECTURE_DARK,
  ATMOSPHERE_COOL,
  ATMOSPHERE_WARM
} from "@/components/shared/placeholders";

interface EducationEntry {
  index: string;
  level: string;
  institution: string;
  abbr: string;
  field: string;
  result: string;
  year: string;
  detail: string;
  highlights: string[];
  cover: string;
}

const ENTRIES: EducationEntry[] = [
  {
    index: "01",
    level: "BSc — Bachelor of Science",
    institution:
      "Bangladesh Army International University of Science & Technology",
    abbr: "BAIUST",
    field: "Computer Science & Engineering",
    result: "CGPA 3.18 / 4.00",
    year: "Passing 2025",
    detail:
      "Four years of foundational and applied CSE coursework spanning algorithms, distributed systems, software engineering, and networking — alongside parallel internship work in bank-grade IT operations.",
    highlights: [
      "Algorithms",
      "Distributed Systems",
      "Software Engineering",
      "Computer Networks",
      "Database Systems"
    ],
    cover: ARCHITECTURE_DARK
  },
  {
    index: "02",
    level: "HSC — Higher Secondary",
    institution: "Jafargonj Mir Abdul Gafur College",
    abbr: "HSC",
    field: "Science Group · Cumilla Board",
    result: "GPA 5.00 / 5.00",
    year: "Passing 2020",
    detail:
      "Higher Secondary Certificate completed with the maximum GPA in the Science track, with focus on physics, chemistry, and higher mathematics — the foundation for an engineering trajectory.",
    highlights: ["Physics", "Chemistry", "Higher Math", "ICT"],
    cover: ATMOSPHERE_COOL
  },
  {
    index: "03",
    level: "SSC — Secondary School",
    institution: "Debidwar Reaz Uddin Pilot Model High School",
    abbr: "SSC",
    field: "Science Group · Cumilla Board",
    result: "GPA 4.83 / 5.00",
    year: "Passing 2018",
    detail:
      "Secondary School Certificate in the Science group. Where the discipline of structured study habits and curiosity for systems first locked in.",
    highlights: ["Physics", "Chemistry", "ICT Foundation"],
    cover: ATMOSPHERE_WARM
  }
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-edu-reveal]"),
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
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-edu-row]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          opacity: 0,
          y: 50,
          filter: "blur(6px)",
          duration: 1,
          stagger: 0.1,
          ease: "expo.out"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cursor-following preview pane
  useEffect(() => {
    if (!previewRef.current) return;
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
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      aria-labelledby="education-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding: "clamp(5rem, 12vh, 11rem) clamp(1.25rem, 5vw, 5rem)"
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
          WebkitTextStroke: "1px rgba(200,87,26,0.05)",
          whiteSpace: "nowrap",
          zIndex: 0
        }}
      >
        ROOTS
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
          style={{ gap: "1.5rem", marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div>
            <span
              data-edu-reveal
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
              08 — EDUCATION
            </span>
            <h2
              id="education-heading"
              data-edu-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)"
              }}
            >
              The{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                foundation
              </em>
              .
            </h2>
          </div>
          <p
            data-edu-reveal
            className="fluid-body"
            style={{
              color: "var(--text-sec)",
              maxWidth: "42ch",
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)"
            }}
          >
            Three milestones · One discipline · Long arc. Hover any row to
            preview the institutional context.
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)"
          }}
        >
          {ENTRIES.map((edu, i) => (
            <div
              key={edu.index}
              data-edu-row
              data-cursor="view"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="education-row group relative"
              style={{
                padding: "clamp(2rem, 4vw, 3rem) 0",
                borderBottom: "1px solid var(--border)",
                cursor: "none",
                transition: "padding-left 480ms cubic-bezier(0.22,1,0.36,1)",
                overflow: "hidden",
                paddingLeft: hoveredIdx === i ? "clamp(0.85rem, 2.5vw, 2rem)" : 0
              }}
            >
              {/* Hover wash */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(200,87,26,0.07), transparent 60%)",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transition: "opacity 360ms ease",
                  zIndex: 0
                }}
              />

              <div
                className="education-grid relative"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "clamp(0.85rem, 2vw, 1.5rem)",
                  alignItems: "center",
                  zIndex: 1
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    color:
                      hoveredIdx === i ? "var(--accent)" : "var(--text-sec)",
                    textTransform: "uppercase",
                    transition: "color 360ms ease"
                  }}
                >
                  / {edu.index}
                </div>

                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      marginBottom: "clamp(0.5rem, 1vw, 0.7rem)"
                    }}
                  >
                    — {edu.level}
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                      color: "var(--text-pri)",
                      marginBottom: "clamp(0.4rem, 0.8vw, 0.6rem)"
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      color: "var(--text-sec)",
                      textTransform: "uppercase"
                    }}
                  >
                    {edu.field}
                  </div>
                </div>

                <p
                  className="fluid-body education-desc"
                  style={{
                    color: "var(--text-sec)",
                    fontSize: "clamp(0.875rem, 1vw, 0.95rem)",
                    lineHeight: 1.6,
                    maxWidth: "40ch"
                  }}
                >
                  {edu.detail}
                </p>

                <div
                  className="education-meta"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.3em",
                      color: "var(--text-sec)",
                      textTransform: "uppercase"
                    }}
                  >
                    {edu.year}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.15rem, 1.4vw, 1.3rem)",
                      color: "var(--accent)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em"
                    }}
                  >
                    {edu.result}
                  </div>
                  <span
                    aria-hidden
                    style={{
                      width: 36,
                      height: 36,
                      border: `1px solid ${
                        hoveredIdx === i ? "var(--accent)" : "var(--border)"
                      }`,
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color:
                        hoveredIdx === i ? "var(--accent)" : "var(--text-sec)",
                      fontSize: 14,
                      transition: "all 360ms ease",
                      transform: hoveredIdx === i ? "scale(1.1)" : "scale(1)",
                      marginTop: 6
                    }}
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Highlights pill row — visible on hover */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  maxHeight: hoveredIdx === i ? 80 : 0,
                  opacity: hoveredIdx === i ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 480ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease, margin-top 480ms ease",
                  marginTop: hoveredIdx === i ? "1rem" : 0,
                  zIndex: 1,
                  position: "relative"
                }}
              >
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--text-pri)",
                      padding: "0.4rem 0.7rem",
                      border: "1px solid var(--accent)",
                      background: "rgba(200,87,26,0.06)"
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor-following preview */}
      <div
        ref={previewRef}
        aria-hidden
        className="hide-narrow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "clamp(220px, 22vw, 360px)",
          aspectRatio: "1.4 / 1",
          pointerEvents: "none",
          opacity: hoveredIdx !== null ? 1 : 0,
          transition: "opacity 360ms ease",
          zIndex: 50,
          willChange: "transform, opacity",
          border: "1px solid var(--accent)",
          background: "var(--void)",
          overflow: "hidden"
        }}
      >
        {ENTRIES.map((e, i) => (
          <img
            key={e.index}
            src={e.cover}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: hoveredIdx === i ? 1 : 0,
              transition: "opacity 360ms ease"
            }}
          />
        ))}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.85) 100%)"
          }}
        />
        <div
          className="absolute font-display"
          style={{
            left: "0.85rem",
            bottom: "1.5rem",
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px var(--accent)"
          }}
        >
          {hoveredIdx !== null ? ENTRIES[hoveredIdx].abbr : ""}
        </div>
        <div
          className="absolute font-mono"
          style={{
            left: "0.85rem",
            bottom: "0.85rem",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "var(--accent)",
            textTransform: "uppercase"
          }}
        >
          {hoveredIdx !== null ? ENTRIES[hoveredIdx].field : ""}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 980px) {
          :global(.education-grid) {
            grid-template-columns: 0.4fr 2fr 1.6fr 1fr !important;
          }
          :global(.education-desc) {
            display: block !important;
          }
        }
        @media (max-width: 979px) {
          :global(.education-desc) {
            grid-column: 1 / -1;
          }
          :global(.education-meta) {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        @media (max-width: 900px) {
          :global(.hide-narrow) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
