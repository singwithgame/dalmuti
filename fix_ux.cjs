const fs = require('fs');

// 1. UPDATE index.css
let css = fs.readFileSync('src/index.css', 'utf8');

// Enhance .playing-card 3D effect
css = css.replace(
  /\.playing-card\s*\{[\s\S]*?position:\s*relative;\s*\n\}/,
  `.playing-card {
  width: 80px;
  height: 120px;
  border-radius: 8px;
  background-color: var(--color-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.6), 0 4px 8px -2px rgba(0, 0, 0, 0.8);
  overflow: visible;
  position: relative;
}`
);

// Enhance .playing-card:hover
css = css.replace(
  /\.playing-card:hover\s*\{[^}]+\}/,
  `.playing-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 16px 24px -4px rgba(0, 0, 0, 0.7), 0 8px 12px -2px rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
}`
);

// Enhance .playing-card.selected
css = css.replace(
  /\.playing-card\.selected\s*\{[^}]+\}/,
  `.playing-card.selected {
  transform: translateY(-20px) scale(1.05);
  border: 2px solid var(--color-primary);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 20px 30px -4px rgba(0, 0, 0, 0.8), 0 0 15px color-mix(in srgb, var(--color-primary) 60%, transparent);
  z-index: 10;
}`
);

// Add hierarchy classes for Turn Indicator
css += `
/* Hierarchy - Turn Indicator */
.turn-indicator {
  transition: all var(--duration-moderate) ease;
  font-family: var(--font-family);
  margin-bottom: 0.5rem;
}

.turn-indicator.my-turn {
  color: var(--color-primary);
  font-size: 1.4rem;
  font-weight: 800;
  text-shadow: 0 2px 10px color-mix(in srgb, var(--color-primary) 40%, transparent);
  animation: myTurnPulse 2s infinite;
}

.turn-indicator.others-turn {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes myTurnPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.validation-message {
  height: 24px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
}
`;

fs.writeFileSync('src/index.css', css);

// 2. UPDATE GameBoard.jsx
let jsx = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

// Replace inline styled turn indicator with className
jsx = jsx.replace(
  /<div className="turn-indicator" style=\{\{ marginBottom: '0\.2rem', fontWeight: 'bold', color: isMyTurn \? 'var\(--color-primary\)' : 'var\(--color-text-secondary\)' \}\}>\s*\{isFinished \? `🎉 모든 카드를 털었습니다! 구경 중\.\.\. \(현재 👉 \$\{currentTurnPlayer\} 턴\)` : \(isMyTurn \? '👉 내 턴입니다!' : `⏳ \$\{currentTurnPlayer\}의 턴을 기다리는 중\.\.\.`\)\}\s*<\/div>/,
  `<div className={\`turn-indicator \${isMyTurn && !isFinished ? 'my-turn' : 'others-turn'}\`}>
              {isFinished ? \`🎉 구경 중... (현재 👉 \${currentTurnPlayer} 턴)\` : (isMyTurn ? '👉 내 턴입니다!' : \`⏳ \${currentTurnPlayer}의 턴 대기 중...\`)}
            </div>`
);

jsx = jsx.replace(
  /<div className="validation-message" style=\{\{ height: '20px', marginBottom: '0\.2rem', color: isSelectionValid \? 'var\(--color-primary\)' : 'var\(--color-destructive\)', fontSize: '0\.9rem', fontWeight: 'bold' \}\}>/,
  `<div className="validation-message" style={{ color: isSelectionValid ? 'var(--color-primary)' : 'var(--color-destructive)' }}>`
);

fs.writeFileSync('src/components/GameBoard.jsx', jsx);
