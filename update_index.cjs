const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Update variable values to use theme tokens
css = css.replace(/--bg-color: #0f172a;/g, '--bg-color: var(--color-background);');
css = css.replace(/--surface-color: #1e293b;/g, '--surface-color: var(--color-card);');
css = css.replace(/--text-color: #f8fafc;/g, '--text-color: var(--color-foreground);');
css = css.replace(/--text-muted: #94a3b8;/g, '--text-muted: var(--color-text-secondary);');
css = css.replace(/--accent-color: #8b5cf6;/g, '--accent-color: var(--color-primary);');
css = css.replace(/--accent-hover: #7c3aed;/g, '--accent-hover: color-mix(in srgb, var(--color-primary) 80%, black);');
css = css.replace(/--danger-color: #ef4444;/g, '--danger-color: var(--color-destructive);');
css = css.replace(/--card-bg: rgba\(30, 41, 59, 0\.7\);/g, '--card-bg: color-mix(in srgb, var(--color-card) 70%, transparent);');
css = css.replace(/--card-border: rgba\(255, 255, 255, 0\.1\);/g, '--card-border: var(--color-border);');

// Change transitions to spring ease
css = css.replace(/transition: all 0.2s ease;/g, 'transition: all var(--duration-moderate) var(--ease-spring);');
css = css.replace(/transition: all 0.3s ease;/g, 'transition: all var(--duration-moderate) var(--ease-spring);');

fs.writeFileSync('src/index.css', css);
