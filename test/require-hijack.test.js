var requiremock = require('../index');

describe('require-hijack', function() {
	it('should not call original fs', function () {
		var stub = { readdir: sinon.spy() };

		requiremock.replace('fs').with(stub);

		// These need to be out of the test folder because require is getting stomped, but
		// the test runner is loading all files in the folder
		var fsmodule = require('../testmodules/fsmodule');

		fsmodule();

		stub.readdir.should.have.been.calledWithExactly('somedir')
	});
});