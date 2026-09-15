const fs = require('fs');
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Remove the brittle setTimeout logic from useEffect
jsx = jsx.replace(
  /if \(taxState\?\.revolution\) \{[\s\S]*?return;\s*\}/,
  `if (taxState?.revolution) {
        // 혁명이 발동된 상태에서는 자동 진행(setTimeout) 하지 않고, 방장이 수동으로 '게임 시작' 버튼을 누르도록 UI에서 처리합니다.
        // (기존의 불안정한 setTimeout 기반 자동 전환 버그 수정)
        return;
      }`
);

// 2. Add manual start button to the UI for the Host
const manualStartButton = `
              {isHost && (
                <button className="btn" style={{ marginTop: '2rem' }} onClick={() => {
                  let newRanks = [...(roomData.ranks || [])];
                  if (roomData.taxState.revolution === 'greater') {
                    newRanks.reverse();
                  }
                  update(ref(db, \`rooms/\${roomCode}\`), {
                    status: 'playing',
                    currentTurn: newRanks[0],
                    ranks: newRanks,
                    taxState: null,
                    'currentRoundLog/revolution': roomData.taxState.revolution,
                    'currentRoundLog/revolutionBy': roomData.taxState.revolutionBy
                  });
                }}>
                  혁명 적용하고 게임 시작하기
                </button>
              )}
              {!isHost && (
                <p style={{ marginTop: '2rem', color: 'var(--color-text-tertiary)' }}>방장이 게임을 시작할 때까지 기다려주세요...</p>
              )}
`;

jsx = jsx.replace(
  /<p style=\{\{ marginTop: '1rem', fontSize: '1\.2rem' \}\}>\s*\{roomData\.taxState\.revolution === 'greater' \? '모든 계급이 완전히 거꾸로 뒤집힙니다! 세금 납부가 무효화됩니다\.' : '세금 납부가 무효화됩니다\.'\}\s*<\/p>\s*<\/div>/,
  `<p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                {roomData.taxState.revolution === 'greater' ? '모든 계급이 완전히 거꾸로 뒤집힙니다! 세금 납부가 무효화됩니다.' : '세금 납부가 무효화됩니다.'}
              </p>
              ${manualStartButton}
            </div>`
);

fs.writeFileSync('src/components/GameBoard.jsx', jsx);
