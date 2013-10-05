/*var requiremock = require('../index');

describe('require-mock', function() {
	it('should not call original fs', function () {
		var stub;

		requiremock.replace('fs').with(function (orig) {
			return stub = sinon.stub(orig);
		});

		var fsmodule = require('./fixture/fsmodule');

		fsmodule();

		stub.should.have.been.calledWithExactly('somedir')
	});
});*/