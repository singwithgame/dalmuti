const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
  /\.input\s*\{[^}]+\}/,
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
