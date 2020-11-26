var pages = [
    {pageName: "HOME", pageTarget: "library.html"},
    {pageName: "ADD RECORD", pageTarget: "write-library.html"},
    {pageName: "BROWSE LIBRARY", pageTarget: "browse-library.html"}
];

function createMenu(pageNumber){
    var pageActive = [];
    for(var i=0; i<pages.length; i++){
        pageActive[i] = false;
    }

    pageActive[pageNumber] = true;

    var selectedPageFormat = [
        "class = 'page-selected'",
        "class = 'router-link'"
    ];

    var menuItemFormat = [];
    for(var i=0; i<pages.length; i++) {
        menuItemFormat[i] = (pageActive[i]) ? selectedPageFormat[0] : selectedPageFormat[1];
    }

    var menuHTML = ""
    for(var i=0; i<pages.length; i++) {
        menuHTML += "<div class = 'router-link-container'>"
        menuHTML += "<a href='/client/" 
                        + pages[i].pageTarget + "' "
                        + menuItemFormat[i] + ">" 
                        + pages[i].pageName
                        + "</a>"
        menuHTML += "</div>"
    }

    $('#menu-items').html(menuHTML);

    
    
}
