// Getting API URL for Searched Data
function getSearchUrl(search){
    var api="https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search+"&callback=JSON_CALLBACK";
    return api;
}
var page = 'https://en.wikipedia.org/?curid=';
//Getting data from API using JQuery
$(document).ready(function(){
  $("#sb").click(function(e){
    e.preventDefault();
    var searchedValue = $("#si").val();
    //var searchedValue = $("#si").attr("name");
    var api = getSearchUrl(searchedValue);
    //Getting Data with AJAX
    $.ajax({
        type: "GET",
        url: api,
        dataType: 'jsonp',
        success: function(data) {
            //Getting PageIds from API
            var pageid=Object.keys(data.query.pages);
            for(var i=0; i<pageid.length; i++){
                $("#display-result").append('<a href="'+page+pageid[i]+'" target="_blank"><div class="well e" style="border-radius:20px;"><h3 class="text-info">'+data.query.pages[pageid[i]].title+'</h3><p class="text-info" style="color:white !important;">'+data.query.pages[pageid[i]].extract+'</p></div></a>');
            }
        },
        error: function(errorMessage){
            alert("API DATA is not loading.");
        }
    });
    //Making the Display Result Div empty for 2nd search
    $("#display-result").empty();
  });
});