/*global beforeAll*/
/*global afterAll*/

const chromium = require('chrome-aws-lambda');

beforeAll(async () => {
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--remote-debugging-port=9222"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  global.__BROWSER__ = browser;
});

afterAll(async () => {
  // await closeBrowser();
  await global.__BROWSER__.close();
});