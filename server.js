// default
const express = require("express");
const bodyParser = require("body-parser");
// const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
const port = process.env.port || 8001;

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));