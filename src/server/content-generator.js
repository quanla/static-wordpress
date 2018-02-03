const fs = require("fs");

const {promisify} = require('util');

const readFile = promisify(fs.readFile); // (A)
const readDir = promisify(fs.readdir); // (A)


function createContentGenerator(dir) {
    return async () => {
        let articleDir = `${dir}/article`;
        let dirs = await readDir(articleDir);
        return dirs.map((dir1) => {


            console.log(`${articleDir}/${dir1}`);
        });
    };
}

exports.createContentGenerator = createContentGenerator;