var Module = require('module');
console.log(Module);

function replace(path) {
	var orig = require(path);
	var cacheKey = require.resolve(path);
	return {
		with: function (mock) {
			if (typeof mock === 'function') {
				mock = mock();
			}

			console.log(require.cache[cacheKey]);
			console.log(cacheKey);

			var cacheItem = require.cache[cacheKey];
			if (cacheItem) {
				cacheItem.exports = mock;
			}
			else {
				Module._cache = {
					id: cacheKey,
			        exports: mock,
			        parent: null,
			        filename: cacheKey,
			        loaded: true,
			        children: null,
			        paths: null
			    }
			}
			orig = mock;
		}
	};
};

exports = module.exports = {
	replace: replace
};