const fs = require('fs');

// 1. Force class="dark" in index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<html lang="ko">/, '<html lang="ko" class="dark">');
html = html.replace(/<meta name="color-scheme" content="light" \/>\n    /, '<meta name="color-scheme" content="dark" />\n    ');
fs.writeFileSync('index.html', html);

// 2. Update theme.css for Claude's Dark Mode
let theme = fs.readFileSync('src/styles/theme.css', 'utf8');

// We will overwrite the entire .dark { ... } block
const darkBlockRegex = /\.dark\s*\{[\s\S]*?\}/;
const claudeDarkBlock = `.dark {
  /* Claude Dark Mode (Warm Black) */
  --background: #181715;
  --foreground: #faf9f5;
  --card: #252320;
  --card-foreground: #faf9f5;
  --popover: #252320;
  --popover-foreground: #faf9f5;

  /* Text Hierarchy */
  --text-primary: #faf9f5;
  --text-secondary: #a09d96;
  --text-tertiary: #6c6a64;
  --text-disabled: #3d3d3a;
  --icon-default: #a09d96;

  /* Surfaces */
  --surface-page: #181715;
  --surface-subtle: #1f1e1b;
  --surface-muted: #252320;
  --brand-tint: rgba(204, 120, 92, 0.1);
  --alert-badge: #c64545;

  /* Primary (Coral) */
  --brand: #cc785c;
  --primary: #cc785c;
  --primary-foreground: #ffffff;
  
  /* Secondary / Muted */
  --secondary: #252320;
  --secondary-foreground: #faf9f5;
  --muted: #1f1e1b;
  --muted-foreground: #a09d96;
  --accent: #252320;
  --accent-foreground: #faf9f5;

  /* Status */
  --destructive: #c64545;
  --destructive-foreground: #ffffff;
  --success: #5db872;
  --success-foreground: #ffffff;
  --warning: #d4a017;
  --warning-foreground: #ffffff;
  --info: #5db8a6;
  --info-foreground: #ffffff;

  /* Border & Input */
  --border: #3d3d3a;
  --input: #3d3d3a;
  --input-background: #1f1e1b;
  --switch-background: #3d3d3a;
  --ring: #cc785c;

  /* Shadows (Minimal in dark mode) */
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-button: 0 2px 4px rgba(0, 0, 0, 0.5);
  --shadow-card-hover: 0 6px 16px rgba(0, 0, 0, 0.6);

  --font-weight-medium: 500;
  --font-weight-normal: 400;
}`;

theme = theme.replace(darkBlockRegex, claudeDarkBlock);
fs.writeFileSync('src/styles/theme.css', theme);

// 3. Fix index.css (color-scheme & button tweaks for dark mode)
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/color-scheme: light;/g, 'color-scheme: dark;');

// Re-adjust secondary button for dark mode so it stands out against the dark background
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
  background-color: var(--color-surface-muted);
  box-shadow: var(--shadow-button);
}`
);

// Input background for dark mode (subtle dark grey)
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
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}`
);

fs.writeFileSync('src/index.css', css);
