var Module = require('module');
var rm = require('require-middleware');

rm.use(function mocker (mod, next) {
	var result;
	RequireMock.replacements.forEach(function (replacement) {
		if (replacement.path === mod.path && replacement.dep) {
			result = replacement.dep;
		}
	});

	if (result) {
		return result;
	}
	next();
});

function replace(path) {
	var replacement = Object.create(Replacement);
	replacement.path = Module._resolveFilename(path, this);

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