// Premium SVG placeholder generator. Builds a variety of stand-in imagery
// that lives in the design language: editorial portraits, accent panels,
// network diagrams, code snippets — all encoded as data: URIs so consumers
// just point <img src=...> at them with zero network round-trips.

interface Options {
  w?: number;
  h?: number;
  variant?: 1 | 2 | 3 | 4;
  hue?: "cool" | "warm" | "void";
  label?: string;
  meta?: string;
}

const HUES = {
  cool: { base: "#0d1218", mid: "#1a222d", glow: "#3a5a8c" },
  warm: { base: "#1a0f0a", mid: "#241814", glow: "#c8571a" },
  void: { base: "#080808", mid: "#0f0f0f", glow: "#1a1a1a" }
};

function svgToDataURI(svg: string): string {
  return (
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(svg.trim()).replace(/'/g, "%27").replace(/"/g, "%22")
  );
}

// Editorial portrait — head + shoulders silhouette with rim light
export function placeholderPortrait({
  w = 800,
  h = 1100,
  variant = 1,
  hue = "cool",
  label
}: Options = {}): string {
  const colors = HUES[hue];
  const accent = "#c8571a";
  const id = `p${variant}${hue}`;
  const wireOpacity = variant === 1 ? 0.5 : variant === 2 ? 0.28 : variant === 3 ? 0.14 : 0.7;
  const rimIntensity = variant === 1 ? 0.32 : variant === 2 ? 0.2 : variant === 3 ? 0.1 : 0.4;
  const blurAmount = variant === 3 ? 2 : variant === 2 ? 0.8 : variant === 4 ? 0 : 0.3;

  const bodyPath = `
    M 400 220
    C 358 220 336 254 336 305
    C 336 364 360 414 400 414
    C 440 414 464 364 464 305
    C 464 254 442 220 400 220 Z
    M 380 414
    L 380 466
    L 420 466
    L 420 414 Z
    M 380 466
    C 312 484 262 522 244 600
    L 214 ${h}
    L 586 ${h}
    L 556 600
    C 538 522 488 484 420 466 Z
  `.replace(/\s+/g, " ");

  const wireLines = variant === 1 || variant === 4
    ? [
        "M 360 260 L 440 260",
        "M 350 305 L 450 305",
        "M 360 350 L 440 350",
        "M 380 414 L 420 414",
        "M 270 540 L 530 540",
        "M 250 660 L 550 660",
        "M 240 800 L 560 800",
        "M 240 950 L 560 950",
        "M 244 600 L 556 600",
        "M 280 540 L 240 720",
        "M 520 540 L 560 720",
        `M 244 720 L 244 ${h - 20}`,
        `M 556 720 L 556 ${h - 20}`,
        `M 400 466 L 400 ${h - 20}`
      ]
    : [];

  const verts =
    variant === 1 || variant === 4
      ? [
          [400, 245],
          [380, 414],
          [420, 414],
          [400, 466],
          [280, 540],
          [520, 540],
          [240, 720],
          [560, 720]
        ]
      : [];

  const wireSvg = wireLines
    .map(
      (d) =>
        `<path d="${d}" stroke="${accent}" stroke-width="0.7" stroke-opacity="${wireOpacity}" fill="none"/>`
    )
    .join("");

  const vertSvg = verts
    .map(
      ([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="2" fill="${accent}" opacity="${wireOpacity * 0.9}"/>`
    )
    .join("");

  const annotations =
    variant === 1 || variant === 4
      ? `
    <text x="470" y="248" font-family="ui-monospace, monospace" font-size="10" letter-spacing="2" fill="${accent}" opacity="${wireOpacity * 0.9}">v.001</text>
    <text x="180" y="540" font-family="ui-monospace, monospace" font-size="10" letter-spacing="2" fill="${accent}" opacity="${wireOpacity * 0.7}">j.shoulder</text>
    <text x="180" y="722" font-family="ui-monospace, monospace" font-size="10" letter-spacing="2" fill="${accent}" opacity="${wireOpacity * 0.6}">n.elbow</text>
    <text x="408" y="722" font-family="ui-monospace, monospace" font-size="10" letter-spacing="2" fill="${accent}" opacity="${wireOpacity * 0.7}">ref.spine</text>`
      : "";

  const cornerLabel = label
    ? `<text x="${w - 24}" y="${h - 24}" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="${accent}" opacity="0.7">${label}</text>`
    : "";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax meet">
  <defs>
    <radialGradient id="bg-${id}" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${colors.mid}" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="${colors.base}" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="${colors.base}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rim-${id}" cx="32%" cy="22%" r="38%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="${rimIntensity}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rim2-${id}" cx="74%" cy="78%" r="40%">
      <stop offset="0%" stop-color="${colors.glow}" stop-opacity="${rimIntensity * 0.7}"/>
      <stop offset="100%" stop-color="${colors.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="black" stop-opacity="0"/>
      <stop offset="14%" stop-color="black" stop-opacity="1"/>
      <stop offset="92%" stop-color="black" stop-opacity="1"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </linearGradient>
    <mask id="mask-${id}">
      <rect width="${w}" height="${h}" fill="url(#fade-${id})"/>
    </mask>
    <filter id="soft-${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${blurAmount}"/>
    </filter>
  </defs>
  <g mask="url(#mask-${id})">
    <path d="${bodyPath}" fill="url(#bg-${id})" filter="url(#soft-${id})"/>
    <path d="${bodyPath}" fill="url(#rim-${id})"/>
    <path d="${bodyPath}" fill="url(#rim2-${id})"/>
    ${wireSvg}
    ${vertSvg}
    ${annotations}
    ${cornerLabel}
  </g>
</svg>`;
  return svgToDataURI(svg);
}

// Abstract architectural composition — for project cards & section accents
export function placeholderArchitecture({
  w = 1200,
  h = 800,
  hue = "void",
  label
}: Options = {}): string {
  const accent = "#c8571a";
  const colors = HUES[hue];

  const lines: string[] = [];
  // Lattice
  for (let x = 0; x <= w; x += 60) {
    lines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#1a1a1a" stroke-width="1"/>`
    );
  }
  for (let y = 0; y <= h; y += 60) {
    lines.push(
      `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#1a1a1a" stroke-width="1"/>`
    );
  }

  // Highlight bands
  const bands = [
    { x: 80, y: 80, w: 320, h: 200, fill: accent, alpha: 0.08 },
    { x: 440, y: 60, w: 220, h: 280, fill: "#3a5a8c", alpha: 0.08 },
    { x: 700, y: 120, w: 420, h: 180, fill: accent, alpha: 0.06 },
    { x: 100, y: 360, w: 480, h: 120, fill: "#1a222d", alpha: 0.45 },
    { x: 620, y: 380, w: 500, h: 280, fill: accent, alpha: 0.05 }
  ]
    .map(
      (b) =>
        `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${b.fill}" opacity="${b.alpha}"/>`
    )
    .join("");

  // Diagonal slashes
  const slashes = `
    <line x1="80" y1="700" x2="380" y2="540" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
    <line x1="440" y1="700" x2="640" y2="600" stroke="${accent}" stroke-width="1.5" opacity="0.4"/>
    <line x1="780" y1="720" x2="1100" y2="540" stroke="${accent}" stroke-width="1" opacity="0.3"/>
  `;

  const dots: string[] = [];
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const r = 1 + Math.random() * 2;
    const op = 0.2 + Math.random() * 0.5;
    dots.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="${op}"/>`
    );
  }

  const tag = label
    ? `<text x="40" y="${h - 32}" font-family="ui-monospace, monospace" font-size="14" letter-spacing="4" fill="${accent}" opacity="0.85">${label}</text>`
    : "";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <rect width="${w}" height="${h}" fill="${colors.base}"/>
  ${lines.join("")}
  ${bands}
  ${dots.join("")}
  ${slashes}
  ${tag}
</svg>`;
  return svgToDataURI(svg);
}

// Texture / atmosphere panel — gradient + dots, useful behind cards
export function placeholderAtmosphere({
  w = 1200,
  h = 1200,
  hue = "cool",
  label
}: Options = {}): string {
  const accent = "#c8571a";
  const colors = HUES[hue];
  const dots: string[] = [];
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 0.6 + Math.random() * 1.6;
    const op = 0.1 + Math.random() * 0.4;
    dots.push(
      `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${accent}" opacity="${op.toFixed(2)}"/>`
    );
  }

  const cornerLabel = label
    ? `<text x="${w - 32}" y="${h - 32}" text-anchor="end" font-family="ui-monospace, monospace" font-size="14" letter-spacing="4" fill="${accent}" opacity="0.65">${label}</text>`
    : "";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="atm" cx="35%" cy="35%" r="70%">
      <stop offset="0%" stop-color="${colors.mid}"/>
      <stop offset="55%" stop-color="${colors.base}"/>
      <stop offset="100%" stop-color="#040506"/>
    </radialGradient>
    <radialGradient id="rim" cx="80%" cy="20%" r="40%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#atm)"/>
  <rect width="${w}" height="${h}" fill="url(#rim)"/>
  ${dots.join("")}
  ${cornerLabel}
</svg>`;
  return svgToDataURI(svg);
}

// Pre-baked URIs for repeated use
export const PORTRAIT_FRONT = placeholderPortrait({ variant: 1, hue: "cool", label: "FRONT.LAYER" });
export const PORTRAIT_MID = placeholderPortrait({ variant: 2, hue: "cool" });
export const PORTRAIT_BACK = placeholderPortrait({ variant: 3, hue: "cool" });
export const PORTRAIT_PROFILE = placeholderPortrait({ variant: 4, hue: "warm", label: "PROFILE" });
export const ARCHITECTURE_DARK = placeholderArchitecture({ hue: "void", label: "ARCHITECTURE" });
export const ATMOSPHERE_COOL = placeholderAtmosphere({ hue: "cool", label: "ATMOS-001" });
export const ATMOSPHERE_WARM = placeholderAtmosphere({ hue: "warm", label: "ATMOS-002" });
