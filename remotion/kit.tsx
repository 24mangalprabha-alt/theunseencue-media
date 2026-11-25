// Shared "new style" kit for Scout reels: warm light grid, one hot accent, blur-resolve kinetic
// headline, white cards, cursor, chips, blur-dissolve scenes, small synced captions.
import React from "react";
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/InterTight";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

export const { fontFamily: INTER } = loadInter("normal", { weights: ["500", "600", "800", "900"] });
export const { fontFamily: MONO } = loadMono("normal", { weights: ["500", "700"] });
export const C = { bg: "#F5EFE4", dot: "#E4DACA", ink: "#14110F", soft: "#6E655B", hot: "#FF5A1F", hotTint: "#FFE3D6", red: "#E5484D", redTint: "#FDE1E1", green: "#16B364", greenTint: "#D9F7E6", card: "#FFFFFF" };
export const FPS = 30;
const XF = 8;
export type W = { word: string; start: number; end: number };

export const ease = (f: number, a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const XF0 = 8;
export const useF = () => useCurrentFrame() - XF0;
export const usePop = (delay = 0, damping = 13) => { const f = useF(); const { fps } = useVideoConfig(); return spring({ frame: f - delay, fps, config: { damping, mass: 0.7 } }); };

// ---------- shared pieces ----------
export const Grid = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill data-decor style={{ background: C.bg }}>
      <AbsoluteFill data-decor style={{ backgroundImage: `radial-gradient(${C.dot} 3px, transparent 3.5px)`, backgroundSize: "54px 54px", backgroundPosition: `${(f * 0.4) % 54}px ${(f * 0.25) % 54}px` }} />
      <AbsoluteFill data-decor style={{ background: `radial-gradient(900px 700px at 100% 100%, ${C.hot}33, transparent 70%), radial-gradient(700px 600px at 0% 0%, #FFD6A840, transparent 70%)` }} />
    </AbsoluteFill>
  );
};

// Headline: words rise + de-blur, staggered. "*word*" = accent (mono, hot orange)
export const Headline = ({ text, size = 92, accent = C.hot }: { text: string; size?: number; accent?: string }) => {
  const f = useF();
  const parts = text.split(" ");
  return (
    <div style={{ position: "absolute", left: 90, top: 300, width: 810, fontFamily: INTER, fontWeight: 900, fontSize: size, lineHeight: 1.04, letterSpacing: -3, color: C.ink }}>
      {parts.map((w, i) => {
        const acc = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        const p = ease(f, 2 + i * 2.2, 12 + i * 2.2);
        return (
          <span key={i} style={{ display: "inline-block", marginRight: size * 0.24, opacity: p, transform: `translateY(${(1 - p) * 40}px)`, filter: `blur(${(1 - p) * 14}px)`, color: acc ? accent : C.ink, fontFamily: acc ? MONO : INTER, fontWeight: acc ? 700 : 900, letterSpacing: acc ? -2 : -3 }}>
            {clean}
          </span>
        );
      })}
    </div>
  );
};

export const Card = ({ children, top = 760, h, w = 780, delay = 6, style }: { children: React.ReactNode; top?: number; h: number; w?: number; delay?: number; style?: React.CSSProperties }) => {
  const s = usePop(delay);
  return (
    <div style={{ position: "absolute", left: (1080 - w) / 2 - 30, top, width: w, height: h, background: C.card, borderRadius: 36, boxShadow: "0 40px 80px -30px rgba(60,30,10,.35), 0 8px 20px -8px rgba(60,30,10,.15)", transform: `scale(${0.88 + 0.12 * s}) translateY(${(1 - s) * 60}px)`, opacity: Math.min(1, s * 1.4), overflow: "hidden", fontFamily: INTER, ...style }}>
      {children}
    </div>
  );
};

export const Chip = ({ text, bg, fg, style }: { text: string; bg: string; fg: string; style?: React.CSSProperties }) => (
  <span style={{ display: "inline-block", padding: "10px 22px", borderRadius: 999, background: bg, color: fg, fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 0.5, ...style }}>{text}</span>
);

export const Cursor = ({ x, y, click = 0 }: { x: number; y: number; click?: number }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 10, height: 10 }}>
    {click > 0 && click < 1 && <div style={{ position: "absolute", left: -40 * click, top: -40 * click, width: 80 * click, height: 80 * click, borderRadius: 999, border: `4px solid ${C.hot}`, opacity: 1 - click }} />}
    <svg width="46" height="56" viewBox="0 0 23 28" style={{ position: "absolute", left: 0, top: 0, filter: "drop-shadow(0 6px 8px rgba(0,0,0,.25))" }}>
      <path d="M1 1 L1 22 L7 17 L11 26 L15 24 L11 16 L19 16 Z" fill={C.hot} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  </div>
);

export const Line = ({ w, c = "#E9E3DA", h = 18, mt = 16 }: { w: number | string; c?: string; h?: number; mt?: number }) => <div style={{ width: w, height: h, borderRadius: 9, background: c, marginTop: mt }} />;

// Blur dissolve between scenes (no hard cuts)
export const SceneLayer = ({ i, Comp, starts, last }: { i: number; Comp: React.FC; starts: number[]; last: boolean }) => {
  const f = useCurrentFrame();
  const a = Math.round(starts[i] * FPS), b = Math.round(starts[i + 1] * FPS);
  if (f < a - XF || f > b + XF) return null;
  const inP = i === 0 ? 1 : ease(f, a - XF / 2, a + XF / 2);
  const outP = last ? 1 : 1 - ease(f, b - XF / 2, b + XF / 2);
  const p = Math.min(inP, outP);
  return (
    <AbsoluteFill style={{ opacity: p, filter: `blur(${(1 - p) * 18}px)`, transform: `scale(${0.97 + 0.03 * p})` }}>
      <LocalFrame offset={a}><Comp /></LocalFrame>
    </AbsoluteFill>
  );
};

// shift frame so each scene starts at 0 (Sequence would unmount during the overlap)
export const LocalFrame = ({ offset, children }: { offset: number; children: React.ReactNode }) => (
  <Sequence from={offset - XF} layout="none">{children}</Sequence>
);

// Captions: 1-3 words at a time, synced to voice, small, y≈1390
export const Captions = ({ words: WORDS }: { words: W[] }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  let idx = WORDS.findIndex((w, i) => t >= w.start && (i === WORDS.length - 1 || t < WORDS[i + 1].start));
  if (idx < 0) return null;
  const g = Math.floor(idx / 3) * 3;
  const group = WORDS.slice(g, g + 3);
  const last = WORDS[Math.min(g + 2, WORDS.length - 1)];
  if (t > last.end + 0.6) return null;
  return (
    <div style={{ position: "absolute", left: 90, width: 810, top: 1395, textAlign: "center", fontFamily: INTER, fontWeight: 600, fontSize: 46, color: C.ink }}>
      {group.map((w, i) => {
        const p = ease(f, w.start * FPS - 2, w.start * FPS + 4);
        return <span key={g + i} style={{ opacity: 0.25 + 0.75 * p, filter: `blur(${(1 - p) * 6}px)`, marginRight: 14 }}>{w.word.trim().replace(/^J$/, "J")}</span>;
      })}
    </div>
  );
};

