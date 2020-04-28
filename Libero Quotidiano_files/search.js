$("button[name='button-search-header']").click(function() {
    event.preventDefault();
    search();
});

$("input[name='keyword-menu']").keypress(function(event){
  var key=event.keyCode || event.which;
    if (key==13){
      search();
    }
});

async function search() {
    var keyword = await $("input[name='keyword-menu']").val();

    //compose url to work with apache that goes to agi-services
    var search_url_header = window.location.protocol + '//' + window.location.hostname + '/search/?keyword=' + encodeURIComponent(keyword) + "&sortField=pubdate";
    window.location.href = search_url_header;
}

var sort = "";
var filtersClicked=false;
var filters = document.querySelectorAll('.sortField li');

for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function () {
        sort = this.getAttribute('data-value');
        filtersClicked=true;
        advancedSearch();
    });
}

$("button[name='button-search-page']").click(function() {
    event.preventDefault();
    advancedSearch();
});



async function advancedSearch() {
    var keyword = await $("input[name='keyword']").val();
    var sortField = "";
    var urlParams = new URLSearchParams(window.location.search);
    if (filtersClicked && typeof sort !== 'undefined'){
        sortField = sort;
    }else if (!filtersClicked && urlParams.has('sortField')){
        sortField = urlParams.get('sortField');
    }
    //compose url to work with apache that goes to agi-services
    var search_url = window.location.protocol + '//' + window.location.hostname + '/search/?keyword=' +
        encodeURIComponent(keyword) + (typeof sortField !== 'undefined' && sortField.length > 0 ?  '&sortField=' + sortField : '');
    window.location.href = search_url;
}
