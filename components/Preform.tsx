// Custom, brand-consistent SVG illustrations of PET preforms.
// Lighting model: horizontal gradient across the tube cross-section (left edge →
// bright left-side specular → translucent centre fill → right shadow → rim light).
// This matches how a cylindrical transparent object looks under directional lighting.
// Thread ridges are rendered in 3 layers: undershadow + main stroke + top highlight.

export type Shape = "star" | "pco1810" | "pco1881" | "jar" | "fridge" | "ropp";
export type Tint = "blue" | "amber" | "clear";

// Re-export so consumers import both Tint and the product→tint map from one place.
export { PRODUCT_TINT as TINT_MAP } from "@/lib/products";

type Geo = {
  mouthW: number;
  neckW: number;
  neckH: number;
  ringW: number;
  bodyW: number;
  bottom: number;
  threads: number;
  thread: "fine" | "coarse" | "normal" | "smooth";
  baseWeight: number;
  gapAboveRing?: boolean;
  flare?: boolean;
};

const CX = 80;
const TOP = 46;

const GEO: Record<Shape, Geo> = {
  star:    { mouthW: 16, neckW: 16, neckH: 40, ringW: 19, bodyW: 20, bottom: 410, threads: 8, thread: "fine",   baseWeight: 15 },
  pco1810: { mouthW: 18, neckW: 18, neckH: 58, ringW: 25, bodyW: 22, bottom: 402, threads: 3, thread: "coarse", baseWeight: 24, gapAboveRing: true },
  pco1881: { mouthW: 18, neckW: 18, neckH: 34, ringW: 25, bodyW: 22, bottom: 402, threads: 2, thread: "coarse", baseWeight: 22 },
  jar:     { mouthW: 34, neckW: 33, neckH: 30, ringW: 36, bodyW: 33, bottom: 392, threads: 4, thread: "coarse", baseWeight: 48, flare: true },
  fridge:  { mouthW: 21, neckW: 24, neckH: 36, ringW: 27, bodyW: 27, bottom: 404, threads: 5, thread: "normal", baseWeight: 44 },
  ropp:    { mouthW: 15, neckW: 16, neckH: 50, ringW: 18, bodyW: 19, bottom: 410, threads: 0, thread: "smooth", baseWeight: 22 },
};

