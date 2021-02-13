let express = require('express');
let router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require("bcryptjs");
const btoa = require('btoa');
let atob = require("atob");
const CryptoJS = require("crypto-js");
const { query } = require('express');
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }),
  });

// const connection = mysql.createConnection({
//     host: 'aliceonline.shop',
//     user: 'aliceonline',
//     password: 'tlstjdrbs123~',
//     database: 'aliceonline',
//     port: '3306',
//   });

const jwt = require("jsonwebtoken");
const { resolveSoa } = require('dns');
const jwtkey = fs.readFileSync(path.resolve(__dirname,"./jwt_key.json"));
const jwtConfig = JSON.parse(jwtkey);
const setJWT = (user_pk) => {
    let token = jwt.sign(
        {user_pk: user_pk}, jwtConfig.key, { expiresIn : "7d"}
    )
    return token;
}


// /* GET home page. */
router.post('/', (req,res) => {
//   리뷰 로딩해줘야함
});

router.post("/login", async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.id===undefined||req.body.id===null||req.body.pw===undefined||req.body.pw===null) return res.send("login denied");
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        let id = req.body.id;

        let check = await db.query(`SELECT user_id,user_pk,user_login_cnt FROM users where user_id='${id}'`);
        if(check[0][0]===undefined) return res.send("login denied")
        console.log(check[0][0].user_pk)
        let comparePass = await bcrypt.compareSync(req.body.pw,check[0][0].user_pk);
        if(comparePass !== true){return res.send('login denied')}
        let temp_token = jwt.sign({user_id:check[0][0].user_id},jwtConfig.key);
        let cnt = 0;
        if(check[0][0].user_id!==null){
            cnt = check[0][0].user_id + 1
        }
        await db.query(`insert into users(user_login_cnt,user_ip) values('cnt','${ip}')`);
        console.log(temp_token)
        let data = {
            token:temp_token,
            user_id:check[0][0].user_id
        }
        return res.send(data)
    }catch(err){
        console.log("error on login")
        console.log(err)
        return res.send("error")
    }
})


router.post('/register',async(req,res) => {
    console.log(req.body)
    try{
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        if(req.body.id==="") return res.send("empty id");
        if(req.body.pass==="") return res.send("empty pass");
        if(req.body.email==="") return res.send("empty email");
        if(req.body.id===undefined||req.body.pass===undefined||req.body.email===undefined) return res.send("fail");

        let id = req.body.id;
        let pass = req.body.pass;
        let email = req.body.email;
        // console.log(today)
        // let date = today.split("T")

        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })

        // 아이디 이메일 중복만 확인하고 회원가입 시키기

        let checkid = await db.query(`SELECT * FROM users where user_id='${id}'`);
        if(checkid[0][0]!==undefined) return res.send("matching id");
        let checkemail = await db.query(`SELECT * FROM users where user_email='${email}'`);
        if(checkemail[0][0]!==undefined) return res.send("matching email");

        // await db.query(`insert into users(user_id,user_pk,user_email,user_register,user_agree1,user_agree2,user_ip) values(${id},${pass},${email},${date},true,true,${ip})`);
        await db.query(`insert into users(user_id,user_pk,user_email,user_agree1,user_agree2,user_ip,user_register) values('${id}','${pass}','${email}',true,true,'${ip}',,CURDATE())`);
        console.log("success")
        return res.end("success")
    }catch(err){
        console.log("error on register")
        console.log(err)
        return res.send("error");
    }
})

router.post("/review",async(req,res)=>{
    console.log(req.body);
    try{
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        let data = [];
        if(req.body.page==="1"||req.body.page===1){
            data = await db.query('select id,user_pk,re_title,re_date,re_visible,re_view_cnt from reviews order by id desc limit 20')
        }else{
            let params = Number(req.body.page)*10
            data = await db.query(`select id,user_pk,re_title,re_date,re_visible,re_view_cnt from reviews order by id desc limit ${params+20} offset ${params}`)
        }
        let data2 = await db.query('select id from reviews')
        let returnArray = [];
        for(let i=0;i<data[0].length;i++){
            returnArray[i] = data[0][i]
        }
        let datapackage = {
            Array:returnArray,
            length:data2[0].length
        }
        return res.send(datapackage)

    }catch(err){
        console.log("error on review")
        console.log(err)
        return res.send("error")
    }
})

