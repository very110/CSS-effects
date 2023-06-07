(function(w) {
	const pending = 'pending';
	const fulfilled = 'fulfilled';
	const rejected = 'rejected';

	function Promise(executor) {
		if (!executor) throw new TypeError('必须传入执行器函数');
		this.status = pending;
		this.data = undefined;
		this.cb = [];
		this.isCatch = 0;
		try {
			executor(resolve.bind(this), reject.bind(this));
		} catch (e) {
			reject(e);
		}

		function resolve(val) {
			if (this.status !== pending) return;
			this.status = fulfilled;
			this.data = val;

			setTimeout(() => {
				this.cb.forEach(cb => {
					cb.onResolve(val);
				})
			})
		}

		function reject(val) {
			if (this.status !== pending) return;
			this.status = rejected;
			this.data = val;
			setTimeout(() => {
				if (!this.isCatch) {
					throw val;
				}
				this.cb.forEach(cb => {
					cb.onReject(val);
				})
			})

		}


	}
	Promise.prototype.then = function(onResolve, onReject = (res) => {
		throw res
	}) {
		//
		return new Promise((resolve, reject) => {

			function commonHandler(method, data) {
				try {
					let result = method(data);
					if (result instanceof Promise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (e) {
					reject(e);
				}
			}

			if (this.status === pending) {
				this.isCatch = 1;
				this.cb.push({
					onResolve: () => {
						if (onResolve) {
							commonHandler(onResolve, this.data);
						}
					},
					onReject: () => {
						if (onReject) {
							commonHandler(onReject, this.data);
						}
					}
				});
			} else if (this.status === fulfilled) {
				setTimeout(() => {
					if (onResolve) {
						commonHandler(onResolve, this.data);
					}
				})
			} else {
				this.isCatch = 1;
				setTimeout(() => {
					if (onReject) {
						commonHandler(onReject, this.data);
					}
				})
			}
		})

	}
	Promise.prototype.catch = function(onReject) {
		return this.then(undefined, onReject);
	}
	// resolve(pro).then
	Promise.__proto__.resolve = function(val) {
		return new Promise((res, rej) => {
			if (val instanceof Promise) {
				val.then(res, rej)
			} else {
				res(val);
			}
		})
	}
	Promise.__proto__.reject = function(val) {
		return new Promise((res, rej) => {
			if (val instanceof Promise) {
				val.then(res, rej)
			} else {
				rej(val);
			}
		})
	};
	Promise.__proto__.all = function(promiseArr) {
		//有bug,当promise和普通数值都在一个数组里时会导致promise异步会多于普通数值一层因为Promise.resolve(promise)里面类型为promise也会产生一层异步，当普通数值在最后时会导致必定成功状态 
		if (!promiseArr || promiseArr.length <= 0) return;
		let arr = new Array(promiseArr.length);
		return new Promise((res, rej) => {
			let c = 0;
			promiseArr.forEach((promise, index) => {
				Promise.resolve(promise).then((val) => {
					c++;
					arr[index] = val;
					if (c === promiseArr.length - 1) {
						res(arr);
					}
				}, (reason) => {
					rej(reason);
				})
			})
		})
	}

	Promise.__proto__.race = function(promiseArr) {
		if (!promiseArr || promiseArr.length <= 0) return;
		return new Promise((res, rej) => {
			promiseArr.forEach((promise, index) => {
				Promise.resolve(promise).then((val) => {
					res(val)
				}, (reason) => {
					rej(reason);
				})
			})
		})
	}


	w.Promise = Promise;
})(window);