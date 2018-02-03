
const React = require("react");
const fs = require("fs");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;

require("jsx-node").install();
global.h = React.createElement;

const renderRouterToString = require("./render-router-tostring").renderRouterToString;
const {routes} = require("../runtime/blog/blog-routes");

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

const CompileIndexHtml = {
    compileIndexHtml(htmlDir, resolve, manifestToTitle) {
        let apiResolve = (url) => resolve(url).then((content) => {
            if (url.endsWith(".json")) {
                return JSON.parse(content);
            } else {
                return content;
            }
        });
        let cacher = Cacher.createCacher(apiResolve);
        return Promise.all([
            AsyncResolve.asyncResolve({
                fn: () => {
                    apiConfig.setFetcher({get: (url) => cacher.execute(url)});
                    return renderRouterToString(`${htmlDir}/`, routes);
                },
                getUnresolvedPromises: cacher.getUnresolvedPromises,
            }),
            apiResolve(`${htmlDir}/manifest.json`),
        ])
            .then(([reactSsrContent, manifest]) => {
                return applyIndexTemplate({
                    title: manifestToTitle(manifest),
                    content: reactSsrContent,
                    cached_gets: JSON.stringify(Object.keys(cacher.getCache())),
                });
            })
        ;
    }
};

exports.CompileIndexHtml = CompileIndexHtml;