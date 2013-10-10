// Seems buffer doesn't expose a constructor directly!  Good!
var Buffer = require('buffer').Buffer;

module.exports = {
	lol: function () {
		var shouldbetrue = Buffer.isEncoding('lol');
		if (!shouldbetrue) {
			throw "Should have been true via the stub";
		}
		return shouldbetrue;
	}
}