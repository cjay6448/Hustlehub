# HustleHub.ca — Project Context

## Owner
CJ — Solopreneur, Abbotsford BC
CS/Engineering grad, ~7 years sales (Shaw/Rogers/Sage)

## What This Site Is
HustleHub.ca is a Canadian personal finance website targeting 40,000+ monthly readers.
Covers: government benefits, tax credits, TFSA/RRSP, side income, housing.
No ads, no sponsors, always free.

---

## Tech Stack
- Framework: Next.js 16.2.2 (App Router)
- Language: TypeScript (strict mode OFF — ignoreBuildErrors: true)
- Animations: Framer Motion
- Hosting: Vercel (free tier, auto-deploys on git push)
- Content: WordPress.com REST API (not yet connected — using dummy data)
- GitHub: https://github.com/cjay6448/Hustlehub
- Local dev: C:\Users\cjay6\Projects\hustlehub
- Run locally: npm run dev → localhost:3000

---

## Design System (LOCKED — do not change without approval)

### Colors (styles/tokens.ts)
- forest:      #1a3a2a  (primary dark green — backgrounds, buttons)
- forestMid:   #2d5a42  (medium green — gradients)
- amber:       #c97a0a  (accent — CTAs, highlights)
- amberL:      #e8960e  (lighter amber — stats, maple leaves)
- amberPale:   #fef4e0  (very light amber — pills, badges)
- cream:       #fdf8f0  (page background)
- creamD:      #f2e8d8  (slightly darker cream — section backgrounds)
- creamDD:     #e8dcc8  (borders)
- charcoal:    #252220  (dark — footer background)
- muted:       #7a7060  (body text, subtitles)
- mutedL:      #b0a898  (lighter muted — timestamps, captions)
- white:       #ffffff

### Fonts
- FD: Playfair Display (headings, serif)
- FB: Source Sans 3 (body, sans-serif)
- FM: JetBrains Mono (labels, tags, monospace)
- Loaded via Google Fonts in globals.css

### Key Design Decisions
- Maple leaf SVG icon: path "M50 5L57 30L75 20L65 40L90 38L72 55L80 80L60 68L50 90L40 68L20 80L28 55L10 38L35 40L25 20L43 30Z"
- Logo: rounded square forest badge + amber maple + "HustleHub" wordmark (designed by Nano Banana)
- Bottom nav: mobile only (max-width 768px), hidden on desktop
- Popup: newsletter, triggers at 40% scroll OR 5s timer, blurred backdrop

---

## File Structure
```
hustlehub/
├── app/
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── contact/page.tsx
│   ├── contributors/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── founder/page.tsx
│   ├── not-found.tsx        ← 404 page
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── globals.css
│   ├── layout.tsx           ← Navbar + Footer + BottomNav on every page
│   └── page.tsx             ← Homepage
├── components/
│   ├── BottomNav.tsx        ← Mobile only nav (5 tabs)
│   ├── Footer.tsx
│   └── Navbar.tsx
├── styles/
│   └── tokens.ts            ← All colors + fonts
├── public/                  ← Static assets (logo files go here)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Homepage Sections (top to bottom)
1. Hero — headline, $3,400 stat card (counts up), two CTAs, trust dots
2. Stats bar — forest green, 40K+/120+/100%/Free (40K counts up)
3. Featured carousel — 5 posts, slow auto-scroll, mobile edge-to-edge
4. Pillars — 4 topic cards (Benefits, Investing, Side Income, Housing)
5. Newsletter banner — full width forest green, email form
6. Footer — charcoal, 4-column grid (collapses on mobile)
7. Bottom nav — mobile only, 5 tabs (Home/Blog/About/Me/Contact)

---

## Key Components & Patterns

### Writing files safely (IMPORTANT)
NEVER paste large code blocks into VS Code on Windows — causes UTF-8 corruption.
Always write files via Python scripts:
```python
import pathlib
pathlib.Path("app/page.tsx").write_text(content, encoding="utf-8")
```
Run with: python3 C:\Users\cjay6\Downloads\scriptname.py

### Deploying changes
```
git add .
git commit -m "describe change"
git push
```
Vercel auto-deploys in ~60 seconds.

### TypeScript
Strict mode is OFF. ignoreBuildErrors: true in next.config.ts.
No need for explicit types on simple components.

### CSS Media Queries
- Mobile: max-width 768px
- Bottom nav shows ONLY below 768px
- Carousel is edge-to-edge on mobile, contained on desktop (min-width 1024px)

---

## Pages Status
- Homepage: complete
- Blog: placeholder (needs WordPress API connection)
- About: complete
- Contact: complete (form UI only, no backend)
- Founder: complete
- Privacy: complete
- Terms: complete
- Contributors: complete (placeholder profiles)
- Contributors/[slug]: complete (contact form UI)
- 404: complete

---

## Pending / Next Steps
1. Connect WordPress.com REST API to blog page
   - API: https://public-api.wordpress.com/wp/v2/sites/hustlehub.ca/posts
   - Build app/blog/[slug]/page.tsx for individual articles
2. Point hustlehub.ca domain to Vercel (DNS change in WordPress.com dashboard)
3. Add real logo files to public/ folder and update Navbar/Footer
4. Connect newsletter forms to Mailchimp or Kit
5. Add Google Search Console + sitemap
6. Add structured data (JSON-LD) for articles

---

## Domain & Hosting
- Domain: hustlehub.ca (registered on WordPress.com)
- Current site: WordPress.com (still live at hustlehub.ca)
- New site: Vercel (live at hustlehub.vercel.app)
- To go live: change DNS in WordPress.com dashboard to point to Vercel

---

## How to Start a New AI Session
1. Open this file: CONTEXT.md
2. Copy everything
3. Paste into new chat and say: "This is my HustleHub.ca project context. I need help with [describe what you need]."
