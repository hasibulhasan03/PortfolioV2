"use client";

import { useEffect, useRef } from "react";

type CommonProps = {
  strength?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
};

type ButtonOnly = {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: never;
  target?: never;
  rel?: never;
};

type AnchorOnly = {
  as: "a";
  href?: string;
  target?: string;
  rel?: string;
  type?: never;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type MagneticButtonProps = CommonProps & (ButtonOnly | AnchorOnly);

export default function MagneticButton(props: MagneticButtonProps) {
  const {
    strength = 0.35,
    className,
    children,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    disabled
  } = props;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - (r.left + r.width / 2);
      const py = e.clientY - (r.top + r.height / 2);
      tx = px * strength;
      ty = py * strength;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  const sharedStyle: React.CSSProperties = {
    willChange: "transform",
    cursor: "none",
    ...style
  };

  if (props.as === "a") {
    return (
      <a
        ref={(n) => {
          ref.current = n;
        }}
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={className}
        style={sharedStyle}
        data-cursor="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={(n) => {
        ref.current = n;
      }}
      className={className}
      style={sharedStyle}
      data-cursor="button"
      type={props.type ?? "button"}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
    >
      {children}
    </button>
  );
}
