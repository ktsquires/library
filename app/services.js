const fs = require('fs');

var outputFile = './app/files/library.txt';

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
        console.log("here");
        fs.readFile(outputFile, "utf8", function (err, data) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                data = "[" + data + "]";
                console.log(JSON.stringify(data));
                var parsedData = JSON.parse(data);
                console.log(parsedData);
                res.send(data);
            }
        });
    })

    app.delete('/delete-record', function(req, res) {
        var deleteID = req.body.deleteID;

        fs.readFile(outputFile, "utf8", function (err, data) {
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                var libraryData = JSON.parse(data);

                for(var i=0; i<libraryData.length; i++) {
                    if(libraryData[i].ID === deleteID) {
                        libraryData.splice(i,1);
                        break;
                    }
                }

                var updatedData = JSON.stringify(libraryData);
                var storeUpdatedData = updatedData.substring(1, updatedData.length-1);

                fs.writeFile(outputFile, storeUpdatedData, function(err) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send("SUCCESS");
                    }
                })
            }
        });
    })
}

module.exports = services;