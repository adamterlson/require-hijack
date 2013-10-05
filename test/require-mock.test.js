var requiremock = require('../index');

describe('require-mock', function() {
	it('should not call original fs', function () {
		var stub;

		requiremock.replace('fs').with(function (orig) {
			return stub = { readdir: sinon.spy() };
		});

		// These need to be out of the test folder because require is getting stomped, but
		// the test runner is loading all files in the folder
		var fsmodule = require('../testmodules/fsmodule');

		fsmodule();

		stub.readdir.should.have.been.calledWithExactly('somedir')
	});
});