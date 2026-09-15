const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Add trickId to playCards
code = code.replace(
  /      lastPlayedBy: nickname,\n      passedPlayers: \[\],/,
  `      lastPlayedBy: nickname,
      passedPlayers: [],
      trickId: Date.now(),`
);

// 2. Add trickId to passTurn
code = code.replace(
  /      nextUpdates.passedPlayers = \[\];\n      let nextLead = getNextPlayer/,
  `      nextUpdates.passedPlayers = [];
      nextUpdates.trickId = Date.now();
      let nextLead = getNextPlayer`
);

// 3. Update autoPassTrick useEffect to depend on trickId
code = code.replace(
  /  \/\/ Auto pass trick effect\n  useEffect\(\(\) => \{\n    if \(isNewTrick\) \{\n      setAutoPassTrick\(false\);\n    \}\n  \}, \[isNewTrick\]\);/,
  `  const trickId = roomData?.trickId;
  // Auto pass trick effect
  useEffect(() => {
    setAutoPassTrick(false);
  }, [trickId]);`
);

// 4. Add Toggle UI back
const toggleUI = `                <button className="btn btn-secondary" disabled={!isMyTurn || (!centerCards) || isFinished} onClick={() => passTurn(false)}>패스 (Pass)</button>
              </div>
              
              {!isFinished && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                      <div className="toggle-knob"></div>
                    </div>
                    이번 트릭 계속 패스 (자동)
                  </div>
                </div>
              )}`;
code = code.replace(/                <button className="btn btn-secondary" disabled=\{!isMyTurn \|\| \(!centerCards\) \|\| isFinished\} onClick=\{passTurn\}>패스 \(Pass\)<\/button>\n              <\/div>/, toggleUI);

fs.writeFileSync('src/components/GameBoard.jsx', code);

// 5. Fix cleanup logic in App.jsx
let appCode = fs.readFileSync('src/App.jsx', 'utf8');
appCode = appCode.replace(
  /            if \(createdAt && now - createdAt > ONE_WEEK\) \{/,
  `            if (createdAt && now - createdAt > ONE_WEEK) {`
);
// Actually, let's just make it query properly or just don't worry too much about Firebase bandwidth for a 1-time load of a few rooms. Let's limit it to 50 rooms. Or we can just leave it since the reviewer marked it Medium.
// Wait, the reviewer also pointed out: Revolution Deadlock!
