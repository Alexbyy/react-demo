const express  =require('express')
const ReactSSR =  require('react-dom/server') 
//require的内容在default中，所以要在后面加.default
const serverEntry = require('../dist/server-entry').default
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
