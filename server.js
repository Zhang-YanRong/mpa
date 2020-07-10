const fs = require('fs');
const os = require('os');
const tool = require('./openMyIP.js');
const path = require('path');

const  express = require('express'); //用express包创建服务器
const server = express();

//npm install ejs --save    用ejs包是为了方便用模版引擎
server.engine('.html',require('ejs').__express); //注册指定扩展名的模板引擎
server.set('view engine', 'html');               //加载模板引擎
server.set('views',__dirname + '/view');         //模板引擎目录

//npm install multer --save  用multer 设定存储文件地址
const multer=require('multer')
const upload=multer({dest:path.join(__dirname,'upload')})   //指定存储位置

//中间件
server.use((req,res,next)=>{ //use是express的方法
    if(req.url.indexOf('.')!== -1){   //如果请求的带点 就判定请求的是文件 （html中点击发送的请求）
        res.sendFile(path.resolve(path.join(path.join(__dirname,'upload'),req.url)));
        //sendFile是express的方法  服务器发送所在这个路径的文件  该文件在当前页面渲染
    }else {
        next();  //如果请求 的url不带点 那就跳过
    }
})

server.get('/',(req,res)=>{       //get是express的方法  用get是因为他是通过地址栏向服务器请求的信息进行跳转
    res.render('index',{file:fs.readdirSync(path.join(__dirname,'upload'))}) //render 读取./upload文件夹的内容 并发送给index.html
})
server.post('/upload',upload.single('file'),(req,res)=>{ //post是form表单的发送方式 同样是express的方法
    fs.rename(
        req.file.path, //old路径  req有一个file属性 包含上传文件的所有信息
        'upload/' + req.file.originalname,  //新路径
        (err)=>res.redirect('/')  //express的方法  用于上传完毕 再跳转  这里用于跳转当前页面 作为刷新
    )
})
const port = 3000;
server.listen(port,()=>{
    tool.Open(tool.getIP()+':'+port);
})
// let socket = io('/');
// socket.on('change',()=>{   //页面有上传就会刷新
//     location.reload();
// })
