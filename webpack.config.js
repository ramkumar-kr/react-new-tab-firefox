const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: __dirname + '/dist/index.html',
    inject: 'body',
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
    entry: [
        './app/bookmarks.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bookmarks.js'
    },
    module: {
    loaders: [
       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [HtmlWebpackPluginConfig, CopyWebpackPluginConfig, UglifyJSPluginConfig]
}