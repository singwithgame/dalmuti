const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const forceBtn = `              {isHost && (
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  onClick={() => update(ref(db, \`rooms/\${roomCode}/taxState\`), { revolutionPassedBy: roomData.taxState?.revolutionPassedBy || [] })}
                >
                  강제 진행 (잠수 방지용)
                </button>
              )}`;

// We need to just update revolutionPassedBy to include all playersWithJesters?
// Or we can just set revolutionPassedBy to playersWithJesters.
const forceBtnLogic = `              {isHost && (
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: 0.7 }}
                  onClick={() => {
                    if (window.confirm('광대를 가진 플레이어가 응답하지 않습니까? 강제로 세금 교환을 진행합니다.')) {
                       update(ref(db, \`rooms/\${roomCode}/taxState\`), { revolutionPassedBy: playersWithJesters });
                    }
                  }}
                >
                  강제 진행 (잠수/오류 방지)
                </button>
              )}`;

code = code.replace(
  /                  혁명 시작하기 \(왕부터 선\)\n                <\/button>\n              \)\}/,
  `                  혁명 시작하기 (왕부터 선)
                </button>
              )}`
);

// We need to inject the force button when it is NOT revolution, but waiting for one.
// Let's find: `{!roomData.taxState?.revolution && (`
// Inside this block, we show the message waiting for revolution.
const waitingBlock = /<h3 style=\{\{ marginBottom: '1rem' \}\}>혁명 선언 대기 중...<\/h3>\n              <p style=\{\{ color: 'var\(--text-secondary\)' \}\}>광대 2장을 가진 플레이어의 결정을 기다리고 있습니다.<\/p>/;
const newWaitingBlock = `<h3 style={{ marginBottom: '1rem' }}>혁명 선언 대기 중...</h3>
              <p style={{ color: 'var(--text-secondary)' }}>광대 2장을 가진 플레이어의 결정을 기다리고 있습니다.</p>
${forceBtnLogic}`;

code = code.replace(waitingBlock, newWaitingBlock);

fs.writeFileSync('src/components/GameBoard.jsx', code);
