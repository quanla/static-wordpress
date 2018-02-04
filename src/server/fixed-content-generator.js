
const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const {promisify} = require('util');
const readFile = promisify(fs.readFile); // (A)

function createFixedContentGenerator(dir) {
    return async () => {
        let files = await recursiveReaddir(dir);
        return files.map((absFilePath) => ({path: absFilePath.substring(dir.length), createContent: async () => readFile(absFilePath, "utf8")}))
    };
}

exports.createFixedContentGenerator = createFixedContentGenerator;