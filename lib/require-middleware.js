var baseRequire = module.constructor.prototype.require;
var requireMiddleware = {
	stack: [],
	use: use
};

module.constructor.prototype.require = function (m) {
	var mod = {
		name: m
	};

	function run(index) {
		var fn = requireMiddleware.stack[index];
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

	return baseRequire.apply(this, [mod.name]);
};

function use(fn) {
	var middleware = {
		handle: fn,
		name: fn.name
	};

	requireMiddleware.stack.push(middleware);

	return {
		as: function (name) {
			middleware.name = name;
		}
	};
};

exports = module.exports = requireMiddleware;