# Reference reel style notes

What two reference reels look like, written so Scout can build its own reels in a similar style. This is a description only: no footage, frames, audio or text from these reels is stored in this repo. Both reels are by @ryan_bro0ks; describe and adapt, never copy.

- **A:** https://www.instagram.com/reel/DgH4GAaqd91/ (38.9s, 1080x1920, about 1.4k likes and 2.9k comments, CTA "Comment skill")
- **B:** https://www.instagram.com/reel/DfpPh3Vq_C5/ (24.0s, 720x720 square content shown in a 9:16 frame, CTA "Comment KIT")

**How this was observed:** I sampled frames about every 1–5s in Chrome on 25 Nov 2026, watching with the sound off. Hex colours and sizes are estimates from screenshots.

**Audio was not checked.** I could not listen, so the music and voiceover sections below are unknown or inferred, and are marked that way.

---

## Style A: "glowing wireframe" (dark, cinematic, 3D line art)

### Layout and safe areas
- The full 1080x1920 frame is used. The hero object sits centred, at about y 450–1250, roughly 60–80% of the frame width.
- The caption is a single line centred at about y 1450–1500 (about 76–78% of the height). That's above the Instagram bottom UI and well inside our own rule of keeping captions around y 1300–1500.
- There's nothing at the top or bottom edges: no header, no logo, no handle, no progress bar.

