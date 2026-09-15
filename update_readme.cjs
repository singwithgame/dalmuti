const fs = require('fs');
let readme = fs.readFileSync('README.md', 'utf8');

// Add Play Link Badge at the top
const playBadge = `[![Play Game](https://img.shields.io/badge/Play-Dalmuti_Web-cc785c?style=for-the-badge&logo=firebase)](https://singwithgame.github.io/dalmuti/)\n\n`;
readme = readme.replace(/(# 웹 달무티 \(Web Dalmuti\) - Fan Made 👑\n\n)/, `$1${playBadge}`);

// Add History Feature to 주요 기능
const historyFeature = `- **전적 및 랭크 변동 기록 (Game History)**: 매 라운드의 순위 변동 이력(예: 평민 ➔ 귀족)과 과거 게임 결과들을 기록하고 열람할 수 있는 명예의 전당 기능이 제공됩니다.\n`;
readme = readme.replace(/(- \*\*실수 방지 시스템\*\*.*?\n)/, `$1${historyFeature}`);

// Add Local Run Instructions at the bottom
const localRun = `
## 💻 로컬 실행 방법 (Local Development)

\`\`\`bash
# 1. 저장소 클론
git clone https://github.com/singwithgame/dalmuti.git
cd dalmuti

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
\`\`\`
*(단, 로컬에서 실행하기 위해서는 본인의 Firebase 환경 변수 세팅이 필요합니다.)*
`;
readme += localRun;

fs.writeFileSync('README.md', readme);
