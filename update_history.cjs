const fs = require('fs');
let code = fs.readFileSync('src/components/HistoryModal.jsx', 'utf8');

const visibleCountState = `  const [visibleCount, setVisibleCount] = useState(5);

  const handleCopyText = (record) => {
    let text = \`[방 코드: \${record.roomCode}] \${new Date(record.timestamp).toLocaleString()}\\n\`;
    text += \`시작 계급: \${record.initialRanks.map((name, idx) => \`\${getRankName(idx, record.initialRanks.length)} \${name}\`).join(', ')}\\n\`;
    
    if (record.revolution) {
      text += \`🔥 \${record.revolutionBy}님이 조커 2장으로 \${record.revolution === 'greater' ? '대혁명' : '혁명'} 발동!\\n\`;
    } else if (record.taxes) {
      if (record.taxes.dalmutiCards) {
        text += \`👑 왕이 준 카드: \${record.taxes.dalmutiCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}\\n\`;
      }
      if (record.taxes.nobleCards) {
        text += \`💎 귀족이 준 카드: \${record.taxes.nobleCards.map(c => CARD_NAMES[c].split(' ')[0]).join(', ')}\\n\`;
      }
    }
    
    text += \`최종 결과:\\n\`;
    record.finalRanks.forEach((name, idx) => {
      text += \`\${idx + 1}등: \${name} (\${getRankName(idx, record.finalRanks.length)})\\n\`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
      alert('기록이 복사되었습니다.');
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };`;

code = code.replace(/  const fetchHistory = async \(\) => \{/, visibleCountState + '\n\n  const fetchHistory = async () => {');

const copyButtonHtml = `
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>방 코드: {record.roomCode}</span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(record.timestamp).toLocaleString()}</span>
                        <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem', opacity: 0.8 }} onClick={() => handleCopyText(record)}>복사</button>
                      </div>
                    </div>
`;
code = code.replace(/<div style=\{\{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var\(--border\)', paddingBottom: '0\.5rem' \}\}>[\s\S]*?<\/div>/, copyButtonHtml);

const loadMoreBtn = `
                {history.slice(0, visibleCount).map((record, i) => (`;
code = code.replace(/\{history\.map\(\(record, i\) => \(/, loadMoreBtn);

const closeBtnArea = `
            {visibleCount < history.length && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setVisibleCount(prev => prev + 5)}>5개 더보기</button>
              </div>
            )}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>`;
code = code.replace(/<div style=\{\{ marginTop: '1\.5rem', textAlign: 'center' \}\}>/, closeBtnArea);

fs.writeFileSync('src/components/HistoryModal.jsx', code);
