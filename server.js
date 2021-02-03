// default
const express = require("express");
const bodyParser = require("body-parser");
// const fs = require("fs");

const app = express();
const port = process.env.port || 8001;

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// Import Routes
const api = require("./api.js");

app.use("./api.js", api);

app.listen(port, () => console.log(`Listening on port ${port}`));