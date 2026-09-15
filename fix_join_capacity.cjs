const fs = require('fs');
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

appJsx = appJsx.replace(
  /if \(snapshot\.exists\(\)\) \{[\s\S]*?const isExistingPlayer = roomData\.players && roomData\.players\[nickname\];/,
  `if (snapshot.exists()) {
        const roomData = snapshot.val();
        const isExistingPlayer = roomData.players && roomData.players[nickname];
        
        // 인원 초과 체크 로직 추가
        const playerCount = roomData.players ? Object.keys(roomData.players).length : 0;
        if (!isExistingPlayer && playerCount >= 8) {
          setError('방 인원이 꽉 찼습니다 (최대 8명).');
          return;
        }`
);

fs.writeFileSync('src/App.jsx', appJsx);
