const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Primary button
css = css.replace(
  /\.btn:hover \{\s+background-color: var\(--color-primary\);\s+transform: translateY\(-2px\);\s+box-shadow: var\(--shadow-button\); filter: drop-shadow\(0 4px 8px var\(--color-primary\)\);\s+\}/,
  `.btn:hover {
  background-color: color-mix(in srgb, var(--color-primary) 85%, black);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}`
);

// Secondary button
css = css.replace(
  /\.btn-secondary \{\s+background-color: transparent;\s+border: 1px solid var\(--color-border\);\s+color: var\(--color-foreground\);\s+\}/,
  `.btn-secondary {
  background-color: var(--color-surface-page);
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, black);
  color: var(--color-foreground);
  box-shadow: var(--shadow-button);
}`
);

css = css.replace(
  /\.btn-secondary:hover \{\s+background-color: rgba\(255, 255, 255, 0\.05\);\s+box-shadow: none;\s+\}/,
  `.btn-secondary:hover {
  background-color: var(--color-surface-muted);
  box-shadow: var(--shadow-card-hover);
}`
);

// Inputs
css = css.replace(
  /\.input \{\s+background-color: rgba\(0, 0, 0, 0\.2\);\s+border: 1px solid var\(--color-border\);\s+color: var\(--color-foreground\);\s+padding: 0\.75rem 1rem;\s+border-radius: 0\.5rem;\s+width: 100%;\s+font-size: 1rem;\s+transition: all var\(--duration-moderate\) var\(--ease-spring\);\s+\}/,
  `.input {
  background-color: var(--color-input-background);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  transition: all var(--duration-moderate) var(--ease-spring);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}`
);

fs.writeFileSync('src/index.css', css);
