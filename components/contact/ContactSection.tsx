"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";
import { ATMOSPHERE_WARM } from "@/components/shared/placeholders";

interface FieldProps {
  label: string;
  type?: string;
  name: string;
  multiline?: boolean;
  required?: boolean;
}

function Field({ label, type = "text", name, multiline, required }: FieldProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const lifted = focused || filled;

  return (
    <div
      className="relative"
      style={{ paddingTop: "1.6rem" }}
    >
      <label
        htmlFor={name}
        className="font-mono"
        style={{
          position: "absolute",
          left: 0,
          top: lifted ? 0 : "1.85rem",
          fontSize: lifted ? 10 : 13,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: lifted ? "var(--accent)" : "var(--text-sec)",
          transition:
            "top 280ms cubic-bezier(0.22,1,0.36,1), font-size 280ms cubic-bezier(0.22,1,0.36,1), color 280ms ease",
          pointerEvents: "none"
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="font-display"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-pri)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            padding: "0.6rem 0 0.7rem",
            resize: "vertical",
            minHeight: 90
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="font-display"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-pri)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            padding: "0.6rem 0 0.7rem"
          }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: "var(--border)"
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: focused ? 0 : "50%",
          right: focused ? 0 : "50%",
          bottom: 0,
          height: 1,
          background: "var(--accent)",
          transition: "left 280ms ease, right 280ms ease"
        }}
      />
    </div>
  );
}

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/", handle: "@hasibulhasanmahi" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/", handle: "/in/hasibul-hasan-mahi" },
  { label: "EMAIL", href: "mailto:hellohasibulhasan09@gmail.com", handle: "hellohasibulhasan09@gmail.com" },
  { label: "PHONE", href: "tel:+8801643183705", handle: "+880 1643 183705" }
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-contact-reveal]"),
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
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-contact-card]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          opacity: 0,
          y: 60,
          duration: 1.1,
          stagger: 0.12,
          ease: "expo.out"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      setSubmitting(false);
      setError("All fields are required.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:hellohasibulhasan09@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding: "clamp(5rem, 12vh, 11rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 6vh, 4rem)"
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
        SIGNAL
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
              data-contact-reveal
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
              09 — CONTACT
            </span>
            <h2
              id="contact-heading"
              data-contact-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)",
                maxWidth: "16ch"
              }}
            >
              Let&apos;s build something{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                that matters.
              </em>
            </h2>
          </div>
          <p
            data-contact-reveal
            className="fluid-body"
            style={{
              color: "var(--text-sec)",
              maxWidth: "36ch",
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)"
            }}
          >
            Open to senior engineering roles, research collaborations, and
            infrastructure consulting engagements.
          </p>
        </div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(1rem, 2vw, 1.5rem)"
          }}
        >
          {/* Form card */}
          <div
            data-contact-card
            className="relative"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.7) 0%, rgba(8,8,8,0.95) 100%)",
              border: "1px solid var(--border)",
              padding: "clamp(1.75rem, 3.5vw, 2.75rem)"
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                color: "var(--accent)",
                textTransform: "uppercase",
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                display: "flex",
                alignItems: "center",
                gap: 10
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent)"
                }}
              />
              — DIRECT MESSAGE
            </div>
            <form
              onSubmit={onSubmit}
              className="grid"
              style={{
                gap: "clamp(1rem, 2vw, 1.5rem)"
              }}
            >
              <div
                className="contact-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "clamp(1rem, 2vw, 1.5rem)"
                }}
              >
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Message" name="message" multiline required />

              {error && (
                <div
                  className="font-mono"
                  role="alert"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: "var(--accent)",
                    textTransform: "uppercase"
                  }}
                >
                  {error}
                </div>
              )}

              <MagneticButton
                type="submit"
                disabled={submitting || sent}
                strength={0.18}
                className="font-mono"
                style={{
                  marginTop: "clamp(1rem, 2vw, 1.5rem)",
                  width: "100%",
                  padding: "1.1rem 1.5rem",
                  background: sent ? "transparent" : "var(--accent)",
                  color: sent ? "var(--accent)" : "var(--void)",
                  border: "1px solid var(--accent)",
                  fontSize: 12,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  transition: "background 220ms ease, color 220ms ease"
                }}
                onMouseEnter={(e) => {
                  if (sent) return;
                  e.currentTarget.style.background = "var(--void)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  if (sent) return;
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "var(--void)";
                }}
              >
                {sent ? "Message Sent ✓" : submitting ? "Sending…" : "Send Message →"}
              </MagneticButton>
            </form>
          </div>

          {/* Side card — accent block with socials */}
          <div
            data-contact-card
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, rgba(200,87,26,0.10) 0%, rgba(8,8,8,0.95) 70%), url("${ATMOSPHERE_WARM}") center/cover`,
              border: "1px solid var(--border)",
              padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 4vw, 3rem)"
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
                — CHANNELS
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

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0,
                borderTop: "1px solid var(--border)"
              }}
            >
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  whileHover="hover"
                  initial="idle"
                  className="group relative"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "clamp(1rem, 2vw, 1.5rem) 0",
                    borderBottom: "1px solid var(--border)",
                    cursor: "none",
                    overflow: "hidden"
                  }}
                >
                  <motion.span
                    aria-hidden
                    variants={{
                      idle: { x: -20, opacity: 0 },
                      hover: { x: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--accent)",
                      fontSize: 18
                    }}
                  >
                    →
                  </motion.span>
                  <motion.span
                    variants={{
                      idle: { x: 0 },
                      hover: { x: 28 }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "var(--text-pri)"
                    }}
                  >
                    {s.label}
                  </motion.span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      color: "var(--text-sec)",
                      textTransform: "uppercase"
                    }}
                  >
                    {s.handle}
                  </span>
                </motion.a>
              ))}
            </div>

            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "var(--text-sec)",
                  textTransform: "uppercase",
                  marginBottom: 8
                }}
              >
                CURRENT STATUS
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                  fontWeight: 500,
                  color: "var(--text-pri)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "var(--accent)",
                    boxShadow: "0 0 14px var(--accent)",
                    animation: "statusPulse 1.6s ease-in-out infinite"
                  }}
                />
                Open to new engagements · 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes statusPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.4;
          }
        }
        @media (min-width: 980px) {
          .contact-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .contact-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
