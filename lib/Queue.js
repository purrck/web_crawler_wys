function Queue() {
	// 先进先出
	this.data = []
	this.size = 0
}
Queue.prototype.pop = function (playloy) {
	let ans = this.data.unshift(playloy)
	this.size = this.data.length
	this.log()
	return ans
}
Queue.prototype.push = function (playloy) {
	this.data.push(playloy)
	this.size = this.data.length
	this.log()
}
Queue.prototype.top = function () {
	return this.data[this.size - 1]
}
Queue.prototype.empty = function () {
	this.data = []
}
Queue.prototype.log = function () {
	console.log(this.data.toString())
}
module.exports = Queue
