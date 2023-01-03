const fs = require('fs')
const path = require('path')

const { handleRequestByPromise, commonRequest } = require('../request/request')
const { desDecrypt } = require('./encrypt.js')
const { Buffer } = require('buffer')
const logger = require('../lib/logger')
const http = require('http')
const https = require('https')

const { dealFileName, gotAUnCallingFileName } = require('./index')
// 图片的标题也要分文件夹
/**
 * target 处理遍历 下载图片
 * @param {*} all 当前页所有图片结果
 * @param {*} title 标题
 * @param {*} tarDir 目标文件夹
 * @returns null
 */
function downloadAllImg(all, title, tarDir) {
  logger('downloadAllImg --- start', tarDir, title)
  let len = all.length
  let files = fs.readdirSync(`./${tarDir}/${title}`)
  if (files.length !== len) {
    for (let i = 0; i < len; i++) {
      if (files.includes(`${i}.jpg`)) continue
      let item = all[i]
      // logger('downloadAllImg---item', item);
      downloadImg(item, title, tarDir, i).then((e) => {
        if (i == len - 1) {
          logger('downloadAllImg --- end', title)
        }
      })
    }
  }
  // logger('downloadAllImg --- end');
}
function isBase64(str) {
  return /data\:image\/jpg/.test(str)
}
/**
 *
 * @param {*} url 链接
 * @param {*} title 下载目录
 * @param {*} index  图片序号
 * @returns
 */
function downloadImg(url, title, tarDir = 'IMAGE', index) {
  logger('downloadImg', { url, title, index })
  return new Promise(async (resolve, reject) => {
    let base64 = url.toString()
    if (!isBase64(base64)) {
      // logger('downloadAllImg-downloadImg---不是base64')
      url = url.replace(/.jpg.*\.txt/, '.jpg.txt')
      const res = await handleRequestByPromise({ url })
      // base64网站解密
      base64 = desDecrypt(res)
    }
    base64 = base64.replace(/^data:image\/\w+;base64,/, '') //去掉图片base64码前面部分data:image/png;base64
    let dataBuffer = Buffer.from(base64, 'base64') //把base64码转成buffer对象，
    // logger('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
    let imgUrl = `./${tarDir}/${title}/${index}.jpg`
    fs.writeFile(imgUrl, dataBuffer, function (err) {
      //用fs写入文件
      if (err) {
        logger('downloadImg-图片写入失败', err, true)
      }
      resolve(true)
    })
  })
}
/**
 *
 * @param {*} data 数据
 * @param {*} title 标题
 * @param {*} tarDir  目标目录
 */

function downloadText(data, title, tarDir = 'TEXT') {
  return new Promise((resolve, reject) => {
    // 下载这一章节的书
    logger(`下载这一章节的书【${title}】`, tarDir)
    const chatper = '\r\n' + title + '\r\n' + data.toString()
    const sTitle = title.split('第')[0].trim().substr(0, 6)
    logger('downloadText --- start', sTitle)
    fs.appendFile(`./${tarDir}/${sTitle}.txt`, chatper, (error) => {
      if (error) return logger('写入文件失败,原因是' + error.message)
      // logger(`第${page}页，写入成功${i + 1}次`);
      resolve(true)
    })
  })
}
function downloadBT(paths, title, tarDir = 'BT') {
  return new Promise(async (resolve, reject) => {
    // 下载这一章节的书
    const file = 'https://www.188758.xyz' + paths
    logger(`下载这一bt【file】---]`,file)

    const torFilePath = `./${tarDir}/${title}.torrent`
    const torFullFilePath = path.resolve('./', torFilePath)
    // logger(`下载这一bt【${title}】---]`, torFullFilePath, true)
    const newName = await gotAUnCallingFileName(torFullFilePath)
    logger(`下载这一bt【newName】---]`,newName)
    // 用流的概念去读取文件 存储文件
    const fileTor = fs.createWriteStream(newName)
    https.get(file, (response) => {
      response.pipe(fileTor)
      resolve(true)
    })
  })
}
function downloadVideoUrl(data, title, tarDir = 'VIDEO', fixedFile) {
  return new Promise((resolve, reject) => {
    // 下载这一章节的书
    // logger(`找到这视频的url【${title}】`, tarDir)
    let chatper = ''
    if (typeof data === 'string') {
      chatper = '\r\n' + title + '\r\n' + data.toString()
    } else {
      for (let i = 0; i < data.length; i++) {
        chatper += data[i] + '\r\n'
      }
      chatper = title + '\r\n' + chatper + '\r\n'
    }
    // logger('downloadText --- start', title);
    const sTitle = title.split('第')[0].trim().substr(0, 6)
    fs.appendFile(`./${tarDir}/${fixedFile || sTitle}.txt`, chatper, (error) => {
      if (error) return logger('写入文件失败,原因是' + error.message)
      // logger(`第${page}页，写入成功${i + 1}次`);
      resolve(true)
    })
  })
}
module.exports = {
  downloadAllImg,
  downloadText,
  downloadVideoUrl,
  downloadImg,
  downloadBT,
}