router.post("/notification",async(req,res)=>{
    console.log(req.body);
    try{
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        let data = [];
        if(req.body.page==="1"||req.body.page===1){
            data = await db.query('select id,user_pk,re_title,re_date,re_visible,re_view_cnt from notification order by id desc limit 20')
        }else{
            let params = Number(req.body.page)*10
            data = await db.query(`select id,user_pk,re_title,re_date,re_visible,re_view_cnt from notification order by id desc limit ${params+20} offset ${params}`)
        }
        let data2 = await db.query('select id from notification')
        let returnArray = [];
        for(let i=0;i<data[0].length;i++){
            returnArray[i] = data[0][i]
        }
        let datapackage = {
            Array:returnArray,
            length:data2[0].length
        }
        return res.send(datapackage)

    }catch(err){
        console.log("error on review")
        console.log(err)
        return res.send("error")
    }
})

router.post("/article",async(req,res)=>{
    console.log(req.body)
    try{
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        
        let data = await db.query(`select re_content,id,user_pk,re_title,re_date,re_visible,re_view_cnt,re_image,re_image_type from reviews where id=${req.body.id}`)
        // await db.query(`update`)

        return res.send(data[0][0])
    }catch(err){
        console.log("error on article")
        console.log(err)
        return res.send("err")
    }
})

router.post("/notice",async(req,res)=>{
    console.log(req.body)
    try{
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        
        let data = await db.query(`select re_content,id,user_pk,re_title,re_date,re_visible,re_view_cnt,re_image,re_image_type from notification where id=${req.body.id}`)
        // await db.query(`update`)

        return res.send(data[0][0])
    }catch(err){
        console.log("error on article")
        console.log(err)
        return res.send("err")
    }
})

router.post("/getimage",async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.image===undefined||req.body.image==="undefined"||req.body.image===null) return res.send("")
        let read = fs.readFileSync(path.resolve(__dirname,"./uploads/"+req.body.image))
        let temp = read.toString("base64");
        return res.send(temp)
    }catch(err){
        console.log("error on getimage")
        console.log(err)
        return res.send("err")
    }
})

router.post("/write",upload.single('image'),async(req,res)=>{
    try{
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        if(req.body.checkImage===false){
            await db.query(`insert into reviews(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),'true','0','${ip}')`)
        }else{
            await db.query(`insert into reviews(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip,re_image_type,re_image) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),'true','0','${ip}','${req.body.image_type}','${req.body.image_name}')`)
        }

        return res.send("success")
    }catch(err){
        console.log("error on write")
        console.log(err)
        return res.send("error")
    }
})

router.post("/adminwrite",upload.single('image'),async(req,res)=>{
    try{
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        let db = await mysql.createConnection({
            host: 'aliceonline.shop',
            user: 'aliceonline',
            database: 'aliceonline',
            password: 'tlstjdrbs123~',
            waitForConnections: true,
            port: '3306',
            connectionLimit: 10,
            queueLimit: 0
        })
        if(req.body.checkImage===false){
            await db.query(`insert into notification(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),'true','0','${ip}')`)
        }else{
            await db.query(`insert into notification(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip,re_image_type,re_image) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),'true','0','${ip}','${req.body.image_type}','${req.body.image_name}')`)
        }

        return res.send("success")
    }catch(err){
        console.log("error on write")
        console.log(err)
        return res.send("error")
    }
})

module.exports = router;

// ############ users ############
// create table users(
// 	id int primary key auto_increment,
// 	user_id varchar(100),
// 	user_pk varchar(100),
// 	user_email varchar(100),
// 	user_register varchar(100),
// 	user_last_login datetime,
// 	user_agree1 boolean,
// 	user_agree2 boolean,
// 	user_login_cnt int(100),
// 	user_review_history varchar(1000),
// 	user_ip varchar(100)
// );

// create table reviews(
// 	id int primary key auto_increment,
// 	user_pk varchar(100),
// 	re_title varchar(100),
// 	re_content varchar(100),
// 	re_date datetime,
// 	re_image mediumblob,
// 	re_image_type varchar(50),
// 	re_visible boolean,
// 	re_view_cnt bigint,
// 	user_ip varchar(100)
// );

// create table notice(
// 	id int primary key,
// 	pk varchar(1000),
// 	notice_title varchar(100),
// 	notice_content varchar(100),
// 	notice_date datetime,
// 	notice_image varchar(10000),
// 	notice_visible boolean,
// 	notice_view_cnt bigint
// );

// create table cmt(
// 	id int primary key,
// 	pk varchar(1000),
// 	re_pk varchar(1000),
// 	cmt_content varchar(100),
// 	cmt_date datetime,
// 	cmt_visible boolean
// );