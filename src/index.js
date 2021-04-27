/* eslint-disable no-debugger */
import { sleep } from './utils/index.js';
import { launchBrowser, getPage, loginAction } from './utils/setup.js';
import { LOGIN_URL, OPEN_DATA_URL } from './config/urls.js';
import { load } from './utils/file.js';

(async () => {
  const browser = await launchBrowser();
  const page = await getPage(browser);

  await loginAndGotoOpenDataUrl(page);

  const path = 'files';
  const openData = await load(path);
  console.log(`openData: ${openData}`);

  closeAll(page, browser);
})();
function closeAll(page, browser) {
  page.close();
  browser.close();
}

async function loginAndGotoOpenDataUrl(page) {
  await page.goto(LOGIN_URL);
  await loginAction(page);
  await sleep(1000);

  await page.goto(OPEN_DATA_URL);
  await sleep(1000);
}
