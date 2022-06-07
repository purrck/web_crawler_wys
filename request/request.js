const request = require("./axios");
const { SITE_URL } = require('../config')
let base_url = ''
function isChinese(s) {
  return /[\u4e00-\u9fa5]/.test(s);
}
async function getTargetOriginUrl(url) {
  let browser;
  const puppeteer = require("puppeteer");
  browser = await puppeteer.launch({ headless: true });
  const [page] = await browser.pages();
  await page.goto(url);
  let cb = await page.evaluate(() => document.querySelector('.header_title').innerText);
  console.log('getTargetOriginUrl', cb);
  await browser.close();
  return cb.includes('http') ? cb : 'https://' + cb
}
async function mergeOption(op) {
  if (op.url == "") {
    throw new Error("请求的url地址不正确");
  }
  if (isChinese(op.url)) {
    op.url = encodeURI(op.url)
  }
  if (op.url.indexOf('http') === -1) {
    if (!base_url) base_url = await getTargetOriginUrl(SITE_URL)
    // console.log('op.url111', options.url);
    op.url = base_url + op.url
  }
  let options = Object.assign(
    {},
    {
      url: "",
      method: "GET",
      encoding: null,
      headers: {
        // 'cookie': {
        //   '_gid': 'GA1.2.1966518545.1654166047',
        //   '_ga': 'GA1.2.127162952.1654166047',
        // },
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/ 537.36(KHTML, like Gecko) Chrome/ 71.0.3578.98 Safari/ 537.36",
      }
    },
    op
  );
  return options
}

async function handleRequestByPromise(op) {
  // console.time('options-merge-start');
  op = await mergeOption(op)
  // console.timeEnd('options-merge-start');
  // console.log('op.url', op.url);
  const promise = new Promise(function (resolve, reject) {
    request.get(op.url, op).then((response) => {
      // console.log('responseresponse', response.status, Object.keys(response));
      if (response && response.status === 200) {
        resolve(response.data);
      } else {
        reject(`请求✿✿✿${op.url}✿✿✿失败`);
      }
    }).catch(err => {
      console.log('request error-1', err.code, err.hostname
      );
    })
  });
  promise.catch(err => {
    console.log('request error-2', err.code, err.hostname);
  })


  return promise;
}
// process.on('unhandledRejection', error => {
//   console.log('我帮你处理了', error.message);
// });

module.exports = {
  handleRequestByPromise
};