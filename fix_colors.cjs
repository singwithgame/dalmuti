const fs = require('fs');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const replaced = content.replace(/var\(--color-([^)]+)\)/g, 'var(--$1)');
      if (content !== replaced) {
        fs.writeFileSync(fullPath, replaced);
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDir('src');
