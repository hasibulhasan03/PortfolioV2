"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = Math.floor(window.innerWidth * dpr);
      h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const tile = 96;
    let frame = 0;
    let raf = 0;

    // Pre-generate a couple of noise tiles to swap between
    const buildTile = () => {
      const off = document.createElement("canvas");
      off.width = tile;
      off.height = tile;
      const octx = off.getContext("2d");
      if (!octx) return off;
      const img = octx.createImageData(tile, tile);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      octx.putImageData(img, 0, 0);
      return off;
    };

    const tiles: HTMLCanvasElement[] = [
      buildTile(),
      buildTile(),
      buildTile()
    ];
    let tileIdx = 0;

    const draw = () => {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.03; // 3% as specified
      const t = tiles[tileIdx];
      // Tile across the canvas
      const cols = Math.ceil(w / tile) + 1;
      const rows = Math.ceil(h / tile) + 1;
      // Slight offset to avoid seam patterns
      const ox = (frame % tile) - tile;
      const oy = ((frame * 1.7) % tile) - tile;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.drawImage(t, c * tile + ox, r * tile + oy);
        }
      }
    };

    const loop = () => {
      // Refresh every 2 frames as specified
      if (frame % 2 === 0) {
        tileIdx = (tileIdx + 1) % tiles.length;
        draw();
      }
      frame++;
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // Static noise frame, no animation
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0"
      style={{
        pointerEvents: "none",
        zIndex: 9997,
        mixBlendMode: "overlay",
        opacity: 1
      }}
    />
  );
}
