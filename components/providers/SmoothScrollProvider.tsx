"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/stores/scrollStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const setVelocity = useScrollStore((s) => s.setVelocity);
  const setProgress = useScrollStore((s) => s.setProgress);
  const setHasScrolled = useScrollStore((s) => s.setHasScrolled);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      // Skip Lenis when reduced motion is preferred
      return;
    }

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      syncTouch: true,
      // easeOutExpo for that buttery exit
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    } as ConstructorParameters<typeof Lenis>[0]);
    lenisRef.current = lenis;

    let firstScrollFired = false;

    lenis.on("scroll", (e: { velocity: number; progress: number }) => {
      setVelocity(Math.abs(e.velocity));
      setProgress(e.progress ?? 0);
      if (!firstScrollFired && Math.abs(e.velocity) > 0.1) {
        firstScrollFired = true;
        setHasScrolled(true);
      }
      ScrollTrigger.update();
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setVelocity, setProgress, setHasScrolled]);

  return <>{children}</>;
}
