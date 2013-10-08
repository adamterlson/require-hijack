var fs = require('fs');
exports = module.exports = function () {
	console.log(fs);
	fs.readdir('somedir');
};