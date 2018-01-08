const React = require("react");
const fs = require("fs");
const {renderToString} = require("react-dom/server");

require("jsx-node").install();
const {ArticleRoute} = require("../runtime/blog/article-route.jsx");

global.h = React.createElement;

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
            content: renderToString(React.createElement(ArticleRoute)),
        }),
        (err) => {},
    );
}
const Compile = {
    compileDir,
};

exports.Compile = Compile;