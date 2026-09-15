const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// Remove redundant declarations
code = code.replace(/  const currentTurnPlayer = roomData\.currentTurn;\n/g, '');
code = code.replace(/  const isMyTurn = currentTurnPlayer === nickname;\n/g, '');
code = code.replace(/  const finishedPlayers = roomData\.finishedPlayers \|\| \[\];\n/g, '');

// Add Auto Pass Toggle to the staging area / actions
const passBtnRegex = /<button className="btn btn-secondary" onClick={passTurn} style={{ flex: 1 }}>\s*패스\s*<\/button>/g;
const passBtnReplacement = `<button className="btn btn-secondary" onClick={() => passTurn(false)} style={{ flex: 1 }}>
                    패스
                  </button>
                </div>
                <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={autoPassTrick} onChange={(e) => setAutoPassTrick(e.target.checked)} style={{ transform: 'scale(1.2)' }} />
                    이번 트릭 계속 패스 (자동)
                  </label>`;
                  
code = code.replace(passBtnRegex, passBtnReplacement);

fs.writeFileSync('src/components/GameBoard.jsx', code);
