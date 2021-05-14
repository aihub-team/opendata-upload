/* eslint-disable no-debugger */
import { sleep } from './utils/index.js';
import { launchBrowser, getPage, loginAction } from './utils/setup.js';
import { LOGIN_URL, OPEN_DATA_URL } from './config/urls.js';
import * as file from './utils/file.js';
import * as selectors from './selectors/main.js';

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
    try {
      const DELAY_TIME = 20;
      await page.type(selectors.title, title, { delay: DELAY_TIME });
      const LINK_BUTTON_TEXT = '바로가기';
      await page.type(selectors.link, LINK_BUTTON_TEXT, { delay: DELAY_TIME });
      await page.type(selectors.uri, link, { delay: DELAY_TIME });
      await page.type(selectors.data, data, { delay: DELAY_TIME });

      const OPENDATA_CATEGORY_VALUE = '8';
      await page.select(selectors.openDataCategoryDropdown, OPENDATA_CATEGORY_VALUE);
      await sleep(SLEEP_TIME);
      await page.select(selectors.openDataType, getTypeNumberFromTag(tag));

      await page.click(selectors.sourceButton);
      await page.type(selectors.dataTextArea, `<p>${data}</p>`);
      debugger;
      await page.click(selectors.saveButton);
    } catch (err) {
      console.error(err);
      close(page, browser);
    }
  }

  close(page, browser);
})();

const getTypeNumberFromTag = (tag) => {
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
};

const close = (page, browser) => {
  page.close();
  browser.close();
};

const login = async (page) => {
  await page.goto(LOGIN_URL);
  await loginAction(page);
  await sleep(SLEEP_TIME);
};
