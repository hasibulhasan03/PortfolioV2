"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  splitBy?: "char" | "word" | "line";
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  trigger?: "scroll" | "mount";
  yOffset?: number;
  blurAmount?: number;
}

// GSAP-powered split-text reveal. Splits children into spans (chars or words),
// then animates them on scroll or mount with stagger + blur-to-focus.
export default function RevealText({
  children,
  as = "span",
  className,
  style,
  splitBy = "word",
  stagger = 0.04,
  duration = 0.9,
  delay = 0,
  start = "top 80%",
  trigger = "scroll",
  yOffset = 22,
  blurAmount = 8
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = ref.current.querySelectorAll<HTMLElement>(
      "[data-reveal-piece]"
    );
    if (!targets.length) return;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: yOffset,
          filter: `blur(${blurAmount}px)`
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          stagger,
          delay,
          ease: "expo.out",
          ...(trigger === "scroll" && {
            scrollTrigger: { trigger: ref.current!, start }
          })
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, ref.current);

    return () => ctx.revert();
  }, [children, splitBy, stagger, duration, delay, start, trigger, yOffset, blurAmount]);

  // Build pieces
  let pieces: React.ReactNode[];
  if (splitBy === "char") {
    pieces = children.split("").map((c, i) =>
      c === " " ? (
        <span key={i}>&nbsp;</span>
      ) : (
        <span
          key={i}
          data-reveal-piece
          style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
        >
          {c}
        </span>
      )
    );
  } else if (splitBy === "word") {
    pieces = children.split(/(\s+)/).map((w, i) =>
      /^\s+$/.test(w) ? (
        <span key={i}>{w}</span>
      ) : (
        <span
          key={i}
          data-reveal-piece
          style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
        >
          {w}
        </span>
      )
    );
  } else {
    pieces = [
      <span
        key={0}
        data-reveal-piece
        style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
      >
        {children}
      </span>
    ];
  }

  const setRef = (n: HTMLElement | null) => {
    ref.current = n;
  };

  switch (as) {
    case "h1":
      return (
        <h1 ref={setRef} className={className} style={style}>
          {pieces}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={setRef} className={className} style={style}>
          {pieces}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={setRef} className={className} style={style}>
          {pieces}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={setRef} className={className} style={style}>
          {pieces}
        </h4>
      );
    case "p":
      return (
        <p ref={setRef} className={className} style={style}>
          {pieces}
        </p>
      );
    case "div":
      return (
        <div ref={setRef} className={className} style={style}>
          {pieces}
        </div>
      );
    default:
      return (
        <span ref={setRef} className={className} style={style}>
          {pieces}
        </span>
      );
  }
}
