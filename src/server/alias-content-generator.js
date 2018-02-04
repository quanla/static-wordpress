const fs = require("fs");
const CompileIndexHtml = require("./compile-html").CompileIndexHtml;

const {promisify} = require('util');

const readDir = promisify(fs.readdir); // (A)
const readFile = promisify(fs.readFile); // (A)

function createAliasContentGenerators(root, resolve) {

    let apiResolve = (url) => resolve(url).then((content) => {
        if (url.endsWith(".json")) {
            return JSON.parse(content);
        } else {
            return content;
        }
    });

    // Duplicated with routes
    let indexFolderParents = [
        {
            folder: "article",
            manifestToTitle: (manifest) => ({title: manifest.title}),
        },
        {
            folder: "author",
            manifestToTitle: (manifest) => ({title: manifest.fullName}),
        },
    ];
    return [
        ... indexFolderParents.map(({folder, manifestToTitle: manifestToOg}) => (
            async () => {
                let dirs = await readDir(`${root}/${folder}`);
                return dirs.map((dir1) => ({
                    path: `/${folder}/${dir1}/index.html`,
                    createContent: () => CompileIndexHtml.compileIndexHtml(`/${folder}/${dir1}/`, apiResolve, () => apiResolve(`/${folder}/${dir1}/manifest.json`).then(manifestToOg)),
                }));
            }
        )),
        async () => ([{
            path: `/articles.json`,
            createContent: async () => {
                let articles = await readDir(`${root}/article`);
                return JSON.stringify(articles);
            },
        }]),
        async () => ([{
            path: `/index.html`,
            createContent: () => CompileIndexHtml.compileIndexHtml(`/`, apiResolve, async () => ({title: `Quan's blog`})),
        }]),
        // author's articles
        async () => {
            let dirs = await readDir(`${root}/author`);
            return dirs.map((author) => ({
                path: `/author/${author}/articles.json`,
                createContent: async () => {
                    let articles = await readDir(`${root}/article`);
                    let belongArticles = [];

                    for (let i = 0; i < articles.length; i++) {
                        let article = articles[i];
                        let manifest = JSON.parse(await readFile(`${root}/article/${article}/manifest.json`, "utf8"));
                        if (manifest.author == author) {
                            belongArticles.push(article);
                        }
                    }
                    return JSON.stringify(belongArticles);
                },
            }));
        }


    ];
}

exports.createAliasContentGenerators = createAliasContentGenerators;