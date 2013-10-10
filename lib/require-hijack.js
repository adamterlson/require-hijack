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
	replacement.path = resolve(path, module.parent);

	if (!replacement.path) {
		throw "Module " + path + " not found.";
	}

	RequireMock.replacements.push(replacement);

	return replacement;
};

function restoreAll() {
	RequireMock.replacements.forEach(function (replacement) {
		replacement.restore();
	});
}

var RequireMock = {
	replace: replace,
	replacements: [],
	restoreAll: restoreAll
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
};

function resolve (path, self) {
	var result;

	try {
		result = Module._resolveFilename(path, self);
	}
	catch (ex) {
		if (self.parent) {
			return resolve(path, self.parent);
		}
	}
	return result;
}

exports = module.exports = RequireMock;
