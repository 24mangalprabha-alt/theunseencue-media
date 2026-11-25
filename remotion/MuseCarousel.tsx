// Carousel (1080x1350): Meta's Muse AI agent arrives in Instagram DMs (24 Nov 2026) + Reuters Signal test (18 Nov).
// Rendered as stills at frame 90 (all animations settled). Same look as the new-style reels.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, Chip, Grid, INTER, MONO } from "./kit";

export const MUSE_SLIDES = 6;

const Kicker = ({ t, color = C.hot }: { t: string; color?: string }) => (
  <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color }}>{t}</div>
);
const H = ({ children, size = 96 }: { children: React.ReactNode; size?: number }) => (
  <div style={{ fontFamily: INTER, fontWeight: 900, fontSize: size, lineHeight: 1.02, letterSpacing: -3.5, color: C.ink, marginTop: 22 }}>{children}</div>
);
const A = ({ children, c = C.hot }: { children: React.ReactNode; c?: string }) => <span style={{ fontFamily: MONO, fontWeight: 700, letterSpacing: -2, color: c }}>{children}</span>;
const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, borderRadius: 34, boxShadow: "0 40px 80px -36px rgba(60,30,10,.4), 0 8px 20px -10px rgba(60,30,10,.15)", fontFamily: INTER, ...style }}>{children}</div>
);
const Src = ({ t }: { t: string }) => <div style={{ position: "absolute", left: 0, bottom: 0, fontFamily: MONO, fontSize: 24, color: C.soft }}>{t}</div>;
const Page = ({ i }: { i: number }) => <div style={{ position: "absolute", right: 80, bottom: 70, fontFamily: MONO, fontSize: 24, color: C.soft }}>{i}/{MUSE_SLIDES}</div>;
const Body = ({ children }: { children: React.ReactNode }) => <div style={{ fontFamily: INTER, fontWeight: 500, fontSize: 44, lineHeight: 1.3, color: "#3B342E", marginTop: 36 }}>{children}</div>;

const Bubble = ({ who, text, me }: { who?: string; text: string; me?: boolean }) => (
  <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginTop: 18 }}>
    <div style={{ maxWidth: 560, padding: "20px 26px", borderRadius: 30, background: me ? C.hot : "#F1ECE4", color: me ? "#fff" : C.ink, fontSize: 34, fontWeight: 600, lineHeight: 1.25 }}>
      {who && <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: C.hot, marginBottom: 6 }}>{who}</div>}
      {text}
    </div>
  </div>
);

const S1 = () => (
  <>
    <Kicker t="NEW · 24 NOV 2026" />
    <H size={104}>Meta's AI just moved into your <A>Instagram DMs</A></H>
    <Card style={{ marginTop: 60, padding: "30px 34px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 18, borderBottom: "2px solid #F1ECE4" }}>
        <div style={{ width: 64, height: 64, borderRadius: 99, background: `conic-gradient(${C.hot}, #FFB547, ${C.hot})` }} />
        <div><div style={{ fontWeight: 800, fontSize: 34 }}>Muse</div><div style={{ fontFamily: MONO, fontSize: 22, color: C.soft }}>Meta AI agent · in your chats</div></div>
      </div>
      <Bubble me text="Catch me up on the DMs I missed" />
      <Bubble who="MUSE" text="Here are the 3 chats you missed…" />
    </Card>
  </>
);

const S2 = () => (
  <>
    <Kicker t="WHAT IT DOES" />
    <H>An AI agent <A>inside</A> your chats</H>
    <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 50 }}>
      {[["01", "Sorts your saved posts into folders"], ["02", "Turns a recipe reel into a grocery list"], ["03", "Helps you catch up on missed DMs"]].map(([n, t]) => (
        <Card key={n} style={{ padding: "30px 34px", display: "flex", alignItems: "center", gap: 26 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, color: "#fff", background: C.ink, borderRadius: 14, padding: "8px 14px" }}>{n}</span>
          <span style={{ fontWeight: 800, fontSize: 40 }}>{t}</span>
        </Card>
      ))}
    </div>
    <Body>Rolling out now in the US, Canada, Mexico, Japan and Singapore.</Body>
    <Src t="Source: TechCrunch, 24 Nov 2026" />
  </>
);

