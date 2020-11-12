
//Create a listener that waits for user to enter submit button
function activateSubmitButton() {

//Submit Library books
    $('#data-submit').click(function() {
      var bookTitle = $('#bookTitle').val();
      var author = $('#author').val();
      var publisher = $('#publisher').val();
      var yearPublished = $('#yearPublished').val();
      var isbn = $('#isbn').val();
      var d = new Date();
      var ID = "lib" + d.getTime();

      var jsonString = JSON.stringify({ID: ID, bookTitle: bookTitle, author: author, publisher: publisher, yearPublished: yearPublished, isbn:isbn});
      
      $.ajax({
        url: "http://localhost:3000/write-record",
        type:"post",
        data: {data:jsonString},
        success: function(response){
          alert(response);
        },
        error: function(err){
          alert(err);
        }
      });

    });

}

//============================================================================================================
//============================================================================================================

//Retrieve the library data and populate on page load
function getLibraryData() {
  $.ajax({
    url: "http://localhost:3000/read-records",
    type:"get",
    success: function(response){
      console.log(response);
      var data = jQuery.parseJSON(response);
      createLibraryTable(data);
    },
    error: function(err){
      alert(err);
    }
  });
}

function createLibraryTable(libraryData) {
  

  console.log(libraryData);
  var tableHTML = "";
  for(var i=0; i<libraryData.length; i++) {
    tableHTML += "<tr>";
      tableHTML += "<td class='text-center'>" + libraryData[i].ID + "</td>";
      tableHTML += "<td class='text-left'>" + libraryData[i].bookTitle + "</td>";
      tableHTML += "<td class='text-left'>" + libraryData[i].author + "</td>";
      tableHTML += "<td class='text-left'>" + libraryData[i].publisher + "</td>";
      tableHTML += "<td class='text-center'>" + libraryData[i].yearPublished + "</td>";
      tableHTML += "<td class='text-center'>" + libraryData[i].isbn + "</td>";
    tableHTML += "</tr>";
  }

  $("#libraryTable").html(tableHTML);
}