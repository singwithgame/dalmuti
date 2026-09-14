const fs = require('fs');
let theme = fs.readFileSync('src/styles/theme.css', 'utf8');

// Replace standard variables in :root
theme = theme.replace(/--brand: #8b5cf6;/g, '--brand: #cc785c;');
theme = theme.replace(/--primary: #8b5cf6;/g, '--primary: #cc785c;');
theme = theme.replace(/--background: #ffffff;/g, '--background: #faf9f5;');
theme = theme.replace(/--foreground: #171717;/g, '--foreground: #141413;');
theme = theme.replace(/--card: #ffffff;/g, '--card: #efe9de;');
theme = theme.replace(/--card-foreground: #171717;/g, '--card-foreground: #141413;');
theme = theme.replace(/--popover: #ffffff;/g, '--popover: #efe9de;');
theme = theme.replace(/--popover-foreground: #171717;/g, '--popover-foreground: #141413;');
theme = theme.replace(/--secondary: #fafafa;/g, '--secondary: #e8e0d2;');
theme = theme.replace(/--muted: #ebebeb;/g, '--muted: #f5f0e8;');
theme = theme.replace(/--muted-foreground: #666666;/g, '--muted-foreground: #6c6a64;');
theme = theme.replace(/--text-primary: #171717;/g, '--text-primary: #141413;');
theme = theme.replace(/--text-secondary: #4d4d4d;/g, '--text-secondary: #3d3d3a;');
theme = theme.replace(/--text-tertiary: #666666;/g, '--text-tertiary: #6c6a64;');
theme = theme.replace(/--surface-page: #ffffff;/g, '--surface-page: #faf9f5;');
theme = theme.replace(/--surface-subtle: #fafafa;/g, '--surface-subtle: #f5f0e8;');
theme = theme.replace(/--surface-muted: #ebebeb;/g, '--surface-muted: #efe9de;');
theme = theme.replace(/--border: #ebebeb;/g, '--border: #e6dfd8;');
theme = theme.replace(/--input-background: #fafafa;/g, '--input-background: #f5f0e8;');

// We also want to apply the "editorial-authority" morphology.
// The user chose Claude (#2) which inherently maps to warm cream/terracotta. 
// I'll also add a data-styleseed-recipe="editorial-authority" to index.html to make the corners sharp like old paper.

fs.writeFileSync('src/styles/theme.css', theme);
