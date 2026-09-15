import React from 'react';

export default function RoundOver({ roomData, nickname, isHost, startGame }) {
  return (
    <div className="waiting-room text-center">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>🎉 라운드 종료! 🎉</h2>
      <h3>최종 계급도</h3>
      <ol style={{ marginTop: '1rem', marginBottom: '2rem', textAlign: 'left', display: 'inline-block' }}>
         {roomData.ranks && roomData.ranks.map((name, idx) => {
           const getRankTitle = (i, total) => {
             if (i === 0) return '👑 왕';
             if (i === 1) return '💎 귀족';
             if (i === total - 1) return '🧹 노예';
             if (i === total - 2) return '⛏️ 평민';
             return '💰 상인';
           };
           const title = getRankTitle(idx, roomData.ranks.length);
           
           let changeText = '';
           const oldIdx = roomData.currentRoundLog?.initialRanks ? roomData.currentRoundLog.initialRanks.indexOf(name) : -1;
           const isFirstGameResult = !roomData.round || roomData.round === 1;
           
           if (!isFirstGameResult && oldIdx !== -1) {
             const oldTitle = getRankTitle(oldIdx, roomData.ranks.length);
             if (oldIdx === idx) {
               changeText = `(이전: ${oldTitle} ➡️ 신분 유지)`;
             } else if (oldIdx > idx) {
               changeText = `(이전: ${oldTitle} ➡️ 신분 상승! 🚀)`;
             } else {
               changeText = `(이전: ${oldTitle} ➡️ 신분 하락 🔻)`;
             }
           }
           
           const isMe = name === nickname;
           
           return (
             <li 
               key={name} 
               style={{ 
                 margin: '0.75rem 0', 
                 fontSize: '1.1rem',
                 padding: '0.5rem 1rem',
                 borderRadius: '8px',
                 background: isMe ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                 border: isMe ? '1px solid var(--primary)' : '1px solid transparent'
               }}
             >
               {title} - <strong>{name}</strong> {isMe && '(나)'}
               {changeText && (
                 <span style={{ fontSize: '0.9rem', color: isMe ? 'var(--foreground)' : 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                   {changeText}
                 </span>
               )}
             </li>
           );
         })}
      </ol>
      {isHost ? (
        <button className="btn" onClick={startGame}>
          다음 라운드 시작하기 (세금 납부 및 카드 섞기)
        </button>
      ) : (
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>
          ⏳ 방장이 다음 라운드를 시작할 때까지 대기중...
        </div>
      )}
    </div>
  );
}
