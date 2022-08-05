const { handleRequestByPromise } = require('../request/request')
const Queue = require('../lib/Queue')
const fs = require('fs')
const path = require('path')
const axios = require('../request/axios')

async function init()
  // console.log('file', file)
  const url = 'http://10.0.6.155:9999/cdc-covid-eew/tip/getCrossBorderHKMonitorPointPage'

  const res = await axios(url, {
    headers: {
      ['Content-Type']: 'application/json',
    },
  })
  console.log('res', res)
  // let arr = new Queue()
  // arr.push('1')
  // arr.push('1')
  // arr.push('1')
  // arr.pop()
  // base64网站解密
  // base64 = desDecrypt(res)
  // console.log('base64', base64)
}
init('https://pppt.wloibyj.cn//tp/girl/%E7%AC%AC10%E6%9C%9F%E5%98%89%E5%AE%9D%E8%B4%9D%E5%84%BF&amp.txt')
// (function (src) {
let api = 'cdc-covid-eew/tip/getCrossBorderHKMonitorPointPage'
//   const cheerio = require('cheerio');
//   $ = cheerio.load(' <div id="container"  style=" width:300px " ><div class="chapterGroup"><div class="chapter"><img src="1" style=" height:30px " width="33"/> <img src="2" width="34" height="30" /><img src="3" width="35" height="30" /></div></div></div>');
//   const imgList = $('#container ').find('img')
//   console.log('imgList.length', imgList.length)
//   console.log('imgList------', $('.chapter').prop("scrollHeight"))
//   console.log(Object.keys(imgList))

//   imgList.each(function () {
//     const that = $(this)
//     console.log(typeof that)
//     console.log(Object.keys(that))
//     console.log('000000', that.scrollWidth)
//   })
//   async function fn() {
//     conso
//   }

// })('')

// (async function (src) {
//   const puppeteer = require("puppeteer");
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setViewport({
//     width: 375,
//     height: 776
//   })
//   var baseUrl = 'https://xueqiu.com/k?q=%E9%95%BF%E5%AE%89%E6%B1%BD%E8%BD%A6'

//   console.log('baseUrlbaseUrlbaseUrl', baseUrl);
//   await page.goto(baseUrl);
//   await page.waitForTimeout(4000)
//   let t = 0
//   const timer = setInterval(() => {
//     page.screenshot({ path: 'example.png' });
//     console.log('t', t)
//     if (t++ >= 100) {
//       clearInterval(timer)
//     }
//   }, 20)
//   const ans = await page.evaluate((h, max) => {
//     /* 这里做的是渐进滚动，如果一次性滚动则不会触发获取新数据的监听 */
//     // console.log('- firstOneH ,maxLen ', h, max)
//     // return Promise.resolve(1)
//     return new Promise((resolve, reject) => {
//       let y = 0
//       const timer = setInterval(() => {
//         window.scrollTo(0, y += 40)
//         console.log('y', y)
//         if (y >= 1000) {
//           clearInterval(timer) && resolve(y)
//         }
//       }, 20)
//     })

//   })
//   console.log('endendendendendend', ans);
//   // browser.close()
// })('')
