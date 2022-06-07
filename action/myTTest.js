const { SITE_URL, SPIDER_TYPE } = require('../config')
const iconv = require('iconv-lite');
const { Builder, By, Key } = require('selenium-webdriver')

async function getActData({ path, title }, type) {
  let pageUrl = `${SITE_URL}${path}`;
  const spider_type = SPIDER_TYPE[type]
  // let homeBody = await handleRequestByPromise({ url: pageUrl });
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get(pageUrl);
  await driver.findElements(By.id('main-container'))
  await driver.findElements(By.css('main-container'))
  let lis = await driver.findElements(By.className('content'))
  // homeBody = iconv.decode(homeBody, "GBK")
  // let $ = cheerio.load(homeBody);
  // let lis = $(spider_type.target_inner);
  console.log('单章内容', lis.children().length)
  let resData = []
  lis.children().filter('img').each(function (index, item) {
    let $this = $(this);
    const contant = $this.attr();
    // console.log('contant', contant);
    resData.push(contant)
  })
  for (let i = 0; i < lis.children().length; i++) {
    // console.log('main-container item', lis.eq(i).text())
    // const contant = lis.eq(i).find(spider_type.label).attr()
    // const contant = lis.eq(i).attr('src')
    // console.log('contant', contant);
    // resData += `${text}--\r\n`
    // resData.push(contant)
  }
  // return lis.length && lis.map((e) => lis.eq(i).text())
  return resData
}

module.exports = {
  getActData
};