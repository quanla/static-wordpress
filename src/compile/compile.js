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

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

const Compile = {
    createCompiler(src, dest) {

        let getFileContent = (url) => {
            return new Promise((resolve, reject) => {
                fs.readFile(src + url, "utf8", (err, content) => resolve(url.endsWith(".json") ? JSON.parse(content) : content));
            });
        };

        function compileArticle(articleDir) {

            let cacher = Cacher.createCacher(getFileContent);
            apiConfig.setFetcher({get: (url) => cacher.execute(url)});

            const createDestDir = () => {
                return new Promise((resolve, reject) => {
                    mkdirp(`${dest}/${articleDir}`, (err) => {
                        resolve();
                    });
                });
            };
            Promise.all([
                createDestDir(),
                AsyncResolve.asyncResolve({
                    fn: () => renderToString(React.createElement(BlogApp)),
                    getUnresolvedPromises: cacher.getUnresolvedPromises,
                }),
                getFileContent(`/${articleDir}/manifest.json`),
            ])
                .then(([_, reactSsrContent, manifest]) => {
                    fs.writeFile(
                        `${dest}/${articleDir}/index.html`,
                        applyIndexTemplate({
                            title: manifest.title,
                            content: reactSsrContent,
                            cached_gets: JSON.stringify(Object.keys(cacher.getCache())),
                        }),
                        (err) => {},
                    );

                    console.log(`Compiled article "${articleDir}"`);
                })
            ;
        }
        return {
            compileAll() {
                fs.readdir(src, (err, list) => {
                    list.forEach(compileArticle);
                });
                // compileArticle()
            }
        };
    }
};
exports.Compile = Compile;