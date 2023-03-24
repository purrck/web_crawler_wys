

const account = { password: '', username: '' }
const { downloadImg } = require('../utils/download')
const { login } = require('../utils/login')
process.setMaxListeners(0)
process.on('warning', e => console.warn(e.stack))

const init = async (config) => {
  const { page, browser } = await login(config)
  // comic 首页页面逻辑
  await page.evaluate((el) => document.getElementsByClassName('menu-item comic')[0].click());
  await page.screenshot({ path: 'example.png' });

  console.log('选择韩漫')
  await page.evaluate((el) => document.querySelectorAll('.van-tab')[1].click());
  console.log('点击排序1',)
  await page.waitForSelector('.btn-sort');
  await page.evaluate((el) => document.querySelectorAll('.btn-sort')[1].click());
  var tabNum = 1
  console.log('点击排序2',)
  await page.waitForSelector('.van-hairline--top-bottom');
  await page.evaluate((el) => document.querySelectorAll('.van-hairline--top-bottom .van-tab')[1].click());
  console.log('点击排序3',)
  await page.waitForSelector('.coverBox');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'example.png' });
  console.log('去到简介页面',)
  await page.evaluate((el) => document.querySelectorAll('.van-tab__pane')[1].getElementsByClassName('coverBox')[0].click());
  await page.screenshot({ path: 'example.png' });

  // series 漫画简介页面逻辑
  console.log('去到实际图片浏览页面1')
  await page.waitForTimeout(1000);
  await page.waitForSelector('.series-info h1');
  const title = await page.$eval('.series-info h1', (el) => el.innerText)
  await page.screenshot({ path: 'example.png' });

  // title = nameRes.innerText
  console.log('去到实际图片浏览页面22', title)
  await page.waitForSelector('#container .korea-box');
  await page.$eval('#container .korea-box', (el) => el.click());
  // series-play 漫画内容页面逻辑
  await page.waitForTimeout(2000);
  await page.waitForSelector('.chapterGroup .chapter');
  await page.screenshot({ path: 'example.png' });
  await page.$eval('.read-mode', (el) => el.click());
  await page.screenshot({ path: 'example.png' });
  // 边滚动边下载
  // 2
  let isOver = false

  content = await page.content();
  const cheerio = require('cheerio');
  $ = cheerio.load(content);
  // 现在只有一个chapterGroup // 后面有更多group
  const imgList = $('.chapterGroup .chapter').find('img')
  const maxLen = imgList.length
  const firstOneH = await page.$eval('.chapter .read-img', (el) => el.height)

  // var currY = await page.$eval('.chapter', (el) => el.scrollHeight);
  // console.log('scrollPage-currY', currY);
  /*执行js代码（滚动页面）*/

  const li = await page.evaluate((h, max) => {
    /* 这里做的是渐进滚动，如果一次性滚动则不会触发获取新数据的监听 */
    // console.log('- firstOneH ,maxLen ', h, max)
    return new Promise((reslove, rejext) => {
      let y = 0
      const timer = setInterval(() => {
        window.scrollTo(0, y += 40)
        console.log('y', y)
        if (y >= h * max - 776) {
          const result = $('.chapterGroup .chapter').find('img')
          clearInterval(timer) && reslove(result)
        }
      }, 20)
    })

  }, firstOneH, maxLen)
  // 获取数据列表
  // clearInterval(timer)

  await page.screenshot({ path: 'example1.png' });
  let data = []
  console.log('chapterGroup-res', li.length);
  /* 封装返回的数据*/
  li.each(function (index, item) {
    const that = $(this)
    that.attr('src') != undefined ?
      downloadImg(that.attr('src'), title, index)
      : ''
  })
  // console.log('list', list.data.length)
  // // firstOne = await page.$('.read-img')
  // await page.waitForSelector('.read-img');
  // await page.waitForTimeout(3000);

  // // await page.waitForFunction((el) => document.querySelector('.read-img').getAttribute('data-img') === 'loaded');
  // const imgDomAll = await page.$$('.read-img');
  // // const src = await page.evaluate((el) => document.querySelector('.read-img').getAttribute('src'));
  // const src = await page.evaluate((el) => document.querySelector('.read-img').getAttribute('src'));
  // // const width = await page.evaluateHandle((el) => el.width, firstDom);
  // console.log('firstOne', typeof src)
  // // console.log('firstOne-width', typeof src, width)
  // // const { height, width } = firstOne
  // // const src = firstOne.getAttribute('src')
  // // console.log('firstOne w h', firstOneH, firstOne.width)
  browser.close();
}

init(account)
