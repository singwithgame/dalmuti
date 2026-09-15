const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const oldBlock = `            {!isFinished && (
              <div className="hand-actions" style={{ opacity: isMyTurn ? 1 : 0.5 }}>
                <button 
                  className="btn" 
                  disabled={!isMyTurn || !isSelectionValid || isFinished} 
                  onClick={playCards}
                >
                  카드 내기
                </button>
                <button className="btn btn-secondary" disabled={!isMyTurn || (!centerCards) || isFinished} onClick={() => passTurn(false)}>패스 (Pass)</button>
              </div>
              
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                    <div className="toggle-knob"></div>
                  </div>
                  이번 트릭 계속 패스 (자동)
                </div>
              </div>
            )}`;

const newBlock = `            {!isFinished && (
              <>
                <div className="hand-actions" style={{ opacity: isMyTurn ? 1 : 0.5 }}>
                  <button 
                    className="btn" 
                    disabled={!isMyTurn || !isSelectionValid || isFinished} 
                    onClick={playCards}
                  >
                    카드 내기
                  </button>
                  <button className="btn btn-secondary" disabled={!isMyTurn || (!centerCards) || isFinished} onClick={() => passTurn(false)}>패스 (Pass)</button>
                </div>
                
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                      <div className="toggle-knob"></div>
                    </div>
                    이번 트릭 계속 패스 (자동)
                  </div>
                </div>
              </>
            )}`;

code = code.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/GameBoard.jsx', code);
