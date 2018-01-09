var gulp = require("gulp");
var spawn = require('child_process').spawn;
const chokidar = require("chokidar");

function cmd(cmd) {
    let split = cmd.split(" ");
    if (!/^win/.test(process.platform)) { // linux
        return spawn(split[0], split.slice(1), {stdio: "inherit"});
    } else {
        return spawn('cmd', ['/s', "/c"].concat(split), {stdio: "inherit"});
    }
}

function clearRequireCache(start) {
    Object.keys(require.cache).forEach(function(key) {
        if (key.startsWith(start)) {
            delete require.cache[key];
        }
    });
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

    function watchCopy(file, destDir) {
        chokidar
            .watch(file, {
                ignoreInitial: false
            })
            .on('all', function(event, path) {
                gulp.src(file).pipe(gulp.dest(destDir));
            })
        ;
    }

    watchCopy("./dist/js/blog-loader.js", "./dist/deploy/assets/js");
    watchCopy("./dist/css/style.css", "./dist/deploy/assets/css");


    function compile() {
        clearRequireCache(`${__dirname}/src`);

        const {Compile} = require("./src/compile/compile");
        Compile.createCompiler(`${__dirname}/sample`,`${__dirname}/dist/deploy`).compileAll();

        gulp.src(`${__dirname}/sample/**/*.*`).pipe(gulp.dest(`${__dirname}/dist/deploy`));
    }

    compile();

    chokidar
        .watch("./src/compile/**/*.*", {
            ignoreInitial: true
        })
        .on('all', function(event, path) {
            compile();
        })
    ;

});

gulp.task("dev", ["build:watch"], () => {
    require("./src/dev/dev-server");
});

// gulp.task("deploy", [], () => {
//     (()=> {
//         return new Promise((resolve, reject) => {
//
//             let ps = cmd("webpack -p");
//
//             ps.on('close', (code) => {
//                 if (code !== 0) {
//                     console.log(`ps process exited with code ${code}`);
//                     reject(code);
//                 } else {
//                     resolve();
//                 }
//
//             });
//         });
//     })().then(() => {
//         Deploy.doDeploy();
//     });
// });