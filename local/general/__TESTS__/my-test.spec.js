
const { openBrowser, goto, title } = require('taiko');
test('Goto Shopify login page and verify title', async () => {
    await openBrowser({host: '127.0.0.1', port: 9222});
    await goto('https://accounts.shopify.com/lookup');
    const pageTitle = await title();
    expect(pageTitle).toEqual('Log in - Shopify Account');
}, 15000);
