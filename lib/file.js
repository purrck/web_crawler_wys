const fs = require('fs')
const path = require('path')
/**
 * 处理输入字符串的空格以及 com等多余信息
 * @param {Sting} current
 * @returns string (新文件名)
 */
const dealFileName = (current) => {
  let rename = current.name
  // console.log('file-item--1', rename)
  const comIndex = rename.indexOf('com')
  if (comIndex !== -1) {
    rename = rename.replace(/.*com/, '')
  }
  rename = rename.trim()
  return rename
}

/**
 * 操作文件, 修改文件名
 * @param {Sting} current
 * @returns string (新文件名)
 */
const reNameFile = (tFilePath, nFilePath) => {
  return new Promise((resolve, reject) => {
    if (tFilePath === nFilePath) resolve(nFilePath)
    fs.rename(tFilePath, nFilePath, (err) => {
      if (err) {
        if (err.code == 'ENOTEMPTY') {
          return reNameFile(tFilePath, (nFilePath += 'I'))
        } else {
          // console.log('重命名错误', err)
          throw err
        }
      }
      resolve(nFilePath)
    })
  })
}

/**
 *  循环修改整个目录的文件名
 * @param {String} target
 * @param {Array} excludes
 * @returns
 */
const renameFn = function (target, excludes = ['js', 'torrent']) {
  const StaticPath = path.resolve('./')
  const curPath = target ? path.resolve('./', target) : StaticPath
  // console.log('curPath', curPath)
  let file = fs.readdirSync(curPath, { withFileTypes: true })
  // console.log('curPath--file', file)
  // 过滤 某些文件 某些类型
  const allFile = file
    .filter((e) => !e.name.includes('.DS'))
    .filter((e) => {
      const type = e.name.split('.')[e.name.split('.').length - 1]
      return !excludes.includes(type)
    })
  //  循环目标 改名  递归再重复
  allFile.forEach(async (current, i) => {
    console.log('current--index', current.name.substring(0, 5), i)
    const nextItem = dealFileName(current)
    console.log('dealFileName', nextItem.substring(0, 5))
    const tFilePath = `${curPath}/${current.name}`
    const nFilePath = `${curPath}/${nextItem}`
    const isDir = current.isDirectory(tFilePath)
    await reNameFile(tFilePath, nFilePath)
    if (isDir) {
      console.log('是文件夹下钻去 去搜索下级文件')
      renameFn(nFilePath)
    }
  })
}

renameFn()
