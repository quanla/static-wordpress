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
                fs.readFile(src + url, "utf8", (err, content) => {
                    resolve(content);
                });
            });
        };

        function compileArticle(articleDir) {

            let cacher = Cacher.createCacher(getFileContent);
            apiConfig.setFetcher({get: (url) => cacher.execute(url)});

            mkdirp(`${dest}/${articleDir}`, (err) => {

                AsyncResolve.asyncResolve({
                    fn: () => renderToString(React.createElement(BlogApp)),
                    getUnresolvedPromises: cacher.getUnresolvedPromises,
                })
                    .then((finalContent) => {
                        fs.writeFile(
                            `${dest}/${articleDir}/index.html`,
                            applyIndexTemplate({
                                title: "He he",
                                content: finalContent,
                                cached_gets: JSON.stringify(Object.keys(cacher.getCache())),
                            }),
                            (err) => {},
                        );

                        console.log(`Compiled article "${articleDir}"`);
                    })
                ;
            });
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