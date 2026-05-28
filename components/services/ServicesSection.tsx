"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ARCHITECTURE_DARK,
  ATMOSPHERE_COOL,
  ATMOSPHERE_WARM,
  PORTRAIT_PROFILE
} from "@/components/shared/placeholders";

interface Service {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  cover: string;
  href: string;
}

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Full-Stack Web Engineering",
    subtitle: "MERN · Next.js · Type-safe contracts",
    description:
      "Production-grade web platforms designed for the long arc. Strict separation between transport, domain, and presentation. Type-safe contracts, observable systems, tested boundaries.",
    deliverables: [
      "Architecture review",
      "Component systems",
      "REST/GraphQL APIs",
      "Test infrastructure",
      "CI/CD pipelines"
    ],
    cover: ARCHITECTURE_DARK,
    href: "#contact"
  },
  {
    index: "02",
    title: "Network Infrastructure",
    subtitle: "Cisco · MikroTik · Banking-tier SLA",
    description:
      "Bank-grade architecture under SLA. VLAN segmentation, OSPF/BGP routing, edge configuration, monitoring with Nagios. Engineered to fail loudly and recover fast.",
    deliverables: [
      "Site-to-site topology",
      "OSPF / BGP design",
      "VLAN segmentation",
      "Monitoring stack",
      "Incident playbooks"
    ],
    cover: ATMOSPHERE_COOL,
    href: "#contact"
  },
  {
    index: "03",
    title: "AI / ML Pipelines",
    subtitle: "Applied research · Reproducibility-first",
    description:
      "Supervised and self-supervised pipelines with dataset curation, baseline calibration, reproducible training, and post-hoc evaluation. Less hype, more validation curves.",
    deliverables: [
      "Dataset curation",
      "Baseline modeling",
      "Eval harnesses",
      "Reproducible runs",
      "Bias measurement"
    ],
    cover: ATMOSPHERE_WARM,
    href: "#contact"
  },
  {
    index: "04",
    title: "Mobile · Cross-Platform",
    subtitle: "Flutter · Dart · Native feel",
    description:
      "Native-quality cross-platform experiences. Thoughtful state management, performant lists, gesture-driven UI, and offline-first persistence where users actually live.",
    deliverables: [
      "Architecture skeleton",
      "Design system port",
      "Offline persistence",
      "Native bridges",
      "Release pipelines"
    ],
    cover: PORTRAIT_PROFILE,
    href: "#contact"
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-svc-reveal]"),
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
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-svc-row]"),
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

  // Cursor-following preview
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
      id="services"
      aria-labelledby="services-heading"
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
          left: "-2%",
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
        OFFER
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
              data-svc-reveal
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
              SERVICES — 04 PRACTICES
            </span>
            <h2
              id="services-heading"
              data-svc-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)"
              }}
            >
              How we{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                work together.
              </em>
            </h2>
          </div>
          <p
            data-svc-reveal
            className="fluid-body"
            style={{
              color: "var(--text-sec)",
              maxWidth: "44ch",
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)"
            }}
          >
            Senior engineering across the layers. Engaged as a lead, embedded
            collaborator, or consulting architect — pick whichever shape fits
            your team&apos;s shape.
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)"
          }}
        >
          {SERVICES.map((svc, i) => (
            <a
              key={svc.index}
              data-svc-row
              href={svc.href}
              data-cursor="view"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="services-row group relative block"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                alignItems: "center",
                gap: "clamp(0.85rem, 2vw, 1.5rem)",
                padding: "clamp(2rem, 4vw, 3rem) 0",
                borderBottom: "1px solid var(--border)",
                cursor: "none",
                transition: "padding-left 480ms cubic-bezier(0.22,1,0.36,1)",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.paddingLeft =
                  "clamp(0.85rem, 2.5vw, 2rem)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.paddingLeft = "0";
              }}
            >
              {/* Hover band */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(200,87,26,0.08), transparent 60%)",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transition: "opacity 360ms ease",
                  zIndex: 0
                }}
              />

              <div
                className="services-grid relative"
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
                  / {svc.index}
                </div>

                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                      color: "var(--text-pri)",
                      marginBottom: "clamp(0.4rem, 0.8vw, 0.6rem)",
                      transition: "color 360ms ease"
                    }}
                  >
                    {svc.title}
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
                    {svc.subtitle}
                  </div>
                </div>

                <p
                  className="fluid-body services-desc"
                  style={{
                    color: "var(--text-sec)",
                    fontSize: "clamp(0.875rem, 1vw, 0.95rem)",
                    lineHeight: 1.6,
                    maxWidth: "40ch"
                  }}
                >
                  {svc.description}
                </p>

                <div
                  className="services-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "flex-end"
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      opacity: hoveredIdx === i ? 1 : 0,
                      transform:
                        hoveredIdx === i ? "translateX(0)" : "translateX(-8px)",
                      transition:
                        "opacity 360ms ease, transform 360ms cubic-bezier(0.22,1,0.36,1)"
                    }}
                  >
                    INQUIRE
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
                      transform: hoveredIdx === i ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Deliverables row — appears on hover */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  maxHeight: hoveredIdx === i ? 80 : 0,
                  opacity: hoveredIdx === i ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 480ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease",
                  marginTop: hoveredIdx === i ? "1rem" : 0,
                  zIndex: 1,
                  position: "relative"
                }}
              >
                {svc.deliverables.map((d) => (
                  <span
                    key={d}
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
                    {d}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Cursor-following preview pane */}
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
          overflow: "hidden",
          mixBlendMode: "normal"
        }}
      >
        {SERVICES.map((s, i) => (
          <img
            key={s.index}
            src={s.cover}
            alt=""
            ref={i === 0 ? previewImgRef : undefined}
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
          {hoveredIdx !== null ? SERVICES[hoveredIdx].subtitle : ""}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 980px) {
          :global(.services-grid) {
            grid-template-columns: 0.4fr 2fr 1.6fr 0.8fr !important;
          }
          :global(.services-desc) {
            display: block !important;
          }
        }
        @media (max-width: 979px) {
          :global(.services-desc) {
            grid-column: 1 / -1;
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
