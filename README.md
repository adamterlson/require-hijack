Proof of Failure: require-mock
============

This is an attempt to mock node require calls, with support for mocking the entire module itself rather than only its properties.

However, this approach is fundamentally flawed in that it will not work for native libraries (such as `fs`) that do not use require's cache.
