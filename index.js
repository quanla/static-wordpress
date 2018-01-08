const Compile = require("./src/compile/compile").Compile;
const Path = require("path");

Compile.compileDir(Path.resolve(__dirname, "sample/article"));

