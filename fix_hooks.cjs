const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// Remove useMemos from original locations
code = code.replace(/  const selectedValuesForValidation = useMemo\([^;]+;\n/g, '');
code = code.replace(/  const currentValidation = useMemo\([^;]+;\n/g, '');
code = code.replace(/  const unselectedIndices = useMemo\([^;]+;\n/g, '');
code = code.replace(/  const groupedUnselected = useMemo\(\(\) => \{[\s\S]*?\}, \[unselectedIndices, myHand\]\);\n/g, '');

// Also remove original const myHand and const centerCards
code = code.replace(/  const myHand = me\?\.hand \|\| \[\];\n/g, '');
code = code.replace(/  const centerCards = roomData\.centerCards;\n/g, '');

// Insert the new block
const insertion = `  const players = roomData?.players || {};
  const me = players[nickname];
  const myHand = me?.hand || [];
  const centerCards = roomData?.centerCards;

  const selectedValuesForValidation = useMemo(() => selectedCards.map(idx => myHand[idx]), [selectedCards, myHand]);
  const currentValidation = useMemo(() => validatePlay(selectedValuesForValidation, centerCards), [selectedValuesForValidation, centerCards]);
  
  const unselectedIndices = useMemo(() => myHand.map((_, i) => i).filter(i => !selectedCards.includes(i)), [myHand, selectedCards]);
  const groupedUnselected = useMemo(() => {
    const groups = [];
    unselectedIndices.forEach(idx => {
      const num = myHand[idx];
      const existing = groups.find(g => g.num === num);
      if (existing) {
        existing.indices.push(idx);
      } else {
        groups.push({ num, indices: [idx] });
      }
    });
    return groups;
  }, [unselectedIndices, myHand]);

  if (!roomData) return <div className="lobby-container">Loading...</div>;

  const isHost = me?.isHost;`;

code = code.replace(/  if \(\!roomData\) return <div className="lobby-container">Loading\.\.\.<\/div>;\n\n  const players = roomData\.players \|\| \{\};\n  const me = players\[nickname\];\n  const isHost = me\?\.isHost;/, insertion);

fs.writeFileSync('src/components/GameBoard.jsx', code);
