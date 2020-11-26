createMenu(1);

//Create a listener that waits for user to enter submit button
    //Submit Library books
    $('#data-submit').click(function() {
        var bookTitle = $('#bookTitle').val();
        var author = $('#author').val();
        var publisher = $('#publisher').val();
        var yearPublished = $('#yearPublished').val();
        var isbn = $('#isbn').val();

        var jsonString = {bookTitle: bookTitle, author: author, publisher: publisher, yearPublished: yearPublished, isbn:isbn};
        
        $.ajax({
        url: libraryURL + "/write-record",
        type:"post",
        data: jsonString,
        success: function(response){
            var test1 = "";
            alert(response);
        },
        error: function(err){
            var test2 = "";
            alert(err);
        }
        });

    });
    
