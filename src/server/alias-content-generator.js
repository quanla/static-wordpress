const fs = require("fs");
const CompileIndexHtml = require("./compile-html").CompileIndexHtml;

const {promisify} = require('util');

// const readFile = promisify(fs.readFile); // (A)
const readDir = promisify(fs.readdir); // (A)


function createAliasContentGenerators(dir, resolve) {

    // Duplicated with routes
    let indexFolderParents = [
        {
            folder: "article",
            manifestToTitle: (manifest) => manifest.title,
        },
        {
            folder: "author",
            manifestToTitle: (manifest) => manifest.fullName,
        },
    ];
    return [
        ... indexFolderParents.map(({folder, manifestToTitle}) => (
            async () => {
                let dirs = await readDir(`${dir}/${folder}`);
                return dirs.map((dir1) => ({
                    path: `/${folder}/${dir1}/index.html`,
                    createContent: () => CompileIndexHtml.compileIndexHtml(`/${folder}/${dir1}`, resolve, manifestToTitle),
                }));
            }
        ))

    ];
}

exports.createAliasContentGenerators = createAliasContentGenerators;