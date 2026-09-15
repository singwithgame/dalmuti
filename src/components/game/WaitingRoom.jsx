import React from 'react';
import Card from '../Card';

export default function WaitingRoom({ roomCode, playerCount, players, isHost, startGame, handleLeaveRoom, CARD_NAMES }) {
  return (
    <>
      <div className="header">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          방 코드: <span style={{ color: 'var(--primary)' }}>{roomCode}</span>
        </h2>
        <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.5rem 1rem' }} onClick={handleLeaveRoom}>나가기</button>
      </div>
      
      <p className="philosophy-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>Das Leben ist ungerecht</p>

      <div className="waiting-room">
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>대기실 (현재 {playerCount}명)</h3>
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem'}}>
          최소 4명 이상이어야 게임을 시작할 수 있습니다.<br/>
          (추천 인원: 5~8명)
        </p>
        <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {Object.entries(players).map(([name, data]) => (
            <li key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: data.isHost ? 'bold' : 'normal' }}>
                {name} {data.isHost ? '👑 (방장)' : ''}
              </span>
            </li>
          ))}
        </ul>
        {isHost ? (
          <button className="btn" onClick={startGame} disabled={playerCount < 4}>
            게임 시작하기 (카드 섞기)
          </button>
        ) : (
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', textAlign: 'center' }}>
            ⏳ 방장이 게임을 시작할 때까지 대기중...
          </div>
        )}
      </div>
    </>
  );
}
