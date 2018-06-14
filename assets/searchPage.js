$(document).ready(function () {
    var show = [];
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
                    show[i] = {
                        title: response.results[i].name,
                        overview: response.results[i].overview,
                        poster: response.results[i].poster_path,

                    };

                    console.log(show);
                    var image = $("<img>");
                    var title = response.results[i].name;
                    image.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    image.addClass("imageStyle");
                    image.attr(show[i])
                    // var eachImageDiv = $("<button class='imageButton'><div></button>");

                    var eachImageDiv = $("<div>");
                    var imageDiv = $("<div>").addClass(" float");
                    eachImageDiv.append("Title: " + title);
                    eachImageDiv.append(image);

                    eachImageDiv.addClass("card float");
                    imageDiv.append(eachImageDiv);
                    $("#mainContent").append(eachImageDiv);



                    $(image).on("click", function () {
                        console.log(this);
                        $("#mainContent").empty();
                        var poster = $(this).attr("poster");
                        var image = $("<img>").addClass("resizeImage").attr("src", "https://image.tmdb.org/t/p/w500" + poster);
                        var title = $(this).attr("title");
                        var summary = $(this).attr("overview");
                        
                        var mainContentDiv = $("<div>");

                        $(mainContentDiv).addClass("float");

                        $(mainContentDiv).append("Show: " + title + "<br>");
                        $(mainContentDiv).append(image);

                        $(mainContentDiv).append("Overview: " + summary);
                        $("#mainContent").append(mainContentDiv);


                    });


                };

            }, error: function () {
                alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
            }
        });

    });



});