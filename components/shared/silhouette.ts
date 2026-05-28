// Engineered silhouette placeholders. These render as transparent SVG data URIs
// so they can drop into any <img src=...> as a stand-in until real PNGs land in
// /public/images/. The look intentionally matches the engineer / network /
// AI/ML persona: wireframe geometry, technical annotations, accent rim light.

interface SilhouetteOptions {
  variant?: 1 | 2 | 3;
  // 1 = front (sharpest), 2 = mid, 3 = back (loosest wireframe)
  accent?: string;
  hue?: "cool" | "warm";
}

export function buildEngineeredSilhouette({
  variant = 1,
  accent = "#c8571a",
  hue = "cool"
}: SilhouetteOptions = {}): string {
  const wireOpacity =
    variant === 1 ? 0.55 : variant === 2 ? 0.32 : 0.18;
  const annotationOpacity =
    variant === 1 ? 0.7 : variant === 2 ? 0.32 : 0.14;
  const rimIntensity =
    variant === 1 ? 0.28 : variant === 2 ? 0.18 : 0.1;
  const baseTone = hue === "cool" ? "#0d1218" : "#181210";
  const midTone = hue === "cool" ? "#1a222d" : "#241814";
  const skewSeed = variant === 2 ? 6 : variant === 3 ? -8 : 0;

  // Wireframe vertices around a head-and-shoulders body
  const wireframeLines = [
    // Head outline
    "M 380 245 L 420 245",
    "M 360 270 L 380 245",
    "M 440 270 L 420 245",
    "M 350 300 L 360 270",
    "M 450 300 L 440 270",
    "M 350 340 L 350 300",
    "M 450 340 L 450 300",
    "M 360 380 L 350 340",
    "M 440 380 L 450 340",
    "M 380 410 L 360 380",
    "M 420 410 L 440 380",
    "M 380 410 L 420 410",
    // Neck
    "M 380 410 L 380 460",
    "M 420 410 L 420 460",
    "M 380 460 L 420 460",
    // Shoulders/torso outline
    "M 380 460 L 280 540",
    "M 420 460 L 520 540",
    "M 280 540 L 240 720",
    "M 520 540 L 560 720",
    "M 240 720 L 230 920",
    "M 560 720 L 570 920",
    "M 230 920 L 220 1100",
    "M 570 920 L 580 1100",
    // Internal wireframe (chest cross-bracing — architecture motif)
    "M 320 540 L 480 540",
    "M 300 640 L 500 640",
    "M 280 760 L 520 760",
    "M 270 880 L 530 880",
    // Diagonals
    "M 280 540 L 480 720",
    "M 520 540 L 320 720",
    "M 280 720 L 480 920",
    "M 520 720 L 320 920",
    // Spine
    "M 400 460 L 400 1100"
  ];

  // Vertex points
  const vertices = [
    [400, 245],
    [380, 245],
    [420, 245],
    [360, 270],
    [440, 270],
    [350, 300],
    [450, 300],
    [350, 340],
    [450, 340],
    [400, 410],
    [400, 460],
    [280, 540],
    [520, 540],
    [400, 540],
    [240, 720],
    [560, 720],
    [400, 720],
    [230, 920],
    [570, 920],
    [400, 920]
  ];

  // Technical annotations near key vertices
  const annotations = [
    { x: 470, y: 248, text: "v.001" },
    { x: 200, y: 545, text: "j.shoulder" },
    { x: 580, y: 545, text: "j.shoulder.r" },
    { x: 188, y: 720, text: "n.elbow" },
    { x: 408, y: 720, text: "ref.spine" },
    { x: 188, y: 920, text: "n.wrist" }
  ];

  const annotationsSvg = annotations
    .map(
      (a) =>
        `<text x="${a.x}" y="${a.y}" font-family="ui-monospace, monospace" font-size="10" letter-spacing="2" fill="${accent}" opacity="${annotationOpacity}">${a.text}</text>`
    )
    .join("");

  const verticesSvg = vertices
    .map(([x, y], i) => {
      const r = i === 0 || i === 13 || i === 19 ? 3 : 1.6;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="${wireOpacity * 0.9}"/>`;
    })
    .join("");

  const wireframeSvg = wireframeLines
    .map(
      (d) =>
        `<path d="${d}" stroke="${accent}" stroke-width="0.7" stroke-opacity="${wireOpacity}" fill="none"/>`
    )
    .join("");

  // The actual filled silhouette body shape (rendered behind the wireframe)
  const bodyPath = `
    M 400 230
    C 360 230 340 260 340 305
    C 340 360 360 410 400 410
    C 440 410 460 360 460 305
    C 460 260 440 230 400 230 Z
    M 380 410
    L 380 460
    L 420 460
    L 420 410 Z
    M 380 460
    C 320 480 270 520 250 600
    L 220 1100
    L 580 1100
    L 550 600
    C 530 520 480 480 420 460 Z
  `.replace(/\s+/g, " ");

  const id = `s${variant}`;
  const skew = skewSeed
    ? `transform="rotate(${skewSeed * 0.2} 400 670) translate(0 ${skewSeed * 1.5})"`
    : "";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" preserveAspectRatio="xMidYMax meet">
  <defs>
    <radialGradient id="bg-${id}" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${midTone}" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="${baseTone}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${baseTone}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rim-${id}" cx="32%" cy="22%" r="38%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="${rimIntensity}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rim2-${id}" cx="74%" cy="78%" r="40%">
      <stop offset="0%" stop-color="#3a5a8c" stop-opacity="${rimIntensity * 0.6}"/>
      <stop offset="100%" stop-color="#3a5a8c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="black" stop-opacity="0"/>
      <stop offset="20%" stop-color="black" stop-opacity="1"/>
      <stop offset="92%" stop-color="black" stop-opacity="1"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </linearGradient>
    <mask id="mask-${id}">
      <rect width="800" height="1100" fill="url(#fade-${id})"/>
    </mask>
    <filter id="soft-${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${variant === 3 ? 2.4 : variant === 2 ? 1.2 : 0.5}"/>
    </filter>
  </defs>
  <g ${skew} mask="url(#mask-${id})">
    <!-- Body fill -->
    <path d="${bodyPath}" fill="url(#bg-${id})" filter="url(#soft-${id})"/>
    <!-- Rim accents -->
    <path d="${bodyPath}" fill="url(#rim-${id})"/>
    <path d="${bodyPath}" fill="url(#rim2-${id})"/>
    <!-- Wireframe overlay (front variant only) -->
    ${variant === 1 ? wireframeSvg : ""}
    ${variant === 1 ? verticesSvg : ""}
    ${variant === 1 ? annotationsSvg : ""}
    <!-- Subtle scan band -->
    <rect x="0" y="${variant === 1 ? 540 : variant === 2 ? 720 : 880}" width="800" height="2" fill="${accent}" opacity="${wireOpacity * 0.4}"/>
  </g>
</svg>`.trim();

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

// Pre-built data URIs for the three hero layers + about portrait
export const SILHOUETTE_FRONT = buildEngineeredSilhouette({ variant: 1 });
export const SILHOUETTE_MID = buildEngineeredSilhouette({ variant: 2 });
export const SILHOUETTE_BACK = buildEngineeredSilhouette({ variant: 3 });
export const SILHOUETTE_ABOUT = buildEngineeredSilhouette({
  variant: 1,
  hue: "cool"
});
