const React = require("react");
const fs = require("fs");
const mkdirp = require("mkdirp");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");
// const Path = require("path");

require("jsx-node").install();
const {BlogApp} = require("../runtime/blog/blog-app.jsx");

global.h = React.createElement;

let getFileContent = (url) => {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + url, "utf8", (err, content) => {
            resolve(content);
        });
    });
};
let cacher = Cacher.createCacher(getFileContent);
apiConfig.setFetcher({get: (url) => cacher.execute(url)});

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

function compileDir(dir) {
    mkdirp(`${process.cwd()}/sample/assets/js`, () => {

        fs.createReadStream(`${process.cwd()}/dist/js/blog-loader.js`).pipe(fs.createWriteStream(`${process.cwd()}/sample/assets/js/blog-loader.js`));

        AsyncResolve.asyncResolve({
            fn: () => renderToString(React.createElement(BlogApp)),
            getUnresolvedPromises: cacher.getUnresolvedPromises,
        })
            .then((finalContent) => {
                fs.writeFile(
                    `${dir}/index.html`,
                    applyIndexTemplate({
                        title: "He he",
                        content: finalContent,
                        cached_api: JSON.stringify(cacher.getCache()),
                    }),
                    (err) => {},
                );
            })
    });
}
const Compile = {
    compileDir,
};

exports.Compile = Compile;