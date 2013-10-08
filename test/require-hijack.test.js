var requiremock = require('../index');

describe('require-hijack', function() {
	beforeEach(function () {
		requiremock.replacements = [];
		console.log(require.cache);
		require.cache = {};
		console.log(require.cache);
	});

	it('should not call original fs', function () {
		var stub = { readdir: sinon.spy() };

		requiremock.replace('fs').with(stub);

		// These need to be out of the test folder because require is getting stomped, but
		// the test runner is loading all files in the folder
		var fsmodule = require('../testmodules/fsmodule');

		fsmodule();

		stub.readdir.should.have.been.calledWithExactly('somedir');
	});

	it('should restore with the original dependency', function () {
		var stub = { readdir: sinon.spy() };

		var replacement = requiremock.replace('fs').with(stub);
		replacement.restore();

		var fsmodule = require('../testmodules/fsmodule2');

		fsmodule();

		stub.readdir.should.not.have.been.called;
		expect(requiremock.replacements.length).to.equal(0);
	});
});