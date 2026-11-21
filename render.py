#!/usr/bin/env python3
"""Render Instagram media for @theunseencue from a JSON spec.

Usage: python3 render.py spec.json OUT_DIR

spec.json:
{
  "slug": "2026-11-21-some-story",
  "carousel": {"slides": [{"kicker": "AI NEWS", "title": "...", "body": "..."}, ...]},
  "reel": {"frames": [{"text": "...", "seconds": 3.0}, ...]}
}
Outputs in OUT_DIR: carousel_01.jpg ... (1080x1350 JPEG), reel.mp4 (1080x1920), reel_cover.jpg
"""
import json, os, subprocess, sys, textwrap
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIRS = [os.path.join(HERE, "fonts"), "/usr/share/fonts/opentype/inter"]
BG, FG, MUTED, ACCENT = (11, 13, 18), (245, 246, 248), (150, 156, 170), (198, 255, 61)
HANDLE = "@theunseencue"


def font(name, size):
    for d in FONT_DIRS:
        p = os.path.join(d, name)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)


def wrap(draw, text, fnt, max_w):
    lines = []
    for para in text.split("\n"):
        words, line = para.split(), ""
        for w in words:
            t = (line + " " + w).strip()
            if draw.textlength(t, font=fnt) <= max_w:
                line = t
            else:
                if line:
                    lines.append(line)
                line = w
        lines.append(line)
    return lines


def fit(draw, text, name, max_w, max_h, start, minimum, spacing=1.2):
    size = start
    while size >= minimum:
        f = font(name, size)
        lines = wrap(draw, text, f, max_w)
        h = len(lines) * size * spacing
        if h <= max_h:
            return f, lines, size
        size -= 4
    f = font(name, minimum)
    return f, wrap(draw, text, f, max_w), minimum


def draw_lines(draw, x, y, lines, fnt, size, fill, spacing=1.2, center=False, width=0):
    for ln in lines:
        if center:
            draw.text((x + (width - draw.textlength(ln, font=fnt)) / 2, y), ln, font=fnt, fill=fill)
        else:
            draw.text((x, y), ln, font=fnt, fill=fill)
        y += size * spacing
    return y


def carousel_slide(s, i, n, path):
    W, H, M = 1080, 1350, 96
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W, 14], fill=ACCENT)
    kicker = s.get("kicker", "AI NEWS").upper()
    d.text((M, 96), kicker, font=font("Inter-Bold.otf", 34), fill=ACCENT)
    d.text((W - M - 120, 96), f"{i}/{n}", font=font("Inter-Medium.otf", 34), fill=MUTED)
    y = 200
    title = s.get("title", "")
    big = i == 1 and not s.get("body")
    tf, tl, ts = fit(d, title, "InterDisplay-Bold.otf", W - 2 * M, 760 if big else 420, 120 if big else 84, 48, 1.1)
    y = draw_lines(d, M, y if not big else 360, tl, tf, ts, FG, 1.1) + 40
    body = s.get("body", "")
    if body:
        bf, bl, bs = fit(d, body, "Inter-Regular.otf", W - 2 * M, H - y - 200, 50, 30, 1.4)
        draw_lines(d, M, y, bl, bf, bs, (210, 214, 222), 1.4)
    d.text((M, H - 120), HANDLE, font=font("Inter-SemiBold.otf", 34), fill=FG)
    if i < n:
        d.text((W - M - 190, H - 120), "swipe  →", font=font("Inter-SemiBold.otf", 34), fill=ACCENT)
    im.save(path, "JPEG", quality=92)


def reel_frame(text, i, n, path):
    W, H, M = 1080, 1920, 90
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    # progress bar
    d.rectangle([M, 220, W - M, 228], fill=(40, 44, 54))
    d.rectangle([M, 220, M + (W - 2 * M) * i / n, 228], fill=ACCENT)
    f, lines, size = fit(d, text, "InterDisplay-Bold.otf", W - 2 * M, 1000, 104, 52, 1.15)
    h = len(lines) * size * 1.15
    draw_lines(d, M, (H - h) / 2 - 60, lines, f, size, FG if i > 1 else ACCENT, 1.15, center=True, width=W - 2 * M)
    hf = font("Inter-SemiBold.otf", 40)
    d.text(((W - d.textlength(HANDLE, font=hf)) / 2, H - 330), HANDLE, font=hf, fill=MUTED)
    im.save(path, "JPEG", quality=92)


def make_reel(frames, out):
    tmp = os.path.join(out, "_frames")
    os.makedirs(tmp, exist_ok=True)
    parts = []
    for i, fr in enumerate(frames, 1):
        img = os.path.join(tmp, f"f{i:02d}.jpg")
        reel_frame(fr["text"], i, len(frames), img)
        if i == 1:
            Image.open(img).save(os.path.join(out, "reel_cover.jpg"), "JPEG", quality=92)
        secs = float(fr.get("seconds", 3))
        clip = os.path.join(tmp, f"c{i:02d}.mp4")
        vf = (f"scale=1188:2112,zoompan=z='min(zoom+0.0008,1.06)':d={int(secs*30)}:s=1080x1920:fps=30,"
              f"fade=t=in:st=0:d=0.25,fade=t=out:st={secs-0.25}:d=0.25,format=yuv420p")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", img, "-t", str(secs),
                        "-vf", vf, "-c:v", "libx264", "-preset", "veryfast", "-r", "30", clip], check=True)
        parts.append(clip)
    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as fh:
        fh.writelines(f"file '{p}'\n" for p in parts)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst,
                    "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",
                    "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-profile:v", "high",
                    "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
                    os.path.join(out, "reel.mp4")], check=True)
    for f in os.listdir(tmp):
        os.remove(os.path.join(tmp, f))
    os.rmdir(tmp)


def main():
    spec = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    slides = spec.get("carousel", {}).get("slides", [])
    for i, s in enumerate(slides, 1):
        carousel_slide(s, i, len(slides), os.path.join(out, f"carousel_{i:02d}.jpg"))
    if spec.get("reel", {}).get("frames"):
        make_reel(spec["reel"]["frames"], out)
    print("\n".join(sorted(os.listdir(out))))


if __name__ == "__main__":
    main()
