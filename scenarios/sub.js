var Class = require('./sub/class');

module.exports = function () {
	var instance = new Class('stuff');
	instance.foo();
}