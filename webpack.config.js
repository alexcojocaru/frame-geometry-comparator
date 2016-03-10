var Path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var Clean = require("clean-webpack-plugin");
var UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;
var DedupePlugin = require("webpack").optimize.DedupePlugin;

var buildDir = "build";

module.exports = {
    entry: {
        main: "./src/main.jsx"
    },
    output: {
        path: "./" + buildDir,
        filename: "[name].min.js",
        pathInfo: false,
    },
    devtool: "source-map",
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }],

        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    Path.resolve(__dirname, "src")
                ],
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            },
            // the main sass get compiled as separate bundles
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?sourceMap!sass-loader"
                )
            },
            {
                test: /\.png$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.gif$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.jpe?g$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.svg(\?.*)?$/,
                loader: "file-loader?name=images/[name].[ext]"
            }
        ]
    },
    resolve: {
        // I can now require("file") instead of require("file.jsx")
        extensions: ["", ".js", ".json", ".jsx"],
        modulesDirectories: ["node_modules", "./src"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.ejs", // Load a custom template
            inject: "body", // Inject all scripts into the body
            favicon: "./src/images/favicon.png"
        }),
        new ExtractTextPlugin("[name].min.css"),
        new Clean([buildDir]),
        new DedupePlugin(),
        new UglifyJsPlugin({ minimize: true, output: { comments: false } })
    ],
};
