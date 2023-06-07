/**
 * 函数a
 * @param {Function} fn 是个函数
 */
function a(fn) {

}
a()
a.pw = function() {
	console.log(10);
}

function stu(name, age) {
	this.name = name;
	this.age = age;
	return null
}

function news(cb, ...ac) {
	let obj = {};
	obj.__proto__ = cb.prototype;
	let result = cb.call(obj, ...ac);
	console.log('ss'
		instanceof String);
	return result instanceof Object ? result : obj;
}
stu.prototype.p = 1201;

let z = news(stu, 'gg', 18);
console.log(z);

let c = new a();
c.__proto__.z = 210
c.b = 10
a.__proto__.a = 10;
a.prototype.a = 10;
console.log(c, {});
console.log(Reflect.getPrototypeOf(c));
console.dir(a);
