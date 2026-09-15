const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Insert effectiveCenterCards logic
code = code.replace(
  /  const centerCards = roomData\?\.centerCards;\n/g,
  `  const centerCards = roomData?.centerCards;
  const finishedPlayers = roomData?.finishedPlayers || [];
  const isNewTrick = !centerCards || roomData?.lastPlayedBy === nickname || finishedPlayers.includes(roomData?.lastPlayedBy);
  const effectiveCenterCards = isNewTrick ? null : centerCards;\n`
);

code = code.replace(
  /validatePlay\(selectedValuesForValidation, centerCards\)/g,
  'validatePlay(selectedValuesForValidation, effectiveCenterCards)'
);

// 2. Add autoPass state & useEffect
const autoPassHooks = `
  const [autoPassTrick, setAutoPassTrick] = useState(false);
  const currentTurnPlayer = roomData?.currentTurn;
  const isMyTurn = currentTurnPlayer === nickname;
  
  // Auto pass trick effect
  useEffect(() => {
    if (isNewTrick) {
      setAutoPassTrick(false);
    }
  }, [isNewTrick]);
  
  useEffect(() => {
    if (isMyTurn && autoPassTrick && !finishedPlayers.includes(nickname)) {
      passTurn(true);
    }
  }, [isMyTurn, autoPassTrick, finishedPlayers, nickname]);
`;
code = code.replace(
  /  const isHost = me\?\.isHost;\n/g,
  `  const isHost = me?.isHost;${autoPassHooks}\n`
);

// 3. Update getIsCardDimmed to use effectiveCenterCards
code = code.replace(
  /    if \(!centerCards\) return false;\n    if \(num === 13\) return false; \/\/ 조커는 어두워지지 않음\n    return num >= centerCards\.rank;/g,
  `    if (!effectiveCenterCards) return false;
    if (num === 13) return false; // 조커는 어두워지지 않음
    return num >= effectiveCenterCards.rank;`
);

// 4. Update playCards and passTurn
const playCardsPassTurn = `
  const playCards = () => {
    const selectedValues = selectedCards.map(idx => myHand[idx]);
    const validation = validatePlay(selectedValues, effectiveCenterCards);
    if (!validation.valid) {
      alert(validation.reason);
      return;
    }
    
    // 최고의 패일 경우 묻지 않고 바로 패스 처리
    const isUnbeatable = validation.rank === validation.count;
    if (!isUnbeatable) {
      if (!window.confirm('정말 이 카드를 내시겠습니까?')) return;
    }
    
    const newHand = myHand.filter((_, idx) => !selectedCards.includes(idx));
    
    let nextFinished = [...finishedPlayers];
    if (newHand.length === 0) {
      nextFinished.push(nickname);
    }
    
    const orderedPlayers = roomData.ranks || Object.keys(players);
    const activePlayers = orderedPlayers.filter(p => !nextFinished.includes(p));
    
    let nextUpdates = {
      centerCards: {
        cards: selectedValues,
        rank: validation.rank,
        count: validation.count
      },
      lastPlayedBy: nickname,
      passedPlayers: [],
      [\`players/\${nickname}/hand\`]: newHand,
      finishedPlayers: nextFinished
    };
    
    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1) nextFinished.push(activePlayers[0]);
      nextUpdates.status = 'round_over';
      nextUpdates.ranks = nextFinished;
      
      if (roomData.currentRoundLog) {
         const historyRef = ref(db, 'history');
         const log = { 
           ...roomData.currentRoundLog, 
           finalRanks: nextFinished, 
           timestamp: Date.now() 
         };
         push(historyRef, log);
      }
    } else {
      if (isUnbeatable) {
        // 절대 깰 수 없는 패인 경우(ex: 1이 1장, 2가 2장 등) 다른 모든 플레이어를 패스 처리하고 즉시 턴을 돌려받음
        nextUpdates.passedPlayers = activePlayers.filter(p => p !== nickname);
        // 다음 턴은 바로 자신(새로운 트릭) - 만약 자신이 이 카드로 끝났다면 다음 사람
        let nextLead = nickname;
        if (nextFinished.includes(nickname)) {
           nextLead = getNextPlayer(nickname, orderedPlayers, [], nextFinished);
        }
        nextUpdates.currentTurn = nextLead;
      } else {
        nextUpdates.currentTurn = getNextPlayer(nickname, orderedPlayers, [], nextFinished);
      }
    }
    
    update(ref(db, \`rooms/\${roomCode}\`), nextUpdates);
    setSelectedCards([]);
  };

  const passTurn = (isAuto = false) => {
    if (!isAuto && !window.confirm('정말 패스하시겠습니까?')) return;
    
    const orderedPlayers = roomData.ranks || Object.keys(players);
    const passed = roomData.passedPlayers || [];
    const activeCount = orderedPlayers.filter(p => !finishedPlayers.includes(p)).length;
    
    const newPassed = [...passed, nickname];
    let nextUpdates = { passedPlayers: newPassed };
    
    const lastPlayer = roomData.lastPlayedBy;
    const requiredPasses = finishedPlayers.includes(lastPlayer) ? activeCount : activeCount - 1;
    
    if (newPassed.length >= requiredPasses) {
      let nextLead = lastPlayer;
      if (finishedPlayers.includes(lastPlayer)) {
         nextLead = getNextPlayer(lastPlayer, orderedPlayers, [], finishedPlayers);
      }
      nextUpdates.passedPlayers = [];
      nextUpdates.currentTurn = nextLead;
      // centerCards와 lastPlayedBy를 유지하여 화면에 남도록 함
    } else {
      nextUpdates.currentTurn = getNextPlayer(nickname, orderedPlayers, newPassed, finishedPlayers);
    }
    
    update(ref(db, \`rooms/\${roomCode}\`), nextUpdates);
    setSelectedCards([]);
  };
`;

code = code.replace(
  /  const playCards = \(\) => \{[\s\S]*?setSelectedCards\(\[\]\);\n  \};\n/g,
  playCardsPassTurn
);
code = code.replace(
  /  const passTurn = \(\) => \{[\s\S]*?setSelectedCards\(\[\]\);\n  \};\n/g,
  ''
);

fs.writeFileSync('src/components/GameBoard.jsx', code);
