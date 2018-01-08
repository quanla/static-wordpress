const React = require("react");
const fs = require("fs");
const apiConfig = require("../runtime/api/api").apiConfig;
const {renderToString} = require("react-dom/server");

require("jsx-node").install();
const {BlogApp} = require("../runtime/blog/blog-app.jsx");

global.h = React.createElement;

apiConfig.setApiImpl({get: (url) => {
    console.log(url);
    return Promise.resolve("OOOO");
}});

let applyIndexTemplate = ((template)=> (vars) => {
    let content = template;
    for (var k in vars) {
        content = content.replace(new RegExp("\\$"+k, "g"), vars[k]);
    }
    return content;
})(fs.readFileSync(`${__dirname}/index.html`, "utf8"));

function compileDir(dir) {
    fs.writeFile(
        `${dir}/index.html`,
        applyIndexTemplate({
            title: "He he",
            content: renderToString(React.createElement(BlogApp)),
        }),
        (err) => {},
    );
}
const Compile = {
    compileDir,
};

exports.Compile = Compile;