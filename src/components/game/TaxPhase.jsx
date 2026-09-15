import React from 'react';
import Card from '../Card';

export default function TaxPhase({ roomData, nickname, isHost, passRevolution, hasRevolution, isDalmuti, isPeasant, isNoble, isLesserPeasant, CARD_NAMES, update, ref, db, roomCode, playersWithJesters }) {
  return (
    <div className="waiting-room text-center">
      {roomData.taxState?.revolution ? (
        <div style={{ padding: '3rem 0', animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--destructive)' }}>
            🔥 {roomData.taxState.revolution === 'greater' ? '대혁명 발동!!' : '혁명 발동!!'} 🔥
          </h2>
          <h3 style={{ marginBottom: '2rem' }}>
            {roomData.taxState.revolutionBy}님이 조커 2장으로 혁명을 일으켰습니다!
          </h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            이번 라운드는 세금 교환 없이 평등하게 진행됩니다.
          </p>
          {isHost && (
            <button 
              className="btn" 
              style={{ marginTop: '2rem' }}
              onClick={() => update(ref(db, \`rooms/\${roomCode}\`), { status: 'playing', taxState: null, currentTurn: roomData.ranks[0] })}
            >
              혁명 시작하기 (왕부터 선)
            </button>
          )}
        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>💰 세금 징수 단계 💰</h2>
          
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            {hasRevolution && !roomData.taxState?.revolutionPassedBy?.includes(nickname) && (
              <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '2px dashed var(--destructive)', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--destructive)', marginBottom: '0.5rem' }}>⚠️ 조커 2장 보유 중!</h3>
                <p style={{ marginBottom: '1rem' }}>세금 교환을 멈추고 혁명을 일으키겠습니까?</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn" style={{ background: 'var(--destructive)', color: 'white' }} onClick={() => passRevolution(true)}>
                    🔥 혁명 일으키기
                  </button>
                  <button className="btn btn-secondary" onClick={() => passRevolution(false)}>
                    혁명 포기 (Pass)
                  </button>
                </div>
              </div>
            )}
            
            {hasRevolution && roomData.taxState?.revolutionPassedBy?.includes(nickname) && (
              <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>혁명을 포기했습니다. 게임 시작을 대기 중입니다...</p>
            )}

            {(!hasRevolution || roomData.taxState?.revolutionPassedBy?.includes(nickname)) && (
              <>
                {isDalmuti ? (
                  roomData.taxState?.dalmutiCards ? (
                     <p>선택 완료! 다른 플레이어를 기다립니다...</p>
                  ) : (
                    <div>
                      <p style={{ marginBottom: '1rem' }}>대농노에게 줄 필요 없는 카드 2장을 선택하세요.</p>
                      {/* Selection UI is handled in GameBoard for now to keep state simple, but wait... 
                          Actually, if I extract this, the hand rendering uses handleCardClick which is in GameBoard. */}
                    </div>
                  )
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
