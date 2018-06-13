$(document).ready(function () {


    $("#tvShowSearchSubmit").on("click", function () {

        event.preventDefault();
        var tvShow = $("#tvShowSearchInput").val().trim();
        var tvShowQuery = "https://api.themoviedb.org/4/search/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&query=" + tvShow;
        $("#tvShowSearchInput").val("");

        $.ajax({
            url: tvShowQuery,
            method: "GET",
            success: function (response) {
                $("#mainContent").empty();
                for (var i = 0; i < response.results.length; i++) {

                    console.log(response);
                    var image = $("<img>");
                    var title = response.results[i].name;
                    image.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    image.addClass("imageStyle");

                    var eachImageDiv = $("<div>");
                    var imageDiv = $("<div>").addClass(" float");
                    eachImageDiv.append("Title: " + title);
                    eachImageDiv.append(image);
                   
                    eachImageDiv.addClass("card float");
                    imageDiv.append(eachImageDiv);
                    imageDiv.addClass("float");
                    $("#mainContent").append(eachImageDiv);

                };

            }, error: function () {
                alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
            }
        });

    });



});