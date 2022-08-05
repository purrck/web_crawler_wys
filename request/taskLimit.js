class TasksHandle {
	queue = [] //所有待执行任务队列
	result = [] //存储结果的数组
	runningNum = 0 //正在运行的个数
	//tasks：任务，maxLen：限制请求数
	constructor(maxLen, callback) {
		// this.tasks = tasks
		this.maxLen = maxLen
		this.callback = callback
		// this.preStart()
	}
	//运行前函数：将所有任务加入队列
	// preStart = () => {
	// 	let tasks = this.tasks
	// 	tasks.forEach((task) => this.queue.push(task))
	// 	this.run()
	// }
	//开始运行
	run() {
		//递归条件：1.当前请求个数小于最大请求数(此时可满足最大请求数为maxLen)
		//         2.当前队列还有请求待执行
		while (this.runningNum < this.maxLen && this.queue.length) {
			// 1.当前请求数增加
			this.runningNum++
			// 2.队列中取出任务执行
			const task = this.queue.shift()
			task()
				.then(
					(res) => {
						// 3.成功执行则存入结果数组
						this.result.push(res)
					},
					(reason) => {
						// 4.失败则抛出错误
						throw new Error(reason)
					}
				)
				.finally(() => {
					//5.无论成功与否，当前请求完成，请求数减一
					this.runningNum--
					//6.递归调用
					this.run()
				})
		}
		//当所有请求执行完成，调用回调函数
		if (this.runningNum === 0) this.callback(this.result)
	}
	add(tasks) {
		// this.tasks.push(task)
		if (Array.isArray(task)) {
			return tasks.forEach((task) => this.queue.push(task))
		}
		this.queue.push(task)
		this.run()
	}
}
module.exports = TasksHandle
