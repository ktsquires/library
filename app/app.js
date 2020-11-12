const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname + "/../client")));

//Page listeners
var router = require("./router.js");
router(app);


//Service listeners
var services = require("./services.js");
services(app);

app.listen(3000);

console.log('server is running...');