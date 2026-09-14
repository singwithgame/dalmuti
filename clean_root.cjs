const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the old CSS variables block entirely since we use theme.css
css = css.replace(/--bg-color: var\(--color-background\);/g, '');
css = css.replace(/--surface-color: var\(--color-card\);/g, '');
css = css.replace(/--text-color: var\(--color-foreground\);/g, '');
css = css.replace(/--text-muted: var\(--color-text-secondary\);/g, '');
css = css.replace(/--accent-color: var\(--color-primary\);/g, '');
css = css.replace(/--accent-hover: color-mix\(in srgb, var\(--color-primary\) 80%, black\);/g, '');
css = css.replace(/--danger-color: var\(--color-destructive\);/g, '');
css = css.replace(/--card-bg: color-mix\(in srgb, var\(--color-card\) 70%, transparent\);/g, '');
css = css.replace(/--card-border: var\(--color-border\);/g, '');

fs.writeFileSync('src/index.css', css);
