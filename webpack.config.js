var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
var NewTabHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app', 'index.html'),
    filename: path.resolve(__dirname, 'dist', 'index.html'),
    inject: 'body',
    chunks: ['bookmarks'],
    minify: {
        collapseWhitespace: true,
        removeComments: true
    }
});

var OptionsHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app', 'options.html'),
    filename: path.resolve(__dirname, 'dist', 'options.html'),
    inject: 'body',
    chunks: ['options'],
    minify: {
        collapseWhitespace: true,
        removeComments: true
    }
});

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin({
    patterns: [
        {
            from: 'app/css', to: 'css' 
        },
        {
            from: 'app/images', to: 'images' 
        },
        {
            from: 'app/manifest.json', to: 'manifest.json'
        }
    ]});


module.exports = {
    mode: 'production',
    entry: {
        bookmarks: "./app/bookmarks.js",
        options: "./app/options.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: [NewTabHtmlWebpackPluginConfig, OptionsHtmlWebpackPluginConfig, CopyWebpackPluginConfig]
}