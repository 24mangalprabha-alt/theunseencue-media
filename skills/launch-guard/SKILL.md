---
name: launch-guard
description: Pre-launch security check for vibe-coded apps (Lovable, Bolt, Replit, Cursor, Claude Code, v0, Supabase, Firebase). Checks the five mistakes that leaked real apps (database rules, open storage, exposed keys, fake packages, an AI agent with production access), runs 15 quick checks (injection, XSS, CSRF, rate limits, CORS, webhooks and more), gives a red/green report, then fixes what is red with your OK. Use it whenever someone says they are about to launch, publish, deploy or share an app, asks "is my app secure?", or mentions Supabase RLS, Firebase rules, API keys, .env files or AI agents touching production.
---

# Launch Guard

You are checking a vibe-coded app before it goes live. The owner is probably not a security
expert, so explain everything in plain words, one short sentence per finding.

These five checks come from real incidents:
- Missing Supabase Row Level Security let strangers read and write data in Lovable-built apps
  (CVE-2025-48757).
- An open Firebase storage bucket leaked ~72,000 images from the Tea app (July 2025).
- An AI agent deleted a live production database during a code freeze (Replit / SaaStr, July 2025).
- AI models suggest packages that do not exist, and attackers register those names
  ("slopsquatting", Spracklen et al., USENIX Security 2025).
- Leaked API keys in front-end code or git history are the most common way apps get billed or
  breached.

## Rules while checking

- **Read first, change nothing** until the report is shown and the owner says yes.
- **Never print a secret.** If you find a key, show only its first 4 characters and the file
  and line, like `sk-a…(redacted) in src/lib/api.ts:12`.
- **Never connect to, query or change a production database** yourself. Check the rules and
  config in the code; if something needs testing live, tell the owner exactly what to click.
- If a check does not apply (for example, no Firebase), mark it ⚪ N/A and move on.

## The five checks

### 1. Database rules
- **Supabase:** every table in `supabase/migrations/*.sql` (or the schema the app uses) must
  have `enable row level security`, and policies must not be `using (true)` /
  `with check (true)` for `anon` or `authenticated` on tables with user data. Each policy should
  tie rows to `auth.uid()` (or a clear public-read reason).
- **Firebase / Firestore:** `firestore.rules` must not contain `allow read, write: if true;`
  or rules with no `request.auth` check on user data.
- **Any backend:** every endpoint that reads or changes a record must check that the record
  belongs to the logged-in user, not just that someone is logged in.
- 🔴 if any user-data table is readable or writable by anyone.

### 2. Open storage
- **Firebase Storage:** `storage.rules` must not allow public read/write on user uploads.
- **Supabase Storage:** buckets with user files (IDs, selfies, documents) must not be `public`;
  check policies on `storage.objects`.
- **S3 / GCS / R2:** look for buckets or URLs set to public in config or infra files.
- Check for old or "legacy" buckets that are still open (that is what hit Tea).
- 🔴 if user uploads can be listed or downloaded without logging in.

### 3. Exposed keys
- Search front-end code (anything shipped to the browser: `src/`, `app/`, `pages/`,
  `components/`, `public/`) for secret keys: `service_role`, `sk-`, `sk_live_`, `AKIA`,
  `-----BEGIN`, `xoxb-`, `ghp_`, and env vars with names like `SECRET`, `PRIVATE`, `SERVICE`.
  Note: Supabase `anon` keys and Firebase web config are meant to be public; they are only safe
  if checks 1 and 2 pass.
