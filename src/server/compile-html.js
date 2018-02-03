
const React = require("react");
const fs = require("fs");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");

require("jsx-node").install();
global.h = React.createElement;

const {ArticleRoute} = require("../runtime/blog/routes/article/article-route");
// const StaticRouter = require('react-router-dom/StaticRouter');
const {renderRoutes} = require('react-router-config');
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

        // console.log(`Compiling article "${htmlDir}"`);
        let cacher = Cacher.createCacher(resolve);
        apiConfig.setFetcher({get: (url) => cacher.execute(url)});
        return Promise.all([
            AsyncResolve.asyncResolve({
                fn: () => {
                    let renderToString2 = renderToString(
                        React.createElement(ArticleRoute, {match: {params: {slug: htmlDir.replace("/article/", "").replace("/", "")}}})
                    );
                    console.log(renderToString2);
                    return renderToString2;
                },
                getUnresolvedPromises: cacher.getUnresolvedPromises,
            }),
            resolve(`/${htmlDir}/manifest.json`),
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