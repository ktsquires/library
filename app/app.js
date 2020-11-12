const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname + "/../client")));

//make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 3000;

//Page listeners
var router = require("./router.js");
router(app);


//Service listeners
var services = require("./services.js");
services(app);

//listen
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);
});