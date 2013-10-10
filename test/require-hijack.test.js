describe('require-hijack', function() {
	beforeEach(function () {
		requireHijack.replacements = [];
	});

	it('should restore with the original dependency', function () {
		var stub = { readdir: sinon.spy() };

		var replacement = requireHijack.replace('fs').with(stub);
		replacement.restore();

		var fsModule = require('../scenarios/fsModule');

		fsModule();

		stub.readdir.should.not.have.been.called;
		expect(requireHijack.replacements.length).to.equal(0);
	});

	it('should not call original fs', function () {
		var stub = { readdir: sinon.spy() };

		requireHijack.replace('fs').with(stub);

		// These need to be out of the test folder because require is getting stomped, but
		// the test runner is loading all files in the folder
		var fsModule = require('../scenarios/fsModule2');

		fsModule();

		stub.readdir.should.have.been.calledWithExactly('somedir');
	});

	it('should work to hijack local module dependencies based on caller paths', function () {
		var stub = {};

		var replacement = requireHijack.replace('../scenarios/otherModule').with(stub);

		var localModule = require('../scenarios/localModule');

		expect(localModule).to.equal(stub);
	});

	it('should restore all replacements', function () {
		var stub = {};

		requireHijack.replace('../scenarios/otherModule').with(stub);

		requireHijack.restoreAll();

		expect(requireHijack.replacements.length).to.equal(0);
	});
});