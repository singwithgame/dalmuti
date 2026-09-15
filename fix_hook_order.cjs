const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const hookBlock = `  const [autoPassTrick, setAutoPassTrick] = useState(false);
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
  }, [isMyTurn, autoPassTrick, finishedPlayers, nickname]);`;

// Remove it from current location
code = code.replace(hookBlock, '');
// Also remove empty lines around it
code = code.replace(/  const isHost = me\?\.isHost;\n\n  \n/g, '  const isHost = me?.isHost;\n');

// Insert it BEFORE `if (!roomData)`
code = code.replace(
  /  if \(!roomData\) return <div className="lobby-container">Loading\.\.\.<\/div>;/g,
  hookBlock + '\n\n  if (!roomData) return <div className="lobby-container">Loading...</div>;'
);

fs.writeFileSync('src/components/GameBoard.jsx', code);
