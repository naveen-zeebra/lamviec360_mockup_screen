# LàmViệc360 Design System

LàmViệc360 is a Vietnam-first, AI-powered recruitment platform connecting job seekers with employers: public job search, job seeker profiles, one-click applications, application tracking, AI interview preparation, company job posting, candidate management, AI-assisted recruitment, team collaboration, subscriptions, and verified company profiles.

**Market:** Vietnam first, future APAC expansion. **Languages:** Vietnamese ,English( (primary), , Simplified Chinese, Japanese, Korean. **Primary users:** Job Seekers, Employers/Companies, HR & Recruiters, Super Admin. **Brand personality:** Professional, trustworthy, modern, human-centered, accessible, technology-driven.

## Sources

This is a from-scratch design system: no codebase, Figma file, or existing brand guide was provided. The only supplied asset is the brand logo (`uploads/WhatsApp Image 2026-08-20 at 10.45.14 AM.jpeg`, copied to `assets/logo.jpeg`). All colors, type, components, and screens below were newly designed to fit the brand brief (Vietnam-first recruitment SaaS, blue-led, trustworthy) and the logo's palette. If a real codebase or Figma file exists, attach it and this system should be revised to match it as ground truth.

## Components

Standard primitive set (no source library existed to enumerate against):

- **Core** (`components/core/`): Button, IconButton, Badge, Tag, Avatar, Card
- **Forms** (`components/forms/`): Input, Select, Checkbox, Radio, Switch
- **Feedback** (`components/feedback/`): Toast, Tooltip, Dialog
- **Navigation** (`components/navigation/`): Tabs

### Intentional additions

All 15 components are standard SaaS primitives added because no source defined a different inventory — sized to the brief's stated needs (job cards, applications, filters, dashboards).

## UI Kits

- `ui_kits/job-seeker/` — job search, filters, job detail + apply, application tracking, profile.
- `ui_kits/employer/` — hiring dashboard, job postings, candidate pipeline, company/team settings.

Super Admin surfaces were not built (out of scope for this pass) — flag if needed next.

## Index

- `styles.css` — root stylesheet, imports everything below.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — design tokens.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups) shown in the Design System tab.
- `assets/logo.jpeg` — brand logo (only visual asset provided).
- `components/` — 15 reusable primitives (see above).
- `ui_kits/` — Job Seeker and Employer product recreations.
- `SKILL.md` — portable skill definition for use in Claude Code.

## Content Fundamentals

- **Language & voice:** Vietnamese-first copy, written in a direct, respectful, professional register (using "Bạn" for the user, never overly casual slang). English strings are plain and businesslike, e.g. "Find your next role." Example Vietnamese UI strings used throughout: "Ứng tuyển ngay" (Apply now), "Tìm theo vị trí, công ty, kỹ năng..." (Search by role, company, skill), "Đã xác thực" (Verified), "Nhận thông báo việc làm phù hợp" (Get matching job alerts).
- **Tone:** Confident and reassuring, not salesy — reflects "professional, trustworthy" personality. Short declarative sentences, action-first labels on buttons ("Đăng tin mới", "Chỉnh sửa hồ sơ").
- **Casing:** Sentence case for buttons/labels/headings — no ALL CAPS except small pill labels (badges/tags used sparingly with slight letter-spacing), no title case.
- **Emoji:** Not used anywhere in UI copy — the brand personality is professional/trustworthy, not playful.
- **AI framing:** AI features are labeled plainly and specifically ("Chuẩn bị phỏng vấn AI", "AI gợi ý việc làm phù hợp") rather than branded with a mascot or gimmicky name — keeps AI feeling like a practical tool, not a novelty.

## Visual Foundations

- **Color:** Blue-led trust palette (`--blue-600 #1464b4`) sampled directly from the logo mark, on a near-white neutral gray scale for surfaces/text. The logo's red/yellow/green swoosh becomes a small semantic accent trio (success/warning/error) — used only for status (badges, application stages), never as decoration. Max two background colors per screen: white/`--surface-page` gray, plus the brand blue for primary actions and the inverse (`--blue-900`) sidebar in the employer kit.
- **Type:** Single family, Be Vietnam Pro (a Vietnamese-designed humanist sans with full diacritic support) for both display and body, weighted 400–800; JetBrains Mono for codes/IDs/timestamps. No serif anywhere — keeps the tone modern/technical.
- **Spacing:** 4px base grid (`--space-1` = 4px through `--space-24` = 96px). Cards use generous internal padding (20–24px) and gaps (12–16px between list items) for a spacious, uncluttered SaaS feel per the brief.
- **Backgrounds:** Flat colors only — no gradients, no photographic full-bleed hero imagery, no illustration or texture (none were supplied, and the brief calls for a clean, professional SaaS look). No patterns.
- **Animation:** Minimal — short (120–280ms) ease-out transitions (`--ease-standard`, `--ease-out`) on color/shadow/position changes only (button hover, toggle slide, tab underline). No bounce, no page-transition choreography.
- **Hover states:** Buttons darken one step (e.g. `--blue-600` → `--blue-700`); ghost/tag/tab items shift text color to brand blue; cards lift via a slightly stronger shadow (`--shadow-sm` → `--shadow-md`), never scale.
- **Press states:** Not separately defined yet — recommend a brief opacity dip (0.85) on active; flagged as an open item.
- **Borders:** Thin, 1–1.5px, `--border-default` (light gray) as the default card/input outline; brand blue border only for input focus and the secondary button variant.
- **Shadows:** Soft, low-opacity, cool-toned (`rgba(21,23,27, …)`) elevation scale from `--shadow-xs` (barely-there, list items) to `--shadow-lg` (modals, toasts) — no colored/brand-tinted shadows.
- **Corner radii:** `--radius-md` (10px) is the default for buttons/inputs/cards; `--radius-lg` (14px) for larger containers; `--radius-pill` for tags/badges. Nothing sharp-cornered, nothing fully rounded except pills/avatars.
- **Cards:** White surface, 1px light-gray border, `--shadow-sm`, `--radius-lg`, no colored left-border accent (explicitly avoided per brand guidance).
- **Transparency/blur:** Used only for the modal scrim (`rgba(21,23,27,0.45)`) — no frosted-glass/backdrop-blur surfaces elsewhere.
- **Imagery:** None supplied; avatars fall back to colored initials rather than stock photography. If real product photography or illustration becomes available, keep it warm/natural (people-forward, Vietnam-context) rather than stock-corporate.

## Iconography

No icon set was supplied with the brand. **Substitution:** [Lucide](https://lucide.dev) is used via CDN (`unpkg.com/lucide`), 24px default size, 2px stroke weight, `currentColor` (inherits text color — no separate icon-color tokens needed). Used for navigation, filters, stats, and inline meta (location/clock/wallet icons on job cards). No icon font, no emoji, no unicode glyphs as icons anywhere. If the product has its own icon library, replace the Lucide references in `ui_kits/*/screens.jsx` and re-flag here.

## Fonts — substitution flag

No font files were provided. **Be Vietnam Pro** and **JetBrains Mono** (both open, Google Fonts-hosted, loaded via `@import` in `tokens/typography.css`) were chosen as the nearest fit for a modern Vietnamese SaaS brand with full diacritic coverage. If LàmViệc360 has licensed brand fonts, please share the font files/names and this will be swapped in.
