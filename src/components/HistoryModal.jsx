import { useState } from 'react';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';
import { CARD_NAMES } from '../gameLogic';

export default function HistoryModal({ onClose, password, setPassword }) {
  const [history, setHistory] = useState(null);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [visibleCount, setVisibleCount] = useState(5);

  const handleCopyText = (record) => {
    let text = `[방 코드: ${record.roomCode}] ${new Date(record.timestamp).toLocaleString()}\n`;
    text += `시작 계급: ${record.initialRanks.map((name, idx) => `${getRankName(idx, record.initialRanks.length)} ${name}`).join(', ')}\n`;
    
    if (record.revolution) {
      text += `🔥 ${record.revolutionBy}님이 조커 2장으로 ${record.revolution === 'greater' ? '대혁명' : '혁명'} 발동!\n`;
    } else if (record.taxes) {
      if (record.taxes.dalmutiCards) {
        text += `👑 왕이 하사한 카드: ${record.taxes.dalmutiCards.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}\n`;
      }
      if (record.taxes.pBest) {
        text += `⛏️ 대농노가 바친 카드: ${record.taxes.pBest.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}\n`;
      }
      if (record.taxes.nobleCards) {
        text += `💎 귀족이 하사한 카드: ${record.taxes.nobleCards.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}\n`;
      }
      if (record.taxes.lpBest) {
        text += `🌾 소농노가 바친 카드: ${record.taxes.lpBest.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}\n`;
      }
    }
    
    text += `최종 결과:\n`;
    record.finalRanks.forEach((name, idx) => {
      text += `${idx + 1}등: ${name} (${getRankName(idx, record.finalRanks.length)})\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
      alert('기록이 복사되었습니다.');
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };

  const fetchHistory = async () => {
    const requiredPassword = import.meta.env.VITE_ROOM_PASSWORD || 'dalmuti';
    if (password !== requiredPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const historyRef = ref(db, 'history');
      const snapshot = await get(historyRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert to array and sort by timestamp descending
        const historyArray = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
        setHistory(historyArray);
      } else {
        setHistory([]);
      }
      setIsAuthenticated(true);
      setError('');
    } catch {
      setError('기록을 불러오는데 실패했습니다.');
    }
  };

  const getRankName = (idx, total) => {
    if (idx === 0) return '👑 왕';
    if (idx === 1) return '💎 귀족';
    if (idx === total - 1) return '⛏️ 노예';
    if (idx === total - 2) return '🌾 평민';
    return '💰 상인';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', textAlign: 'center' }}>📜 전체 게임 기록</h2>
        
        {!isAuthenticated ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>기록을 열람하려면 관리자 비밀번호가 필요합니다.</p>
            {error && <p style={{ color: 'var(--destructive)', marginBottom: '1rem' }}>{error}</p>}
            <input
              type="password"
              className="input"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchHistory()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={onClose}>닫기</button>
              <button className="btn" onClick={fetchHistory}>확인</button>
            </div>
          </div>
        ) : (
          <div>
            {history.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>아직 저장된 게임 기록이 없습니다.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {history.slice(0, visibleCount).map((record, i) => (
                  <div key={i} style={{ background: 'var(--card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>방 코드: {record.roomCode}</span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(record.timestamp).toLocaleString()}</span>
                        <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem', opacity: 0.8 }} onClick={() => handleCopyText(record)}>복사</button>
                      </div>
                    </div>


                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>시작 계급</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {record.initialRanks.map((name, idx) => (
                          <span key={name} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                            {getRankName(idx, record.initialRanks.length)}: {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {(record.taxes || record.revolution) && (
                      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>세금 납부 및 혁명</h4>
                        {record.revolution ? (
                          <p style={{ color: 'var(--destructive)', fontWeight: 'bold' }}>
                            🔥 {record.revolutionBy}님이 조커 2장으로 {record.revolution === 'greater' ? '대혁명' : '혁명'}을 일으켰습니다! (세금 무효화)
                          </p>
                        ) : (
                          <div style={{ fontSize: '0.9rem' }}>
                            {record.taxes?.dalmutiCards && (
                              <p>👑 왕이 하사한 카드: {record.taxes.dalmutiCards.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}</p>
                            )}
                            {record.taxes?.pBest && (
                              <p>⛏️ 대농노가 바친 카드: {record.taxes.pBest.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}</p>
                            )}
                            {record.taxes?.nobleCards && (
                              <p>💎 귀족이 하사한 카드: {record.taxes.nobleCards.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}</p>
                            )}
                            {record.taxes?.lpBest && (
                              <p>🌾 소농노가 바친 카드: {record.taxes.lpBest.map(c => `${CARD_NAMES[c].split(' ')[0]}(${c})`).join(', ')}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>최종 결과</h4>
                      <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem' }}>
                        {record.finalRanks.map((name, idx) => (
                          <li key={name} style={{ margin: '4px 0' }}>
                            <strong>{name}</strong> ({getRankName(idx, record.finalRanks.length)})
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {visibleCount < history.length && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setVisibleCount(prev => prev + 5)}>5개 더보기</button>
              </div>
            )}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button className="btn btn-secondary" onClick={onClose}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
