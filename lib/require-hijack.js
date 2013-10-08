
var rm = require('require-middleware');

rm.use(function mocker (mod, next) {
	var result;
	RequireMock.replacements.forEach(function (replacement) {
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

	var replacement = Object.create(Replacement);
	replacement.name = path;

	RequireMock.replacements.push(replacement);

	return replacement;
};

var RequireMock = {
	replace: replace,
	replacements: []
};

var Replacement = {
	with: function (mock) {
		this.dep = mock;
		return this;
	},

	restore: function () {
		RequireMock.replacements.splice(RequireMock.replacements.indexOf(this), 1);
		return this;
	}
}

exports = module.exports = RequireMock;