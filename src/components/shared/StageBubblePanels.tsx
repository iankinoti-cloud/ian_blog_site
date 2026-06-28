"use client";

import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ─── Reference-image bubble (for logos with provided reference photos) ─────── */
function RefBubble({ src, alt, size = 90 }: { src: string; alt: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
      boxShadow: "0 28px 72px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.10), 0 0 44px rgba(170,210,248,0.14)",
    }}>
      {/* Zoom in 20% to crop the outer padding of the reference image, centering the glass sphere */}
      <img src={src} alt={alt} draggable={false} style={{ width: "120%", height: "120%", objectFit: "cover", margin: "-10%", display: "block", userSelect: "none" }} />
    </div>
  );
}

/* ─── Glass bubble wrapper ─────────────────────────────────────────────────── */
function GlassBubble({ size = 90, children }: { size?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: "50%",
        flexShrink: 0,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        /* Transparent center → opaque glass wall at the rim */
        background: [
          "radial-gradient(circle at 50% 50%,",
          "rgba(255,255,255,0.04) 0%,",
          "rgba(228,242,255,0.38) 50%,",
          "rgba(195,222,248,0.72) 78%,",
          "rgba(160,205,242,0.92) 100%)",
        ].join(" "),
        boxShadow: [
          /* outer drop */
          "0 28px 72px rgba(0,0,0,0.22)",
          "0 8px 24px rgba(0,0,0,0.10)",
          /* thick bright top rim */
          "inset 0 5px 18px rgba(255,255,255,0.96)",
          /* glass wall stroke */
          "inset 0 0 0 3.5px rgba(255,255,255,0.82)",
          /* bottom rim shadow */
          "inset 0 -7px 16px rgba(100,145,190,0.26)",
          /* ambient iridescent glow */
          "0 0 44px rgba(170,210,248,0.14)",
        ].join(", "),
        overflow: "hidden",
      }}
    >
      {/* Logo — sits inside the glass bowl */}
      <div style={{ width: "50%", height: "50%", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>

      {/* Primary lens flare — large bright arc top-left */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(ellipse 76% 52% at 26% 18%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.52) 35%, transparent 66%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Secondary specular — small dot bottom-right */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle at 72% 76%, rgba(255,255,255,0.50) 0%, transparent 38%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Rim border highlight */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.55)",
        boxSizing: "border-box",
        pointerEvents: "none", zIndex: 3,
      }} />
    </div>
  );
}

/* ─── Tech logos (inline SVG) ──────────────────────────────────────────────── */
const ReactLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="50" cy="50" r="8" fill="#61DAFB" />
    <ellipse cx="50" cy="50" rx="47" ry="17" stroke="#61DAFB" strokeWidth="6" />
    <ellipse cx="50" cy="50" rx="47" ry="17" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="47" ry="17" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 50 50)" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="ts-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A94F5" />
        <stop offset="100%" stopColor="#1D55D0" />
      </linearGradient>
      {/* Top-left gloss shimmer */}
      <linearGradient id="ts-gloss" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
        <stop offset="55%" stopColor="rgba(255,255,255,0.0)" />
      </linearGradient>
    </defs>
    {/* Blue rounded square */}
    <rect x="3" y="3" width="94" height="94" rx="20" fill="url(#ts-bg)" />
    {/* Gloss overlay — top-left shine */}
    <rect x="3" y="3" width="94" height="52" rx="20" fill="url(#ts-gloss)" />
    {/* TS — white, bold, with subtle drop-shadow for depth */}
    <text x="51" y="67" textAnchor="middle" fill="rgba(0,0,0,0.18)" fontSize="46" fontWeight="bold" fontFamily="'Arial Black',Arial,sans-serif" dx="2" dy="3">TS</text>
    <text x="51" y="67" textAnchor="middle" fill="white" fontSize="46" fontWeight="bold" fontFamily="'Arial Black',Arial,sans-serif">TS</text>
  </svg>
);

const JavaScriptLogo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <rect width="100" height="100" rx="16" fill="#F7DF1E" />
    <text x="54" y="70" textAnchor="middle" fill="#323330" fontSize="43" fontWeight="bold" fontFamily="Arial,sans-serif">JS</text>
  </svg>
);

