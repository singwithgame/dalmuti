const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const cleanupCode = `
  useEffect(() => {
    // Cleanup old rooms (older than 7 days)
    const cleanupOldRooms = async () => {
      try {
        const snapshot = await get(ref(db, 'rooms'));
        if (snapshot.exists()) {
          const rooms = snapshot.val();
          const now = Date.now();
          const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
          
          Object.keys(rooms).forEach(roomId => {
            const room = rooms[roomId];
            const createdAt = room.createdAt;
            if (createdAt && now - createdAt > ONE_WEEK) {
              remove(ref(db, \`rooms/\${roomId}\`));
            }
          });
        }
      } catch(e) {
        console.error('Failed to cleanup old rooms', e);
      }
    };
    cleanupOldRooms();
  }, []);
`;
code = code.replace(/  useEffect\(\(\) => \{\n    const checkReconnect = async \(\) => \{/, cleanupCode + '\n  useEffect(() => {\n    const checkReconnect = async () => {');

// Add createdAt to new rooms
code = code.replace(
  /        status: 'waiting',\n        players: \{\n          \[nickname\]: \{ isHost: true, isReady: true \}\n        \}/,
  `        status: 'waiting',
        createdAt: Date.now(),
        players: {
          [nickname]: { isHost: true, isReady: true }
        }`
);

fs.writeFileSync('src/App.jsx', code);
