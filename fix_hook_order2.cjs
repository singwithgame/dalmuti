const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// The original one that failed to be replaced:
const originalBadBlock = `  const [autoPassTrick, setAutoPassTrick] = useState(false);
  const currentTurnPlayer = roomData?.currentTurn;
  
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
  }, [isMyTurn, autoPassTrick, finishedPlayers, nickname]);`;

code = code.replace(originalBadBlock, '');

// Wait, I might have multiple of these. Let's just use regex to remove everything between `const isHost = me?.isHost;` and `const handleLeaveRoom`
code = code.replace(
  /  const isHost = me\?\.isHost;[\s\S]*?const handleLeaveRoom/g,
  '  const isHost = me?.isHost;\n\n  const handleLeaveRoom'
);

fs.writeFileSync('src/components/GameBoard.jsx', code);
