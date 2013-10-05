var requiremiddleware = require('../lib/require-middleware');

describe('require-middleware', function() {
	describe('use', function () {
		it('should add middleware to the stack', function () {
			// arrange
			var middleware = function () { };

			// act
			requiremiddleware.use(middleware);

			// assert
			expect(requiremiddleware.stack.indexOf(middleware)).to.equal(0);
		});
	});
});