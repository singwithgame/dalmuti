const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Add focus-visible state
css += `
/* Accessibility Focus */
*:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
`;

fs.writeFileSync('src/index.css', css);
