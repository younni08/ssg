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
        await db.query(`insert into users(user_id,user_pk,user_email,user_agree1,user_agree2,user_ip,user_register) values('${id}','${pass}','${email}',true,true,'${ip}',CURDATE())`);
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
            data = await db.query('select id,user_pk,re_title,re_date,re_visible,re_view_cnt from reviews where re_visible=true order by id desc limit 20')
        }else{
            let params = Number(req.body.page)*10
            data = await db.query(`select id,user_pk,re_title,re_date,re_visible,re_view_cnt from reviews  where re_visible=true order by id desc limit ${params+20} offset ${params}`)
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
            data = await db.query('select id,user_pk,re_title,re_date,re_visible,re_view_cnt from notification where re_visible=true order by id desc limit 20')
        }else{
            let params = Number(req.body.page)*10
            data = await db.query(`select id,user_pk,re_title,re_date,re_visible,re_view_cnt from notification where re_visible=true order by id desc limit ${params+20} offset ${params}`)
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
        
        let data = await db.query(`select re_content,id,user_pk,re_title,re_date,re_visible,re_view_cnt,re_image,re_image_type from reviews where id=${req.body.id} and re_visible=true`)
        await db.query(`update reviews set re_view_cnt=re_view_cnt+1 where id=${req.body.id}`)

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
        
        let data = await db.query(`select re_content,id,user_pk,re_title,re_date,re_visible,re_view_cnt,re_image,re_image_type from notification where id=${req.body.id} and re_visible=true`)
        await db.query(`update notification set re_view_cnt=re_view_cnt+1 where id=${req.body.id}`)

        return res.send(data[0][0])
    }catch(err){
        console.log("error on article")
        console.log(err)
        return res.send("err")
    }
})

// router.post("/notice",async(req,res)=>{
//     console.log(req.body)
//     try{
//         let db = await mysql.createConnection({
//             host: 'aliceonline.shop',
//             user: 'aliceonline',
//             database: 'aliceonline',
//             password: 'tlstjdrbs123~',
//             waitForConnections: true,
//             port: '3306',
//             connectionLimit: 10,
//             queueLimit: 0
//         })
        
//         let data = await db.query(`select re_content,id,user_pk,re_title,re_date,re_visible,re_view_cnt,re_image,re_image_type from notification where id=${req.body.id}`)
//         await db.query(`update notification set re_view_cnt=re_view_cnt+1 where id=${req.body.id}`)
//         // await db.query(`update`)

//         return res.send(data[0][0])
//     }catch(err){
//         console.log("error on article")
//         console.log(err)
//         return res.send("err")
//     }
// })

router.post("/bbsremove",async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.id===undefined||req.body.user_pk===undefined) return res.send("fail")
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
        await db.query(`update reviews set re_visible=false where id=${req.body.id} and user_pk='${req.body.user_pk}'`)
        return res.send("success")
    }catch(err){
        console.log("error on bbsremove")
        console.log(err)
        return res.send("err")
    }
})

router.post("/bbsremoveSuper",async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.token===undefined||req.body.id===undefined) return res.send("error")
        jwt.verify(req.body.token,jwtConfig.key);
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_id":"')[1];
        temp = temp.split('","iat":')[0];
        console.log(temp)
        if(temp!=="ssg") return res.send("error")
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
        await db.query(`update reviews set re_visible=false where id=${req.body.id}`)
        return res.send("success")
    }catch(err){
        console.log("error on bbsremoveSuper")
        console.log(err)
        return res.send("err")
    }
})

router.post("/noticeremoveSuper",async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.token===undefined||req.body.id===undefined) return res.send("error")
        jwt.verify(req.body.token,jwtConfig.key);
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_id":"')[1];
        temp = temp.split('","iat":')[0];
        console.log(temp)
        if(temp!=="ssg") return res.send("error")
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
        await db.query(`update notification set re_visible=false where id=${req.body.id}`)
        return res.send("success")
    }catch(err){
        console.log("error on bbsremoveSuper")
        console.log(err)
        return res.send("err")
    }
})

router.post("/getimage",async(req,res)=>{
    try{
        if(req.body.image===undefined||req.body.image==="undefined"||req.body.image===null) return res.send("")
        console.log(req.body)
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
            await db.query(`insert into reviews(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),true,'0','${ip}')`)
        }else{
            await db.query(`insert into reviews(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip,re_image_type,re_image) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),true,'0','${ip}','${req.body.image_type}','${req.body.image_name}')`)
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
            await db.query(`insert into notification(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),true,'0','${ip}')`)
        }else{
            await db.query(`insert into notification(user_pk,re_title,re_content,re_date,re_visible,re_view_cnt,user_ip,re_image_type,re_image) values ('${req.body.user}','${req.body.re_title}','${req.body.re_content}',CURDATE(),true,'0','${ip}','${req.body.image_type}','${req.body.image_name}')`)
        }

        return res.send("success")
    }catch(err){
        console.log("error on write")
        console.log(err)
        return res.send("error")
    }
})

