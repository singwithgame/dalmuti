const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/min-height: 100vh;/g, 'min-height: 100dvh;');
code = code.replace(/height: 100vh;/g, 'height: 100dvh;');
code = code.replace(/width: 100vw;/g, 'width: 100dvw;');

code += '\n.center-cards-container {\n  transform: scale(1.15);\n  transform-origin: center;\n  transition: all var(--duration-moderate) var(--ease-spring);\n  margin: 1.5rem 0;\n}\n';

fs.writeFileSync('src/index.css', code);
