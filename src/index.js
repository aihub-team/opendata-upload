/* eslint-disable no-debugger */
import { sleep } from './utils/index.js';
import { launchBrowser, getPage, loginAction } from './utils/setup.js';
import { LOGIN_URL, OPEN_DATA_URL } from './config/urls.js';
import * as file from './utils/file.js';

const SLEEP_TIME = 1000;
(async () => {
  const browser = await launchBrowser();
  const page = await getPage(browser);

  await login(page);

  const path = 'files';
  const openData = await file.load(path);

  for (const openDataContent of openData) {
    await page.goto(OPEN_DATA_URL);
    await sleep(SLEEP_TIME);

    const { tag, title, data, link } = openDataContent;
    await page.type('#edit-title-0-value', title, { delay: 20 });
    await page.type('#edit-field-link-0-title', link, { delay: 20 });
    // await page.type('#cke_1_contents > iframe', data, { delay: 20 });
    const OPENDATA_OPTION_VALUE = '8';
    await page.select('#edit-field-data-category-shs-0-0', OPENDATA_OPTION_VALUE);
    await sleep(SLEEP_TIME);
    await page.select('#edit-field-data-category-shs-0-1', getOpenDataOptionValue(tag));

    debugger;
  }

  closeAll(page, browser);
})();

function getOpenDataOptionValue(tag) {
  if (tag === '텍스트') {
    return '52';
  }

  if (tag === '음성') {
    return '53';
  }

  if (tag === '이미지') {
    return '54';
  }

  if (tag === '영상') {
    return '55';
  }

  return '204';
}

function closeAll(page, browser) {
  page.close();
  browser.close();
}

async function login(page) {
  await page.goto(LOGIN_URL);
  await loginAction(page);
  await sleep(SLEEP_TIME);
}