router.post("/ordermvp",async(req,res)=>{
    try{
        console.log(req.body)
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

        let result1 = CryptoJS.AES.encrypt(req.body.input1,'bububaba').toString();
        let result2 = CryptoJS.AES.encrypt(req.body.input2,'bububaba').toString();
        let result3 = CryptoJS.AES.encrypt(req.body.input3,'bububaba').toString();
        let result4 = CryptoJS.AES.encrypt(req.body.input4,'bububaba').toString();
        let result5 = CryptoJS.AES.encrypt(req.body.input5,'bububaba').toString();
        let result6 = CryptoJS.AES.encrypt(req.body.input6,'bububaba').toString();
        let result7 = CryptoJS.AES.encrypt(req.body.input7,'bububaba').toString();
        let result8 = CryptoJS.AES.encrypt(req.body.input8,'bububaba').toString();
        let result9 = CryptoJS.AES.encrypt(req.body.input9,'bububaba').toString();
        let result10 = CryptoJS.AES.encrypt(req.body.input10,'bububaba').toString();
        let result11 = CryptoJS.AES.encrypt(req.body.input11,'bububaba').toString();
        let result12 = CryptoJS.AES.encrypt(req.body.input12,'bububaba').toString();
        let result13 = CryptoJS.AES.encrypt(req.body.input13,'bububaba').toString();

        await db.query(`insert into orderalice(order_type,order_1,order_2,order_3,order_4,order_5,order_6,order_7,order_8,order_9,order_10,order_11,order_12,order_13,re_date,user_ip) values('${req.body.order_type}','${result1}','${result2}','${result3}','${result4}','${result5}','${result6}','${result7}','${result8}','${result9}','${result10}','${result11}','${result12}','${result13}',CURDATE(),'${ip}')`)
        
        return res.send("bu")
    }catch(err){
        console.log("error on ordermvp")
        console.log(err)
        return res.send("error")
    }
})

router.post("/orderlist",async(req,res)=>{
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

        let data = await db.query(`select id,order_type,order_1,re_date from orderalice order by id desc limit 20;`)
        let data2 = await db.query('select id from orderalice')
        let returnArray = [];
        for(let i=0;i<data[0].length;i++){
            let temp  = CryptoJS.AES.decrypt(data[0][i].order_1, 'bububaba');
            let originalText = temp.toString(CryptoJS.enc.Utf8);
            returnArray[i] = {
                id:data[0][i].id,
                order_type:data[0][i].order_type,
                order_1:originalText,
                re_date:data[0][i].re_date,
            }
        }
        let datapackage = {
            Array:returnArray,
            length:data2[0].length
        }
        return res.send(datapackage)
    
    }catch(err){
        console.log("error on ordermvp")
        console.log(err)
        return res.send("error")
    }
})

router.post("/orderview",async(req,res)=>{
    try{
        jwt.verify(req.body.token,jwtConfig.key);
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_id":"')[1];
        temp = temp.split('","iat":')[0];
        if(temp!=="ssg") return res.send("error")

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

        let data = await db.query(`select id,order_type,order_1,order_2,order_3,order_4,order_5,order_6,order_7,order_8,order_9,order_10,order_11,order_12,order_13,re_date from orderalice where id=${req.body.id}`)
        let returnArray = [];
        let temp1  = CryptoJS.AES.decrypt(data[0][0].order_1, 'bububaba');
        let temp2  = CryptoJS.AES.decrypt(data[0][0].order_2, 'bububaba');
        let temp3  = CryptoJS.AES.decrypt(data[0][0].order_3, 'bububaba');
        let temp4  = CryptoJS.AES.decrypt(data[0][0].order_4, 'bububaba');
        let temp5  = CryptoJS.AES.decrypt(data[0][0].order_5, 'bububaba');
        let temp6  = CryptoJS.AES.decrypt(data[0][0].order_6, 'bububaba');
        let temp7  = CryptoJS.AES.decrypt(data[0][0].order_7, 'bububaba');
        let temp8  = CryptoJS.AES.decrypt(data[0][0].order_8, 'bububaba');
        let temp9  = CryptoJS.AES.decrypt(data[0][0].order_9, 'bububaba');
        let temp10  = CryptoJS.AES.decrypt(data[0][0].order_10, 'bububaba');
        let temp11  = CryptoJS.AES.decrypt(data[0][0].order_11, 'bububaba');
        let temp12  = CryptoJS.AES.decrypt(data[0][0].order_12, 'bububaba');
        let temp13  = CryptoJS.AES.decrypt(data[0][0].order_13, 'bububaba');

        let original1 = temp1.toString(CryptoJS.enc.Utf8);
        let original2 = temp2.toString(CryptoJS.enc.Utf8);
        let original3 = temp3.toString(CryptoJS.enc.Utf8);
        let original4 = temp4.toString(CryptoJS.enc.Utf8);
        let original5 = temp5.toString(CryptoJS.enc.Utf8);
        let original6 = temp6.toString(CryptoJS.enc.Utf8);
        let original7 = temp7.toString(CryptoJS.enc.Utf8);
        let original8 = temp8.toString(CryptoJS.enc.Utf8);
        let original9 = temp9.toString(CryptoJS.enc.Utf8);
        let original10 = temp10.toString(CryptoJS.enc.Utf8);
        let original11 = temp11.toString(CryptoJS.enc.Utf8);
        let original12 = temp12.toString(CryptoJS.enc.Utf8);
        let original13 = temp13.toString(CryptoJS.enc.Utf8);

        returnArray = {
            id:data[0][0].id,
            order_type:data[0][0].order_type,
            order_1:original1,
            order_2:original2,
            order_3:original3,
            order_4:original4,
            order_5:original5,
            order_6:original6,
            order_7:original7,
            order_8:original8,
            order_9:original9,
            order_10:original10,
            order_11:original11,
            order_12:original12,
            order_13:original13,
            re_date:data[0][0].re_date,
        }
        return res.send(returnArray)
    
    }catch(err){
        console.log("error on ordermvp")
        console.log(err)
        return res.send("error")
    }
})

