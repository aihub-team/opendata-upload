/* eslint-disable no-debugger */
import { sleep } from './utils/index.js';
import { launchBrowser, getPage, loginAction } from './utils/setup.js';
import { LOGIN_URL, OPEN_DATA_URL } from './config/urls.js';

(async () => {
  const browser = await launchBrowser();
  const page = await getPage(browser);

  await page.goto(LOGIN_URL);
  await loginAction(page);

  await sleep(1000);

  await page.goto(OPEN_DATA_URL);
  await sleep(1000);

  page.close();
  browser.close();
})();
