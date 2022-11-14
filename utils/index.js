const fs = require('fs')
const path = require('path')
/**
 * 检测是否命名重复,存在 那就拿个新名字给我
 * @param {Sting} current
 * @returns string (新文件名)
 */
const gotAUnCallingFileName = async (tFilePath) => {
  // console.log('gotAUnCallingFileName',tFilePath);
  const isFileExitAndDeal = async (path) => {
    const index = path.lastIndexOf('.')
    const filePathName = path.slice(0, index)
    const fileType = path.slice(index + 1)
    let files = await fs.existsSync(path)
    if (files) return isFileExitAndDeal(`${filePathName + 'I'}${fileType ? `.${fileType}` : ''}`)
    return path
  }
  return isFileExitAndDeal(tFilePath)
}

/**
 * 处理输入字符串的空格以及 com等多余信息
 * @param {Sting} current
 * @returns string (新文件名)
 */
const dealFileName = (current) => {
  let rename = current
  // console.log('file-item--1', rename)
  const comIndex = rename.indexOf('com')
  if (comIndex !== -1) {
    rename = rename.replace(/.*com/, '')
  }
  rename = rename.trim()
  return rename
}
module.exports = { dealFileName, gotAUnCallingFileName }
