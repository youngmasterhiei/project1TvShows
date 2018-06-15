$(document).ready(function () {

    var show = [];

    $(".genreChoice").on("click", function () {
        event.preventDefault();
        $("#mainContent").empty();


        var genreSearchTerm = $(this).val();
        var tvShowQueryByGenre = "http://api.themoviedb.org/3/discover/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&sort_by=popularity.desc&with_genres=" + genreSearchTerm;
        console.log(genreSearchTerm);

        $.ajax({
            url: tvShowQueryByGenre,
            method: "GET",
            success: function (response) {

                console.log(response);

                for (var i = 0; i < response.results.length; i++) {

                    console.log(response);
                    show[i] = {
                        title: response.results[i].name,
                        overview: response.results[i].overview,
                        poster: response.results[i].poster_path,

                    };

                    
                    var image = $("<img>");
                    var title = response.results[i].name;
                    image.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    image.addClass("imageStyle");
                    image.attr(show[i])

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
                        $("#altNavPosition").empty();

                        var poster = $(this).attr("poster");
                        var image = $("<img>").addClass("resizeImage").attr("src", "https://image.tmdb.org/t/p/w500" + poster);
                        var title = $(this).attr("title");
                         test = title + " tv show";
                        var summary = $(this).attr("overview");

                        var mainContentDiv = $("<div>");

                        $(mainContentDiv).addClass("float");

                        $(mainContentDiv).append("Show: " + title + "<br>");
                        $(mainContentDiv).append(image);

                        $(mainContentDiv).append("Overview: " + summary);
                        $("#mainContent").append(mainContentDiv);
                        var altNav = $("<button id='mainDisplay'>Main</button>" + "<button id = 'discussion'>Discussion Board</button>" + "<button id = 'news'>News</button>" + "<button id = 'highlights'>Highlights</button>" + "<button id ='purchase'>Purchase</button>");

                        $("#altNavPosition").append(altNav );

                        $(document).on("click", "#mainDisplay", function () {


                            $("#mainContent").empty();
                            $("#altNavPosition").empty();


                            $(mainContentDiv).append("Show: " + title + "<br>");
                            $(mainContentDiv).append(image);

                            $("#mainContent").append(mainContentDiv);
                            $("#altNavPosition").append(altNav);
                        });
                    });


                };
            }, error: function () {
            alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
        }
        });


    });




});