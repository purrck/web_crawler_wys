const { SITE_URL, SPIDER_TYPE } = require('../config')
const { handleRequestByPromise } = require('../request/request')
const cheerio = require('cheerio')
// const iconv = require('iconv-lite');

async function getChapterData(url, target) {
	if (typeof url !== 'string') throw '类型错误'
	let cb = []
	// console.log('获取章节内容---getChapterData---url', url)
	let homeBody = await handleRequestByPromise({ url })
	// homeBody = iconv.decode(homeBody, "GBK")
	let $ = cheerio.load(homeBody)
	let lis = $(target).find('li')
	// console.log('获取章节内容---getChapterData---lis', lis)

	for (let i = 0; i < lis.length; i++) {
		const item = lis.eq(i).find('a').attr('href').trim()
		const title = lis.eq(i).find('a').attr('title').trim()
		// console.log('main-container item', item)
		cb.push({ path: item, title })
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

/**
 * // 处理某一个url详情页面
 * @param {*} url
 * @param {*} type
 * @returns 页面获取信息 如文字 图片
 */
async function getActData(url, type) {
	if (typeof url !== 'string') throw '类型错误'
	// console.log('getActData----url', url)
	const spider_type = SPIDER_TYPE[type]
	// const superagent = require('superagent');
	const homeBody = await handleRequestByPromise({ url })
	// console.log('分页章节---inner---homeBody', homeBody)

	// homeBody = iconv.decode(homeBody, "GBK")
	let $ = cheerio.load(homeBody, { decodeEntities: false })
	// console.log('分页章节---inner---target_inner', spider_type.target_inner)
	// console.log('-lislislislislis', lis)
	let lis = $(spider_type.target_inner)
	// console.log('分页章节---inner---targetBody', lis)

	switch (type) {
		case 'TEXT':
			return dealTextDom(lis)
		case 'IMAGE':
			return dealImgDom(lis, $)
		case 'VIDEO':
			return dealVideotDom(lis)
		default:
			lis = lis.children()
			return dealTextDom(lis)
	}
	// console.log('单章内容', lis.children().length)
}

module.exports = {
	getActData,
	getChapterData,
}
