# Code Architecture

## Feature: Open Narrator Landing Page

### Files Added

**Elements** (`/components/elements/`) — stateless, reusable UI primitives:
- `Button.tsx` — primary/secondary button with hover glow
- `Badge.tsx` — pill badge for feature highlights
- `Input.tsx` — controlled text/email input
- `Select.tsx` — controlled dropdown

**Components** (`/components/`) — composed sections with logic:
- `Navbar.tsx` — sticky top nav with logo, desktop links, mobile hamburger dropdown, and CTA
- `Navbar.module.css` — scoped CSS with `@media (min-width: 768px)` breakpoint for responsive layout
- `HeroSection.tsx` — headline, subtext, CTAs, badges, background glow
- `FeatureCard.tsx` — single feature card (icon + bullets)
- `FeaturesSection.tsx` — 4-column grid of FeatureCards
- `VideoSection.tsx` — video suite highlight with use case grid
- `WhySection.tsx` — 3-column differentiator cards
- `PricingBlock.tsx` — three-tier lifetime pricing cards (Base, Standard, Pro)
- `BetaSection.tsx` — beta signup form with controlled state
- `CommunitySection.tsx` — community platform links
- `Footer.tsx` — branding, nav links, contact

**App**:
- `app/page.tsx` — composes all sections
- `app/layout.tsx` — metadata, fonts, global styles
- `app/globals.css` — CSS variables from design system

**Assets** (`/public/`):
- `logo.svg`, `open-narrator-text.svg`, `open-narrator-text-light.svg`

### Data Flow

```
page.tsx
  └── Navbar (client — scroll to #beta)
  └── HeroSection (client — scroll CTAs)
  └── FeaturesSection → FeatureCard[]
  └── VideoSection
  └── WhySection
  └── PricingBlock (client — scroll to #beta)
  └── BetaSection (client — form state, submit handler)
  └── CommunitySection
  └── Footer
```

### Component Hierarchy

```
RootLayout
  └── Navbar
  └── main
      ├── HeroSection
      │     ├── Button (x2)
      │     └── Badge (x4)
      ├── FeaturesSection
      │     └── FeatureCard (x4)
      ├── VideoSection
      ├── WhySection
      ├── PricingBlock
      │     └── Button (x3)
      ├── BetaSection
      │     ├── Input (x2)
      │     ├── Select (x2)
      │     └── Button
      ├── CommunitySection
      └── Footer
```

### State Management

- `BetaSection` uses local `useState` for form fields and submission state
- All other components are stateless server components (except Navbar/HeroSection/PricingBlock which use `"use client"` for scroll handlers)

### Navigation
- All links use `next/link` (`Link`) instead of native `<a>` tags
- Navbar collapses to a hamburger + dropdown at `< 768px` via `Navbar.module.css`
- Responsive breakpoint handled with plain CSS `@media (min-width: 768px)` — no Tailwind media prefix used for the navbar layout

- Tailwind CSS v4 utility classes throughout
- Design system CSS variables defined in `globals.css`
- Primary font: Katibeh (headings), Inter (body)
- Dark-first aesthetic matching Vercel/Linear style
