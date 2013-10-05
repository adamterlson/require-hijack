var baseRequire = module.constructor.prototype.require;
var stack = [];

module.constructor.prototype.require = function (m) {
	var mod = {
		name: m
	};

	function run(index) {
		var fn = stack[index];
		if (fn) {
			fn(mod, function (err) {
				if (err) {
					throw err;
				}
				run(++index);
			});
		}
	}
	run(0);

	console.log(mod.name);

	return baseRequire.apply(this, [mod.name]);
};

function use(fn) {
	stack.push(fn);
};

exports = module.exports = {
	stack: stack,
	use: use
};