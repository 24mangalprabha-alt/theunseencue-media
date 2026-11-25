// "Your AI coding agent might be installing malware for you" — WebSec benchmark (AIR Research, 23 Nov 2026).
// New Scout style: problem first, one moving object per sentence, light grid + hot accent, synced captions.
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import raw from "../data/scout-vibe-v2-words.json";
import { Audit } from "../scenes/audit";
import { C, Captions, Card, Chip, Cursor, ease, FPS, Grid, Headline, INTER, Line, MONO, SceneLayer, useF, usePop, W } from "./kit";

// fix misheard words for captions
const FIX: Record<string, string> = { github: "GitHub", "git hub": "GitHub", autorun: "auto-run", "auto-run,": "auto-run," };
const WORDS: W[] = (raw as W[]).map((w) => {
  const k = w.word.trim().toLowerCase();
  return { ...w, word: FIX[k] ?? w.word.trim().replace(/^Github/i, "GitHub") };
});

// scene starts = sentence starts in the voice
const STARTS: number[] = [0];
WORDS.forEach((w, i) => { if (/[.?!]$/.test(w.word.trim()) && WORDS[i + 1] && w.word.trim() !== "code.") STARTS.push(WORDS[i + 1].start - 0.05); });
const END = WORDS[WORDS.length - 1].end + 1.1;
STARTS.push(END);
export const VIBE_FRAMES = Math.round(END * FPS);

const Term = ({ lines, n, top = 760, h = 470 }: { lines: { t: string; c?: string }[]; n: number; top?: number; h?: number }) => (
  <Card top={top} h={h} delay={3} style={{ background: "#16130F" }}>
    <div style={{ height: 50, background: "#24201B", display: "flex", alignItems: "center", gap: 12, paddingLeft: 22 }}>
      {[C.red, "#F5B83D", C.green].map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c }} />)}
      <span style={{ marginLeft: 14, fontFamily: MONO, fontSize: 22, color: "#9A8F83" }}>agent · terminal</span>
    </div>
    <div style={{ padding: "26px 32px", fontFamily: MONO, fontSize: 30, lineHeight: 1.55, color: "#EDE6DA" }}>
      {lines.map((l, i) => {
        const shown = Math.max(0, Math.min(l.t.length, Math.floor((n - i) * l.t.length)));
        if (n < i) return null;
        return <div key={i} style={{ color: l.c ?? "#EDE6DA", whiteSpace: "nowrap" }}>{l.t.slice(0, shown)}</div>;
      })}
    </div>
  </Card>
);

