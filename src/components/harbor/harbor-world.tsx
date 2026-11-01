import type { ReactNode } from "react";
import { HarborTheme } from "./harbor-theme";
import { BOAT_DOCKED, SOURCE_BUOYS, type SceneState } from "./story-model";

/**
 * The SailTru harbor, drawn as layered vector illustration.
 * Layer content is authored in layer space (x = worldX × depth).
 * Meanings stay fixed: the cobalt boat = SailTru's investigation and delivery,
 * the town and quay = the client's business, provider boats = the platforms
 * buyers search and ask, buoys = investigation areas and findings, cobalt
 * route = the recommended next action, dock = implementation.
 */

export const INK = HarborTheme.INK;
export const COBALT = HarborTheme.ACCENT;

export const LAYER_DEPTHS = {
  sky: 0,
  far: 0.22,
  mid: 0.55,
  main: 1,
  fore: 1.3
} as const;

export type LayerName = keyof typeof LAYER_DEPTHS;

/** Rounded so server and client engines serialise identical attributes. */
const r = (v: number) => Math.round(v * 100) / 100;

/** Deterministic pseudo-random sequence so server and client markup match. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const r1 = seeded(7);
const WAVES_MAIN = Array.from({ length: 70 }, () => ({
  x: r(-600 + r1() * 5600),
  y: r(640 + Math.pow(r1(), 1.4) * 520),
  w: r(30 + r1() * 70)
}));

const r2 = seeded(19);
const WAVES_FAR = Array.from({ length: 40 }, () => ({
  x: r(-1600 + r2() * 3800),
  y: r(606 + Math.pow(r2(), 2) * 60),
  w: r(18 + r2() * 40)
}));

/** Shared defs. Rendered once per page in a zero-size (not display:none) svg. */
export function HarborDefs() {
  return (
    <svg className="hw-defs" width="0" height="0" aria-hidden focusable="false">
      <defs>
        <pattern id="hw-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1.1" strokeOpacity="0.42" />
        </pattern>
        <pattern id="hw-hatch-fine" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.8" strokeOpacity="0.28" />
        </pattern>
        <pattern id="hw-hatch-cobalt" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#122c9c" strokeWidth="1.2" strokeOpacity="0.55" />
        </pattern>
        <linearGradient id="hw-sky" x1="0" y1="-1400" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8f4ec" />
          <stop offset="0.75" stopColor="#f4eee2" />
          <stop offset="1" stopColor="#ece4d4" />
        </linearGradient>
        <linearGradient id="hw-sea" x1="0" y1="600" x2="0" y2="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dfe1d9" />
          <stop offset="0.35" stopColor="#d6dbd6" />
          <stop offset="1" stopColor="#cdd4d1" />
        </linearGradient>
        <linearGradient id="hw-sail" x1="0" y1="-300" x2="0" y2="-60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#f1ebdf" />
        </linearGradient>
        <pattern id="hx-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={INK} strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
        <pattern id="hx-unknown" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeOpacity="0.22" strokeWidth="1.2" />
        </pattern>
        <radialGradient id="hw-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff3cf" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Boat                                                                */
/* ------------------------------------------------------------------ */

/** SailTru's boat: a sloop with a cobalt hull, drawn bow toward +x. */
export function Boat() {
  return (
    <g className="hw-boat-art">
      {/* reflection and shadow */}
      <ellipse cx="4" cy="18" rx="150" ry="13" fill={INK} opacity="0.1" />
      <path d="M-120 22 C-60 34 60 34 132 18" fill="none" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
      {/* wake */}
      <g className="hw-wake" fill="none" stroke={INK} strokeLinecap="round">
        <path d="M-128 10 C-170 16 -214 14 -262 22" strokeOpacity="0.35" strokeWidth="2.2" />
        <path d="M-120 20 C-176 30 -236 30 -310 40" strokeOpacity="0.22" strokeWidth="1.8" />
        <path d="M-150 4 C-180 6 -200 4 -226 8" strokeOpacity="0.2" strokeWidth="1.6" />
      </g>
      {/* mast and rigging */}
      <line x1="14" y1="-30" x2="14" y2="-318" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <line x1="14" y1="-314" x2="138" y2="-46" stroke={INK} strokeWidth="1.6" />
      <line x1="14" y1="-314" x2="-128" y2="-30" stroke={INK} strokeWidth="1.2" strokeOpacity="0.7" />
      {/* mainsail */}
      <path
        d="M18 -308 C-6 -232 -52 -132 -112 -66 L18 -62 Z"
        fill="url(#hw-sail)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M18 -308 C-6 -232 -52 -132 -112 -66 L-70 -66 C-34 -130 -2 -220 18 -290 Z" fill="url(#hw-hatch-fine)" />
      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1.3" fill="none">
        <path d="M18 -250 L-26 -232" />
        <path d="M18 -196 L-50 -170" />
        <path d="M18 -140 L-78 -112" />
        <path d="M18 -96 L-96 -78" />
      </g>
      {/* battens */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round">
        <line x1="-16" y1="-238" x2="-2" y2="-243" />
        <line x1="-42" y1="-178" x2="-24" y2="-184" />
        <line x1="-72" y1="-118" x2="-52" y2="-124" />
      </g>
      {/* boom */}
      <line x1="16" y1="-60" x2="-118" y2="-62" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {/* jib */}
      <path
        d="M22 -282 C62 -200 104 -118 132 -52 L36 -66 C42 -130 36 -210 22 -282 Z"
        fill="url(#hw-sail)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M36 -66 C42 -130 36 -210 22 -282 L30 -250 C46 -190 52 -120 56 -64 Z" fill="url(#hw-hatch-fine)" />
      <g stroke={INK} strokeOpacity="0.4" strokeWidth="1.2">
        <path d="M30 -220 L58 -200" />
        <path d="M34 -160 L88 -140" />
        <path d="M36 -110 L110 -96" />
      </g>
      {/* pennant */}
      <path className="hw-pennant" d="M14 -318 L-24 -310 L14 -300 Z" fill={COBALT} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      {/* cabin */}
      <path d="M-58 -26 L-50 -50 L34 -52 L48 -28 Z" fill="#f7f2e7" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <g fill={INK}>
        <rect x="-38" y="-44" width="14" height="9" rx="3" />
        <rect x="-14" y="-45" width="14" height="9" rx="3" />
        <rect x="10" y="-45" width="14" height="9" rx="3" />
      </g>
      {/* hull */}
      <path
        d="M-126 -32 C-64 -20 40 -22 140 -48 C130 -20 112 4 76 14 C28 24 -40 24 -92 14 C-112 8 -122 -6 -126 -32 Z"
        fill={COBALT}
        stroke={INK}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M-92 14 C-40 24 28 24 76 14 C100 8 116 -4 126 -18 C96 2 40 10 -20 12 C-60 13 -84 10 -104 4 Z" fill="url(#hw-hatch-cobalt)" />
      {/* gunwale / sheer stripe */}
      <path
        d="M-125 -30 C-64 -18 40 -20 139 -46 L136 -38 C40 -10 -64 -8 -122 -20 Z"
        fill="#f7f2e7"
        stroke={INK}
        strokeWidth="1.6"
      />
      {/* boot stripe */}
      <path d="M-100 8 C-40 18 30 18 86 8" fill="none" stroke="#f7f2e7" strokeWidth="3" />
      <path d="M-100 8 C-40 18 30 18 86 8" fill="none" stroke={INK} strokeWidth="1" strokeOpacity="0.6" transform="translate(0 3)" />
      {/* bow pulpit */}
      <path d="M118 -44 L124 -66 L142 -66" fill="none" stroke={INK} strokeWidth="2" />
    </g>
  );
}

/** Where the provider boats lie in the illustrated harbor (waterline centre, scale); bows toward the SailTru boat. */
export const PROVIDER_BOATS = [
  { x: 1560, y: 735, s: 0.5 },
  { x: 1420, y: 690, s: 0.38 },
  { x: 1490, y: 676, s: 0.34 }
];

/** A provider boat: a small neutral sloop. Its platform badge is an HTML overlay at the masthead. */
function ProviderBoat({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${-s} ${s})`}>
      <ellipse cx="4" cy="18" rx="140" ry="12" fill={INK} opacity="0.1" />
      <line x1="10" y1="-30" x2="10" y2="-318" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <line x1="10" y1="-314" x2="134" y2="-46" stroke={INK} strokeWidth="1.6" />
      <path d="M14 -308 C-6 -232 -52 -132 -112 -66 L14 -62 Z" fill="#f7f2e7" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M18 -282 C58 -200 100 -118 128 -52 L32 -66 C38 -130 32 -210 18 -282 Z" fill="#f7f2e7" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1="12" y1="-60" x2="-114" y2="-62" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path
        d="M-126 -32 C-64 -20 40 -22 140 -48 C130 -20 112 4 76 14 C28 24 -40 24 -92 14 C-112 8 -122 -6 -126 -32 Z"
        fill="#e7e1d3"
        stroke={INK}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M-125 -30 C-64 -18 40 -20 139 -46 L136 -38 C40 -10 -64 -8 -122 -20 Z" fill={INK} opacity="0.7" />
    </g>
  );
}

/** The built improvement (F01), carried from the dock to the client's harbor. */
function Crate({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.76)`}>
      <rect x="0" y="0" width="58" height="40" rx="3" fill="#f7f2e7" stroke={INK} strokeWidth="2.4" />
      <rect x="6" y="6" width="46" height="13" rx="2" fill={COBALT} />
      <rect x="6" y="23" width="28" height="4" rx="2" fill={INK} opacity="0.55" />
      <rect x="6" y="30" width="20" height="4" rx="2" fill={INK} opacity="0.35" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Layers                                                              */
/* ------------------------------------------------------------------ */

export function SkyLayer() {
  return (
    <g>
      <rect x="-5000" y="-3000" width="10000" height="3600" fill="url(#hw-sky)" />
      <rect x="-5000" y="600" width="10000" height="3000" fill="url(#hw-sea)" />
      {/* sun, drawn as a ring of ink rays */}
      <g transform="translate(260 300)" opacity="0.7">
        <circle r="62" fill="#f8f1e1" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={(Math.cos(a) * 74).toFixed(2)}
              y1={(Math.sin(a) * 74).toFixed(2)}
              x2={(Math.cos(a) * (i % 2 ? 86 : 96)).toFixed(2)}
              y2={(Math.sin(a) * (i % 2 ? 86 : 96)).toFixed(2)}
              stroke={INK}
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
          );
        })}
      </g>
      <line x1="-5000" y1="600" x2="5000" y2="600" stroke={INK} strokeOpacity="0.28" strokeWidth="1.2" />
    </g>
  );
}

