let express = require('express');
let router = express.Router();
const mysql = require('mysql2');
const bcrypt = require("bcryptjs");
const btoa = require('btoa');
let atob = require("atob");
const CryptoJS = require("crypto-js");

// const connection = mysql.createConnection({
//     host: 'aliceonline.shop',
//     user: 'aliceonline',
//     password: 'tlstjdrbs123~',
//     database: 'aliceonline',
//     port: '3306',
//   });

// /* GET home page. */
router.post('/', (req,res) => {
//   리뷰 로딩해줘야함
});

router.post('/register',async(req,res) => {
    console.log(req.body)
    res.send("hhh")
})

module.exports = router;

// ############ users ############
// create table users(
// 	id int primary key,
// 	pk varchar(100),
// 	user_id varchar(100),
// 	user_pk varchar(100),
// 	user_email varchar(100),
// 	user_register varchar(100),
// 	user_last_login datetime,
// 	user_agree1 boolean,
// 	user_agree2 boolean,
// 	user_login_cnt int(100),
// 	user_review_history varchar(1000),
// 	user_ip INT UNSIGNED
// );

// create table review(
// 	id int primary key,
// 	pk varchar(1000),
// 	user_pk varchar(100),
// 	re_title varchar(100),
// 	re_content varchar(100),
// 	re_date datetime,
// 	re_image varchar(10000),
// 	re_visible boolean,
// 	re_view_cnt bigint,
// 	user_ip INT UNSIGNED
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