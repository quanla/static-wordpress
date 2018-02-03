const express = require("express");
const createResolveContent = require("./resolve-content").createResolveContent;
const createContentRouter = require("./content-router").createContentRouter;
const createAliasContentGenerators = require("./alias-content-generator").createAliasContentGenerators;
const recursiveReaddir = require("recursive-readdir");
const fs = require("fs");

const {promisify} = require('util');

const readFile = promisify(fs.readFile); // (A)
const Path = require("path");

let app = express();

app.use("/assets", express.static("dist"));

let resolveContent = ((rootContentDir)=> {
    let aliasContentGenerators = createAliasContentGenerators(rootContentDir, url => resolveContent(url));

    function createFixedContentGenerator(dir) {
        return async () => {
            let files = await recursiveReaddir(dir);
            return files.map((absFilePath) => ({path: absFilePath.substring(dir.length), createContent: async () => readFile(absFilePath, "utf8")}))
        };
    }
    return createResolveContent(createFixedContentGenerator(rootContentDir), ...aliasContentGenerators);
})(Path.resolve(`${__dirname}/../../sample`));

app.use(createContentRouter(resolveContent));

app.listen(2312, () => {
    console.log(`Dev server started at port ${2312}`);
});
