var fs = require('fs');
var path = require('path');

describe('simple', function () {
	var fakeSimple = sinon.stub(require('../scenarios/sub/simple'));
	requireHijack.replace('../scenarios/sub/simple').with(fakeSimple);

	var simple = require('../scenarios/simple');

	it('should not throw', function () {
		simple.foo();
	});
});

describe('native', function () {
	var fs = require('fs');
	var nat;

	before(function () {
		sinon.stub(fs, 'renameSync');
		nat = require('../scenarios/native');
	});


	it('should not rename anything', function () {
		nat.foo();

		var exists = fs.existsSync(path.resolve(__dirname, '../scenarios/some-FAILURE.txt'));
		if (exists) {
			fs.renameSync(path.resolve(__dirname, '../scenarios/some-FAILURE.txt'), path.join(__dirname, '../scenarios/some.txt'));
		}
		exists.should.not.be.ok;
	});
});

describe('sub', function () {
	var sub;
	var c = require('../scenarios/sub/class');
	var FakeClass = sinon.spy();
	FakeClass.prototype = sinon.stub(c.prototype);

	before(function () {
		requireHijack.replace('../scenarios/sub/class').with(FakeClass);
		sub = require('../scenarios/sub');
	});

	it('should not throw', function () {
		sub();
		FakeClass.should.have.been.calledWith('stuff');
		FakeClass.prototype.foo.should.have.been.called;
	});
});

describe('no-exposure', function () {
	var FakeClass = sinon.spy();

	before(function () {
		requireHijack.replace('../scenarios/sub/class').with(FakeClass);
	});

	it('should not die', function () {
		require('../scenarios/no-exposure');
	});
});

describe('buffer', function () {
	var b, buffer;

	before(function () {
		b = require('buffer').Buffer;
		buffer = require('../scenarios/buffer');
	});

	it('should not call buffer constructor or property and return true', function () {
		var stub = sinon.stub(b, 'isEncoding');
		stub.withArgs('lol').returns(true);

		buffer.lol().should.be.ok;

		stub.restore();
	});
});

describe('istanbul', function () {
	var istanbul = sinon.spy();
	requireHijack.replace('istanbul').with(istanbul);
	var scenario = require('../scenarios/istanbul');

	it('should not run', function () {
		scenario();

		istanbul.should.have.been.called;
	});
});