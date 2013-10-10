var fs = require('fs');
var path = require('path');

module.exports = {
	foo: function () {
		fs.renameSync(path.join(__dirname, './some.txt'), path.join(__dirname, './some-FAILURE.txt'));
	}
}