// Custom, brand-consistent SVG illustrations of PET preforms — drawn from real
// preform anatomy. The NECK FINISH is the primary differentiator (necks never
// change; bodies blow out), so finish features are slightly exaggerated for
// legibility. Translucent PET is rendered with a low-opacity tint gradient, twin
// specular highlights, a domed sealed bottom and a faint centre gate mark.
//
// Pure presentational components (no hooks) — safe in server or client trees.

export type Shape = "star" | "pco1810" | "pco1881" | "jar" | "fridge" | "ropp";
export type Tint = "blue" | "amber" | "clear";

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
  // slim, tall tube; short fine threads; thin support ring
  star: { mouthW: 16, neckW: 16, neckH: 40, ringW: 19, bodyW: 20, bottom: 410, threads: 8, thread: "fine", baseWeight: 15 },
  // tallest crown, 3 thread turns, big gap above a heavy support ring; stout tube
  pco1810: { mouthW: 18, neckW: 18, neckH: 58, ringW: 25, bodyW: 22, bottom: 402, threads: 3, thread: "coarse", baseWeight: 24, gapAboveRing: true },
  // short/stubby crown, 2 threads, ring snug under; stout tube
  pco1881: { mouthW: 18, neckW: 18, neckH: 34, ringW: 25, bodyW: 22, bottom: 402, threads: 2, thread: "coarse", baseWeight: 22 },
  // wide flared open mouth (mouth as wide as body); short, fat
  jar: { mouthW: 34, neckW: 33, neckH: 30, ringW: 36, bodyW: 33, bottom: 392, threads: 4, thread: "coarse", baseWeight: 48, flare: true },
  // medium crown but wider closed neck; fuller body
  fridge: { mouthW: 21, neckW: 24, neckH: 36, ringW: 27, bodyW: 27, bottom: 404, threads: 5, thread: "normal", baseWeight: 44 },
  // smooth, thread-free collar (roll-on alu cap); slim tube
  ropp: { mouthW: 15, neckW: 16, neckH: 50, ringW: 18, bodyW: 19, bottom: 410, threads: 0, thread: "smooth", baseWeight: 22 },
};