const HTML5Logo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <path d="M10 5h80L82 88 50 98 18 88z" fill="#E34F26" />
    <path d="M50 14v76l26-7 7-69H50z" fill="#EF652A" />
    <text x="50" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="Arial,sans-serif">HTML</text>
    <text x="50" y="82" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Arial,sans-serif">5</text>
  </svg>
);

const CSS3Logo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <path d="M10 5h80L82 88 50 98 18 88z" fill="#1572B6" />
    <path d="M50 14v76l26-7 7-69H50z" fill="#33A9DC" />
    <text x="50" y="58" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Arial,sans-serif">CSS</text>
    <text x="50" y="82" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontFamily="Arial,sans-serif">3</text>
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="py-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5B9DC9" />
        <stop offset="100%" stopColor="#2E6C9E" />
      </linearGradient>
      <linearGradient id="py-yel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9D34A" />
        <stop offset="100%" stopColor="#D9A820" />
      </linearGradient>
    </defs>
    {/* Blue snake — head at top-right with eye hole, body curves down-left */}
    <path d="M47.5 2C35.4 2 27.8 7.8 27.8 17.9v9.4h19.7V30H19.8C9.3 30 2 37.5 2 49.9s7.3 19.9 17.8 19.9h6.6v-9.9c0-11.3 7.5-19.1 19.7-19.1h17c9.8 0 17.1-7.8 17.1-17.9V17.9C80.2 7.8 72.6 2 60.5 2H47.5z" fill="url(#py-blue)"/>
    <circle cx="38.5" cy="14" r="4.2" fill="white"/>
    {/* Yellow snake — head at bottom-left with eye hole, body curves up-right */}
    <path d="M52.5 98c12.1 0 19.7-5.8 19.7-15.9v-9.4H52.5V70h27.7C90.7 70 98 62.5 98 50.1S90.7 30.2 80.2 30.2h-6.6v9.9c0 11.3-7.5 19.1-19.7 19.1h-17c-9.8 0-17.1 7.8-17.1 17.9v10c0 10.1 7.6 15.9 19.7 15.9H52.5z" fill="url(#py-yel)"/>
    <circle cx="61.5" cy="86" r="4.2" fill="white"/>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <circle cx="50" cy="50" r="46" fill="#24292F" />
    <path d="M50 16C31 16 16 31 16 50c0 15 9 28 23 33 2 0 2-1 2-2v-8c-10 2-12-5-12-5-2-4-4-5-4-5-3-2 0-2 0-2 4 0 6 4 6 4 3 5 7 4 9 3 0-2 1-4 2-5-8-1-16-4-16-17 0-4 1-7 4-10-1-2-2-5 0-11 0 0 3-1 10 4a35 35 0 0118 0c7-5 10-4 10-4 2 6 0 9 0 11 3 3 4 6 4 10 0 13-8 16-16 17 1 2 3 4 3 8v12c0 1 1 2 2 2 14-5 23-18 23-33 0-19-15-34-34-34z" fill="white"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M25 38c4-16 14-22 24-16 10 6 14 18 22 20 8 2 16-2 20-10M14 60c4-16 14-22 24-16 10 6 14 18 22 20 8 2 16-2 20-10" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    {/* Simplified OpenAI knot — six curved petals */}
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <path
        key={angle}
        d="M50 18 C58 18 64 24 64 32 L64 50 C64 58 58 64 50 64 C42 64 36 58 36 50 L36 32 C36 24 42 18 50 18 Z"
        fill="#000"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="10" fill="white" />
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="gem-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="100%" stopColor="#1A73E8" />
      </linearGradient>
    </defs>
    <path d="M50 6 C50 6 45 35 28 50 C45 65 50 94 50 94 C50 94 55 65 72 50 C55 35 50 6 50 6 Z" fill="url(#gem-grad)" />
    <path d="M6 50 C6 50 35 45 50 28 C65 45 94 50 94 50 C94 50 65 55 50 72 C35 55 6 50 6 50 Z" fill="url(#gem-grad)" opacity="0.45" />
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x="18" y="6" width="26" height="26" rx="13" fill="#FF7262" />
    <rect x="18" y="37" width="26" height="26" rx="4" fill="#A259FF" />
    <rect x="18" y="68" width="26" height="26" rx="13" fill="#0ACF83" />
    <rect x="44" y="6" width="26" height="26" rx="4" fill="#F24E1E" />
    <circle cx="57" cy="50" r="13" fill="#1ABCFE" />
  </svg>
);

const PerplexityLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    {/* Asterisk — 6 arms */}
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <line key={a} x1="50" y1="12" x2="50" y2="88" stroke="#F97316" strokeWidth="10" strokeLinecap="round" transform={`rotate(${a} 50 50)`} />
    ))}
  </svg>
);

const FlutterLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
    <polygon points="12,50 42,14 72,14 42,50" fill="#54C5F8" />
    <polygon points="42,50 72,86 102,86 72,50" fill="#01579B" opacity="0.85" />
    <polygon points="42,50 72,86 57,86 42,68" fill="#29B6F6" />
    <polygon points="42,50 72,14 57,14 42,32" fill="#29B6F6" />
  </svg>
);

const HashnodeLogo = () => (
  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
    <rect width="100" height="100" rx="20" fill="#2962FF" />
    <text x="50" y="70" textAnchor="middle" fill="white" fontSize="52" fontWeight="bold" fontFamily="Arial,sans-serif">H</text>
  </svg>
);

/* ─── Bubble data for each panel ─────────────────────────────────────────────── */
// Each entry: { Logo, size, offset: [horizontalOffset%] }
// Vertical position is determined by flex order; offset creates the scatter wave.
const LEFT_BUBBLES = [
  { Logo: ReactLogo,      size: 96,  shift: "4%"  },
  { Logo: TypeScriptLogo, size: 80,  shift: "42%" },
  { Logo: PythonLogo,     size: 92,  shift: "8%"  },
  { Logo: HTML5Logo,      size: 78,  shift: "38%" },
  { Logo: CSS3Logo,       size: 88,  shift: "6%"  },
  { Logo: TailwindLogo,   size: 76,  shift: "44%" },
  { Logo: GitHubLogo,     size: 84,  shift: "10%" },
];

const RIGHT_BUBBLES = [
  { Logo: JavaScriptLogo, size: 90,  shift: "44%" },
  { Logo: OpenAILogo,     size: 82,  shift: "6%"  },
  { Logo: GeminiLogo,     size: 94,  shift: "40%" },
  { Logo: FigmaLogo,      size: 78,  shift: "8%"  },
  { Logo: PerplexityLogo, size: 88,  shift: "42%" },
  { Logo: FlutterLogo,    size: 76,  shift: "4%"  },
  { Logo: HashnodeLogo,   size: 84,  shift: "38%" },
];

/* ─── Panel component ─────────────────────────────────────────────────────────── */
const STAGGER = 0.13;   // seconds between each bubble

function BubbleColumn({
  bubbles, side, baseDelay,
}: {
  bubbles: typeof LEFT_BUBBLES;
  side: "left" | "right";
  baseDelay: number;
}) {
  return (
    <div
      className="hidden md:flex"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        [side]: "clamp(8px, 2.5vw, 40px)",
        top: 0, bottom: 0,
        width: "clamp(140px, 18vw, 260px)",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        pointerEvents: "none",
        paddingBlock: "clamp(24px, 4vh, 52px)",
        gap: 8,
      }}
    >
      {bubbles.map(({ Logo, size, shift }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.08, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.08, y: 20  }}
          transition={{
            type:      "spring",
            stiffness: 320,
            damping:   22,
            delay:     baseDelay + i * STAGGER,
          }}
          style={{ marginLeft: shift }}
        >
          <GlassBubble size={size}>
            <Logo />
          </GlassBubble>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Exported wrapper ─────────────────────────────────────────────────────────── */
export default function StageBubblePanels() {
  return (
    <>
      <BubbleColumn bubbles={LEFT_BUBBLES}  side="left"  baseDelay={0.18} />
      <BubbleColumn bubbles={RIGHT_BUBBLES} side="right" baseDelay={0.24} />
    </>
  );
}
