const fs = require('fs');

var outputFile = './files/library.txt';

var services = function(app) {
    app.post('/write-record', function(req, res) {
        var data = req.body.data;
    

        console.log(data);

        if(fs.existsSync(outputFile)) {
            data = "," + data;
        };

        fs.appendFile(outputFile, data, function(err) {
            if(err) {
                res.send(err);
            } else {
                res.send("SUCCESS");
            }
        })

    })

    app.get('/read-records', function(req, res) {
        fs.readFile(outputFile, "utf8", function (err, data) {
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                console.log(JSON.stringify(data));
                res.send(data);
            }
        });
    })
}

module.exports = services;