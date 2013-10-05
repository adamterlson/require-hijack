var requireMiddleware = require('../lib/require-middleware');

describe('require-middleware', function() {
	describe('use', function () {
		beforeEach(function () {
			requireMiddleware.stack = [];
		});

		it('should add middleware to the stack', function () {
			// arrange
			var middleware = function () { };

			// act
			requireMiddleware.use(middleware);

			// assert
			expect(requireMiddleware.stack[0].handle).to.equal(middleware);
		});

		it('should name middleware based on function name by default', function () {
			// arrange
			var middleware = function myname() { };

			// act
			requireMiddleware.use(middleware);

			// assert
			console.log(requireMiddleware.stack);
			expect(requireMiddleware.stack[0].handle).to.equal(middleware);
			expect(requireMiddleware.stack[0].name).to.equal('myname');
		});

		describe('as', function () {
			it('should change the middlewares name', function () {
				// arrange
				var middleware = function myname() { };

				// act
				requireMiddleware.use(middleware).as('newname');

				// assert
				expect(requireMiddleware.stack[0].handle).to.equal(middleware);
				expect(requireMiddleware.stack[0].name).to.equal('newname');
			});
		});
	});
});