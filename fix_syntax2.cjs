const fs = require('fs');
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

jsx = jsx.replace(
  /대기 중입니다\.\.\.<\/p>\n\s*\)\}\}/,
  `대기 중입니다...</p>\n              )}`
);

fs.writeFileSync('src/components/GameBoard.jsx', jsx);
