const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace standard get(ref(db, 'rooms')) with a query
code = code.replace(
  /const snapshot = await get\(ref\(db, 'rooms'\)\);/,
  `const snapshot = await get(query(ref(db, 'rooms'), orderByChild('createdAt'), endAt(now - ONE_WEEK)));`
);

// Note: orderByChild and endAt, query need to be imported.
// Import: `import { ref, set, get, child, remove, query, orderByChild, endAt } from 'firebase/database';`
code = code.replace(
  /import \{ ref, set, get, child, remove \} from 'firebase\/database';/,
  `import { ref, set, get, child, remove, query, orderByChild, endAt } from 'firebase/database';`
);

fs.writeFileSync('src/App.jsx', code);
