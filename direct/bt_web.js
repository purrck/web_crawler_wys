const { getChapterData, getActData } = require('../action/bt_index') //获取对应的数据
const fs = require('fs')
const createProto = require('../lib/proto')
createProto() // 可以用babel profil 代替
const { downloadBT, downloadVideoUrl } = require('../utils/download')
const { SITE_URL, SPIDER_TYPE } = require('../config')
const logger = require('../lib/logger')
/**
 * 1,设计一个可以传数组id 下载的爬虫
 * 2, 整页下载 去重
 */
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
function dealPromiseLimit(type, limit = 10, tarDir, fixedFile) {
  console.log('dealPromiseLimit --- init')
  const dataList = []
  let isSuccess = true
  return function (rqList) {
    return new Promise((resolve, reject) => {
      // 希望在任务未完成前 一直等待
      dataList.push(...rqList)
      if (isSuccess) run()
      function run() {
        isSuccess = false
        if (!dataList.length) return resolve((isSuccess = true))
        // console.time('on limit promises')
        // console.log('dataList.splice(0, limit)', dataList.splice(0, limit))
        const reqListforLimit = dataList.splice(0, limit).map((item) => {
          return getActData(item.path, type).then((res) => {
            const [torrent, btLink, title] = res
            console.log('[torrent, btLink, title]', [torrent, btLink, title])
            // downloadBT(torrent, title, tarDir)
            downloadVideoUrl([btLink, torrent], title, tarDir, fixedFile)
            return true
          })
        })
        // console.log('reqListforLimit', reqListforLimit.length, typeof reqListforLimit[0])
        Promise.all(reqListforLimit)
          .then((res) => {
            console.log('Promise.all end', res)
            isSuccess = true
            run()
            // console.timeEnd('on limit promises')
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }
}

async function init(startPage, endPage, type = 'TEXT') {
  console.time('programMain')
  const { site, dir, fixedFile } = SPIDER_TYPE[type]
  await mkmydir(type, dir)
  const tarDir = `_dist/${type}/${dir}`
  logger('-------start-------', `从第${startPage}到${endPage}`, true)
  // logger('参数记录', { endPage, startPage, type }, true)
  // 目标dir
  //获取章节目录 
  // 没有并发 单线程 改为多线程
  const initDownload = dealPromiseLimit(type, 12, tarDir,fixedFile)
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    let pageUrl = `${site}${pageNum != 1 ? `&page=${pageNum}` : ''}`
    logger(`当前${pageNum}分页-开始`, pageUrl, true)
    let chapterList = await getChapterData(pageUrl, type)
    logger(`"当前第${pageNum}分页章节数量`, chapterList.length, true)
    chapterList = chapterList?.length && chapterList.map((e) => {
      return {
        path: !e.path.includes('http') ? 'https://www.188758.xyz' + e.path : e.path,
        title: e.title,
      }
    }) || []
    //循环章节获取内容
    // logger(`"循环第${pageNum}分页章节内容`, true)
    await initDownload(chapterList)
    // console.log(`当前${pageNum}分页下载完毕`);
  }
  // console.timeEnd('mkmydir')
  logger('-------end-------', '', true)
  console.timeEnd('programMain')
}
async function initForIds(ids, type = 'BT') {
  const { site, target, dir, fixedFile } = SPIDER_TYPE[type]
  await mkmydir(type, dir)
  // 目标dir
  const tarDir = `_dist/${type}/${dir}`
  for (let i = 0; i < ids.length; i++) {
    let path = ids[i]
    !path.includes('http') ? (path = 'https://www.188758.xyz/movie.php?class=guochan&id=' + path) : ''
    getActData(path, type).then((res) => {
      console.log('getActData--resresresres', res)
      const [torrent, btLink, title] = res
      downloadBT(torrent, title, tarDir).then(() => {
        if (i == ids.length - 1) {
          logger(`${tarDir}】,当前所有id下载完毕---`, '', true)
        }
      })
      downloadVideoUrl([btLink, torrent], title, tarDir, fixedFile)
    })
  }
}

// init(1, 1, 'TEXT') //设置页数 类型
// init(1, 1, 'IMAGE') //设置页数
init(1, 4, 'BT') //设置页数
// initForIds(['8309997459873557', '227506873197853'], 'BT') //设置页数

//
