const express  =require('express')
//服务器中渲染dom的包
const ReactSSR =  require('react-dom/server') 
//require的内容在default中，所以要在后面加.default
const serverEntry = require('../dist/server-entry').default
//nodejs中的fs包，用来读写文件，文件是写入磁盘
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
const app = express()

app.use('/public', express.static(path.join(__dirname,'../dist')))
app.get('*',function(req,res){
    const appString = ReactSSR.renderToString(serverEntry);
    
    res.send(template.replace('<app></app>',appString));
})
app.listen(3333,function(){
    console.log('server is runing on port 3333')
})
