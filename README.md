Require Hijack
============

This is another library that manages to allow for mocking on require modules from a module that you're unit testing.

## How it differs:

* It allows for mocking of the **ENTIRE** module (meaning a Class's constructor can be replaced, or if the module is nothing more than a function the entire function can be replaced).
* It works without touching the require cache, so it will work on native modules as well (such as fs).
* Doesn't spawn a vm.
* This module itself doesn't touch the inside of require, though it leverages [require-middleware](https://github.com/adamterlson/require-middleware) which redefines what `require` means.

## Basic usage

```````javascript
// This call to the real dependency is only required to quickly stub out the entire thing.
// You can pass any sort of object or function to `with()`
var realfs = require('fs');

// From this point on out, all require calls will go through the mocker
var requireMock = require('require-hijack');

var fakeFs = sinon.stub(fs);
requireMock.replace('fs').with(fakeFs);

var myModule = require('../lib/myModule');
myModule.readDirectory();

fakeFs.readdir.should.have.been.called;
```````

*Note* - Mock your sub-module's dependencies **before** loading your sub-module, otherwise those require calls will happen prior to the mocking goodness!