const fs = require('fs');
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

jsx = jsx.replace(
  /const groupedUnselected = \[\];\s*unselectedIndices\.forEach\(idx => \{[\s\S]*?\}\);/,
  `const groupedUnselected = useMemo(() => {
    const groups = [];
    unselectedIndices.forEach((idx) => {
      const num = myHand[idx];
      const existing = groups.find(g => g.num === num);
      if (existing) {
        existing.indices.push(idx);
      } else {
        groups.push({ num, indices: [idx] });
      }
    });
    return groups;
  }, [unselectedIndices, myHand]);`
);

jsx = jsx.replace(/React\.useMemo/g, 'useMemo');

fs.writeFileSync('src/components/GameBoard.jsx', jsx);