const Toggle = ({ on }: { on: number }) => (
  <div style={{ width: 170, height: 96, borderRadius: 99, background: on > 0.5 ? C.red : "#D7D0C5", position: "relative" }}>
    <div style={{ position: "absolute", top: 8, left: interpolate(on, [0, 1], [8, 82]), width: 80, height: 80, borderRadius: 99, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,.2)" }} />
  </div>
);

const PROVIDERS = ["Firecrawl", "Tavily", "Perplexity", "Parallel", "Exa", "Nimble", "Brave", "You.com"];

// 1 hook
const S1 = () => {
  const f = useF();
  const warn = usePop(34);
  return (
    <>
      <Headline text="Your AI agent might be installing *malware*" size={86} accent={C.red} />
      <Term n={ease(f, 8, 50) * 3} lines={[{ t: "$ npm install solana-kit" }, { t: "> postinstall: curl … | sh", c: "#FF9C7A" }, { t: "✓ done (auto-approved)", c: "#7FE0A8" }]} />
      <div style={{ position: "absolute", left: 90, top: 1265, opacity: warn, transform: `scale(${0.8 + 0.2 * warn})`, transformOrigin: "left center" }}>
        <Chip text="⚠ YOU NEVER SAW IT RUN" bg={C.redTint} fg={C.red} />
      </div>
    </>
  );
};

// 2 eight search tools tested
const S2 = () => (
  <>
    <Headline text="*8* search tools AI agents use, tested" size={86} />
    <div style={{ position: "absolute", left: 90, top: 820, width: 810, display: "flex", flexWrap: "wrap", gap: 18 }}>
      {PROVIDERS.map((p, i) => {
        const s = usePop(4 + i * 3);
        return <div key={p} style={{ padding: "22px 30px", borderRadius: 22, background: C.card, boxShadow: "0 20px 40px -24px rgba(60,30,10,.4)", fontFamily: INTER, fontWeight: 800, fontSize: 38, opacity: s, transform: `scale(${0.7 + 0.3 * s})` }}>{p}</div>;
      })}
    </div>
    <div style={{ position: "absolute", left: 90, top: 1250, fontFamily: MONO, fontSize: 24, color: C.soft }}>WebSec benchmark · AIR Research · 23 Nov 2026</div>
  </>
);

// 3 every one returned malicious results
const S3 = () => {
  const stat = usePop(30);
  return (
    <>
      <Headline text="Every single one: *malicious* results" size={86} accent={C.red} />
      <div style={{ position: "absolute", left: 90, top: 800, width: 810, display: "flex", flexWrap: "wrap", gap: 18 }}>
        {PROVIDERS.map((p, i) => {
          const s = usePop(2 + i * 2.5, 9);
          return (
            <div key={p} style={{ position: "relative", padding: "22px 30px", borderRadius: 22, background: s > 0.5 ? C.redTint : C.card, color: s > 0.5 ? C.red : C.ink, fontFamily: INTER, fontWeight: 800, fontSize: 38 }}>
              {p}
              <div style={{ position: "absolute", right: -8, top: -8, width: 30, height: 30, borderRadius: 99, background: C.red, transform: `scale(${s})`, color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>!</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 90, top: 1180, opacity: stat, transform: `translateY(${(1 - stat) * 30}px)`, fontFamily: INTER, fontWeight: 900, fontSize: 58, color: C.ink }}>
        <span style={{ color: C.red }}>0.8–2.2%</span> of results
      </div>
    </>
  );
};

// 4 here's how it happens
const S4 = () => {
  const f = useF();
  const steps = ["Error", "Search", "Install"];
  return (
    <>
      <Headline text="Here's how it *happens*" />
      <div style={{ position: "absolute", left: 90, top: 880, width: 810, height: 8, borderRadius: 4, background: "#E4DACA" }} />
      <div style={{ position: "absolute", left: 90, top: 880, width: 810 * ease(f, 6, 36), height: 8, borderRadius: 4, background: C.hot }} />
      {steps.map((s, i) => {
        const p = usePop(6 + i * 9);
        return (
          <div key={s} style={{ position: "absolute", left: 90 + i * 300, top: 820, padding: "28px 34px", borderRadius: 26, background: i === 2 ? C.hot : C.card, color: i === 2 ? "#fff" : C.ink, boxShadow: "0 24px 50px -26px rgba(60,30,10,.45)", fontFamily: INTER, fontWeight: 900, fontSize: 44, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
            <span style={{ fontFamily: MONO, fontSize: 26, opacity: 0.7, marginRight: 10 }}>0{i + 1}</span>{s}
          </div>
        );
      })}
    </>
  );
};

// 5 agent searches, picks top GitHub repo
const S5 = () => {
  const f = useF();
  const pick = ease(f, 40, 52);
  return (
    <>
      <Headline text="It searches, then picks the *top* repo" size={86} />
      <Card top={760} h={500} delay={2}>
        <div style={{ padding: 34 }}>
          <div style={{ padding: "16px 22px", borderRadius: 16, background: "#F3EEE7", fontFamily: MONO, fontSize: 28, color: C.soft }}>🔎 fix solana build error</div>
          {[{ n: "github.com/…/solana-starter-kit", s: "★ 286", top: true }, { n: "docs.solana.com/…", s: "" }, { n: "stackoverflow.com/…", s: "" }].map((r, i) => (
            <div key={i} style={{ marginTop: 20, padding: "20px 22px", borderRadius: 18, border: `3px solid ${r.top && pick > 0.5 ? C.hot : "transparent"}`, background: r.top ? (pick > 0.5 ? C.hotTint : "#FBF8F3") : "#FBF8F3", display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: r.top ? 800 : 600, color: r.top ? C.ink : C.soft }}>
              <span>{r.n}</span><span style={{ fontFamily: MONO, color: C.hot }}>{r.s}</span>
            </div>
          ))}
        </div>
        <Cursor x={interpolate(f, [0, 40], [600, 330], { extrapolateRight: "clamp" })} y={interpolate(f, [0, 40], [430, 170], { extrapolateRight: "clamp" })} click={pick} />
      </Card>
    </>
  );
};

// 6 that top repo installed a RAT
const S6 = () => {
  const st = usePop(30, 9);
  return (
    <>
      <Headline text="That top repo installed a *trojan*" size={88} accent={C.red} />
      <Card top={760} h={420} delay={2} style={{ background: "#FFFDF8" }}>
        <div style={{ padding: 38 }}>
          <div style={{ fontFamily: MONO, fontSize: 26, color: C.soft }}>README.md · Install</div>
          <Line w="80%" mt={22} /><Line w="60%" />
          <div style={{ marginTop: 26, padding: "18px 22px", borderRadius: 14, background: C.redTint, fontFamily: MONO, fontSize: 30, color: C.red, fontWeight: 700 }}>$ npm run setup</div>
          <Line w="70%" mt={26} />
        </div>
      </Card>
      <div style={{ position: "absolute", left: 300, top: 1130, transform: `rotate(-7deg) scale(${2 - st})`, opacity: st, padding: "12px 24px", border: `5px solid ${C.red}`, borderRadius: 14, background: "#FFFDF8", color: C.red, fontFamily: MONO, fontWeight: 700, fontSize: 36 }}>REMOTE ACCESS TROJAN</div>
      <div style={{ position: "absolute", left: 90, top: 1280, fontFamily: MONO, fontSize: 24, color: C.soft }}>Real case from the benchmark</div>
    </>
  );
};

// 7 auto-run on, nobody checks
const S7 = () => {
  const f = useF();
  return (
    <>
      <Headline text="With auto-run on, *nobody* checks" size={88} accent={C.red} />
      <Card top={790} h={230} delay={2}>
        <div style={{ padding: "0 44px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 38 }}>Auto-run commands</div>
            <div style={{ fontFamily: MONO, fontSize: 26, color: C.soft, marginTop: 6 }}>agent settings</div>
          </div>
          <Toggle on={1} />
        </div>
      </Card>
      {[0, 1, 2].map((i) => {
        const p = ease(f, 14 + i * 12, 34 + i * 12);
        return <div key={i} style={{ position: "absolute", left: 90 + p * 120, top: 1090 + i * 56, fontFamily: MONO, fontSize: 28, color: C.red, opacity: Math.min(p * 4, 1), whiteSpace: "nowrap" }}>$ curl … | sh  ✓ auto-approved</div>;
      })}
    </>
  );
};

// 8 turn it off
const S8 = () => {
  const f = useF();
  const off = ease(f, 18, 28);
  const ok = usePop(30);
  return (
    <>
      <Headline text="Turn off *auto-run* for terminal commands" size={84} accent={C.green} />
      <Card top={830} h={230} delay={2}>
        <div style={{ padding: "0 44px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 38 }}>Auto-run commands</div>
            <div style={{ fontFamily: MONO, fontSize: 26, color: C.soft, marginTop: 6 }}>agent settings</div>
          </div>
          <Toggle on={1 - off} />
        </div>
      </Card>
      <div style={{ position: "absolute", left: 90, top: 1120, opacity: ok, transform: `scale(${0.8 + 0.2 * ok})`, transformOrigin: "left center" }}>
        <Chip text="✓ OFF" bg={C.greenTint} fg={C.green} style={{ fontSize: 40 }} />
      </div>
    </>
  );
};

// 9 AI writes, you approve
const S9 = () => {
  const f = useF();
  const ok = ease(f, 34, 44);
  return (
    <>
      <Headline text="AI writes the code. *You* approve what runs." size={82} accent={C.green} />
      <Card top={830} h={330} delay={2}>
        <div style={{ padding: 38 }}>
          <div style={{ fontFamily: MONO, fontSize: 26, color: C.soft }}>AGENT WANTS TO RUN</div>
          <div style={{ marginTop: 14, padding: "16px 22px", borderRadius: 14, background: "#F3EEE7", fontFamily: MONO, fontSize: 30 }}>$ npm install react</div>
          <div style={{ display: "flex", gap: 20, marginTop: 26 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "20px 0", borderRadius: 18, background: "#F3EEE7", fontWeight: 800, fontSize: 32 }}>Deny</div>
            <div style={{ flex: 1, textAlign: "center", padding: "20px 0", borderRadius: 18, background: ok > 0.5 ? C.green : "#F3EEE7", color: ok > 0.5 ? "#fff" : C.ink, fontWeight: 800, fontSize: 32 }}>Approve</div>
          </div>
        </div>
        <Cursor x={interpolate(f, [0, 34], [150, 540], { extrapolateRight: "clamp" })} y={interpolate(f, [0, 34], [80, 250], { extrapolateRight: "clamp" })} click={ok} />
      </Card>
      <div style={{ position: "absolute", left: 90, top: 1215, fontFamily: MONO, fontSize: 26, color: C.soft, opacity: ok }}>you read it, then you approve</div>
    </>
  );
};

// 10 follow
const S10 = () => {
  const f = useF();
  const pulse = 1 + Math.sin(f / 6) * 0.03;
  return (
    <>
      <Headline text="The AI stories *nobody's* covering yet" size={86} />
      <div style={{ position: "absolute", left: 90, top: 860, display: "flex", alignItems: "center", gap: 28, opacity: usePop(6) }}>
        <div style={{ width: 130, height: 130, borderRadius: 99, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", color: C.hot, fontFamily: MONO, fontWeight: 700, fontSize: 52 }}>uc</div>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 52, color: C.ink }}>@theunseencue</div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 1060, transform: `scale(${pulse})`, transformOrigin: "left center", opacity: usePop(12), padding: "26px 60px", borderRadius: 24, background: C.hot, color: "#fff", fontFamily: INTER, fontWeight: 900, fontSize: 48 }}>Follow</div>
    </>
  );
};

const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];

export const VibeAgent: React.FC<{ audit?: boolean }> = ({ audit }) => (
  <AbsoluteFill id="vibe-root" style={{ background: C.bg }}>
    <Grid />
    {SCENES.slice(0, STARTS.length - 1).map((S, i, arr) => <SceneLayer key={i} i={i} Comp={S} starts={STARTS} last={i === arr.length - 1} />)}
    <Captions words={WORDS} />
    {!audit && <Audio src={staticFile("scout-vibe-v2-voice.wav")} />}
    {audit && <Audit rootId="vibe-root" />}
  </AbsoluteFill>
);
