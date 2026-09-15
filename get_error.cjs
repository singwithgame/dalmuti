const https = require('https');
https.get('https://react.dev/errors/310', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<title>(.*?)<\/title>/);
    console.log(match ? match[1] : 'No title found');
    const msgMatch = data.match(/"message":"([^"]+)"/);
    console.log(msgMatch ? msgMatch[1] : 'No message found');
  });
});
