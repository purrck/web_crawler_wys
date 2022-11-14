const { getChapterData, getActData } = require('../action/index') //获取对应的数据
const fs = require('fs')
const createProto = require('../lib/proto')
createProto() // 可以用babel profil 代替
const { downloadAllImg, downloadText, downloadVideoUrl } = require('../utils/download')
const { SITE_URL, SPIDER_TYPE } = require('../config')
const logger = require('../lib/logger')

async function mkmydir(type: string, dir: string) {
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
interface dataObj {
  data: any
  title: string
}
const downloadWithType = (type: string, { data, title }: dataObj, tarDir: string) => {
  const { fixedFile } = SPIDER_TYPE[type]
  switch (type) {
    case 'TEXT':
      downloadText(data, title, tarDir).then(() => {
        // if (i == chapterList.length - 1) {
        //   logger(`${tarDir}】,当前${pageNum}分页下载完毕---`, '', true)
        // }
      })
      break
    case 'VIDEO':
      downloadVideoUrl(data, title, tarDir, fixedFile).then(() => {
        // if (i == chapterList.length - 1) {
        //   logger(`${tarDir}】,当前${pageNum}分页下载完毕---`, '', true)
        // }
      })
      break
    case 'TEXT':
      downloadText(data, title, tarDir).then(() => {
        // if (i == chapterList.length - 1) {
        //   logger(`${tarDir}】,当前${pageNum}分页下载完毕---`, '', true)
        // }
      })
      break
    case 'IMAGE':
      let length = data.length
      if (!length) return
      if (fs.existsSync(`${tarDir}/${title}`)) {
        logger('该文件夹存在了')
        // 是否该补全
        let file1 = fs.readdirSync(`${tarDir}/${title}`)
        if (file1.length == data.length) {
          logger('并且文件数目齐全')
          return
        }
      } else {
        fs.mkdirSync(`${tarDir}/${title}`)
      }
      downloadAllImg(data, title, tarDir)
      break
  }
}

async function init(startPage: number, endPage: number, type: string = 'TEXT'): Promise<void> {
  // console.time('mkmydir')
  const { site, dir, fixedFile } = SPIDER_TYPE[type]
  await mkmydir(type, dir)
  logger('-------start-------', `从第${endPage}到${startPage}`, true)
  logger(`一共 ${Math.abs(endPage - startPage) + 1}页`, true)
  logger('参数记录', { endPage, startPage, type }, true)
  // 目标dir
  const tarDir = `_dist/${type}/${dir}`
  logger('目标目录tarDir', tarDir, true)
  //获取章节目录 // 没有并发 单线程
  for (let pageNum = endPage; pageNum > startPage; pageNum--) {
    // for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    // 拼接完整url
    let pageUrl = `${site}${pageNum != 1 ? `-${pageNum}` : ''}.html`
    logger(`当前${pageNum}分页-开始`, 'pageUrl', true)
    const chapterList = await getChapterData(pageUrl, type)
    logger(`"当前第${pageNum}分页章节数量`, chapterList.length, true)
    if (type === 'TEXT') chapterList.reverse()
    //循环章节获取内容
    logger(`"循环第${pageNum}分页章节内容`, true)
    for (let i = 0; i < chapterList.length; i++) {
      // for (let i = 0; i < 2; i++) { // for test
      const item = chapterList[i]
      // console.log('分页章节---inner---path', item.path)
      // 需要研究并发问题 加快访问下载速度
      getActData(item.path, type).then((res: any) => {
        logger(`"得到第${pageNum}分页第${i}章节内容,开始下载`, true)
        downloadWithType(type, { data: res, title: item.title }, tarDir)
      })
    }
    // console.log(`当前${pageNum}分页下载完毕`);
  }
  // console.timeEnd('mkmydir')
  logger('-------end-------', '', true)
}
// init(1, 1, 'TEXT') //设置页数 类型
// init(1, 1, 'IMAGE') //设置页数
init(0, 1, 'TEXT') //设置页数

//
