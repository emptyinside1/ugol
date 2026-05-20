# AGENTS.md — ugol (CoalMoscow.com)

## Project Overview

Single-file static HTML5 website for "INDUSTRY AND TECHNOLOGY" LLC — a coal export company.
Stack: Vanilla HTML5 + CSS3 (custom properties) + Vanilla JavaScript (ES6+).
No build tools, no package manager, no framework.

## Build / Lint / Test Commands

This project has **no build system**. All changes go directly into `cc.html`.

```bash
# Start a local dev server (pick one):
npx serve .
python3 -m http.server 8080
```

No linting or test tooling is currently configured. Before committing, verify:

1. Open `cc.html` in a browser and check:
   - All sections render correctly (Hero, About, Coal table, Logistics, Contact form, Footer)
   - Language switcher cycles through RU / EN / ZH / HI / AR without console errors
   - RTL layout activates for Arabic, resets for others
   - Scroll-reveal animations fire on all `.reveal` elements
   - Form validation shows error on empty required fields and clears on valid input
   - Form submit fires without actual POST (simulated success)

2. Open DevTools → Console: confirm zero errors and zero warnings.

3. Validate HTML at https://validator.w3.org/ — must pass with no errors.

## Code Style Guidelines

### File Structure

Everything lives in a single file: `cc.html`. The order is always:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset, viewport, title, description>
  <link>  (fonts, icons — external CDNs only)
  <style> (all CSS, :root custom properties first)
</head>
<body>
  <header> → <main> → <footer>
  <script> (all JS at the very end, before </body>)
</body>
</html>
```

### CSS Conventions

- **Custom properties** in `:root` for all colors, radii, transitions. Never hardcode color values.
- **Class naming**: kebab-case (`.hero-contact-card`, `.lang-switch`, `.btn-outline`, `.info-badge`).
- **Section structure**: each section has a unique `id` matching the nav anchor.
- **Reveal animations**: use the `.reveal` + `.delay-100/200/300` system via IntersectionObserver. Do not add custom scroll libraries.
- **Media queries**: mobile-first breakpoints at 1024px and 768px.
- **Select elements**: always include custom background arrow SVG and RTL-aware background-position switch.
- **Transitions**: use the `--transition` variable (`all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`).

### HTML Conventions

- **Language**: `lang="ru"` on `<html>`, use `data-i18n` attributes for all user-facing text.
- **Indentation**: 4 spaces. No tabs.
- **Self-closing tags**: no trailing slash (`<br>`, `<hr>`, `<input>`, not `<br />`).
- **Form elements**: every `<input>`, `<select>`, `<textarea>` needs an `id` matching the JS handler convention (`contactName`, `contactEmail`, `contactPhone`, `contactMarket`, `contactCoal`, `contactMessage`).
- **Accessibility**: form inputs have `placeholder` (populated via i18n), buttons have descriptive text. Preserve `user-scalable=yes` in viewport.

### JavaScript Conventions

- **Language**: ES6+ (arrow functions, `const`/`let`, template literals, optional chaining).
- **No frameworks** — pure vanilla JS only. No jQuery, no React, no Alpine.
- **i18n system**: all strings live in the `translations` object keyed by language code (`ru`, `en`, `zh`, `hi`, `ar`). Every key is snake_case matching the `data-i18n` attribute.
- **DOM queries**: prefer `querySelector` / `querySelectorAll` over legacy methods. Use optional chaining (`?.`) for elements that may not exist.
- **Event listeners**: use `addEventListener`, never inline `onclick`/`onsubmit` attributes.
- **Form handler**: the form at `#quickForm` does client-side validation only. When all required fields (`#contactName`, `#contactEmail`, `#contactPhone`) are filled, show a success message and reset. Do not add real HTTP POST without explicit approval.
- **RTL handling**: always use `document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'` and mirror flex-direction for `flex-direction: row`/`row-reverse` and select background-position.
- **Local storage**: prefix keys with `coalrus_` (e.g. `coalrus_lang`).
- **Animations**: use `IntersectionObserver` with threshold `0.15`. After adding `.active`, call `unobserve()` to prevent re-triggering.
- **Slider tumbler**: the language switcher uses a CSS sliding element. On `setLanguage()`, schedule `updateSlider()` inside a `setTimeout(…, 50)` to wait for font layout.

### Naming Conventions

| Thing              | Convention            | Example                       |
|--------------------|-----------------------|-------------------------------|
| CSS classes        | kebab-case            | `.lang-btn`, `.hero-glow-1`   |
| HTML ids           | camelCase             | `contactName`, `quickForm`    |
| JS variables       | camelCase             | `savedLang`, `observerOptions` |
| JS functions       | camelCase             | `setLanguage()`, `updateSlider()` |
| i18n translation keys | snake_case        | `form_err_req`, `geo_title`    |
| localStorage keys  | prefix `coalrus_`     | `coalrus_lang`                |
| File names         | lowercase             | `cc.html`                     |

### Adding a New Language

1. Add a new key to the `translations` object (e.g. `fr: { … }`).
2. Every key from existing languages must be present.
3. Add a `<button class="lang-btn" data-lang="fr">FR</button>` inside `.lang-switch`.
4. No HTML changes needed — `data-i18n` auto-populates from the translations object.

### Error Handling

- Use optional chaining (`?.`) for DOM queries that may return `null`.
- Form validation: check `name && email && phone` before showing success. Show translated error messages in a colored alert div.
- Language fallback: `localStorage.getItem('coalrus_lang') || 'ru'`.
- Translation fallback: always check `translations[lang] && translations[lang][key] !== undefined` before rendering.

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| File structure | Single `cc.html` | No build step, instant deploy, easy CDN caching |
| Styling | CSS custom properties | Consistent theming, easy maintenance, no preprocessor |
| Internationalization | `data-i18n` attributes + `translations` object | Zero-dependency, no build step, 5 languages |
| Animation | IntersectionObserver | Native browser API, no library needed, performant |
| Language persistence | localStorage | Survives page reloads, no server required |
| Form handling | Client-side only | No backend dependency; replace with Telegram/email API when needed |

### Adding a Section

1. Add `<section id="new-section" class="...">` to the `<main>` block in HTML.
2. Add a nav link `<a href="#new-section">` in the header.
3. Add i18n keys to the `translations` object for all 5 languages.
4. Add any CSS for new elements — use `--transition`, `--radius-*`, and color variables from `:root`.
5. Add `.reveal` / `.reveal delay-*` classes for scroll animations.

### Git / Commits

- This repo is not yet under version control.
- Commit messages should be in English.
- Single-file project — avoid splitting `cc.html` into multiple files without explicit user request.
- Format: `<type>: <short description>` (e.g. `feat: add Turkish language`, `fix: resolve RTL alignment on selects`).
