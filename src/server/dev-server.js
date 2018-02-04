const express = require("express");
const createResolveContent = require("./resolve-content").createResolveContent;
const createContentRouter = require("./content-router").createContentRouter;
const createAliasContentGenerators = require("./alias-content-generator").createAliasContentGenerators;
const Path = require("path");
const NodeUtil = require("../common/utils/node-util").NodeUtil;
const createFixedContentGenerator = require("./fixed-content-generator").createFixedContentGenerator;

let app = express();

app.use("/assets", express.static("dist"));


let contentSrcDir = Path.resolve(`${__dirname}/../../sample`);
app.use(express.static(contentSrcDir));

require("jsx-node").install();
global.h = require("react").createElement;

let resolveContent = ((rootContentDir)=> {
    let aliasContentGenerators = createAliasContentGenerators(rootContentDir, url => resolveContent(url));

    return createResolveContent(createFixedContentGenerator(rootContentDir), ...aliasContentGenerators);
})(contentSrcDir);


app.use((req, res, next) => {
    if (req.url.endsWith("/")) {
        NodeUtil.getLoadedSrcList().forEach((path) => {
            if (path.endsWith(".jsx")) {
                delete require.cache[path];
            }
        })
    }
    next();
});

app.use(createContentRouter(resolveContent));

app.listen(2312, () => {
    console.log(`Dev server started at port ${2312}`);
});