export function FarLayer() {
  return (
    <g>
      <path
        d="M-1400 600 C-1200 560 -1080 530 -940 548 C-820 562 -760 520 -640 506 C-520 494 -440 540 -330 548 C-230 556 -170 528 -60 532 C40 536 120 560 220 556 C270 566 310 588 340 600 Z"
        fill="#e7dfcf"
        stroke={INK}
        strokeOpacity="0.32"
        strokeWidth="1.2"
      />
      <path
        d="M560 600 C640 570 720 548 820 540 C930 532 1000 498 1120 494 C1250 490 1320 530 1440 536 C1560 542 1640 516 1760 520 C1880 524 1960 560 2100 566 C2200 570 2300 588 2400 600 Z"
        fill="#e7dfcf"
        stroke={INK}
        strokeOpacity="0.32"
        strokeWidth="1.2"
      />
      <path
        d="M1000 498 C1060 520 1080 540 1140 548 M1300 524 C1360 548 1420 556 1460 560 M1700 520 C1760 540 1800 556 1860 560"
        fill="none"
        stroke={INK}
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <g stroke={INK} strokeOpacity="0.22" strokeWidth="1" strokeLinecap="round">
        {WAVES_FAR.map((w, i) => (
          <line key={i} x1={w.x} y1={w.y} x2={w.x + w.w} y2={w.y} />
        ))}
      </g>
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2="-26" stroke={INK} strokeWidth="2" />
      <path d="M0 -64 C14 -50 20 -36 16 -24 C10 -16 -10 -16 -16 -24 C-20 -36 -14 -50 0 -64 Z" fill="#aab09a" stroke={INK} strokeWidth="1.8" />
      <path d="M0 -64 C14 -50 20 -36 16 -24 C12 -20 6 -18 2 -18 C8 -30 8 -48 0 -64 Z" fill="url(#hw-hatch)" />
    </g>
  );
}

