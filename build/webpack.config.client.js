const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const config= {
    entry:{
        app: path.join(__dirname,'../client/app.js'),

    },
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public/'
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
    plugins: [new HtmlWebpackPlugin({
        template:path.join(__dirname,'../client/template.html')
    })]
}
if(isDev){
    //启动webpack-dev-server时要删除dist目录，否则请求不到js文件
    config.devServer={
        host:'0.0.0.0',
        contentBase: path.join(__dirname, "../dist"),
        hot:true,
        overlay:{
            errors:true
        },
        port: 8888,
        //此处要与ouput中的public相同，否则请求不到js文件
        publicPath:'/public',
        //当请求的文档不存在时404，返回/public/index.html
        historyApiFallback:{
            index:'/public/index.html'
        }
    }
}
module.exports = config