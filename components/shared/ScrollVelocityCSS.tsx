"use client";

import { useEffect } from "react";
import { useScrollStore } from "@/stores/scrollStore";

/**
 * Drives a global CSS custom property `--scroll-vel` (0..1+) and
 * `--scroll-dir` (-1 or 1) on <body>. Lets any element couple to scroll
 * velocity via plain CSS — used for subtle skew on dividers, marquees,
 * and section transitions.
 */
export default function ScrollVelocityCSS() {
  const velocity = useScrollStore((s) => s.velocity);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const v = Math.min(velocity / 4, 1.4);
    document.body.style.setProperty("--scroll-vel", v.toFixed(3));
  }, [velocity]);

  return null;
}
