//const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    target : 'node',
    entry:{
        app: path.join(__dirname,'../client/server-entry.js'),

    },
    output:{
        filename:'server-entry.js',
        path:path.join(__dirname,'../dist'),
        //最好写成/public/而不是/public
        publicPath:'/public/',
        libraryTarget:'commonjs2'
    },
    module:{
        rules:[
            {
            test: /\.jsx$/,
            loader: 'babel-loader'
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            //node_modeles中的文件已经经过了编译，所以不需要对其再次转换
            exclude: [
                path.resolve(__dirname, "../node_modules")
              ]
        }

        ]
    },
    // plugins: [new HtmlWebpackPlugin()]
}
