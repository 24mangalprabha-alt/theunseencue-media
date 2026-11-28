# Launch Guard: a Claude skill for vibe coders

Checks your app for the five mistakes that leaked real apps, before you launch:

1. Database rules (Supabase RLS / Firebase rules)
2. Open storage buckets
3. Exposed API keys (browser code + git history)
4. Fake or typo packages
5. An AI agent with access to production

Plus 15 quick checks (SQL injection, XSS, CSRF, uploads, SSRF, rate limits, passwords, server-side
permissions, JWT secret, tokens, default logins, CORS, webhooks, source maps, logs).

You get a red/green report, then Claude fixes what's red, only after you say yes.

## Install

**Claude Code:** copy the `launch-guard` folder into `~/.claude/skills/` (all projects) or
`.claude/skills/` inside your project. Then say: "run launch guard on this app".

**Claude.ai / Desktop:** download this folder as a zip, then add it under
Settings → Capabilities → Skills.

## Honest limits

It covers the most common leaks, not everything. Before you handle payments or sensitive data,
also run `/security-review` in Claude Code or get a human security review.

Made by @theunseencue. Free to use.
