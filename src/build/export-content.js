
require("jsx-node").install();
global.h = require("react").createElement;

const createAliasContentGenerators = require("../server/alias-content-generator").createAliasContentGenerators;
const createFixedContentGenerator = require("../server/fixed-content-generator").createFixedContentGenerator;
const createResolveContent = require("../server/resolve-content").createResolveContent;

const exportContent = (rootContentDir, fn) => {

    let aliasContentGenerators = createAliasContentGenerators(rootContentDir, url => resolveContent(url));
    let fixedContentGenerator = createFixedContentGenerator(rootContentDir);
    let resolveContent = createResolveContent(fixedContentGenerator, ...aliasContentGenerators);

    [...aliasContentGenerators].forEach(async (contentGenerator) => {
        let contents = await contentGenerator();

        for (let i = 0; i < contents.length; i++) {
            let {path, createContent} = contents[i];
            // console.log(path);

            let content = await createContent();
            fn(content, path);
        }
    });
};

exports.exportContent = exportContent;