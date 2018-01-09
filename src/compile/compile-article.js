const React = require("react");
const fs = require("fs");
const mkdirp = require("mkdirp");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");

const {BlogApp} = require("../runtime/blog/blog-app.jsx");

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

const CompileArticle = {
    createCompileArticle(src, dest) {

        let getFileContent = (url) => {
            return new Promise((resolve, reject) => {
                fs.readFile(src + url, "utf8", (err, content) => {
                    return resolve(url.endsWith(".json") ? JSON.parse(content) : content);
                });
            });
        };

        return (articleDir) => {
            // console.log(`Compiling article "${articleDir}"`);
            let cacher = Cacher.createCacher(getFileContent);
            apiConfig.setFetcher({get: (url) => cacher.execute(url)});

            const createDestDir = () => {
                return new Promise((resolve, reject) => {
                    mkdirp(`${dest}/article/${articleDir}`, (err) => {
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
                getFileContent(`/article/${articleDir}/manifest.json`),
            ])
                .then(([_, reactSsrContent, manifest]) => {
                    fs.writeFile(
                        `${dest}/article/${articleDir}/index.html`,
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
        };
    }
};

exports.CompileArticle = CompileArticle;