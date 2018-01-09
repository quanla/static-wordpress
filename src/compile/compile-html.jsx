import {routes} from "../runtime/blog/blog-routes";

const React = require("react");
const fs = require("fs");
const mkdirp = require("mkdirp");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

const CompileIndexHtml = {
    createCompileIndexHtml(src, dest) {

        let getFileContent = (url) => {
            return new Promise((resolve, reject) => {
                fs.readFile(src + url, "utf8", (err, content) => {
                    return resolve(url.endsWith(".json") ? JSON.parse(content) : content);
                });
            });
        };

        return (htmlDir) => {
            console.log(`Compiling article "${htmlDir}"`);
            let cacher = Cacher.createCacher(getFileContent);
            apiConfig.setFetcher({get: (url) => cacher.execute(url)});

            const createDestDir = () => {
                return new Promise((resolve, reject) => {
                    mkdirp(`${dest}/${htmlDir}`, (err) => {
                        resolve();
                    });
                });
            };
            return Promise.all([
                createDestDir(),
                AsyncResolve.asyncResolve({
                    fn: () => renderToString(
                        <StaticRouter location={`/${htmlDir}/`} context={{}}>
                            {renderRoutes(routes)}
                        </StaticRouter>
                    ),
                    getUnresolvedPromises: cacher.getUnresolvedPromises,
                }),
                getFileContent(`/${htmlDir}/manifest.json`),
            ])
                .then(([_, reactSsrContent, manifest]) => {
                    fs.writeFile(
                        `${dest}/${htmlDir}/index.html`,
                        applyIndexTemplate({
                            title: manifest.title,
                            content: reactSsrContent,
                            cached_gets: JSON.stringify(Object.keys(cacher.getCache())),
                        }),
                        (err) => {},
                    );

                    console.log(`Compiled html "${htmlDir}"`);
                })
            ;
        };
    }
};

exports.CompileIndexHtml = CompileIndexHtml;