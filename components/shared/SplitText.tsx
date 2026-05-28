"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
  type?: "chars" | "words";
  trigger?: "scroll" | "mount";
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function SplitText({
  children,
  className,
  as = "span",
  type = "words",
  trigger = "scroll",
  start = "top 80%",
  delay = 0,
  stagger = 0.04,
  duration = 0.8
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = containerRef.current.querySelectorAll<HTMLElement>(
      type === "chars" ? "[data-char]" : "[data-word]"
    );

    if (reduced) {
      gsap.set(targets, { opacity: 1, filter: "blur(0px)", y: 0 });
      return;
    }

    const animProps = {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out"
    } as gsap.TweenVars;

    if (trigger === "scroll") {
      const tween = gsap.fromTo(
        targets,
        { opacity: 0, filter: "blur(8px)", y: 18 },
        {
          ...animProps,
          scrollTrigger: { trigger: containerRef.current!, start }
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    } else {
      gsap.fromTo(
        targets,
        { opacity: 0, filter: "blur(8px)", y: 18 },
        animProps
      );
    }
  }, [delay, duration, stagger, start, trigger, type, children]);

  const parts =
    type === "chars" ? children.split("") : children.split(/(\s+)/);

  const inner = parts.map((part, i) => {
    if (/^\s+$/.test(part)) {
      return <span key={i}>{part}</span>;
    }
    if (type === "chars") {
      return (
        <span
          key={i}
          data-char
          className="split-char"
          style={{ display: "inline-block" }}
        >
          {part}
        </span>
      );
    }
    return (
      <span
        key={i}
        data-word
        className="split-word"
        style={{ display: "inline-block" }}
      >
        {part}
      </span>
    );
  });

  const refCallback = (node: HTMLElement | null) => {
    containerRef.current = node;
  };

  switch (as) {
    case "div":
      return (
        <div ref={refCallback} className={className}>
          {inner}
        </div>
      );
    case "h1":
      return (
        <h1 ref={refCallback} className={className}>
          {inner}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={refCallback} className={className}>
          {inner}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={refCallback} className={className}>
          {inner}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={refCallback} className={className}>
          {inner}
        </h4>
      );
    case "p":
      return (
        <p ref={refCallback} className={className}>
          {inner}
        </p>
      );
    default:
      return (
        <span ref={refCallback} className={className}>
          {inner}
        </span>
      );
  }
}
