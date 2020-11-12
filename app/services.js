const fs = require('fs');

var outputFile = './files/library.txt';

var services = function(app) {
    app.post('/write-record', function(req, res) {
    
        var d = new Date();
        var ID = "lib" + d.getTime();
        
        var data = {
            ID: ID,
            bookTitle: req.body.bookTitle, 
            author: req.body.author, 
            publisher: req.body.publisher, 
            yearPublished: req.body.yearPublished, 
            isbn: req.body.isbn
        };

        data = JSON.stringify(data);

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