const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const badCode = `              {!isFinished && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                      <div className="toggle-knob"></div>
                    </div>
                    이번 트릭 계속 패스 (자동)
                  </div>
                </div>
              )}`;

const goodCode = `              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                    <div className="toggle-knob"></div>
                  </div>
                  이번 트릭 계속 패스 (자동)
                </div>
              </div>`;

code = code.replace(badCode, goodCode);
fs.writeFileSync('src/components/GameBoard.jsx', code);
