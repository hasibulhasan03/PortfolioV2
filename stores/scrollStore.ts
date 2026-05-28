"use client";

import { create } from "zustand";

interface ScrollState {
  velocity: number;
  progress: number;
  section: string;
  hasScrolled: boolean;
  heroComplete: boolean;
  setVelocity: (v: number) => void;
  setProgress: (p: number) => void;
  setSection: (s: string) => void;
  setHasScrolled: (h: boolean) => void;
  setHeroComplete: (h: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  velocity: 0,
  progress: 0,
  section: "hero",
  hasScrolled: false,
  heroComplete: false,
  setVelocity: (v) => set({ velocity: v }),
  setProgress: (p) => set({ progress: p }),
  setSection: (s) => set({ section: s }),
  setHasScrolled: (h) => set({ hasScrolled: h }),
  setHeroComplete: (h) => set({ heroComplete: h })
}));
