import puppeteer from 'puppeteer';
import * as admin from '../config/admin.js';
import * as loginSelector from '../selectors/login.js';

const defaultOptions = {
  headless: false
};

const launchBrowser = async (options = undefined) => {
  const puppeteerOptions = options === undefined ? defaultOptions : options;
  return await puppeteer.launch(puppeteerOptions);
};

const getPage = async (browser) => {
  const page = await browser.newPage();

  await page.setViewport({
    width: 1366,
    height: 768
  });

  return page;
};

const loginAction = async (page) => {
  await focusAndType(admin.username, admin.password);
  await page.$eval(loginSelector.loginButton, (form) => form.click());

  async function focusAndType(username, password) {
    await Promise.all([await page.focus(loginSelector.usernameInput), await page.keyboard.type(username)]);
    await Promise.all([await page.focus(loginSelector.passwordInput), await page.keyboard.type(password)]);
  }
};

export { launchBrowser, getPage, loginAction };
