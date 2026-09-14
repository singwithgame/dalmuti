#!/bin/bash
# 1. App.jsx, GameBoard.jsx, HistoryModal.jsx에서 옛날 변수 이름 치환
sed -i 's/var(--danger-color)/var(--color-destructive)/g' src/App.jsx src/components/*.jsx
sed -i 's/var(--accent-color)/var(--color-primary)/g' src/App.jsx src/components/*.jsx
sed -i 's/var(--border-color)/var(--color-border)/g' src/App.jsx src/components/*.jsx
sed -i 's/var(--text-color)/var(--color-foreground)/g' src/App.jsx src/components/*.jsx
sed -i 's/var(--text-muted)/var(--color-text-secondary)/g' src/App.jsx src/components/*.jsx
sed -i 's/var(--card-bg)/var(--color-card)/g' src/App.jsx src/components/*.jsx
sed -i 's/rgba(239, 68, 68, 0.1)/var(--color-destructive-tint)/g' src/App.jsx src/components/*.jsx

# 2. index.css에서 옛날 변수 이름 치환 및 레거시 변수 삭제
sed -i 's/var(--danger-color)/var(--color-destructive)/g' src/index.css
sed -i 's/var(--accent-color)/var(--color-primary)/g' src/index.css
sed -i 's/var(--border-color)/var(--color-border)/g' src/index.css
sed -i 's/var(--text-color)/var(--color-foreground)/g' src/index.css
sed -i 's/var(--text-muted)/var(--color-text-secondary)/g' src/index.css
sed -i 's/var(--card-bg)/var(--color-card)/g' src/index.css
sed -i 's/var(--accent-hover)/var(--color-primary)/g' src/index.css
sed -i 's/var(--card-border)/var(--color-border)/g' src/index.css
sed -i 's/var(--bg-color)/var(--color-background)/g' src/index.css
sed -i 's/var(--surface-color)/var(--color-surface-subtle)/g' src/index.css

# 3. 그림자 교체
sed -i 's/box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);/box-shadow: var(--shadow-button); filter: drop-shadow(0 4px 8px var(--color-primary));/g' src/index.css

