var Module = require('module');

function replace(path) {
	var orig = require(path);
	var cacheKey = require.resolve(path);
	return {
		with: function (mock) {
			if (typeof mock === 'function') {
				mock = mock();
			}

			var cacheItem = require.cache[cacheKey];
			if (cacheItem) {
				cacheItem.exports = mock;
			}
			else {
				throw "Cannot mock this item, it didn't get added to the require cache";
			}
		}
	};
};

exports = module.exports = {
	replace: replace
};