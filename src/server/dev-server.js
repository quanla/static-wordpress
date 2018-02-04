const express = require("express");
const createResolveContent = require("./resolve-content").createResolveContent;
const createContentRouter = require("./content-router").createContentRouter;
const createAliasContentGenerators = require("./alias-content-generator").createAliasContentGenerators;
const Path = require("path");
const createFixedContentGenerator = require("./fixed-content-generator").createFixedContentGenerator;

let app = express();

app.use("/assets", express.static("dist"));

let resolveContent = ((rootContentDir)=> {
    let aliasContentGenerators = createAliasContentGenerators(rootContentDir, url => resolveContent(url));

    return createResolveContent(createFixedContentGenerator(rootContentDir), ...aliasContentGenerators);
})(Path.resolve(`${__dirname}/../../sample`));

app.use(createContentRouter(resolveContent));

app.listen(2312, () => {
    console.log(`Dev server started at port ${2312}`);
});
