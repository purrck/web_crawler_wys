//在main.js设置全局的请求次数，请求的间隙
let axios = require('axios').default
axios.defaults.retry = 4
axios.defaults.retryDelay = 500
axios.defaults.timeout = 30000
const logger = require('../lib/logger')
let errNum = 0
let cancel = null
const tasksHandle = require('./taskLimit')
const tasksHandler = new tasksHandle()
let axiosMiddleware = (limit) => (config) => {
	// tasksHandler.set(limit)
	// tasksHandler.add(config)
	return config
}
axios.interceptors.request.use(axiosMiddleware())

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
	var config = err.config
	let { url } = config
	errNum++
	logger(`request err ${errNum}请求超时，被拦截处理`, url, true)
	// If config does not exist or the retry option is not set, reject
	if (err.response && err.response.status == '404') {
		logger(`request err 404`, url, true)
		// cancel && cancel()
		return Promise.reject(err)
	}
	if (!config || !config.retry) return Promise.reject(err)

	// Set the variable for keeping track of the retry count
	config.__retryCount = config.__retryCount || 0

	// Check if we've maxed out the total number of retries
	if (config.__retryCount >= config.retry) {
		// Reject with the error
		logger(`request err ${errNum}请求次数过多,放弃了`, url, true)
		return Promise.reject(err)
	}

	// Increase the retry count
	config.__retryCount += 1

	// Create new promise to handle exponential backoff
	var backoff = new Promise(function (resolve) {
		setTimeout(function () {
			resolve()
		}, config.retryDelay || 1)
	})

	// Return the promise in which recalls axios to retry the request
	return backoff.then(function () {
		logger(`重新发送请求`, url, true)
		return axios(config)
	})
})

// const request = axios.createInstance({})

module.exports = axios