const TINTS: Record<Tint, { top: string; mid: string; bot: string; edge: string }> = {
  blue: { top: "#EAF6FF", mid: "#BFE3F5", bot: "#9FD2EC", edge: "#7FBFE0" },
  amber: { top: "#F6E3B8", mid: "#D9A24A", bot: "#C68A38", edge: "#B57C2E" },
  clear: { top: "#EEF5FB", mid: "#CFE0EE", bot: "#B7CCDF", edge: "#9DB6CC" },
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
  shape,
  tint,
  uid,
  neckMm,
  weightG,
  className,
}: {
  shape: Shape;
  tint: Tint;
  uid: string;
  neckMm?: number;
  weightG?: number;
  className?: string;
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

  const id = (s: string) => `${s}-${uid}`;
  const threadTop = TOP + 7;
  const threadSpan = g.neckH - (g.gapAboveRing ? 26 : 14);
  const threadGap = g.threads > 1 ? threadSpan / (g.threads - 1) : 0;
  const tw = g.flare ? g.neckW : g.neckW + 1.5;

  return (
    <svg viewBox="0 0 160 448" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.top} stopOpacity="0.6" />
          <stop offset="0.5" stopColor={t.mid} stopOpacity="0.42" />
          <stop offset="1" stopColor={t.bot} stopOpacity="0.52" />
        </linearGradient>
        <linearGradient id={id("neck")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={t.top} stopOpacity="0.72" />
          <stop offset="0.5" stopColor={t.mid} stopOpacity="0.55" />
          <stop offset="1" stopColor={t.bot} stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id={id("shine")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.12" stopColor="#fff7ec" stopOpacity="0.85" />
          <stop offset="0.85" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("ground")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="0.5" stopColor={t.edge} stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={body} />
        </clipPath>
      </defs>

      {/* contact shadow */}
      <ellipse cx={CX} cy={g.bottom + 12} rx={g.bodyW * 1.25} ry="7" fill={`url(#${id("ground")})`} />

      {/* ---- BODY ---- */}
      <path d={body} fill={`url(#${id("body")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.6" />
      <g clipPath={`url(#${id("clip")})`}>
        {/* centre cavity shading (two-wall realism) */}
        <rect x={CX - g.bodyW * 0.16} y={bodyTop} width={g.bodyW * 0.32} height={g.bottom} fill={t.bot} fillOpacity="0.14" />
        <path d={`M ${CX - g.bodyW * 0.74} ${bodyTop + 16} L ${CX - g.bodyW * 0.74} ${straightEnd - 6}`} stroke={`url(#${id("wall")})`} strokeWidth="2" />
        <path d={`M ${CX + g.bodyW * 0.74} ${bodyTop + 16} L ${CX + g.bodyW * 0.74} ${straightEnd - 6}`} stroke={`url(#${id("wall")})`} strokeWidth="2" />
        {/* main specular highlight, left of centre */}
        <rect
          x={CX - g.bodyW * 0.58}
          y={bodyTop + 14}
          width={g.bodyW * 0.4}
          height={g.bottom - bodyTop - 22}
          rx={g.bodyW * 0.2}
          fill={`url(#${id("shine")})`}
        />
        {/* thin rim light near right edge */}
        <rect x={CX + g.bodyW * 0.46} y={bodyTop + 22} width={g.bodyW * 0.1} height={g.bottom - bodyTop - 70} rx="2" fill="#ffffff" fillOpacity="0.3" />
        {/* dome glint + crescent shadow */}
        <ellipse cx={CX - g.bodyW * 0.22} cy={straightEnd + g.bodyW * 0.5} rx={g.bodyW * 0.22} ry={g.bodyW * 0.12} fill="#ffffff" fillOpacity="0.5" />
        <ellipse cx={CX + g.bodyW * 0.3} cy={straightEnd + g.bodyW * 0.6} rx={g.bodyW * 0.5} ry={g.bodyW * 0.4} fill={t.bot} fillOpacity="0.18" />
      </g>
      {/* faint centre gate mark */}
      <circle cx={CX} cy={g.bottom - 2} r="1.7" fill={t.edge} fillOpacity="0.6" />

      {/* ---- NECK ---- */}
      <rect x={CX - g.neckW} y={TOP} width={g.neckW * 2} height={g.neckH} rx={g.flare ? 4 : 3} fill={`url(#${id("neck")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.6" />
      <rect x={CX - g.neckW * 0.72} y={TOP + 4} width={g.neckW * 0.16} height={g.neckH - 8} rx="2" fill="#ffffff" fillOpacity="0.34" />

      {/* threads (arcs with upper-left highlight) or smooth collar */}
      {g.thread === "smooth" ? (
        <>
          <line x1={CX - g.neckW + 2} y1={TOP + 12} x2={CX + g.neckW - 2} y2={TOP + 12} stroke={t.edge} strokeWidth="1" strokeOpacity="0.3" />
          <line x1={CX - g.neckW + 2} y1={ringY - 10} x2={CX + g.neckW - 2} y2={ringY - 10} stroke={t.edge} strokeWidth="1" strokeOpacity="0.3" />
        </>
      ) : (
        Array.from({ length: g.threads }).map((_, i) => {
          const y = threadTop + i * threadGap;
          const sw = g.thread === "coarse" ? 2.4 : g.thread === "fine" ? 1.1 : 1.7;
          return (
            <g key={i}>
              <path d={`M ${CX - tw} ${y} Q ${CX} ${y + 4} ${CX + tw} ${y - 1}`} stroke={t.edge} strokeWidth={sw} strokeOpacity="0.5" fill="none" strokeLinecap="round" />
              <path d={`M ${CX - tw} ${y - 1} Q ${CX} ${y + 2.5} ${CX + tw} ${y - 2}`} stroke="#ffffff" strokeWidth={sw * 0.5} strokeOpacity="0.55" fill="none" strokeLinecap="round" />
            </g>
          );
        })
      )}

      {/* mouth opening */}
      <ellipse cx={CX} cy={TOP} rx={g.mouthW} ry={g.flare ? 6.5 : 4.5} fill={t.top} fillOpacity="0.85" stroke={t.edge} strokeWidth="1.2" strokeOpacity="0.6" />
      <ellipse cx={CX} cy={TOP} rx={g.mouthW - (g.flare ? 6 : 4)} ry={g.flare ? 4 : 2.6} fill={t.bot} fillOpacity="0.28" />

      {/* ---- SUPPORT RING (disc seen at slight angle) ---- */}
      <rect x={CX - g.ringW} y={ringY - 4} width={g.ringW * 2} height={g.gapAboveRing ? 9 : 7} rx="4" fill={`url(#${id("neck")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.6" />
      <ellipse cx={CX} cy={ringY - 2.5} rx={g.ringW - 1} ry="2.6" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  );
}

// Companion: the blown bottle/jar each preform becomes — used for the hover
// "preform → bottle" teaching crossfade.
const BOTTLE: Record<Shape, string> = {
  // slim water bottle
  star: "M70 40 h20 v18 q14 4 14 22 v8 q-2 6 -2 14 q0 10 6 18 q10 12 10 40 v210 q0 24 -24 24 h-28 q-24 0 -24 -24 v-210 q0 -28 10 -40 q6 -8 6 -18 q0 -8 -2 -14 v-8 q0 -18 14 -22 Z",
  // tall CSD bottle with petaloid base hint
  pco1810: "M68 38 h24 v16 q14 5 14 24 v6 q-2 8 -2 16 q0 12 8 22 q10 14 10 46 v200 q0 26 -26 26 h-32 q-26 0 -26 -26 v-200 q0 -32 10 -46 q8 -10 8 -22 q0 -8 -2 -16 v-6 q0 -19 14 -24 Z",
  // short-neck soda bottle
  pco1881: "M68 42 h24 v12 q14 5 14 24 v6 q-2 8 -2 18 q0 12 8 22 q10 14 10 46 v196 q0 26 -26 26 h-32 q-26 0 -26 -26 v-196 q0 -32 10 -46 q8 -10 8 -22 q0 -10 -2 -18 v-6 q0 -19 14 -24 Z",
  // wide-mouth jar
  jar: "M52 40 h56 v14 q6 3 6 12 q0 8 -8 14 q-6 4 -6 14 v264 q0 22 -22 22 h-36 q-22 0 -22 -22 v-264 q0 -10 -6 -14 q-8 -6 -8 -14 q0 -9 6 -12 v-14 Z",
  // broad fridge bottle
  fridge: "M62 40 h36 v16 q16 5 16 26 v8 q0 10 -2 18 q0 14 8 24 q10 14 10 44 v190 q0 26 -26 26 h-40 q-26 0 -26 -26 v-190 q0 -30 10 -44 q8 -10 8 -24 q-2 -8 -2 -18 v-8 q0 -21 16 -26 Z",
  // capped oil/spirit bottle
  ropp: "M70 36 h20 v22 q12 5 12 24 v4 q-2 8 -2 16 q0 12 6 20 q10 14 10 44 v204 q0 24 -24 24 h-28 q-24 0 -24 -24 v-204 q0 -30 10 -44 q6 -8 6 -20 q0 -8 -2 -16 v-4 q0 -19 12 -24 Z",
};

export function BlownBottle({ shape, tint, uid, className }: { shape: Shape; tint: Tint; uid: string; className?: string }) {
  const t = TINTS[tint];
  const id = (s: string) => `b-${s}-${uid}`;
  return (
    <svg viewBox="0 0 160 448" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id("fill")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.top} stopOpacity="0.55" />
          <stop offset="0.55" stopColor={t.mid} stopOpacity="0.4" />
          <stop offset="1" stopColor={t.bot} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={id("shine")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7ec" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={BOTTLE[shape]} />
        </clipPath>
      </defs>
      <ellipse cx="76" cy="438" rx="46" ry="6" fill="#000" fillOpacity="0.28" />
      <path d={BOTTLE[shape]} fill={`url(#${id("fill")})`} stroke={t.edge} strokeWidth="1.4" strokeOpacity="0.6" />
      <g clipPath={`url(#${id("clip")})`}>
        <rect x="36" y="70" width="14" height="340" rx="7" fill={`url(#${id("shine")})`} />
        <rect x="104" y="120" width="5" height="250" rx="2.5" fill="#fff" fillOpacity="0.3" />
        {/* cap */}
        <rect x="62" y="34" width="36" height="20" rx="3" fill={t.edge} fillOpacity="0.55" />
      </g>
    </svg>
  );
}
