const fs = require('fs');
let theme = fs.readFileSync('src/styles/theme.css', 'utf8');

// Update root brand colors
theme = theme.replace(/--brand: #171717;/g, '--brand: #8b5cf6;');
theme = theme.replace(/--primary: #171717;/g, '--primary: #8b5cf6;');

// Update dark mode background and brand
theme = theme.replace(/--background: #0a0a0a;/g, '--background: #0f172a;');
theme = theme.replace(/--surface-page: #0a0a0a;/g, '--surface-page: #0f172a;');
theme = theme.replace(/--card: #141414;/g, '--card: #1e293b;');
theme = theme.replace(/--popover: #1a1a1a;/g, '--popover: #1e293b;');
theme = theme.replace(/--surface-subtle: #1a1a1a;/g, '--surface-subtle: #1e293b;');
theme = theme.replace(/--brand: #ffffff;/g, '--brand: #a78bfa;');
theme = theme.replace(/--primary: #ededed;/g, '--primary: #a78bfa;');
theme = theme.replace(/--primary-foreground: #0a0a0a;/g, '--primary-foreground: #ffffff;');

fs.writeFileSync('src/styles/theme.css', theme);
