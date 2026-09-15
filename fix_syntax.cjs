const fs = require('fs');
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

jsx = jsx.replace(
  /\}, \[unselectedIndices, myHand\]\);\n\s*\}\n\s*\}\);\n/,
  `}, [unselectedIndices, myHand]);\n`
);

fs.writeFileSync('src/components/GameBoard.jsx', jsx);
