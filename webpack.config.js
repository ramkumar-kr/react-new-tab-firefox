var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: __dirname + '/data/index.html',
    inject: 'body'
});


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
  plugins: [HtmlWebpackPluginConfig] 
}