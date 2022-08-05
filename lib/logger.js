const fs = require('fs')
function toSring(t) {
	return Object.prototype.toString.call(t)
}
function logger(title, msg = '', needLog = false) {
	const content = title.toString() + JSON.stringify(msg) + '\r\n'
	if (!fs.existsSync(`_dist/logger`)) {
		fs.mkdirSync(`_dist/logger`)
	}
	console.log(title, msg)
	needLog &&
		fs.appendFile(`./_dist/logger/log3.txt`, content, (error) => {
			if (error) return console.log('写入文件失败,原因是' + error.message)
			// console.log(`第${page}页，写入成功${i + 1}次`);
		})
}

module.exports = logger
