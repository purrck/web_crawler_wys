const { getChapterData, getActData } = require('../action') //获取对应的数据
const fs = require('fs')
const createProto = require('../lib/proto')
createProto() // 可以用babel profil 代替
const { downloadAllImg, downloadText, downloadVideoUrl } = require('../utils/download')
const { SITE_URL, SPIDER_TYPE } = require('../config')
const logger = require('../lib/logger')

async function mkmydir(type, dir) {
  console.log('mkmydir query', type, dir)
  if (!fs.existsSync(`_dist`)) {
    fs.mkdirSync(`_dist`)
  }
  if (!fs.existsSync(`_dist/${type}`)) {
    fs.mkdirSync(`_dist/${type}`)
  }
  if (!fs.existsSync(`_dist/${type}/${dir}`)) {
    fs.mkdirSync(`_dist/${type}/${dir}`)
  }
}

async function init(startPage, endPage, type = 'TEXT') {
  console.time('mkmydir')
  const { site, target, dir, fixedFile } = SPIDER_TYPE[type]
  await mkmydir(type, dir)
  logger('-------start-------', `从第${endPage}到${startPage}`)
  logger('参数记录', { startPage, endPage, type })
  // 目标dir
  const tarDir = `_dist/${type}/${dir}`
  //获取章节目录 // 没有并发 单线程
  for (let pageNum = endPage; pageNum >= startPage; pageNum--) {
    logger(`当前${pageNum}分页-开始`, '')
    let pageUrl = `${site}${pageNum ? `-${pageNum}` : ''}.html`
    console.log('当前分页---pageUrl', pageUrl)
    const chapterList = await getChapterData(pageUrl, target)
    logger(`"当前第${pageNum}分页章节数量`, chapterList.length)
    if (type == 'TEXT') chapterList.reverse()
    //循环章节获取内容
    logger(`"循环第${pageNum}分页章节内容`)
    for (let i = 0; i < chapterList.length; i++) {
      // for (let i = 0; i < 2; i++) { // for test
      const item = chapterList[i]
      // console.log('分页章节---inner---path', item.path)
      // 需要研究并发问题 加快访问下载速度
      const res = await getActData(item.path, type)
      logger(`"得到第${pageNum}分页第${i}章节内容`)
      switch (type) {
        case 'VIDEO':
          downloadVideoUrl(res, item.title, tarDir, fixedFile).then(() => {
            if (i == chapterList.length - 1) {
              logger(`${tarDir}】,当前${pageNum}分页下载完毕---`, '')
            }
          })
          break
        case 'IMAGE':
          downloadAllImg(res, item.title, tarDir)
          break
        case 'TEXT':
          downloadText(res, item.title, tarDir).then(() => {
            if (i == chapterList.length - 1) {
              logger(`${tarDir}】,当前${pageNum}分页下载完毕---`, '')
            }
          })
          break
      }
    }
    // console.log(`当前${pageNum}分页下载完毕`);
  }
  console.timeEnd('mkmydir')
  logger('-------end-------', '')
}
// init(1, 1, 'TEXT') //设置页数 类型
// init(1, 1, 'IMAGE') //设置页数
init(1, 1, 'VIDEO') //设置页数

//
