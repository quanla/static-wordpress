const fs = require("fs");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const renderRouterToString = require("./render-router-tostring").renderRouterToString;

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

const CompileIndexHtml = {
    compileIndexHtml(url, apiResolve, resolveOg) {
        const {routes} = require("../runtime/blog/blog-routes");

        let cacher = Cacher.createCacher(apiResolve);
        return Promise.all([
            AsyncResolve.asyncResolve({
                fn: () => {
                    apiConfig.setFetcher({get: (url) => cacher.execute(url)});
                    return renderRouterToString(url, routes);
                },
                getUnresolvedPromises: cacher.getUnresolvedPromises,
            }),
            resolveOg(),
        ])
            .then(([reactSsrContent, og]) => {
                return applyIndexTemplate({
                        ...og ,
                        content: reactSsrContent,
                        cached_gets: JSON.stringify(Object.keys(cacher.getCache())),
                });
            })
        ;
    }
};

exports.CompileIndexHtml = CompileIndexHtml;