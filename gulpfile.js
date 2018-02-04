var gulp = require("gulp");
var spawn = require('child_process').spawn;
const Path = require("path");
const exportContent = require("./src/build/export-content").exportContent;

function cmd(cmd) {
    let split = cmd.split(" ");
    if (!/^win/.test(process.platform)) { // linux
        return spawn(split[0], split.slice(1), {stdio: "inherit"});
    } else {
        return spawn('cmd', ['/s', "/c"].concat(split), {stdio: "inherit"});
    }
}

function createStylusCompiler() {
    return require("./src/build/stylus-compiler").createCompiler({
        container: {
            dir: `src/runtime/blog/common/style`,
            file: "style.styl",
        },
        lookupDirs: [
            `src/runtime/blog`
        ],
        distDir: `dist/css`,
    });
}


const stylusCompiler = createStylusCompiler();

gulp.task("build:watch", () => {
    stylusCompiler.watch();

    cmd("webpack --watch");
});

gulp.task("dev", ["build:watch"], () => {
    require("./src/server/dev-server");
});
gulp.task("deploy", () => {
    let webpack = cmd("webpack -p");
    let deployDir = __dirname + "/deploy";
    webpack.on("exit", () => {
        gulp.src("./dist/**").pipe(gulp.dest(`${deployDir}/assets`));
    });

    const srcContentDir = Path.resolve(`${__dirname}/sample`);

    exportContent(srcContentDir, (content, path) => {
        const fs = require("fs");
        const mkdirp = require("mkdirp");
        mkdirp(Path.dirname(deployDir + path), (err) => {
            fs.writeFile(deployDir + path, content, (err) => {});
        });
    });
});