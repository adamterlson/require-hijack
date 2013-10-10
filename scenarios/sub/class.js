function Stuff (prop) {
	throw "Shouldn't call Stuff constructor";
}

Stuff.prototype.foo = function () {
	throw "Shouldn't call Stuff foo.";
}

module.exports = Stuff;