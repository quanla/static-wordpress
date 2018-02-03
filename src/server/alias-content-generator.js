const fs = require("fs");
const CompileIndexHtml = require("./compile-html").CompileIndexHtml;

const {promisify} = require('util');

// const readFile = promisify(fs.readFile); // (A)
const readDir = promisify(fs.readdir); // (A)


function createAliasContentGenerator(dir, resolve) {
    return async () => {
        let dirs = await readDir(`${dir}/article`);
        return dirs.map((dir1) => ({
            path: `/article/${dir1}/index.html`,
            createContent: () => CompileIndexHtml.compileIndexHtml(`/article/${dir1}`, resolve, (manifest) => manifest.title),
        }));
    };
}

exports.createAliasContentGenerator = createAliasContentGenerator;