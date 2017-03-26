
'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/dist', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },
    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        // colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
    ]
}