const Dev = ({ name, read }: { name: string; read: boolean }) => (
  <Card style={{ flex: 1, padding: "34px 20px", textAlign: "center" }}>
    <div style={{ fontWeight: 800, fontSize: 38 }}>{name}</div>
    <div style={{ marginTop: 22 }}><Chip text={read ? "TEXT SEEN" : "BLOCKED"} bg={read ? C.redTint : C.greenTint} fg={read ? C.red : C.green} style={{ fontSize: 26 }} /></div>
  </Card>
);
const S3 = () => (
  <>
    <Kicker t="THE TWIST" color={C.red} />
    <H>6 days earlier, Reuters <A c={C.red}>tested it</A></H>
    <Body>With Signal and the AI Now Institute, Reuters checked whether Muse could see encrypted Signal messages.</Body>
    <div style={{ display: "flex", gap: 20, marginTop: 44 }}>
      <Dev name="Android" read /><Dev name="Mac" read /><Dev name="iPhone" read={false} />
    </div>
    <Src t="Source: Reuters, 18 Nov 2026" />
  </>
);

const S4 = () => (
  <>
    <Kicker t="HOW IT GOT IN" />
    <H size={92}>Through access <A>you</A> can switch on</H>
    <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 46 }}>
      <Card style={{ padding: "30px 34px" }}><div style={{ fontFamily: MONO, fontSize: 24, color: C.soft }}>ANDROID</div><div style={{ fontWeight: 800, fontSize: 40, marginTop: 6 }}>Notification access</div></Card>
      <Card style={{ padding: "30px 34px" }}><div style={{ fontFamily: MONO, fontSize: 24, color: C.soft }}>MAC</div><div style={{ fontWeight: 800, fontSize: 40, marginTop: 6 }}>Accessibility access</div></Card>
    </div>
    <Body>Meta called these "isolated incidents" and says Muse only reaches other apps with permissions you grant.</Body>
    <Src t="Sources: Reuters, 18 Nov · Meta" />
  </>
);

const Row = ({ t, s }: { t: string; s: string }) => (
  <Card style={{ padding: "26px 32px", display: "flex", alignItems: "center", gap: 24 }}>
    <div style={{ width: 54, height: 54, borderRadius: 99, background: C.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, flexShrink: 0 }}>✓</div>
    <div><div style={{ fontWeight: 800, fontSize: 36 }}>{t}</div><div style={{ fontFamily: MONO, fontSize: 22, color: C.soft, marginTop: 4 }}>{s}</div></div>
  </Card>
);
const S5 = () => (
  <>
    <Kicker t="WHAT YOU CONTROL" color={C.green} />
    <H size={92}>Keep your chats <A c={C.green}>yours</A></H>
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 44 }}>
      <Row t="Only give Muse the access you need" s="Meta: access is set per connection" />
      <Row t="Think twice before notification access" s="Android: how it saw Signal texts" />
      <Row t="Ask Muse to forget, or undo" s="Meta says you can, any time" />
      <Row t="Nothing gets sent without your OK" s="Meta's promise" />
    </div>
  </>
);

const S6 = () => (
  <>
    <Kicker t="YOUR CALL" />
    <H size={100}>Would you let an AI read your <A>DMs</A>?</H>
    <Body>Tell me in the comments. This is part 2 of our story on AI and your private chats (part 1: Signal blocking AI).</Body>
    <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 70 }}>
      <div style={{ width: 120, height: 120, borderRadius: 99, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", color: C.hot, fontFamily: MONO, fontWeight: 700, fontSize: 48 }}>uc</div>
      <div>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 48 }}>@theunseencue</div>
        <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 32, color: C.soft }}>The AI stories nobody's covering yet</div>
      </div>
    </div>
    <div style={{ display: "inline-block", marginTop: 40, padding: "24px 56px", borderRadius: 24, background: C.hot, color: "#fff", fontFamily: INTER, fontWeight: 900, fontSize: 44 }}>Follow</div>
  </>
);

const SLIDES = [S1, S2, S3, S4, S5, S6];

export const MuseCarousel: React.FC<{ slide: number }> = ({ slide }) => {
  const S = SLIDES[slide - 1];
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Grid />
      <div style={{ position: "absolute", left: 80, top: 110, width: 920, height: 1170 }}><S /></div>
      <Page i={slide} />
    </AbsoluteFill>
  );
};
