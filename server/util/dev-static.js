const axios = require('axios')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const path = require('path')
const serverConfig = require('../../build/webpack.config.server.js')
const ReactDomServer  =require('react-dom/server')
//memoryFs的功能与fs相似，区别是fs是写到硬盘当中，而memory-fs是写到内存中
const MemoryFs = require('memory-fs')
//获取webpack-dev-server启动的服务中的template
const getTemplate = ()=> {
    return new Promise((resolve,reject) =>{
        axios.get('http://localhost:8888/public/index.html').then(res=>{
            resolve(res.data)
        }).catch(reject)
    })
}
const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
//将serverCompiler.outputFileSystem由fs改为memory-fs，这样在内存中读写，速度会更快，而且我们没必要将bundle写到硬盘当中
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({},(err,stats) => {
    if(err) throw err
    //stats是webpack打包后在控制台输出的信息,如果有错误或警告信息我们就把他们依次输出
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))
    //打包后的bundle路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
        )
    //读取bundle内容,bundle是string
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    const m = new Module()
    //指定编译后的文件名称为server-entry.js，必须要有一个名称，否则会报错
    m._compile(bundle,'server-entry.js')
    serverBundle = m.exports.default
    

})
module.exports =function(app) {
    //将静态文件代理到webpac-dev-server启动的服务上
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }))
    app.get('*', function(req,res){
        const content = ReactDomServer.renderToString(serverBundle)
        getTemplate().then(template => {
            res.send(template.replace('<app></app>',content))
        })
    })
}