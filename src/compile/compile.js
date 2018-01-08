const React = require("react");
const fs = require("fs");
const AsyncResolve = require("./async-resolve").AsyncResolve;
const Cacher = require("./cacher").Cacher;
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");

require("jsx-node").install();
const {BlogApp} = require("../runtime/blog/blog-app.jsx");

global.h = React.createElement;


let cacher = Cacher.createCacher((url) => Promise.resolve("OOOOO"));
apiConfig.setApiImpl({get: (url) => cacher.execute(url)});

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

function compileDir(dir) {
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
                }),
                (err) => {},
            );
        })
    ;

}
const Compile = {
    compileDir,
};

exports.Compile = Compile;