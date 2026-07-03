# HTML + SCSS + JavaScript Starter

An opinionated starter template for vanilla JavaScript projects using SCSS. Comes with a mobile-first responsive system, layout utilities, dark mode support, and modern CSS normalisation — all with zero dependencies and no build configuration required beyond a SCSS compiler.

---

## Project Structure

```
├── index.html
├── app.js                    # JS entry point
├── js/
│   └── dark-mode.js          # Theme toggle logic
└── scss/
    ├── styles.scss            # Main entry point — import everything here
    ├── globals/
    │   ├── _normalize.scss    # modern-normalize v3.0.1
    │   └── _variables.scss    # Design tokens (SCSS variables and/or CSS custom properties)
    └── mixins/
        ├── _media.scss        # Breakpoint mixins (mobile-first)
        ├── _layout.scss       # Layout utilities
        └── _theme.scss        # Dark mode mixin
```

---

## Getting Started

This template has no build tooling included by design. You'll need a SCSS compiler to generate the CSS. Some options:

- **[Vite](https://vitejs.dev/)** — recommended for modern projects
- **[Sass CLI](https://sass-lang.com/install/)** — `sass --watch scss/styles.scss style.css`
- **VS Code: [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)** — zero config for quick prototyping

Once your SCSS is compiling to `style.css`, open `index.html` in a browser or serve it with your tool of choice.

---

## Variables

`scss/globals/_variables.scss` is where your design tokens live. The template supports both SCSS variables and CSS custom properties — use whichever fits your needs, or combine them.

### SCSS variables (`$var`)

Resolved at compile time. Good for values that never need to change at runtime — spacing scales, font stacks, breakpoint values you want to reuse in logic, etc.

```scss
// scss/globals/_variables.scss
$font-sans: system-ui, sans-serif;
$font-mono: ui-monospace, monospace;

$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 2rem;

$radius-sm: 4px;
$radius-md: 8px;
```

```scss
// Using them in a component
@use '../globals/variables' as *;

.card {
  padding: $spacing-md;
  border-radius: $radius-md;
  font-family: $font-sans;
}
```

### CSS custom properties (`--var`)

Resolved at runtime in the browser. The right choice for anything that needs to change dynamically — most importantly, theme colours. They cascade like regular CSS properties and can be overridden at any selector level.

```scss
// scss/globals/_variables.scss
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-surface: #f5f5f5;
  --color-border: #e0e0e0;
  --color-accent: #3b82f6;
}
```

```scss
// Using them in a component — no import needed
.card {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

### Combining both

A common pattern is to use SCSS variables for static values and CSS custom properties for anything theme-related:

```scss
// scss/globals/_variables.scss
@use '../mixins/theme' as *;

// Static — compile-time only
$font-sans: system-ui, sans-serif;
$spacing-md: 1rem;
$radius-md: 8px;

// Dynamic — swappable at runtime
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-surface: #f5f5f5;

  @include dark-mode {
    --color-bg: #121212;
    --color-text: #e8e8e8;
    --color-surface: #1e1e1e;
  }
}
```

> **Which should I use?** Prefer CSS custom properties for colours and anything that participates in theming. Use SCSS variables for values that are purely structural — spacing, type scales, border radii — where runtime flexibility isn't needed. When in doubt, CSS custom properties are the safer default: they're inspectable in DevTools and don't require a recompile to change.

---

## Responsive Breakpoints

Defined in `scss/mixins/_media.scss`. All breakpoints are **mobile-first** — styles inside a mixin apply at that width **and above**.

| Mixin | Min-width |
| ----- | --------- |
| `sm`  | 480px     |
| `md`  | 768px     |
| `lg`  | 1024px    |
| `xl`  | 1280px    |

### Usage

```scss
@use '../mixins/media' as *;

.card {
  // Base (mobile) styles
  padding: 1rem;
  font-size: 0.875rem;

  @include sm {
    padding: 1.25rem;
  }

  @include md {
    display: flex;
    gap: 1.5rem;
    font-size: 1rem;
  }

  @include lg {
    max-width: 960px;
    margin-inline: auto;
  }
}
```

```scss
// Stacking breakpoints on a layout
.hero {
  display: grid;
  grid-template-columns: 1fr; // single column on mobile

  @include md {
    grid-template-columns: 1fr 1fr; // two columns from tablet up
  }

  @include xl {
    grid-template-columns: 2fr 1fr; // asymmetric from wide desktop up
  }
}
```

---

## Layout Utilities

Defined in `scss/mixins/_layout.scss`. Import with `@use` in any file that needs them.

### `flex`

Sets `display: flex` with optional direction and gap. Defaults to `row` with no gap.

```scss
@use '../mixins/layout' as *;

.toolbar {
  @include flex($gap: 1rem); // row, 1rem gap
}

.sidebar {
  @include flex(column, 0.5rem); // column, 0.5rem gap
}

.nav {
  @include flex($direction: row, $gap: 1.5rem); // all params explicit
}
```

### `flex-center`

Centers children on both axes — useful for loaders, empty states, icon buttons, hero sections.

```scss
@use '../mixins/layout' as *;

.loading-screen {
  height: 100vh;
  @include flex-center;
}

.icon-button {
  width: 2.5rem;
  height: 2.5rem;
  @include flex-center;
}
```

### `responsive-grid`

Two modes depending on whether you pass `$columns`:

**Fluid (default)** — columns wrap automatically based on a minimum width. Add or remove items and the grid self-adjusts; no breakpoints needed.

```scss
@use '../mixins/layout' as *;

.card-grid {
  @include responsive-grid; // wraps at 280px min, 1rem gap
}

.product-grid {
  @include responsive-grid($min-col-width: 200px, $gap: 1.5rem);
}

.image-grid {
  @include responsive-grid($columns: null, $min-col-width: 320px, $gap: 2rem);
}
```

**Fixed** — explicit column count. Combine with breakpoint mixins for responsive control. Note that `$min-col-width` is ignored in this mode — columns are `1fr` each and stretch to fill the available space regardless of their content width.

```scss
@use '../mixins/layout' as *;
@use '../mixins/media' as *;

.feature-grid {
  @include responsive-grid($columns: 1); // 1 column on mobile

  @include md {
    @include responsive-grid($columns: 2); // 2 from tablet up
  }

  @include lg {
    @include responsive-grid(
      $columns: 3,
      $gap: 2rem
    ); // 3 from desktop up, wider gap
  }
}
```

---

## Dark Mode

Dark mode support is handled by two cooperating pieces: a SCSS mixin for theming styles, and a JS module for toggling the theme.

### How it works

The `dark-mode` mixin in `scss/mixins/_theme.scss` applies its content under **either** condition:

1. The OS/browser is set to dark mode (`prefers-color-scheme: dark`) **and** the user hasn't manually chosen light (`[data-theme='light']` is not set on `<html>`)
2. The user has explicitly chosen dark mode (`[data-theme='dark']` is set on `<html>`)

This means it respects the system preference by default while allowing a manual override — the standard pattern for theme toggles.

### SCSS: Theming with the `dark-mode` mixin

```scss
@use '../mixins/theme' as *;

.card {
  background-color: #ffffff;
  color: #111111;

  @include dark-mode {
    background-color: #1e1e1e;
    color: #f0f0f0;
  }
}
```

**Using CSS custom properties (recommended)** — define tokens in `_variables.scss` and swap them inside the dark-mode block. See the [Variables](#variables) section for the full pattern, including how to combine SCSS variables with CSS custom properties.

### JS: Enabling the toggle

Uncomment the import in `app.js`:

```js
import './js/dark-mode.js';
```

Then add a toggle button to your HTML:

```html
<button id="theme-toggle" aria-label="Toggle dark mode">🌙</button>
```

The module reads the current state (OS preference or previously set `data-theme`) and toggles between `data-theme="light"` and `data-theme="dark"` on the `<html>` element.

If you want to persist the user's choice across page loads, you can extend `dark-mode.js` to save to `localStorage`:

```js
function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// On page load, restore saved preference before first paint
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved);
```

> **Tip:** To avoid a flash of the wrong theme on load, run the `localStorage` restore logic in an inline `<script>` at the top of `<head>` — before the stylesheet loads.

---

## SCSS Entry Point

`scss/styles.scss` is the single file your compiler should watch. Import everything from here:

```scss
// Globals
@use 'globals/normalize';
@use 'globals/variables';

// Your component and page styles
@use 'components/button';
@use 'pages/home';
```

Mixins are imported directly within the files that use them — they don't need to be imported in `styles.scss`.

---

## Normalisation

Includes **[modern-normalize v3.0.1](https://github.com/sindresorhus/modern-normalize)** (MIT licence). This provides a consistent baseline across browsers including:

- `box-sizing: border-box` on all elements
- System font stack
- Sensible form element defaults
- Correct display for interactive elements

---

## Conventions

- **Mobile-first** — write base styles for small screens, override upward with breakpoint mixins.
- **Variables for tokens** — define colours, spacing, and typography in `_variables.scss`. Use CSS custom properties for anything theme-related (they're swappable at runtime); SCSS variables work well for static structural values like spacing scales and font stacks.
- **Mixins are use-scoped** — import mixins with `@use` inside each file that needs them, not globally via `@import`.
