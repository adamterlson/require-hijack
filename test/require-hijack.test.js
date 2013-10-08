var requiremock = require('../index');

describe('require-hijack', function() {
	beforeEach(function () {
		requiremock.replacements = [];
	});

	it('should restore with the original dependency', function () {
		var stub = { readdir: sinon.spy() };

		var replacement = requiremock.replace('fs').with(stub);
		replacement.restore();

		var fsModule = require('../testmodules/fsModule');

		fsModule();

		stub.readdir.should.not.have.been.called;
		expect(requiremock.replacements.length).to.equal(0);
	});

	it('should not call original fs', function () {
		var stub = { readdir: sinon.spy() };

		requiremock.replace('fs').with(stub);

		// These need to be out of the test folder because require is getting stomped, but
		// the test runner is loading all files in the folder
		var fsModule = require('../testmodules/fsModule2');

		fsModule();

		stub.readdir.should.have.been.calledWithExactly('somedir');
	});

	it('should work to hijack local module dependencies based on caller paths', function () {
		var stub = {};

		var replacement = requiremock.replace('../testmodules/otherModule').with(stub);

		var localModule = require('../testmodules/localModule');

		expect(localModule).to.equal(stub);
	});
});