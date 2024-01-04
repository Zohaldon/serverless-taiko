const { openBrowser, goto, title } = require('taiko');

test('Goto Shopify login page and verify title', async () => {
    await openBrowser({host: '127.0.0.1', port: 9222});
    await goto(process.env.SHOPIFY_LOGIN_URL);
    const pageTitle = await title();
    const originalTitle =  'Log in - Shopify Account';
    expect(pageTitle).toEqual(originalTitle);
}, 15000);
