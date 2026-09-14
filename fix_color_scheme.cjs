const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
  /:root \{/,
  `:root {
  color-scheme: light;`
);

css = css.replace(
  /html \{/,
  `html {
  color-scheme: light;`
);

fs.writeFileSync('src/index.css', css);
