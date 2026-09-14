const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Secondary Button -> Solid Dark (Black/Ink) for extreme contrast
css = css.replace(
  /\.btn-secondary\s*\{[^}]+\}/,
  `.btn-secondary {
  background-color: var(--color-foreground);
  border: 1px solid var(--color-foreground);
  color: var(--color-background);
  box-shadow: var(--shadow-button);
}`
);

css = css.replace(
  /\.btn-secondary:hover\s*\{[^}]+\}/,
  `.btn-secondary:hover {
  background-color: color-mix(in srgb, var(--color-foreground) 80%, transparent);
  box-shadow: var(--shadow-card-hover);
}`
);

// Input -> Pure White background to contrast against the cream canvas
css = css.replace(
  /\.input\s*\{[^}]+\}/,
  `.input {
  background-color: #ffffff;
  border: 1px solid color-mix(in srgb, var(--color-border) 60%, black);
  color: var(--color-foreground);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  transition: all var(--duration-moderate) var(--ease-spring);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}`
);

// Primary Button -> Add a tiny border so it pops even more
css = css.replace(
  /border: none;/,
  `border: 1px solid color-mix(in srgb, var(--color-primary) 80%, black);`
);

fs.writeFileSync('src/index.css', css);
