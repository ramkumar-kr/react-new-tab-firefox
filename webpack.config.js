var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: __dirname + '/data/index.html',
    inject: 'body'
});

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
       from: __dirname + '/app/css', to: __dirname + '/data/css' 
    }
]);

module.exports = {
    entry: [
        './app/bookmarks.js'
    ],
    output: {
        path: __dirname + '/data',
        filename: 'bookmarks.js'
    },
    module: {
    loaders: [
       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [HtmlWebpackPluginConfig, CopyWebpackPluginConfig]
}