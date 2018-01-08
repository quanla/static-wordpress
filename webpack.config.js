const path = require("path");

module.exports = {
    cache: true,
    // devtool: "eval",
    entry: ["./src/runtime/blog/blog-loader.jsx"],
    output: {
        path: `${__dirname}/dist/js`,
        filename: "blog-loader.js"
    },
    performance: {
        hints: false, // enum
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['latest', 'stage-0', "react"],
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

