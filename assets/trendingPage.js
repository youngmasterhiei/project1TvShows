$(document).ready(function(){
    
    var j = 1;
   
    callAPI();
    // var trendingArray = [];
    
    // var trendingQuery = "https://api.themoviedb.org/3/tv/top_rated?page=1&language=en-US&api_key=3b90c41cf16ced55f6bcaedd7b858cb5"; 

    $("#trendingBtn").on("click", function () { 
        j++;
        callAPI();
        console.log(j);
    })//on click
    $("#previousBtn").on("click", function () { 
        j--;
        callAPI();
        console.log(j);
    })//on click

    function callAPI (){ 
        if (j <= 1){
            $("#previousBtn").hide();
        }   
        else if(j >= 2){
            $("#previousBtn").show();
        }

        var trendingQuery = "https://api.themoviedb.org/3/tv/top_rated?page=" + j + "&language=en-US&api_key=3b90c41cf16ced55f6bcaedd7b858cb5";
    $.ajax({
        url: trendingQuery,
        method: "GET",
        success: function (response) {
            $("#displayTrendingTvShows").empty();
            for (var i = 0; i < 10; i++) {
                console.log(response);

                var image = $("<img>");
                var title = response.results[i].name;
                var description = response.results[i].overview; 
                image.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    image.addClass("imageStyle");

                var tvContainer = $("<div>");
                    tvContainer.append(image);
                    tvContainer.append("<h3>" + title + "</h3>");
                    tvContainer.append("<p>" + description+"</p>");
                $("#displayTrendingTvShows").append(tvContainer);
                tvContainer.addClass("trendingDiv"); 
            };//forloop        
        }//success function
    });//ajax
    };//callapi



});//document.ready