const React = require("react");
const fs = require("fs");

require("jsx-node").install();
global.h = React.createElement;

const {CompileIndexHtml} = require("./compile-html");

const Compile = {
    createCompiler(src, dest) {

        let compileIndexHtml = CompileIndexHtml.createCompileIndexHtml(src, dest);

        return {
            compileAll() {
                let sequencePromise = Promise.resolve();
                fs.readdir(src + "/article", (err, list) => {
                    list.forEach((dir) => sequencePromise = sequencePromise.then(() => compileIndexHtml(`article/${dir}`)));
                });
                fs.readdir(src + "/author", (err, list) => {
                    list.forEach((dir) => sequencePromise = sequencePromise.then(() => compileIndexHtml(`author/${dir}`)));
                });
            }
        };
    }
};
exports.Compile = Compile;