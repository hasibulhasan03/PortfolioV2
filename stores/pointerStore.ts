"use client";

import { create } from "zustand";

interface PointerState {
  x: number;
  y: number;
  nx: number;
  ny: number;
  variant: "default" | "view" | "open" | "button" | "text" | "hidden";
  setPointer: (x: number, y: number, nx: number, ny: number) => void;
  setVariant: (v: PointerState["variant"]) => void;
}

export const usePointerStore = create<PointerState>((set) => ({
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
  variant: "default",
  setPointer: (x, y, nx, ny) => set({ x, y, nx, ny }),
  setVariant: (variant) => set({ variant })
}));
