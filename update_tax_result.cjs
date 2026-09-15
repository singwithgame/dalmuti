const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Update the useEffect logic
code = code.replace(
  /        update\(ref\(db, \`rooms\/\$\{roomCode\}\`\), \{\n          status: 'playing',\n          currentTurn: ranks\[0\],\n          taxState: null,/g,
  `        update(ref(db, \`rooms/\${roomCode}\`), {
          status: 'tax_result',
          currentTurn: ranks[0],
          'taxState/completed': true,
          'taxState/result': {
            dalmutiCards: taxState.dalmutiCards,
            nobleCards: taxState.nobleCards,
            pBest: pBest,
            lpBest: lpBest,
            dalmutiName: dalmutiName,
            nobleName: nobleName,
            peasantName: peasantName,
            lesserPeasantName: lesserPeasantName
          },`
);

// 2. Render tax_result block
const taxResultHtml = `      {roomData.status === 'tax_result' && roomData.taxState?.result && (
        <div className="waiting-room text-center">
          <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>세금 교환 결과</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>👑 왕 ({roomData.taxState.result.dalmutiName}) ↔ ⛏️ 대농노 ({roomData.taxState.result.peasantName})</h4>
              <p>왕이 준 카드: {roomData.taxState.result.dalmutiCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
              <p>대농노가 바친 카드: {roomData.taxState.result.pBest.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
            </div>
            
            {roomData.taxState.result.nobleCards && roomData.taxState.result.nobleCards.length > 0 && (
              <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>💎 귀족 ({roomData.taxState.result.nobleName}) ↔ 🌾 소농노 ({roomData.taxState.result.lesserPeasantName})</h4>
                <p>귀족이 준 카드: {roomData.taxState.result.nobleCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
                <p>소농노가 바친 카드: {roomData.taxState.result.lpBest.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
              </div>
            )}
          </div>
          
          {isHost ? (
            <button className="btn" onClick={() => update(ref(db, \`rooms/\${roomCode}\`), { status: 'playing', taxState: null })}>
              게임 시작하기
            </button>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>방장이 게임을 시작할 때까지 대기해주세요...</p>
          )}
        </div>
      )}

      {roomData.status === 'playing'`;

code = code.replace(/      \{roomData\.status === 'playing'/g, taxResultHtml);

fs.writeFileSync('src/components/GameBoard.jsx', code);
