import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173/dalmuti/', { waitUntil: 'networkidle0' });
  
  // type nickname
  const inputs = await page.$$('input');
  await inputs[0].type('TestUser');
  
  // click create room (which is the second button or by text)
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('새로운 방 만들기')) {
      await btn.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // type password
  const pwInput = await page.$('input[type="password"]');
  if (pwInput) {
    await pwInput.type('dalmuti');
    const modalBtns = await page.$$('.modal-content button');
    for (const btn of modalBtns) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('확인')) {
        await btn.click();
        break;
      }
    }
  } else {
    console.log('No password input found');
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
