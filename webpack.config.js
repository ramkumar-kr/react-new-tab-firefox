const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NewTabHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: __dirname + '/dist/index.html',
    inject: 'body',
    chunks: ['bookmarks'],
    minify: {
        collapseWhitespace: true,
        removeComments: true
    }
});

var OptionsHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/options.html',
    filename: __dirname + '/dist/options.html',
    inject: 'body',
    chunks: ['options'],
    minify: {
        collapseWhitespace: true,
        removeComments: true
    }
});
var UglifyJSPluginConfig = new UglifyJSPlugin({
    compress: {
        warnings: false,
        pure_getters: true,
        unsafe: false,
        unsafe_comps: false,
        screw_ie8: true
    }
})

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
       from: __dirname + '/app/css', to: __dirname + '/dist/css' 
    },
    {
        from: __dirname + '/app/manifest.json', to: __dirname + '/dist/manifest.json'
    }
]);

module.exports = {
    node: {
        fs: 'empty'
    },
    entry: {
        bookmarks: "./app/bookmarks.js",
        options: "./app/options.js"
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
    loaders: [
       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [NewTabHtmlWebpackPluginConfig, OptionsHtmlWebpackPluginConfig, CopyWebpackPluginConfig, UglifyJSPluginConfig]
}