// https://www.digikey.com/en/products/detail/texas-instruments/PCM1861DBTR/4809044
const baseUrl = 'https://www.digikey.com/en/products/detail/texas-instruments/PCM1861DBTR/4809044'
const { handleRequestByPromise } = require('../request/request')
const cheerio = require('cheerio')
const { downloadAllImg, downloadText, downloadVideoUrl } = require('../utils/download')

async function login(config = { username: '', password: '' }) {
  try {
    console.log('------===------1')
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({
      width: 375,
      height: 776,
    })
    await page.goto(baseUrl)
    console.log('--------======', page.url())
    await page.screenshot({ path: 'example.png' })
    // await page.waitForNavigation();
    // await page.goto('#/infos/signin');
    await page.waitForSelector('#__next', { timeout: 20000 })
    await page.waitForTimeout(4000)
    await page.screenshot({ path: 'example.png' })

    console.log('去首页', page.url())

    // let url1 = page.url();
    // browser.close();
    return { page, browser }
  } catch (err) {
    console.log('------===------2', err)
  }
}
// login()
async function main(url) {
  console.log('------===------11', url)
  // let axios = require('axios').default
  let homeBody = await handleRequestByPromise({ url })
  homeBody = iconv.decode(homeBody, 'GBK')
  console.log('------===------22', homeBody)
  if (!homeBody) return
  let $ = cheerio.load(homeBody)
  let body = $('#__next')
  console.log('bodybodybody', body)
  downloadText('dom', body, 'lll')
  console.log('------===------33')
}
main(baseUrl)

module.exports = { login }
