// const { Buffer } = require('buffer');
const { handleRequestByPromise } = require('../action/requst')
// const { desDecrypt } = require('../utils/encrypt')
const cheerio = require('cheerio');
const puppeteer = require("puppeteer");

async function init(startPage, endPage) {
  console.log("-------start-------");
  // let item = 'https://www.9025018b81bb.com/enter/index.html'
  // handleRequestByPromise({ url: item }).then(res => {
  //   console.log('downloadAllImg---item---inner', typeof res);
  //   let $ = cheerio.load(res);
  //   setTimeout(() => {
  //     let src = $('#tiaozhuan').attr()
  //     console.log('handleRequestByPromise', src);
  //   }, 500)

  //   // console.log('handleRequestByPromise', src);
  //   // downloadImg(src, title, index)
  // })

  console.log("-------end-------");
}
// init(0, 1); //设置页数
//



