const fs = require('fs');

// Fix theme.css to make primary a darker, more contrasting coral
let theme = fs.readFileSync('src/styles/theme.css', 'utf8');
theme = theme.replace(/--primary: #cc785c;/g, '--primary: #b35a3f;'); // Darker terracotta
fs.writeFileSync('src/styles/theme.css', theme);

// Fix index.css
let css = fs.readFileSync('src/index.css', 'utf8');

// Input -> transparent background, simple border
css = css.replace(
  /\.input\s*\{[^}]+\}/,
  `.input {
  background-color: transparent;
  border: 1px solid var(--color-text-tertiary);
  color: var(--color-foreground);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  transition: all var(--duration-moderate) var(--ease-spring);
  box-shadow: none;
}`
);

css = css.replace(
  /\.input:focus\s*\{[^}]+\}/,
  `.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
}`
);

// Secondary Button -> Softer cream/grey instead of harsh black
css = css.replace(
  /\.btn-secondary\s*\{[^}]+\}/,
  `.btn-secondary {
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  box-shadow: none;
}`
);

css = css.replace(
  /\.btn-secondary:hover\s*\{[^}]+\}/,
  `.btn-secondary:hover {
  background-color: var(--color-border);
  box-shadow: none;
}`
);

// Primary Button -> Keep it simple, remove the weird border
css = css.replace(
  /border: 1px solid color-mix\(in srgb, var\(--color-primary\) 80%, black\);/,
  `border: none;`
);

// Focus visible update
css = css.replace(
  /\*:focus-visible\s*\{[^}]+\}/,
  `*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}`
);

fs.writeFileSync('src/index.css', css);
