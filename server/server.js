const express  =require('express')
//服务器中渲染dom的包
const ReactSSR =  require('react-dom/server') 
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
//nodejs中的fs包，用来读写文件，文件是写入磁盘
const fs = require('fs')
const path = require('path')

const app = express()

//用来判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'
//app.use(favicon(path.join(__dirname, 'favicon.ico'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    maxAge:10*60*1000,
    name:'tid',
    resave:false,
    saveUninitialized:false,
    secret:'react cnode calss'
}))

//将请求用下面文件处理
app.use('/api/user', require('./util/handle-login.js'))
//例如localhost:3333/api/topics会被proxy.js处理为http://cnodejs.org/api/v1/topics,然后进行相应请求
app.use('/api', require('./util/proxy'))
if(!isDev){
    //require的内容在default中，所以要在后面加.default
    const serverEntry = require('../dist/server-entry.js').default
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
    app.use('/public', express.static(path.join(__dirname,'../dist')))
    app.get('*',function(req,res){
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<app></app>',appString));
    })
}else{
    const devStatic = require('./util/dev-static.js')
    devStatic(app)
}
app.listen(3333,function(){
    console.log('server is runing on port 3333')
})
