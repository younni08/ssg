let express = require('express');
let router = express.Router();
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'mapleonline.shop',
    user: 'aliceonline',
    password: 'tlstjdrbs123~',
    database: 'aliceonline',
    port: '3306',
  });

/* GET home page. */
router.get('/login', (req,res) => {
  
});

module.exports = router;
