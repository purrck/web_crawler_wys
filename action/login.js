const baseUrl = 'https://pwa.xartbmsm.com/'

async function login(config = { username: '', password: '' }) {
  try {
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 375,
      height: 776
    })
    await page.goto(baseUrl + '#/comic');
    console.log('--------======', page.url())
    // await page.screenshot({ path: 'example.png' });
    // await page.waitForNavigation();
    // await page.goto('#/infos/signin');
    await page.waitForSelector('.num', { timeout: 20000 });
    await page.waitForTimeout(4000)
    // await page.screenshot({ path: 'example.png' });
    await page.$$eval('.num', (el) => el[0].click());
    await page.waitForTimeout(100)
    // await page.screenshot({ path: 'example.png' });
    // await page.goto(baseUrl + '#/infos/signin');
    // await page.waitForNavigation();
    await page.evaluate((el) => {
      document.getElementsByClassName('sign-btn')[0].click(
      )
      document.getElementsByClassName('left-btn')[0].click(
      )
      document.getElementsByClassName('menu-item infos')[0]
        .click()
    });
    await page.waitForTimeout(100)
    // await page.screenshot({ path: 'example.png' });

    await page.$$eval('.bind-row', (el) => el[1].click());
    await page.waitForTimeout(100)
    await page.$$eval('a', (el) => el[0].click());
    // await page.evaluate((el) => document.getElementsByTagName('a')[0].click());
    await page.waitForTimeout(100)
    // await page.screenshot({ path: 'example.png' });
    // console.log(page.url())
    await page.type('input[type=text]', '+86', {
      delay: 100
    });
    // await page.focus('input[type=text]');
    await page.type('input[type=number]', config.username,
      { delay: 100 });
    // await page.focus('input[type=password]');
    await page.type('input[type=password]', config.password
      , { delay: 100 });
    await page.evaluate((el) => document.querySelector('input[type = submit]').click());
    // await page.screenshot({ path: 'example.png' });
    console.log('登陆完毕')
    await page.waitForSelector('.van-dialog', { ue });
    await page.evaluate((el) => document.querySelector('.van - button').click());
    await page.waitForTimeout(100)
    // await page.screenshot({ path: 'example.png' });
    console.log('去首页', page.url())

    // let url1 = page.url();
    // browser.close();
    return { page, browser };
  } catch (err) {
    console.log('------===------', err)
  }
}
module.exports = { login }