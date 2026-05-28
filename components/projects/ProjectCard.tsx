"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { codeToHtml } from "shiki";
import { motion } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";
import {
  ARCHITECTURE_DARK,
  ATMOSPHERE_COOL,
  ATMOSPHERE_WARM
} from "@/components/shared/placeholders";

interface ProjectCardProps {
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  language: string;
  code: string;
  cover: string;
  caseStudyHref?: string;
  githubHref?: string;
  reverse?: boolean;
}

export default function ProjectCard({
  number,
  category,
  title,
  tagline,
  description,
  stack,
  metrics,
  language,
  code,
  cover,
  caseStudyHref = "#",
  githubHref = "#",
  reverse = false
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const codeBgRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark-default"
        });
        if (!cancelled) setHighlighted(html);
      } catch {
        if (!cancelled) setHighlighted(`<pre style="color:#888">${code}</pre>`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  useEffect(() => {
    if (!cardRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 78%" }
      });
      if (coverRef.current) {
        gsap.to(coverRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
      if (codeBgRef.current) {
        gsap.to(codeBgRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.article
      ref={cardRef}
      whileHover="hover"
      initial="idle"
      className="relative overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface)",
        willChange: "transform, opacity"
      }}
    >
      <div
        className="project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1px",
          background: "var(--border)"
        }}
      >
        {/* Cover with code beneath */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "var(--void)",
            minHeight: "clamp(320px, 50vh, 540px)",
            order: reverse ? 1 : 0
          }}
        >
          <div
            ref={coverRef}
            style={{
              position: "absolute",
              inset: -40,
              background: `url("${cover}") center/cover`,
              willChange: "transform"
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.85) 100%)"
            }}
          />

          {/* Code peek */}
          <div
            ref={codeBgRef}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: "1.5rem",
              right: "1.5rem",
              bottom: "1.5rem",
              maxHeight: "60%",
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "rgba(8,8,8,0.85)",
              backdropFilter: "blur(6px)",
              borderRadius: 2,
              opacity: 0.85
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "var(--text-sec)",
                textTransform: "uppercase",
                padding: "0.6rem 0.9rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                gap: 8,
                alignItems: "center"
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--accent)"
                }}
              />
              {language.toUpperCase()} · SNIPPET
            </div>
            <div
              style={{
                padding: "0.85rem 1.1rem",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                lineHeight: 1.45,
                maxHeight: 220,
                overflow: "hidden"
              }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>

          {/* Project number stamp */}
          <div
            className="absolute font-display"
            style={{
              top: "1.5rem",
              left: "1.5rem",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "transparent",
              WebkitTextStroke: "1px var(--accent)"
            }}
          >
            /{number}
          </div>

          <div
            className="absolute"
            style={{ top: "1.5rem", right: "1.5rem" }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "var(--text-pri)",
                textTransform: "uppercase",
                background: "rgba(8,8,8,0.85)",
                backdropFilter: "blur(6px)",
                padding: "0.4rem 0.7rem",
                border: "1px solid var(--border)"
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          className="relative"
          style={{
            background: "var(--void)",
            padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.25rem, 2.5vw, 1.75rem)",
            order: reverse ? 0 : 1
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
                marginBottom: "clamp(0.85rem, 1.6vw, 1.2rem)"
              }}
            >
              — {tagline}
            </div>
            <h3
              ref={titleRef}
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--text-pri)"
              }}
            >
              {title}
            </h3>
          </div>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
              lineHeight: 1.65,
              color: "var(--text-sec)"
            }}
          >
            {description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)"
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "rgba(8,8,8,0.85)",
                  padding: "0.85rem 1rem"
                }}
              >
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
                  className="font-display"
                  style={{
                    fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                    color: "var(--text-pri)",
                    fontWeight: 500
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem"
            }}
          >
            {stack.map((s) => (
              <span
                key={s}
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--text-pri)",
                  padding: "0.4rem 0.65rem",
                  border: "1px solid var(--border)"
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "auto",
              paddingTop: "0.75rem"
            }}
          >
            <MagneticButton
              as="a"
              href={caseStudyHref}
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: "0.85rem 1.5rem",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                background: "transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 200ms ease, color 200ms ease"
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--accent)";
                el.style.color = "var(--void)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "var(--accent)";
              }}
            >
              Case Study <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: "0.85rem 1.5rem",
                border: "1px solid var(--border)",
                color: "var(--text-pri)",
                background: "transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "border-color 200ms ease, color 200ms ease"
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-pri)";
              }}
            >
              GitHub
            </MagneticButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 980px) {
          :global(.project-grid) {
            grid-template-columns: 1.1fr 1fr !important;
          }
        }
      `}</style>
    </motion.article>
  );
}
