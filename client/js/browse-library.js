createMenu(2);  //Set up menu
retrieveData();  //Get inital load

function retrieveData() {
    //Retrieve the library data and populate on page load
    $.ajax({
        url: libraryURL + "/read-records",
        type:"get",
        success: function(response){
        // console.log(response);
        var data = JSON.parse(response);
        createLibraryTable(data);
        },
        error: function(err){
        alert(err);
        }
    });
}

function createLibraryTable(libraryData) {
    // console.log(libraryData);

    var tableHTML = "";
    for(var i=0; i<libraryData.length; i++) {
        tableHTML += "<tr>";
        tableHTML += "<td>" + libraryData[i].ID + "</td>";
        tableHTML += "<td>" + libraryData[i].bookTitle + "</td>";
        tableHTML += "<td>" + libraryData[i].author + "</td>";
        tableHTML += "<td>" + libraryData[i].publisher + "</td>";
        tableHTML += "<td>" + libraryData[i].yearPublished + "</td>";
        tableHTML += "<td>" + libraryData[i].isbn + "</td>";
        tableHTML += "<td>" 
                    +"<button class='btn btn-sm edit_btn delete-button' "
                    + "data-id='" + libraryData[i].ID 
                    + "'>DELETE</button>"
                    + "</td>";
        tableHTML += "</tr>";
    }

    $("#libraryTable").html(tableHTML);
    activateDelete();
    sortTable();
}

function activateDelete() {
    $('.delete-button').click(function() {
        var deleteID = this.getAttribute("data-id");
        
        $.ajax({
        url: libraryURL + "/delete-record",
        type:"delete",
        data: {deleteID: deleteID},
        success: function(response){
            if(response = "SUCCESS") {
                retrieveData();  //Repaint table
            } else {
                alert(response);
            }
        },
        error: function(err){
            alert(err);
        }
        });

    });
}

function sortTable() {
   $.extend($.tablesorter.themes.blue, {
    // change default jQuery uitheme icons - find the full list of icons at
    // http://jqueryui.com/themeroller/ (hover over them for their name)
    table        : 'ui-widget ui-widget-content ui-corner-all', // table classes
    caption      : 'ui-widget-content',
    // header class names
    header       : 'ui-widget-header ui-corner-all ui-state-default', // header classes
    sortNone     : '',
    sortAsc      : '',
    sortDesc     : '',
    active       : 'ui-state-active', // applied when column is sorted
    hover        : 'ui-state-hover',  // hover class
    // icon class names
    icons        : 'ui-icon', // icon class added to the <i> in the header
    iconSortNone : 'ui-icon-carat-2-n-s ui-icon-caret-2-n-s', // class name added to icon when column is not sorted
    iconSortAsc  : 'ui-icon-carat-1-n ui-icon-caret-1-n', // class name added to icon when column has ascending sort
    iconSortDesc : 'ui-icon-carat-1-s ui-icon-caret-1-s', // class name added to icon when column has descending sort
    filterRow    : '',
    footerRow    : '',
    footerCells  : '',
    even         : 'ui-widget-content', // even row zebra striping
    odd          : 'ui-state-default'   // odd row zebra striping
  });

  $("#libraryTableContainer").tablesorter({
      theme:'blue',
      headerTemplate : '{content} {icon}', // needed to add icon for jui theme

      // widget code now contained in the jquery.tablesorter.widgets.js file
      widgets : ['uitheme', 'zebra'],
  
      widgetOptions : {
        // zebra striping class names - the uitheme widget adds the class names defined in
        // $.tablesorter.themes to the zebra widget class names
        zebra   : ["even", "odd"]
      }
    });
   
}