router.post("/front",async(req,res)=>{
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
        let data = await db.query('select id,user_pk,re_title,re_date,re_content,re_view_cnt from reviews where re_visible=true order by id desc limit 4')        
        return res.send(data[0])
    }catch(err){
        console.log("error on front")
        console.log(err)
        return res.send("error")
    }
})

router.post("/inputbanner",upload.any(),async(req,res)=>{
    try{
        if(req.body.token===undefined) return res.send("error")
        jwt.verify(req.body.token,jwtConfig.key);
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
        await db.query(`insert into banner(banner_name,image_name,image_type,banner_visible) values('${req.files[0].originalname}','${req.files[0].originalname}','${req.files[0].mimetype}',true)`);
        return res.send("bbbu")
    }catch(err){
        console.log("error on inputbanner")
        console.log(err)
        return res.send("error")
    }
})

router.post("/bannerlist",upload.any(),async(req,res)=>{
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
        let result = await db.query(`select id,banner_name from banner where banner_visible=true order by id desc`);
        return res.send(result[0])
    }catch(err){
        console.log("error on bannerlist")
        console.log(err)
        return res.send("error")
    }
})

router.post("/removebanner",upload.any(),async(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.id===undefined||req.body.token===undefined) return res.send("error")
        jwt.verify(req.body.token,jwtConfig.key);
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
        let result = await db.query(`update banner set banner_visible='false' where id = '${req.body.id}'`);
        return res.send("bubu")
    }catch(err){
        console.log("error on removebanner")
        console.log(err)
        return res.send("error")
    }
})

router.post("/getbanner",upload.any(),async(req,res)=>{
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
        let result = await db.query(`select id,banner_name,image_type from banner where banner_visible=true order by id desc`);
        let array = [];
        for(let i=0;i<result[0].length;i++){
            array[i] = {
                name:result[0][i].banner_name,
                type:result[0][i].image_type
            }
        }
        let returnArray = []
        for(let i=0;i<array.length;i++){
            let read = fs.readFileSync(path.resolve(__dirname,"./uploads/"+array[i].name))
            let temp = read.toString("base64");
            returnArray[i]={
                image:temp,
                type:array[i].type
            }
        }
        console.log(array)
        return res.send(returnArray)
    }catch(err){
        console.log("error on banner")
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
// 	re_image varchar(50),
// 	re_image_type varchar(50),
// 	re_visible boolean,
// 	re_view_cnt bigint,
// 	user_ip varchar(100)
// );

// create table banner(
// 	id int primary key auto_increment,
// 	banner_name varchar(100),
// 	image_name varchar(100),
// 	image_type varchar(50),
// 	banner_visible boolean,
// );

// create table ordermvp(
// 	id int primary key auto_increment,
//     order_type varchar(100),
// 	order_1 varchar(100),
// 	order_2 varchar(100),
// 	order_3 varchar(100),
// 	order_4 varchar(100),
// 	order_5 varchar(100),
//     order_6 varchar(100),
//     order_7 varchar(100),
//     order_8 varchar(100),
//     order_9 varchar(100),
//     order_10 varchar(100),
//     order_11 varchar(100),
//     order_12 varchar(100),
// 	re_date datetime,
// 	user_ip varchar(100)
// );

// create table orderalice(
// 	id int primary key auto_increment,
// 	order_type varchar(100),
// 	order_1 varchar(100),
// 	order_2 varchar(100),
// 	order_3 varchar(100),
// 	order_4 varchar(100),
// 	order_5 varchar(100),
//     order_6 varchar(100),
//     order_7 varchar(100),
//     order_8 varchar(100),
//     order_9 varchar(100),
//     order_10 varchar(100),
//     order_11 varchar(100),
//     order_12 varchar(100),
//     order_13 varchar(100),
// 	re_date datetime,
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