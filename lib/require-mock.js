
var rm = require('./require-middleware');

var replacements = [];

rm.use(function mocker (mod, next) {
	console.log('in here');
	var result;
	replacements.forEach(function (replacement) {
		if (name === mod.name && mod.dep) {
			result = mod.dep;
		}
	});

	if (result) {
		return result;
	}
	next();
});

function replace(path) {
	var orig = require(path);
	var cacheKey = require.resolve(path);

	var replacement = { name: path };
	replacements.push(replacement);

	return {
		with: function (mock) {
			if (typeof mock === 'function') {
				mock = mock();
			}
			replacement.dep = mock;
		}
	};
};

exports = module.exports = {
	replace: replace
};