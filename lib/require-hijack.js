
var rm = require('require-middleware');

var replacements = [];

rm.use(function mocker (mod, next) {
	var result;
	replacements.forEach(function (replacement) {
		if (replacement.name === mod.name && replacement.dep) {
			result = replacement.dep;
		}
	});

	if (result) {
		return result;
	}
	next();
});

function replace(path) {
	var cacheKey = require.resolve(path);

	var replacement = { name: path };
	replacements.push(replacement);

	return {
		with: function (mock) {
			replacement.dep = mock;
		}
	};
};

exports = module.exports = {
	replace: replace
};