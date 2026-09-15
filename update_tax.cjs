const fs = require('fs');
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Remove dangerous auto-cleanup useEffect
jsx = jsx.replace(
  /\/\/ 자동 턴 정리 \([\s\S]*?\}, \[roomData\?.status, roomData\?.currentTurn, roomData\?.lastPlayedBy, roomData\?.centerCards, nickname, roomCode\]\);\n/,
  ''
);

// 2. Fix Zombie Players by adding handleLeaveRoom
jsx = jsx.replace(
  /const isHost = me\?\.isHost;/,
  `const isHost = me?.isHost;
  
  const handleLeaveRoom = async () => {
    if (window.confirm("정말 방을 나가시겠습니까? 게임 진행 중일 경우 다른 플레이어들에게 방해가 될 수 있습니다.")) {
      const { ref, remove } = await import('firebase/database');
      await remove(ref(db, \`rooms/\${roomCode}/players/\${nickname}\`));
      onLeave();
    }
  };`
);
jsx = jsx.replace(
  /onClick=\{onLeave\}/g,
  `onClick={handleLeaveRoom}`
);

// 3. Fix Tax Timeout Anti-pattern & Add Revolution Pass
// First, replace the host's useEffect tax logic
jsx = jsx.replace(
  /if \(!taxState\.processedTax\) \{[\s\S]*?return;\s*\}/,
  `const playersWithJesters = Object.entries(roomData.players).filter(([name, p]) => p.hand && p.hand.filter(c => c === 13).length >= 2).map(([name]) => name);
        const allRevolutionPassed = playersWithJesters.every(name => taxState.revolutionPassedBy?.includes(name));

        if (!allRevolutionPassed) {
           return; // 혁명 가능자가 아직 결정을 안 함
        }`
);
jsx = jsx.replace(
  /if \(!taxState\.taxComplete\) \{[\s\S]*?return;\s*\}/,
  `` // Remove taxComplete check
);

// 4. Update passRevolution function
jsx = jsx.replace(
  /const declareRevolution = \(\) => \{/,
  `const passRevolution = () => {
    const currentPassed = roomData.taxState?.revolutionPassedBy || [];
    if (!currentPassed.includes(nickname)) {
      update(ref(db, \`rooms/\${roomCode}\`), {
        'taxState/revolutionPassedBy': [...currentPassed, nickname]
      });
    }
  };

  const declareRevolution = () => {`
);

// 5. Remove taxCountdown from UI and state
jsx = jsx.replace(/const \[taxCountdown, setTaxCountdown\] = useState\(null\);\n/, '');
jsx = jsx.replace(/useEffect\(\(\) => \{\n\s*if \(roomData\?\.taxState\?\.processedTax[\s\S]*?\}, \[roomData\?\.taxState\?\.processedTax, roomData\?\.taxState\?\.taxComplete, roomData\?\.taxState\?\.revolution\]\);\n/, '');

// 6. Update Taxing UI
jsx = jsx.replace(
  /\{hasRevolution && \([\s\S]*?\}\)/,
  `{hasRevolution && !roomData.taxState?.revolutionPassedBy?.includes(nickname) && (
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn" style={{ backgroundColor: 'var(--color-destructive)', borderColor: 'var(--color-destructive)' }} onClick={declareRevolution}>
                    🔥 조커 2장으로 혁명 일으키기 🔥
                  </button>
                  <button className="btn btn-secondary" onClick={passRevolution}>
                    혁명 포기 (Pass)
                  </button>
                </div>
              )}
              {hasRevolution && roomData.taxState?.revolutionPassedBy?.includes(nickname) && (
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>혁명을 포기했습니다. 게임 시작을 대기 중입니다...</p>
              )}`
);

jsx = jsx.replace(
  /\{taxCountdown !== null \? \([\s\S]*?<\/div>\s*\) : isDalmuti \? \(/,
  `{isDalmuti ? (`
);

// 7. Update waiting message if taxes are submitted but waiting for revolution
jsx = jsx.replace(
  /👑 왕과 귀족이 노예에게 줄 카드를 고르고 있습니다\.\.\./,
  `👑 세금 교환을 진행 중입니다... (누군가 혁명을 고민하고 있을 수 있습니다)`
);

// 8. Add useMemo for performance
jsx = jsx.replace(
  /const selectedValuesForValidation = selectedCards\.map\(idx => myHand\[idx\]\);/,
  `const selectedValuesForValidation = React.useMemo(() => selectedCards.map(idx => myHand[idx]), [selectedCards, myHand]);`
);
jsx = jsx.replace(
  /const currentValidation = validatePlay\(selectedValuesForValidation, centerCards\);/,
  `const currentValidation = React.useMemo(() => validatePlay(selectedValuesForValidation, centerCards), [selectedValuesForValidation, centerCards]);`
);
jsx = jsx.replace(
  /const unselectedIndices = myHand\.map\(\(val, idx\) => idx\)\.filter\(idx => !selectedCards\.includes\(idx\)\);/,
  `const unselectedIndices = React.useMemo(() => myHand.map((val, idx) => idx).filter(idx => !selectedCards.includes(idx)), [myHand, selectedCards]);`
);
jsx = jsx.replace(
  /const groupedUnselected = \[\];\s*unselectedIndices\.forEach\(\(idx\) => \{[\s\S]*?\}\);/,
  `const groupedUnselected = React.useMemo(() => {
    const groups = [];
    unselectedIndices.forEach((idx) => {
      const num = myHand[idx];
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.num === num) {
        lastGroup.indices.push(idx);
      } else {
        groups.push({ num, indices: [idx] });
      }
    });
    return groups;
  }, [unselectedIndices, myHand]);`
);


fs.writeFileSync('src/components/GameBoard.jsx', jsx);
