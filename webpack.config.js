const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        app: "./dist/tsc/app.js",
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        library: "app",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    },
};