### Background
- Pure black (#000000 to about #050505), with a very faint vignette or haze around the object.
- No grid, gradient or texture.

### Colour palette
- Monochrome: white lines #FFFFFF with a soft white bloom.
- The bright spots are a white "hot point" (a pen tip or spark) at about #FFFFFF with a 20–40px glow.
- The caption is white #FFFFFF at roughly 85–90% opacity.
- There are no accent colours at all. Restraint is the style.

### Objects and b-roll
- Every scene is one 3D object drawn as glowing white wireframe or outline geometry, like a holographic blueprint. Examples seen, in order:
  - a typewriter printing a tall page of text lines
  - a small robot standing on a glowing ring platform
  - a chess board with pawns and "?" thought bubbles
  - an isometric block city or grid with a pulsing centre
  - a painter's easel with rule-of-thirds guide lines and a glowing focus point
  - a wave or ribbon curve over flat lines
  - a cryptex or combination lock whose letter rings spell the keyword ("SKILL")
  - a final pill-shaped input box typing the keyword, with a send button
- Objects have depth: the camera slowly orbits or tilts at about 5–15° per scene. Lines catch light.
- There are no UI screenshots, no photos and no human faces.

### Fonts and captions
- The caption font is a geometric sans in a light or regular weight (Poppins Light or a similar style). It's small: about 44–52px at 1080 width, and lowercase except for proper nouns.
- Captions show **1–3 words at a time** in sync with the voice ("You can" → "most" → "most detailed" → "don't know how").
- New words fade in from a slight blur, and older words fade or blur out as the phrase moves on. There's no highlight colour and no box or pill behind the text.

### Motion
- There are no hard cuts. Each scene morphs or dissolves into the next: the old object fades or blurs out while the new one fades in, over about 0.3–0.5s.
- Each object scene lasts about **3–6s** (roughly 8–9 objects in 39s).
- Within a scene the motion is continuous: a slow camera orbit or dolly, the object animating (paper feeding, lock rings rotating, pulses travelling along lines), and particles or sparks along the lines.
- The pacing is calm and premium, not frantic.

### Transitions, progress and ending
- Transitions are cross-dissolves or blur dissolves only.
- There's no progress bar.
- The ending is the keyword typed into an input pill, which works as the comment CTA visual.

### Music (inferred, not heard)
- Unknown. Given the look, probably soft ambient or cinematic pads under the voice.

### Voiceover (inferred from captions, not heard)
- It's a first-person narration ("I turned…") delivered at a conversational pace.
- Captions change about every 0.3–0.6s with 1–3 words each, which suggests roughly 140–170 wpm.
- Gender, AI or human, pitch and energy: **unknown**.

---

## Style B: "clean SaaS kinetic type + UI mockups" (light, product-explainer)

### Layout and safe areas
- The content is a 1:1 square centred in the 9:16 frame. Above and below it are soft, blurred grey-white gradient bands.
- For our 1080x1920 version: build natively at full 9:16 and keep content in y 300–1500.
- Headlines sit at about the vertical centre, with UI cards just below them.

### Background
- Off-white, from #F5F6F5 to #FAFAFA, with a very faint mint radial glow on one side.
- Mid-reel there's one dark section: near-black green #0F1A14 to #141A16, with soft green and teal bokeh glows.

### Colour palette
- Text: #1A1A1A, a near-black headline colour.
- Brand green, used for positive words, icons and pills: about #2EBE7E, with a pale mint tint behind it of about #E3F6EC.
- Alert or problem red-coral, used for negative words and pills: about #E5534B, with a pale tint of about #FDE5E3.
- Grey for secondary text: about #8A8F8C.
- Cards are white #FFFFFF with large soft shadows and 24–32px radius.

### Fonts and sizes
- The headline font is a geometric or grotesk sans (Inter or SF Pro Display style) in Bold or Heavy, with tight tracking. Scaled to 1080 width it's about 90–110px.
- Problem words are coloured red ("Struggling"), and the keyword is coloured green ("skill", "KIT").
- UI text inside cards is about 32–40px Medium or Semibold.
- Step labels are dark numbered chips like "03", followed by bold text.

### Captions and on-screen text
- There are no subtitle-style captions. The **headline is the caption**: kinetic phrases of 3–6 words that are rebuilt word by word.
- Example structure: "You don't have a [skill pill]" changes to "You have a [client acquisition pill with a typing cursor]".
- Words slide or rise in, and a replaced word fades out to light grey with a strike-through feel before the new one types in.
- Pills: a rounded highlight box (green or red tint) around the key phrase, sometimes with a tiny progress bar ("4%") or a typing cursor.

### Motion
- Kinetic typography and UI-mockup animations, each scene about 2–4s.
- Elements pop in with a spring scale from about 0.9 to 1 with a small overshoot, then fade and rise in.
- Typing animations appear in pills and message cards.
- One scene shows a single icon (user avatar in a green circle) with concentric ripple rings expanding.
- A horizontal step timeline ("Find → Research → Write → Follow up") pans sideways, with a location-pin marker dropping and particle dots dissolving the first step.
- There's a gentle camera push-in on cards.

### UI mockups used
- An inbox card: search bar, red "0" badge, empty-state icon, "No new projects".
- A message composer: "To: [name]", with personalised words highlighted in green.
- Step chips with icons.
- An app-style rounded-square icon (briefcase).
- A comment bar with the keyword and a green send button.
- A "Sent to you" confirmation pill.

### Transitions, progress and ending
- Mostly fast cross-fades plus pop-ins. Background flips between light and dark for the "where most people get stuck" section.
- There's no progress bar.
- The ending is a big CTA, 'Comment "KIT"', with the comment bar and a delivered-confirmation pill. It's a comment-keyword funnel.

### Music and voiceover
- Not heard, so **unknown**.
- Text pacing suggests about 150–170 wpm, with phrases reset every 2–3s.

---

## What to take for @theunseencue / Scout (suggestion)

- **Calm investigative explainers fit Style A.** Use one glowing line-art object per beat (a bank vault, a robot hand on a keyboard, a padlock, a terminal window) on black, with small 1–3-word synced captions at y about 1450.
  - Our channel rule says "vibrant, never dark", so either swap black for a deep colour plus one vibrant accent line colour, or use Style A only as the hook scene.
- **Step-by-step or "how to protect yourself" reels fit Style B.** Use a light background, bold headline with red-for-problem and green-for-fix words, UI mockup cards (settings toggles such as "Auto-run: OFF"), and a numbered step chip per tip.
  - This matches our "vibrant" rule better. For the vibe-coder reel it would be a terminal card showing an auto-approved `npm install` from a fake repo, then a `.env` key being taken, then the settings toggle switching auto-run OFF.
- **What both reels share** (worth copying as rules):
  - one idea per scene
  - scenes of about 2–5s
  - no hard cuts
  - no progress bar
  - captions synced to the voice in small chunks
  - a CTA that shows the comment keyword being typed

---

## The whole account: what actually works for @ryan_bro0ks

**Profile, as of 25 Nov 2026:**
- 2,038 followers, 39 posts.
- Bio: "Turn AI video editing into a business. Learn to create, sell & get clients."
- Niche: Claude-made motion graphics, plus selling them as a service.

**Views, read from the reels grid:**
- Median of his last 12 reels: about **3,000 views**.
- Older reels typically got 100–1,000.

**How each reel did compared with that median.** I sampled frames from every reel in this table.

| Reel | Views | × median | Format | Topic / hook |
|---|---|---|---|---|
| DgH4GAaqd91 | 62.9k | **~21×** | Style A wireframe | "You can make the most detailed animations… but Claude's animations…" → comment "skill" |
| DgBYbxYKIWv | 56.3k | **~19×** | Dark grid + orange accent, kinetic type, MOTION.md card | "Most AI animations look robotic" → this file/skill fixes it |
| Df0hZHgK2jB | 19.3k | **~15×** (vs the median at that time, about 1k) | Dark glass UI card, "ease: linear" demo, Claude logo, "Learn this skill" | "Most AI-generated [animations] look robotic" |
| DgGSxNwo-uh | 1.6k | 0.5× | Phone-filmed screen recording + "claude just cooked 🔥 comment 'skill'" | Raw demo |
| DfvJsB4qdTZ | 416 | ~0.4× | Style A wireframe (same look as the 62.9k hit) | Freelance cold DMs ("Everybody tells you…") |
| DfpPh3Vq_C5 (ref B) | 644 | ~0.6× | Style B light SaaS | Client acquisition kit |

### What this tells us (12 recent reels plus older grid counts, so confidence is moderate)

1. **The look is not what made his reels pop.** The same wireframe style got 62.9k on one topic and 416 on another.
2. **All 3 outliers use the same hook**: "Most AI animations look robotic" (a common problem everyone has seen) → show the fix → "comment *skill*". That's a pain-point hook plus a visible before/after plus a comment keyword.
3. **The topic is "AI tool does X better"**, with Claude named, so the hook points at a tool people already use.
   - His business and freelancing topics (getting clients, DMs) all sit under the median, even with the premium visuals.
4. **Phone-filmed screen recordings ("claude just cooked") underperform.** His polished, designed motion reels beat raw demos by roughly 20×.
5. **The first frame always shows movement and a big headline in the first 0.3s.** The text resolves from a blur, and one accent word is coloured or in a different font, like "robotic" in orange mono.

### Style C: "dark grid + one hot accent" (the 56.3k and 19.3k hits)

- **Background:** near-black #0E0F12 with a faint dot grid and a warm orange glow from the bottom corner.
- **Text and accent:** white bold sans headline with ONE accent word in orange #FF6A2B, sometimes in a monospace font ("robotic").
- **Shapes and cards:**
  - an orange rounded square or a starburst as the "animated object"
  - frosted dark glass cards with mono labels ("AI-generated", "ease: linear")
  - a cream paper card for the file (MOTION.md)
- **Motion:**
  - motion blur on fast moves
  - text that wobbles or distorts to show "bad" animation, then a clean version
  - a brief flip to a cream background (#F1ECE3) to show the "smooth" result
- **Ending:** the Claude logo plus a "Learn this skill" bar, which is the comment-keyword CTA.

### What to steal for @theunseencue
- Lead with a **problem the viewer has already felt** about an AI tool they use ("Your AI agent can run commands without asking"), not a news headline.
- Show it visibly: a broken or dangerous version first, then the fix (for example auto-run ON → keys leak, then OFF → blocked).
- Use one accent colour per reel and a dark grid background with a vibrant accent. The vibrant accent keeps our "vibrant, never dark" rule if the accent dominates; alternatively use the light Style B.
- End with a comment keyword that gives something real, like a checklist (only if we actually send it).