- Env vars exposed to the browser (`NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, `EXPO_PUBLIC_`)
  must not hold secrets.
- `.env*` files must be in `.gitignore` and not tracked: `git ls-files | grep -i '\.env'`.
- Scan git history: `git log -p --all -S 'service_role' -S 'sk_live_' | head` (or run
  `gitleaks detect` if installed). A key that was ever committed counts as leaked.
- 🔴 if a secret is in browser code or git history. The fix includes **rotating the key** at
  the provider, not just deleting it from the code.

### 4. Fake packages
- List every dependency in `package.json`, `requirements.txt`, `pyproject.toml` etc.
- For each one you do not recognise, check it really exists on the registry and looks
  legitimate: `npm view <name> time.created repository.url` or
  `pip index versions <name>` / the PyPI page. Red flags: created in the last few weeks, very
  few downloads, no repository, a name one letter off a famous package (`reqeusts`).
- Look for install scripts in new packages (`preinstall` / `postinstall`).
- Run the built-in audit: `npm audit --omit=dev` or `pip-audit`.
- 🔴 if a package does not exist, looks like a typo of a famous one, or has a critical
  vulnerability with a fix available.

### 5. AI agent with production access
- Are the app's development and production databases separate? Look for one connection string
  used everywhere, or production credentials in the local `.env` the agent can read.
- Does the agent (Claude Code, Cursor, Replit Agent…) have permission to run destructive
  commands without asking? Check `.claude/settings.json` / tool settings for broad allow rules
  such as `Bash(*)`, and for migrations or `DROP` / `TRUNCATE` / `db reset` in scripts the
  agent runs.
- Are there backups or point-in-time restore on the production database? (Ask the owner if
  it cannot be seen from code.)
- 🔴 if the agent can reach production data with write access and there is no backup.

## 15 quick checks

After the five big ones, run these. Each is a quick look in the code; mark 🟢, 🔴 or ⚪ N/A.
Which AI wrote the code does not matter: tests of 100+ models found the same kinds of holes
whatever the model (Veracode GenAI Code Security Report, 2025).

1. **SQL injection:** queries use parameters or an ORM, never strings glued with user input.
2. **XSS:** no user input rendered through `dangerouslySetInnerHTML`, `innerHTML`, `v-html`.
3. **CSRF:** forms that change data with cookie login have CSRF protection or `SameSite` cookies.
4. **File uploads:** type and size are checked on the server; uploads are never executed.
5. **SSRF:** the server does not fetch any URL a user types in without an allow-list.
6. **Rate limits:** login, sign-up, password reset and paid AI endpoints are rate-limited.
7. **Passwords:** hashed with bcrypt/argon2 (or handled by an auth provider); MFA for admins.
8. **Server-side permissions:** admin actions are blocked on the server, not just hidden in the UI.
9. **JWT secret:** long, random, server-only, not a default like `secret`.
10. **Tokens:** auth tokens are not stored in `localStorage` (use httpOnly cookies).
11. **Default logins:** no default or demo admin accounts or passwords left in seed data.
12. **CORS:** not `*` on endpoints that use cookies or return private data.
13. **Webhooks:** Stripe/GitHub/etc. webhook signatures are verified before acting.
14. **Source maps:** not published in production builds.
15. **Logs:** no passwords, tokens or personal data written to logs.

## The report

Show this, then stop and ask before fixing anything:

```
LAUNCH GUARD REPORT: <app name>

1. Database rules     🔴 / 🟢 / ⚪  <one plain sentence>
2. Open storage       🔴 / 🟢 / ⚪  <one plain sentence>
3. Exposed keys       🔴 / 🟢 / ⚪  <one plain sentence>
4. Fake packages      🔴 / 🟢 / ⚪  <one plain sentence>
5. Agent & production 🔴 / 🟢 / ⚪  <one plain sentence>
Quick checks          <n>/15 pass, <list the 🔴 ones by number and name>

Verdict: SAFE TO LAUNCH / FIX <n> THINGS FIRST
```

Under the table, for each 🔴: what an attacker could do (one line), the file and line, and the
exact fix you propose.

## Fixing

After the owner says yes:
- Fix one red item at a time and show the change.
- Database rules: write a new migration that enables RLS and adds owner-only policies; never
  edit production directly.
- Keys: move the secret to a server-only env var, add `.env*` to `.gitignore`, and tell the
  owner exactly where to rotate the key (you cannot do that part for them).
- Packages: remove or replace the bad package with the real one, then re-run the audit.
- Agent access: suggest separate dev/prod credentials, narrower permission rules, and turning
  on backups.
- Re-run all the checks and show the report again. Done only when every row is 🟢 or ⚪.

Finish with: "This covers the most common leaks, not everything. For a deeper pass, run
`/security-review` in Claude Code or ask a security professional before handling payments or
sensitive data."