// Per-tint colour palette: left-edge, centre fill, right shadow, specular white,
// inner cavity dark, edge stroke, right rim light.
const TINTS: Record<Tint, {
  gL: string; gM: string; gR: string;
  spec: string; inner: string; edge: string; rim: string;
}> = {
  blue: {
    gL: "#A4CEEA", gM: "#CCE8F8", gR: "#5EA8D0",
    spec: "#EBF8FF", inner: "#1E6898", edge: "#48A0C8", rim: "#B2DCF5",
  },
  amber: {
    gL: "#C07828", gM: "#E0A840", gR: "#965A18",
    spec: "#FFF4CC", inner: "#784808", edge: "#B07020", rim: "#EBC868",
  },
  clear: {
    gL: "#96B8CC", gM: "#D0E2EF", gR: "#6C9EB8",
    spec: "#F2F8FF", inner: "#426080", edge: "#7CA0BC", rim: "#C5DEF2",
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function tunedGeo(shape: Shape, base: Geo, neckMm?: number, weightG?: number): Geo {
  const w = Number.isFinite(weightG) ? weightG! : base.baseWeight;
  const weightDelta = w - base.baseWeight;

  if (shape === "jar") {
    const neck = clamp(neckMm ?? 83, 38, 120);
    const span = (neck - 38) / (120 - 38);
    const mouthW = clamp(26 + span * 32, 26, 58);
    const bodyW = clamp(mouthW * 0.86 + Math.sqrt(Math.max(w, 1)) * 0.36, 30, 58);
    return {
      ...base,
      mouthW,
      neckW: clamp(mouthW - 1.5, 25, 57),
      neckH: clamp(27 + span * 15, 27, 43),
      ringW: clamp(mouthW + 3, 29, 62),
      bodyW,
      bottom: clamp(352 + Math.sqrt(Math.max(w, 1)) * 5.6, 365, 416),
      threads: neck >= 83 ? 5 : 4,
    };
  }

  const neck = clamp(neckMm ?? 28, 22, 46);
  const neckScale = clamp(neck / 28, 0.82, 1.38);
  const isPco = shape === "pco1810" || shape === "pco1881";
  const bodyW = clamp(base.bodyW + weightDelta * (isPco ? 0.14 : 0.18), base.bodyW - 4.5, base.bodyW + 8.5);
  const bottom = clamp(base.bottom + weightDelta * 1.05, 360, 424);

  return {
    ...base,
    mouthW: clamp(base.mouthW * neckScale, base.mouthW - 3, base.mouthW + 7),
    neckW: clamp(base.neckW * neckScale, base.neckW - 3, base.neckW + 8),
    ringW: clamp(base.ringW * neckScale, base.ringW - 3, base.ringW + 10),
    bodyW,
    bottom,
  };
}

export function Preform({
  shape, tint, uid, neckMm, weightG, className,
}: {
  shape: Shape; tint: Tint; uid: string; neckMm?: number; weightG?: number; className?: string;
}) {
  const g = tunedGeo(shape, GEO[shape], neckMm, weightG);
  const t = TINTS[tint];
  const ringY = TOP + g.neckH;
  const bodyTop = ringY + 3;
  const shoulder = bodyTop + 24;
  const straightEnd = g.bottom - g.bodyW;

  const body = [
    `M ${CX - g.bodyW * 0.8} ${bodyTop}`,
    `C ${CX - g.bodyW} ${bodyTop + 10}, ${CX - g.bodyW} ${shoulder - 8}, ${CX - g.bodyW} ${shoulder}`,
    `L ${CX - g.bodyW} ${straightEnd}`,
    `A ${g.bodyW} ${g.bodyW} 0 0 0 ${CX + g.bodyW} ${straightEnd}`,
    `L ${CX + g.bodyW} ${shoulder}`,
    `C ${CX + g.bodyW} ${shoulder - 8}, ${CX + g.bodyW} ${bodyTop + 10}, ${CX + g.bodyW * 0.8} ${bodyTop}`,
    "Z",
  ].join(" ");

  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, "-");
  const id = (s: string) => `${s}-${safeUid}`;
  const threadTop = TOP + 7;
  const threadSpan = g.neckH - (g.gapAboveRing ? 26 : 14);
  const threadGap = g.threads > 1 ? threadSpan / (g.threads - 1) : 0;
  const tw = g.flare ? g.neckW : g.neckW + 1.5;

  // Specular strip: narrow, left of centre
  const specX = CX - g.bodyW * 0.58;
  const specW = g.bodyW * 0.22;

  return (
    <svg viewBox="0 0 160 448" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        {/* Horizontal body gradient — cylinder cross-section lighting */}
        <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor={t.gL}   stopOpacity="0.78" />
          <stop offset="0.1"  stopColor={t.spec}  stopOpacity="0.95" />
          <stop offset="0.3"  stopColor={t.gM}    stopOpacity="0.58" />
          <stop offset="0.62" stopColor={t.gM}    stopOpacity="0.48" />
          <stop offset="0.87" stopColor={t.gR}    stopOpacity="0.68" />
          <stop offset="1"    stopColor={t.rim}   stopOpacity="0.74" />
        </linearGradient>

        {/* Horizontal neck gradient (slightly more opaque — thicker wall) */}
        <linearGradient id={id("neck")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor={t.gL}   stopOpacity="0.85" />
          <stop offset="0.12" stopColor={t.spec}  stopOpacity="0.98" />
          <stop offset="0.38" stopColor={t.gM}    stopOpacity="0.7"  />
          <stop offset="0.82" stopColor={t.gR}    stopOpacity="0.75" />
          <stop offset="1"    stopColor={t.rim}   stopOpacity="0.82" />
        </linearGradient>

        {/* Ring gradient */}
        <linearGradient id={id("ring")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor={t.gL}   stopOpacity="0.82" />
          <stop offset="0.15" stopColor={t.spec}  stopOpacity="0.98" />
          <stop offset="0.55" stopColor={t.gM}    stopOpacity="0.68" />
          <stop offset="1"    stopColor={t.gR}    stopOpacity="0.78" />
        </linearGradient>

        {/* Vertical fade for the primary specular strip */}
        <linearGradient id={id("specV")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor="#ffffff" stopOpacity="0"    />
          <stop offset="0.05" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="0.5"  stopColor="#ffffff" stopOpacity="0.8"  />
          <stop offset="0.92" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1"    stopColor="#ffffff" stopOpacity="0"    />
        </linearGradient>

        {/* Contact shadow */}
        <radialGradient id={id("ground")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000000" stopOpacity="0.42" />
          <stop offset="1" stopColor="#000000" stopOpacity="0"    />
        </radialGradient>

        <clipPath id={id("clip")}>
          <path d={body} />
        </clipPath>
        <clipPath id={id("nclip")}>
          <rect x={CX - g.neckW} y={TOP} width={g.neckW * 2} height={g.neckH + 6} rx={g.flare ? 4 : 3} />
        </clipPath>
      </defs>

      {/* ── Contact shadow ── */}
      <ellipse cx={CX} cy={g.bottom + 13} rx={g.bodyW * 1.35} ry="8.5" fill={`url(#${id("ground")})`} />

      {/* ── Body fill ── */}
      <path d={body} fill={`url(#${id("body")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.52" />

      {/* ── Body overlays (clipped) ── */}
      <g clipPath={`url(#${id("clip")})`}>
        {/* Hollow inner cavity — faint dark centre strip */}
        <rect
          x={CX - g.bodyW * 0.11}
          y={bodyTop}
          width={g.bodyW * 0.22}
          height={g.bottom - bodyTop}
          fill={t.inner}
          fillOpacity="0.1"
        />

        {/* Broad, very soft secondary highlight (centre-left) */}
        <rect
          x={CX - g.bodyW * 0.56}
          y={bodyTop + 6}
          width={g.bodyW * 0.52}
          height={g.bottom - bodyTop - 18}
          rx={g.bodyW * 0.26}
          fill="#ffffff"
          fillOpacity="0.09"
        />

        {/* Primary specular strip — narrow, bright, vertically faded */}
        <rect
          x={specX}
          y={bodyTop + 14}
          width={specW}
          height={g.bottom - bodyTop - 30}
          rx={specW * 0.5}
          fill={`url(#${id("specV")})`}
        />

        {/* Right rim light */}
        <rect
          x={CX + g.bodyW * 0.72}
          y={bodyTop + 20}
          width={g.bodyW * 0.14}
          height={g.bottom - bodyTop - 62}
          rx="3"
          fill={t.rim}
          fillOpacity="0.55"
        />

        {/* Bottom dome — glint + shadow crescent */}
        <ellipse cx={CX - g.bodyW * 0.24} cy={straightEnd + g.bodyW * 0.48} rx={g.bodyW * 0.2} ry={g.bodyW * 0.1}
          fill="#ffffff" fillOpacity="0.58" />
        <ellipse cx={CX + g.bodyW * 0.26} cy={straightEnd + g.bodyW * 0.62} rx={g.bodyW * 0.46} ry={g.bodyW * 0.36}
          fill={t.inner} fillOpacity="0.1" />
      </g>

      {/* Gate mark */}
      <circle cx={CX} cy={g.bottom - 2} r="2.2" fill={t.edge}   fillOpacity="0.52" />
      <circle cx={CX} cy={g.bottom - 2} r="0.9" fill="#ffffff"   fillOpacity="0.55" />

      {/* ── Neck ── */}
      <rect
        x={CX - g.neckW} y={TOP} width={g.neckW * 2} height={g.neckH}
        rx={g.flare ? 4 : 3}
        fill={`url(#${id("neck")})`}
        stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.52"
      />
      <g clipPath={`url(#${id("nclip")})`}>
        {/* Neck inner specular strip */}
        <rect
          x={CX - g.neckW * 0.72}
          y={TOP + 4}
          width={g.neckW * 0.18}
          height={g.neckH - 7}
          rx="3"
          fill="#ffffff"
          fillOpacity="0.44"
        />
      </g>

      {/* ── Threads ── */}
      {g.thread === "smooth" ? (
        <>
          <line x1={CX - g.neckW + 2} y1={TOP + 12}     x2={CX + g.neckW - 2} y2={TOP + 12}     stroke={t.edge} strokeWidth="1" strokeOpacity="0.28" />
          <line x1={CX - g.neckW + 2} y1={ringY - 10}   x2={CX + g.neckW - 2} y2={ringY - 10}   stroke={t.edge} strokeWidth="1" strokeOpacity="0.28" />
        </>
      ) : (
        Array.from({ length: g.threads }).map((_, i) => {
          const y = threadTop + i * threadGap;
          const sw = g.thread === "coarse" ? 2.4 : g.thread === "fine" ? 1.1 : 1.7;
          return (
            <g key={i}>
              {/* Undershadow — gives the ridge depth */}
              <path
                d={`M ${CX - tw} ${y + sw} Q ${CX} ${y + 4 + sw} ${CX + tw} ${y - 1 + sw}`}
                stroke={t.inner} strokeWidth={sw * 0.9} strokeOpacity="0.3"
                fill="none" strokeLinecap="round"
              />
              {/* Main thread body */}
              <path
                d={`M ${CX - tw} ${y} Q ${CX} ${y + 4} ${CX + tw} ${y - 1}`}
                stroke={t.edge} strokeWidth={sw} strokeOpacity="0.65"
                fill="none" strokeLinecap="round"
              />
              {/* Top highlight — catches direct light */}
              <path
                d={`M ${CX - tw} ${y - sw * 0.55} Q ${CX} ${y + 3.4 - sw * 0.55} ${CX + tw} ${y - 1.6 - sw * 0.55}`}
                stroke="#ffffff" strokeWidth={sw * 0.52} strokeOpacity="0.7"
                fill="none" strokeLinecap="round"
              />
            </g>
          );
        })
      )}

      {/* ── Mouth opening ── */}
      <ellipse cx={CX} cy={TOP} rx={g.mouthW}               ry={g.flare ? 6.5 : 4.5}
        fill={t.gM} fillOpacity="0.85" stroke={t.edge} strokeWidth="1.2" strokeOpacity="0.52" />
      <ellipse cx={CX} cy={TOP} rx={g.mouthW - (g.flare ? 6 : 4)} ry={g.flare ? 4 : 2.6}
        fill={t.inner} fillOpacity="0.22" />
      <ellipse cx={CX - g.mouthW * 0.25} cy={TOP - 0.5} rx={g.mouthW * 0.3} ry={g.flare ? 2 : 1.4}
        fill="#ffffff" fillOpacity="0.6" />

      {/* ── Support ring ── */}
      <rect
        x={CX - g.ringW} y={ringY - 4} width={g.ringW * 2} height={g.gapAboveRing ? 9 : 7}
        rx="4"
        fill={`url(#${id("ring")})`}
        stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.52"
      />
      {/* Ring top highlight ellipse */}
      <ellipse cx={CX} cy={ringY - 2.5} rx={g.ringW - 1} ry="2.9" fill="#ffffff" fillOpacity="0.58" />
      {/* Ring bottom shadow */}
      <ellipse
        cx={CX} cy={ringY + (g.gapAboveRing ? 4.5 : 3)} rx={g.ringW - 2} ry="1.8"
        fill={t.inner} fillOpacity="0.12"
      />
    </svg>
  );
}

// ── Companion: the blown bottle each preform becomes ──────────────────────────
const BOTTLE: Record<Shape, string> = {
  star:    "M70 40 h20 v18 q14 4 14 22 v8 q-2 6 -2 14 q0 10 6 18 q10 12 10 40 v210 q0 24 -24 24 h-28 q-24 0 -24 -24 v-210 q0 -28 10 -40 q6 -8 6 -18 q0 -8 -2 -14 v-8 q0 -18 14 -22 Z",
  pco1810: "M68 38 h24 v16 q14 5 14 24 v6 q-2 8 -2 16 q0 12 8 22 q10 14 10 46 v200 q0 26 -26 26 h-32 q-26 0 -26 -26 v-200 q0 -32 10 -46 q8 -10 8 -22 q0 -8 -2 -16 v-6 q0 -19 14 -24 Z",
  pco1881: "M68 42 h24 v12 q14 5 14 24 v6 q-2 8 -2 18 q0 12 8 22 q10 14 10 46 v196 q0 26 -26 26 h-32 q-26 0 -26 -26 v-196 q0 -32 10 -46 q8 -10 8 -22 q0 -10 -2 -18 v-6 q0 -19 14 -24 Z",
  jar:     "M52 40 h56 v14 q6 3 6 12 q0 8 -8 14 q-6 4 -6 14 v264 q0 22 -22 22 h-36 q-22 0 -22 -22 v-264 q0 -10 -6 -14 q-8 -6 -8 -14 q0 -9 6 -12 v-14 Z",
  fridge:  "M62 40 h36 v16 q16 5 16 26 v8 q0 10 -2 18 q0 14 8 24 q10 14 10 44 v190 q0 26 -26 26 h-40 q-26 0 -26 -26 v-190 q0 -30 10 -44 q8 -10 8 -24 q-2 -8 -2 -18 v-8 q0 -21 16 -26 Z",
  ropp:    "M70 36 h20 v22 q12 5 12 24 v4 q-2 8 -2 16 q0 12 6 20 q10 14 10 44 v204 q0 24 -24 24 h-28 q-24 0 -24 -24 v-204 q0 -30 10 -44 q6 -8 6 -20 q0 -8 -2 -16 v-4 q0 -19 12 -24 Z",
};

export function BlownBottle({ shape, tint, uid, className }: { shape: Shape; tint: Tint; uid: string; className?: string }) {
  const t = TINTS[tint];
  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, "-");
  const id = (s: string) => `b-${s}-${safeUid}`;
  return (
    <svg viewBox="0 0 160 448" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id("fill")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor={t.gL}  stopOpacity="0.6"  />
          <stop offset="0.12" stopColor={t.spec} stopOpacity="0.9"  />
          <stop offset="0.4"  stopColor={t.gM}  stopOpacity="0.45" />
          <stop offset="0.85" stopColor={t.gR}  stopOpacity="0.55" />
          <stop offset="1"    stopColor={t.rim}  stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id={id("specV")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor="#ffffff" stopOpacity="0.0"  />
          <stop offset="0.1" stopColor="#ffffff" stopOpacity="0.82" />
          <stop offset="1"   stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={BOTTLE[shape]} />
        </clipPath>
      </defs>
      <ellipse cx="76" cy="438" rx="46" ry="6" fill="#000" fillOpacity="0.25" />
      <path d={BOTTLE[shape]} fill={`url(#${id("fill")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.55" />
      <g clipPath={`url(#${id("clip")})`}>
        <rect x="37" y="70" width="13" height="340" rx="6.5" fill={`url(#${id("specV")})`} />
        <rect x="106" y="120" width="5" height="250" rx="2.5" fill={t.rim} fillOpacity="0.38" />
        <rect x="62" y="34" width="36" height="20" rx="3" fill={t.edge} fillOpacity="0.55" />
      </g>
    </svg>
  );
}
