const React = require("react");
const fs = require("fs");

require("jsx-node").install();
global.h = React.createElement;

const {CompileArticle} = require("./compile-article");

const Compile = {
    createCompiler(src, dest) {

        let compileArticle = CompileArticle.createCompileArticle(src, dest);

        return {
            compileAll() {
                fs.readdir(src + "/article", (err, list) => {
                    list.forEach(compileArticle);
                });
            }
        };
    }
};
exports.Compile = Compile;