import React from 'react';

export default function TaxResult({ roomData, isHost, startGame, CARD_NAMES, nickname }) {
  const result = roomData.taxState?.result;
  if (!result) return null;
  
  const isKingOrPeasant = nickname === result.dalmutiName || nickname === result.peasantName;
  const isNobleOrLesser = nickname === result.nobleName || nickname === result.lesserPeasantName;
  
  return (
    <div className="waiting-room text-center">
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>세금 교환 결과</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>👑 왕 ({result.dalmutiName}) ↔ ⛏️ 대농노 ({result.peasantName})</h4>
          {isKingOrPeasant ? (
            <>
              <p>왕이 하사한 카드: {result.dalmutiCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
              <p>대농노가 바친 카드: {result.pBest.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
            </>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>은밀하게 2장의 카드가 교환되었습니다.</p>
          )}
        </div>
        
        {result.nobleCards && result.nobleCards.length > 0 && (
          <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>💎 귀족 ({result.nobleName}) ↔ 🌾 소농노 ({result.lesserPeasantName})</h4>
            {isNobleOrLesser ? (
              <>
                <p>귀족이 하사한 카드: {result.nobleCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
                <p>소농노가 바친 카드: {result.lpBest.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}</p>
              </>
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>은밀하게 1장의 카드가 교환되었습니다.</p>
            )}
          </div>
        )}
      </div>
      
      {isHost ? (
        <button className="btn" onClick={startGame}>
          게임 시작하기
        </button>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>방장이 게임을 시작할 때까지 대기해주세요...</p>
      )}
    </div>
  );
}
