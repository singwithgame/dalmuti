const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// 1. Remove isUnbeatable confirm bypass
const confirmBlock = `    // 최고의 패일 경우 묻지 않고 바로 패스 처리
    const isUnbeatable = validation.rank === validation.count;
    if (!isUnbeatable) {
      if (!window.confirm('정말 이 카드를 내시겠습니까?')) return;
    }`;
code = code.replace(confirmBlock, `    if (!window.confirm('정말 이 카드를 내시겠습니까?')) return;`);

// 2. Remove isUnbeatable logic in currentTurn update
const turnBlock = `      if (isUnbeatable) {
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
      }`;
code = code.replace(turnBlock, `      nextUpdates.currentTurn = getNextPlayer(nickname, orderedPlayers, [], nextFinished);`);

fs.writeFileSync('src/components/GameBoard.jsx', code);
