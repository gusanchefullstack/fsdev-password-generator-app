# Frontend Mentor — Password Generator App

A fully responsive password generator app built as a solution to the [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Users can customize password length and character types, generate secure passwords, copy them to clipboard, and see a real-time strength rating.

![Build](https://img.shields.io/github/deployments/gusanchefullstack/fsdev-password-generator-app/production?label=vercel&logo=vercel)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Installation](#installation)
- [Roadmap](#roadmap)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The Challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

**Desktop (1440px)**

![Desktop screenshot](./screenshots/desktop-1440px.png)

**Mobile (375px)**

![Mobile screenshot](./screenshots/mobile-375px.png)

### Links

- Solution URL: [Frontend Mentor Solution](https://www.frontendmentor.io/profile/gusanchefullstack)
- Live Site URL: [fsdev-password-generator-app.vercel.app](https://fsdev-password-generator-app.vercel.app)
- Repository: [github.com/gusanchefullstack/fsdev-password-generator-app](https://github.com/gusanchefullstack/fsdev-password-generator-app)

---

## My Process

### Built With

- Semantic HTML5 markup
- CSS custom properties (design tokens)
- CSS Modules for component-scoped styles
- Mobile-first responsive workflow
- [React 19](https://react.dev/) — UI library
- [TypeScript 6](https://www.typescriptlang.org/) — type safety
- [Vite 8](https://vite.dev/) — build tool and dev server
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — monospace font

### Project Structure

```
src/
├── components/
│   ├── CharacterLengthSlider/   # Range input with green fill track
│   ├── GenerateButton/          # CTA button with hover invert state
│   ├── OptionCheckbox/          # Custom styled checkbox
│   ├── PasswordDisplay/         # Output box with copy-to-clipboard
│   └── StrengthMeter/           # 4-bar strength indicator
├── hooks/
│   └── usePasswordGenerator.ts  # Generation logic, strength calc, clipboard
├── styles/
│   ├── tokens.css               # CSS custom properties (colors, type, spacing)
│   ├── responsive.css           # Breakpoint token overrides (mobile→tablet→desktop)
│   └── global.css               # Reset, base styles, .sr-only utility
├── App.tsx                      # Root component, wires hook to UI
└── main.tsx                     # Entry point
```

### What I Learned

**Custom range input styling across browsers**

Getting a `<input type="range">` to display a filled green track up to the thumb position — and styling the thumb consistently across WebKit and Firefox — requires separate pseudo-element rules (`::-webkit-slider-thumb` vs `::-moz-range-thumb`) and a CSS custom property trick to drive the gradient fill percentage:

```css
.slider {
  background: linear-gradient(
    to right,
    var(--color-accent) var(--fill-percent, 0%),
    var(--color-bg) var(--fill-percent, 0%)
  );
}
```

The `--fill-percent` is set inline from React state, giving a clean declarative approach without JavaScript DOM manipulation.

**Mobile-first token overrides**

Rather than duplicating property values across breakpoints, the responsive strategy overrides the CSS custom properties themselves at each breakpoint. This means components that use `var(--font-size-label)` automatically scale without needing their own media queries:

```css
/* tokens.css — base (mobile) */
:root { --font-size-label: 0.875rem; }

/* responsive.css */
@media (min-width: 1024px) {
  :root { --font-size-label: 1.125rem; }
}
```

**Password strength algorithm**

The strength calculation weighs both the number of active character-type options and the password length. A single character type always produces "Too Weak" regardless of length, while 4 types + length > 12 yields "Strong". This mirrors real-world strength meters more faithfully than length-only approaches.

**Guaranteed character inclusion**

A naive implementation that randomly picks from the combined charset may produce passwords missing a required character type (e.g. no symbols even though "Include Symbols" is checked). The solution: pick one guaranteed character from each active charset first, then fill the remainder randomly, and finally shuffle the full array with Fisher-Yates.

### Continued Development

- Add entropy-based strength scoring (Shannon entropy) for more accurate ratings
- Persist last-used settings to `localStorage`
- Add password history (last 5 generated) with timestamps
- Add a passphrase generation mode (word-based)

### Useful Resources

- [MDN: Styling range inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) — comprehensive reference for cross-browser range styling
- [CSS Tricks: Custom checkboxes](https://css-tricks.com/the-checkbox-hack/) — inspiration for the custom checkbox implementation using `appearance: none`
- [WCAG 2.1 AA checklist](https://www.w3.org/WAI/WCAG21/quickref/) — used to verify contrast ratios and keyboard accessibility

### AI Collaboration

This project was developed in collaboration with **Claude Sonnet 4.6** (Anthropic) via [Claude Code](https://claude.ai/code).

**What was used:**
- Claude Code CLI for the entire implementation workflow
- Figma MCP integration for design-to-code extraction
- Browser automation for screenshot capture

**What worked well:**
- Translating Figma design tokens (colors, spacing, typography) directly into CSS custom properties
- Generating the `usePasswordGenerator` hook with correct Fisher-Yates shuffle and guaranteed character inclusion
- Iterating on the responsive CSS strategy (token overrides vs. per-component media queries)

**What required iteration:**
- Getting the range slider track fill to work cross-browser required a few rounds of testing
- The strength algorithm needed tuning to match the Figma spec's strength level thresholds

---

## Installation

**Prerequisites:** Node.js >= 18, npm >= 9

```bash
# Clone the repository
git clone https://github.com/gusanchefullstack/fsdev-password-generator-app.git
cd fsdev-password-generator-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

---

## Roadmap

- [x] Password generation with configurable character types
- [x] Real-time character length slider
- [x] Copy to clipboard with visual confirmation
- [x] 4-level strength indicator (Too Weak / Weak / Medium / Strong)
- [x] Responsive layout (375px, 540px+, 1440px)
- [x] Keyboard navigation and focus states
- [x] WCAG 2.1 AA accessible markup
- [ ] Persist settings in localStorage
- [ ] Password history panel
- [ ] Passphrase (word-based) generation mode
- [ ] Entropy-based strength scoring

---

## Author

**Gustavo Sanchez**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavosanchezgalarza/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/gusanchefullstack)
[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-3F54A3?logo=frontendmentor&logoColor=white)](https://www.frontendmentor.io/profile/gusanchefullstack)
[![X](https://img.shields.io/badge/X-000000?logo=x&logoColor=white)](https://x.com/gusanchedev)
[![Bluesky](https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=white)](https://bsky.app/profile/gusanchedev.bsky.social)
[![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?logo=hashnode&logoColor=white)](https://hashnode.com/@gusanchedev)
[![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-0A0A23?logo=freecodecamp&logoColor=white)](https://www.freecodecamp.org/gusanchedev)

---

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io) for the challenge design and assets
- [JetBrains](https://www.jetbrains.com/lp/mono/) for the open-source JetBrains Mono font
- [Anthropic](https://www.anthropic.com) for Claude Code, which accelerated the implementation workflow