function House({ x, y, w = 60, h = 44, roof = "#8e8576" }: { x: number; y: number; w?: number; h?: number; roof?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y={-h} width={w} height={h} fill="#efe8da" stroke={INK} strokeWidth="1.8" />
      <rect x={w * 0.62} y={-h} width={w * 0.38} height={h} fill="url(#hw-hatch-fine)" />
      <path d={`M-6 ${-h} L${w / 2} ${-h - w * 0.42} L${w + 6} ${-h} Z`} fill={roof} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <rect x={w * 0.18} y={-h * 0.62} width={w * 0.2} height={h * 0.28} fill={INK} opacity="0.75" />
      <rect x={w * 0.56} y={-h * 0.62} width={w * 0.2} height={h * 0.28} fill={INK} opacity="0.75" />
    </g>
  );
}

export function MidLayer() {
  return (
    <g>
      {/* left headland, framing the opening */}
      <path
        d="M-900 604 C-760 520 -620 470 -470 462 C-340 456 -260 500 -170 520 C-90 538 -30 572 40 604 Z"
        fill="#ddd3bf"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M-470 462 C-340 456 -260 500 -170 520 C-90 538 -30 572 40 604 L-200 604 C-260 560 -330 520 -420 500 Z" fill="url(#hw-hatch)" />
      <Tree x={-560} y={478} s={1.1} />
      <Tree x={-500} y={472} s={0.9} />
      <Tree x={-420} y={470} s={1.2} />
      <House x={-330} y={510} w={54} h={36} />

      {/* lighthouse island (world x ≈ 2680) */}
      <g transform="translate(1474 0)">
        <path
          d="M-180 604 C-150 572 -100 548 -40 540 C10 534 60 544 100 560 C140 576 170 590 190 604 Z"
          fill="#d8cdb6"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M10 534 C60 544 100 560 140 576 C170 590 190 604 190 604 L60 604 C40 580 30 556 10 534 Z" fill="url(#hw-hatch)" />
        {/* tower */}
        <path d="M-26 540 L-16 380 L16 380 L26 540 Z" fill="#fbf8f1" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M-24 516 L24 516 L22 486 L-22 486 Z" fill={INK} />
        <path d="M-20 456 L20 456 L18 428 L-18 428 Z" fill={INK} />
        <path d="M4 380 L16 380 L26 540 L10 540 Z" fill="url(#hw-hatch-fine)" />
        <rect x="-22" y="372" width="44" height="8" fill={INK} />
        <rect x="-13" y="346" width="26" height="26" fill="#fff6dc" stroke={INK} strokeWidth="2" />
        <path d="M-18 346 L0 326 L18 346 Z" fill={INK} />
        <g stroke={INK} strokeOpacity="0.4" strokeWidth="1.2">
          <line x1="-26" y1="356" x2="-62" y2="350" />
          <line x1="-26" y1="362" x2="-60" y2="368" />
          <line x1="26" y1="356" x2="62" y2="350" />
          <line x1="26" y1="362" x2="60" y2="368" />
        </g>
        <House x={44} y={548} w={42} h={26} />
      </g>

      {/* far shore and harbor town behind the dock (world x ≈ 3300–4600) */}
      <path
        d="M1680 604 C1730 560 1800 520 1880 500 C1960 480 2040 470 2140 452 C2240 434 2340 440 2440 460 C2540 480 2620 500 2700 520 L2700 604 Z"
        fill="#ddd3bf"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M2140 452 C2240 434 2340 440 2440 460 C2540 480 2620 500 2700 520 L2700 604 L2380 604 C2340 540 2260 480 2140 452 Z" fill="url(#hw-hatch)" />
      <House x={1800} y={560} w={50} h={38} />
      <House x={1862} y={556} w={64} h={46} roof="#9c917f" />
      <House x={1944} y={548} w={46} h={34} />
      <House x={2010} y={540} w={58} h={42} roof="#9c917f" />
      <Tree x={2100} y={498} s={1.1} />
      <Tree x={2150} y={488} s={1.3} />
      <Tree x={2230} y={486} s={1} />
      <House x={2290} y={500} w={50} h={36} />
      <Tree x={2390} y={492} s={1.2} />
    </g>
  );
}

function Buoy({ x, y, tone = "ink" }: { x: number; y: number; tone?: "ink" | "cobalt" }) {
  const band = tone === "cobalt" ? COBALT : INK;
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="6" rx="34" ry="6" fill={INK} opacity="0.12" />
      <path d="M-24 0 C-22 -12 22 -12 24 0 C18 8 -18 8 -24 0 Z" fill="#f7f2e7" stroke={INK} strokeWidth="2.4" />
      <path d="M-14 -8 L-8 -66 L8 -66 L14 -8 Z" fill="#f7f2e7" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M-12 -28 L-10 -46 L10 -46 L12 -28 Z" fill={band} />
      <path d="M4 -66 L8 -66 L14 -8 L6 -8 Z" fill="url(#hw-hatch)" />
      <line x1="0" y1="-66" x2="0" y2="-92" stroke={INK} strokeWidth="2.4" />
      <path d="M0 -92 L22 -86 L0 -79 Z" fill={band} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  );
}

export function MainLayer({ scene, routeMaskId }: { scene: SceneState; routeMaskId: string }) {
  return (
    <g>
      {/* near-water strokes */}
      <g className="hw-waves" stroke={INK} strokeLinecap="round" fill="none">
        {WAVES_MAIN.map((w, i) => (
          <path
            key={i}
            d={`M${w.x} ${w.y} q ${w.w / 4} -5 ${w.w / 2} 0 t ${w.w / 2} 0`}
            strokeOpacity={r(0.16 + ((w.y - 640) / 520) * 0.22)}
            strokeWidth={r(1 + ((w.y - 640) / 520) * 1.4)}
          />
        ))}
      </g>

      {/* opening: a small rocky outcrop to anchor the left of frame */}
      <g transform="translate(200 744)">
        <path d="M-120 6 C-110 -30 -80 -54 -40 -58 C-6 -60 20 -40 34 -20 C44 -6 60 0 70 6 Z" fill="#cfc4ad" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M-40 -58 C-6 -60 20 -40 34 -20 C44 -6 60 0 70 6 L0 6 C-6 -20 -20 -44 -40 -58 Z" fill="url(#hw-hatch)" />
        <path d="M-140 10 C-90 18 30 18 96 10" fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="1.6" />
      </g>

      {/* evidence sources: three buoys */}
      <g data-hw="sources">
        {SOURCE_BUOYS.map((b, i) => (
          <Buoy key={i} x={b.x} y={b.y} />
        ))}
        <g data-hw="source-pings" opacity={scene.sources}>
          {SOURCE_BUOYS.map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y - 112})`}>
              <circle r="10" fill={COBALT} />
              <circle r="18" fill="none" stroke={COBALT} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          ))}
        </g>
      </g>

      {/* provider boats: the platforms buyers search and ask */}
      <g data-hw="providers">
        {PROVIDER_BOATS.map((b, i) => (
          <ProviderBoat key={i} {...b} />
        ))}
      </g>

      {/* the reef and the selected-finding channel marker */}
      <g transform="translate(1930 752)">
        <path d="M-90 4 C-80 -18 -56 -30 -30 -26 C-16 -40 10 -42 26 -28 C44 -32 64 -20 74 4 Z" fill="#cfc4ad" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M26 -28 C44 -32 64 -20 74 4 L30 4 C32 -8 30 -20 26 -28 Z" fill="url(#hw-hatch)" />
        <path d="M-110 10 C-60 20 40 20 100 10" fill="none" stroke={INK} strokeOpacity="0.32" strokeWidth="1.6" />
        <path d="M120 -2 C150 -10 170 -10 196 -2" fill="none" stroke={INK} strokeOpacity="0.4" strokeWidth="1.6" />
        <path d="M140 8 C160 2 176 2 192 8" fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="1.4" />
      </g>
      <g transform="translate(2060 744)">
        <g data-hw="marker-ring" opacity={scene.marker}>
          <ellipse cx="0" cy="4" rx="58" ry="14" fill="none" stroke={COBALT} strokeWidth="3" />
          <ellipse cx="0" cy="4" rx="80" ry="20" fill="none" stroke={COBALT} strokeWidth="1.6" strokeOpacity="0.45" />
        </g>
        <Buoy x={0} y={0} tone="cobalt" />
      </g>

      {/* recommended route, revealed progressively */}
      <mask id={routeMaskId} maskUnits="userSpaceOnUse" x="1900" y="600" width="1400" height="300">
        <path
          data-hw="route-mask"
          d="M2200 772 C2460 838 2760 832 3000 790 C3060 780 3090 774 3110 772"
          fill="none"
          stroke="#fff"
          strokeWidth="40"
          pathLength={1}
          strokeDasharray={`${scene.route} 2`}
        />
      </mask>
      <g mask={`url(#${routeMaskId})`}>
        <path
          d="M2200 772 C2460 838 2760 832 3000 790 C3060 780 3090 774 3110 772"
          fill="none"
          stroke={COBALT}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 16"
        />
        <path
          d="M2200 772 C2460 838 2760 832 3000 790 C3060 780 3090 774 3110 772"
          fill="none"
          stroke={COBALT}
          strokeOpacity="0.18"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </g>
      <g data-hw="route-end" opacity={scene.route > 0.96 ? 1 : 0}>
        <circle cx="3110" cy="772" r="9" fill={COBALT} stroke={INK} strokeWidth="2" />
      </g>

      {/* onward route toward the next decision */}
      <path
        data-hw="next-route"
        d="M3650 904 C3860 944 4100 936 4316 896"
        fill="none"
        stroke={COBALT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 14"
        opacity={scene.nextRoute * 0.75}
      />
      <g data-hw="next-buoy" opacity={scene.nextRoute}>
        <Buoy x={4340} y={898} />
      </g>

      {/* working dock: pier, crane, workshop */}
      <Dock scene={scene} />

      {/* the boat */}
      <g data-hw="boat" transform={boatTransform(scene)}>
        <g data-hw="boat-bob">
          <Boat />
          <g data-hw="boat-crate" opacity={scene.crane >= 0.999 ? 1 : 0}>
            <Crate x={-112} y={-56} />
          </g>
        </g>
      </g>
    </g>
  );
}

export function boatTransform(scene: SceneState) {
  const { x, y, heading } = scene.boat;
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${heading.toFixed(2)})`;
}

/** Crane geometry from phase 0..1: lift from the pier, traverse, lower onto the boat. */
export function cranePose(phase: number) {
  const lift = Math.min(1, phase / 0.3);
  const traverse = Math.min(1, Math.max(0, (phase - 0.3) / 0.4));
  const lower = Math.min(1, Math.max(0, (phase - 0.7) / 0.3));
  const startX = 3150;
  const endX = BOAT_DOCKED.x - 112;
  const restY = 736;
  const topY = 560;
  const deckY = BOAT_DOCKED.y - 56 + 10;
  const x = startX + (endX - startX) * traverse;
  const y = phase < 0.3 ? restY + (topY - restY) * lift : phase < 0.7 ? topY : topY + (deckY - topY) * lower;
  return { x, y };
}

function Dock({ scene }: { scene: SceneState }) {
  const crane = cranePose(scene.crane);
  return (
    <g>
      {/* shore and quay behind the dock */}
      <path
        d="M3300 610 C3360 604 3440 600 3520 600 L5200 600 L5200 800 L3300 800 Z"
        fill="#d9cfba"
        stroke={INK}
        strokeWidth="2"
      />
      <path d="M3300 760 L5200 760 L5200 800 L3300 800 Z" fill="#c9bea6" stroke={INK} strokeWidth="2" />
      <path d="M3300 800 C3900 812 4600 812 5200 800" fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="1.6" />
      {/* quay wall stones */}
      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1.2">
        {Array.from({ length: 30 }, (_, i) => (
          <line key={i} x1={3320 + i * 64} y1="760" x2={3320 + i * 64} y2="800" />
        ))}
      </g>

      {/* workshop */}
      <g transform="translate(3520 760)">
        <rect x="0" y="-150" width="230" height="150" fill="#ece5d6" stroke={INK} strokeWidth="2.6" />
        <rect x="150" y="-150" width="80" height="150" fill="url(#hw-hatch-fine)" />
        <path d="M-16 -150 L115 -224 L246 -150 Z" fill="#8e8576" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M115 -224 L246 -150 L200 -150 L115 -200 Z" fill="url(#hw-hatch)" />
        {/* big window: lit while we build */}
        <rect x="22" y="-120" width="104" height="70" fill="#f9f3e3" stroke={INK} strokeWidth="2.4" />
        <rect data-hw="workshop-glow" x="24" y="-118" width="100" height="66" fill="#fff0c4" opacity={scene.workshop} />
        <line x1="74" y1="-120" x2="74" y2="-50" stroke={INK} strokeWidth="2" />
        <line x1="22" y1="-86" x2="126" y2="-86" stroke={INK} strokeWidth="2" />
        <rect x="150" y="-104" width="58" height="104" fill="#f7f2e7" stroke={INK} strokeWidth="2.4" />
        <circle cx="198" cy="-52" r="3" fill={INK} />
        <rect x="40" y="-176" width="150" height="20" fill="none" />
      </g>

      {/* pier on pilings, reaching into the water */}
      <g>
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <rect x={3036 + i * 46} y="770" width="12" height="62" fill="#8c7a62" stroke={INK} strokeWidth="2" />
            <path d={`M${3030 + i * 46} 830 c 8 4 16 4 24 0`} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4" />
          </g>
        ))}
        <rect x="3020" y="756" width="300" height="16" fill="#b9a486" stroke={INK} strokeWidth="2.4" />
        <g stroke={INK} strokeOpacity="0.5" strokeWidth="1.2">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={3040 + i * 24} y1="756" x2={3040 + i * 24} y2="772" />
          ))}
        </g>
        <rect x="3034" y="740" width="10" height="16" rx="3" fill={INK} />
      </g>

      {/* crane */}
      <g>
        <path d="M3262 760 L3278 440 L3302 440 L3318 760 Z" fill="#ebe5d8" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
        <g stroke={INK} strokeWidth="1.6" strokeOpacity="0.7">
          {Array.from({ length: 7 }, (_, i) => {
            const y0 = 760 - i * 46;
            const y1 = y0 - 46;
            const w0 = 28 - (i * 8) / 7;
            const w1 = 28 - ((i + 1) * 8) / 7;
            return (
              <g key={i}>
                <line x1={3290 - w0} y1={y0} x2={3290 + w1} y2={y1} />
                <line x1={3290 + w0} y1={y0} x2={3290 - w1} y2={y1} />
              </g>
            );
          })}
        </g>
        <rect x="3264" y="414" width="52" height="30" fill={INK} />
        {/* jib arm over the water */}
        <path d="M3330 418 L2960 418 L2960 434 L3330 434 Z" fill="#ebe5d8" stroke={INK} strokeWidth="2.4" />
        <g stroke={INK} strokeWidth="1.3" strokeOpacity="0.65">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={2966 + i * 30} y1="434" x2={2980 + i * 30} y2="418" />
          ))}
        </g>
        <path d="M3330 418 L3400 418 L3400 446 L3330 446 Z" fill={INK} />
        <line x1="3290" y1="380" x2="2970" y2="418" stroke={INK} strokeWidth="1.4" />
        <line x1="3290" y1="380" x2="3396" y2="418" stroke={INK} strokeWidth="1.4" />
        <path d="M3282 414 L3290 380 L3298 414 Z" fill={INK} />
        {/* trolley, cable, hook and crate */}
        <g data-hw="crane-load" opacity={scene.crane >= 0.999 ? 0 : 1}>
          <rect data-hw="crane-trolley" x={crane.x + 7} y="432" width="30" height="10" fill={INK} />
          <line
            data-hw="crane-cable"
            x1={crane.x + 22}
            y1="442"
            x2={crane.x + 22}
            y2={crane.y - 10}
            stroke={INK}
            strokeWidth="1.8"
          />
          <g data-hw="crane-crate" transform={`translate(${crane.x} ${crane.y})`}>
            <path d="M15 -10 L22 -18 L29 -10" fill="none" stroke={INK} strokeWidth="2" />
            <Crate x={0} y={-10} />
          </g>
        </g>
      </g>

      {/* bollards and crates on the quay */}
      <g>
        <rect x="3420" y="738" width="40" height="22" fill="#e1d8c5" stroke={INK} strokeWidth="2" />
        <rect x="3466" y="744" width="30" height="16" fill="#e1d8c5" stroke={INK} strokeWidth="2" />
        <rect x="3780" y="736" width="12" height="24" rx="4" fill={INK} />
      </g>
    </g>
  );
}

export function ForeLayer() {
  return (
    <g>
      {/* foreground rocks near the opening (world x ≈ 380) */}
      <g transform="translate(470 980)">
        <path d="M-260 60 C-230 -10 -170 -60 -90 -68 C-20 -74 30 -40 60 -4 C80 20 110 40 140 60 Z" fill="#c6bba3" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M-90 -68 C-20 -74 30 -40 60 -4 C80 20 110 40 140 60 L20 60 C10 10 -30 -40 -90 -68 Z" fill="url(#hw-hatch)" />
        <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M-210 20 C-214 -10 -206 -40 -196 -60" />
          <path d="M-196 24 C-190 -6 -176 -30 -160 -46" />
          <path d="M-226 26 C-236 0 -240 -20 -246 -40" />
        </g>
      </g>
      {/* mooring posts in front of the dock (world x ≈ 2960) */}
      <g transform="translate(3880 980)">
        {[0, 70, 150].map((dx, i) => (
          <g key={i} transform={`translate(${dx} ${i * 10})`}>
            <rect x="-12" y="-110" width="24" height="170" fill="#8c7a62" stroke={INK} strokeWidth="3" />
            <rect x="2" y="-110" width="10" height="170" fill="url(#hw-hatch)" />
            <ellipse cx="0" cy="-110" rx="12" ry="5" fill="#b9a486" stroke={INK} strokeWidth="2" />
          </g>
        ))}
        <path d="M-60 70 C0 60 120 60 220 74" fill="none" stroke={INK} strokeOpacity="0.4" strokeWidth="2" />
      </g>
    </g>
  );
}

/** Renders one parallax layer by name. */
export function HarborLayer({ name, children }: { name: LayerName; children: ReactNode }) {
  return <g data-layer={name}>{children}</g>;
}
