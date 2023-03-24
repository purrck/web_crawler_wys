const { SITE_URL, SPIDER_TYPE } = require('../config')
const { commonRequest } = require('../request/request')
const cheerio = require('cheerio')
const querystring = require('querystring')
const { Buffer } = require('buffer')

// String to be encoded

// Using the escape function to the string
// const iconv = require('iconv-lite');
const buffTransferCN = (buf) => {
  let str = Buffer.from(buf, 'base64').toString()
  // console.log(Object.keys(querystring))
  str = querystring.escape(str)
  str = querystring.unescape(str)
  return str
}
async function getChapterData(url, type) {
  const { target } = SPIDER_TYPE[type]
  if (typeof url !== 'string') throw '类型错误'
  let cb = []
  // console.log('获取章节内容---getChapterData---url', url)
  let homeBody = await commonRequest({ url })
  // homeBody = iconv.decode(homeBody, "GBK")
  let $ = cheerio.load(homeBody)
  let lis = $(target).find('li')
  // console.log('获取章节内容---getChapterData---lis', lis)
  for (let i = 0; i < lis.length; i++) {
    const item = lis.eq(i).find('a')
    const path = item.attr('href').trim()
    let text = item.text()
    const first = text.indexOf("'") + 1
    const end = text.indexOf(')') - 1
    text = text.substr(first, end)
    const title = buffTransferCN(text)
    cb.push({ path, title })
  }
  return cb
}

const dealTextDom = (lis) => {
  lis = lis.find('p')
  let cb = ''
  // console.log('单张内容-lis.children()', lis.length);
  for (let i = 0; i < lis.length; i++) {
    const contant = lis.eq(i).text()
    // cb += `${contant}\r\n`
    // console.log('单行内容', contant);
    if (!contant) continue
    cb += `${contant}\r\n`
    // cb.push(`${contant}\r\n`)
  }
  // console.log('单章内容', cb)
  return cb
}
const dealImgDom = (lis, _$) => {
  let resData = []
  lis
    .children()
    .filter('img')
    .each(function (index, item) {
      let $this = _$(this)
      const contant = $this.attr('data-original').trim()
      // console.log('contant', contant);
      resData.push(contant)
    })
  return resData
}
const dealVideotDom = (lis) => {
  let cb = ''
  // console.log('单张内容-lis.children()', lis.length);
  for (let i = 0; i < lis.length; i++) {
    const contant = lis.eq(i).attr().value.trim()
    // cb += `${contant}\r\n`
    // console.log('单行内容', contant);
    if (!contant) continue
    cb += `${contant}\r\n`
    // cb.push(`${contant}\r\n`)
  }
  // console.log('单章内容', cb)
  return cb
}
const dealBtDom = (lis, title, $) => {
  let arr = []
  lis.each((e) => {
    // console.log('dealBtDom--item', lis.eq(e).attr('href'))
    arr.push(lis.eq(e).attr('href'))
  })
    // console.log('dealBtDom--item', arr)

  const [btLink, torrent, blank] = arr
  return [btLink, torrent, title]
}

/**
 * // 处理某一个url详情页面
 * @param {*} url
 * @param {*} type
 * @returns 页面获取信息 如文字 图片
 */
async function getActData(url, type) {
  if (typeof url !== 'string') throw '类型错误'
  console.log('getActData----url', url)

  const spider_type = SPIDER_TYPE[type]
  // const superagent = require('superagent');
  const homeBody = await commonRequest({ url })
  let $ = cheerio.load(homeBody, { decodeEntities: false })
  // console.log('分页章节---inner---target_inner', spider_type.target_inner)
  // console.log('-lislislislislis', lis)
  let lis = $(spider_type.target_inner)
  // console.log('分页章节---inner---targetBody', lis.find('a').eq(2))
  switch (type) {
    case 'TEXT':
      return dealTextDom(lis)
    case 'IMAGE':
      return dealImgDom(lis, $)
    case 'VIDEO':
      return dealVideotDom(lis)
    case 'BT':
      const item = $('.movie_info h3')
      let text = item.text()
      // console.log('texttexttext', text)
      const first = text.indexOf("'") + 1
      const end = text.indexOf(')') - 1
      text = text.substr(first, end)
      const title = buffTransferCN(text)
      return dealBtDom(lis, title, $)
    default:
      lis = lis.children()
      return dealTextDom(lis)
  }
  // console.log('单章内容', lis.children().length)
}

module.exports = {
  getActData,
  getChapterData,
  buffTransferCN,
}
