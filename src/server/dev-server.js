const express = require("express");
const createResolveContent = require("./resolve-content").createResolveContent;
const createContentRouter = require("./content-router").createContentRouter;
const createAliasContentGenerator = require("./alias-content-generator").createAliasContentGenerator;
const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const {promisify} = require('util');

const readFile = promisify(fs.readFile); // (A)
const Path = require("path");

let app = express();

app.use(express.static("dist"));

let resolveContent = ((rootContentDir)=> {
    let aliasContentGenerator = createAliasContentGenerator(rootContentDir, url => resolveContent(url));

    function createFixedContentGenerator(dir) {
        return async () => {
            let files = await recursiveReaddir(dir);
            return files.map((absFilePath) => ({path: absFilePath.substring(dir.length), createContent: async () => readFile(absFilePath)}))
        };
    }
    return createResolveContent(createFixedContentGenerator(rootContentDir), aliasContentGenerator);
})(Path.resolve(`${__dirname}/../../sample`));

app.use(createContentRouter(resolveContent));

app.listen(2312, () => {
    console.log(`Dev server started at port ${2312}`);
});
