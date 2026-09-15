const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Add subtle border to primary button (.btn)
css = css.replace(
  /\.btn\s*\{[^}]+\}/,
  `.btn {
  background-color: var(--color-primary);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-moderate) var(--ease-spring);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}`
);

// Enhance border for secondary button (.btn-secondary)
css = css.replace(
  /\.btn-secondary\s*\{[^}]+\}/,
  `.btn-secondary {
  background-color: var(--color-surface-subtle);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-foreground);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}`
);

fs.writeFileSync('src/index.css', css);
