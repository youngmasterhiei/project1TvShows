$(document).ready(function () {
    var show = [];
    var test = "";
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
                        test = title + " tv show";
                        var summary = $(this).attr("overview");

                        var mainContentDiv = $("<div>");

                        $(mainContentDiv).addClass("float");

                        $(mainContentDiv).append("Show: " + title + "<br>");
                        $(mainContentDiv).append(image);

                        $(mainContentDiv).append("Overview: " + summary);
                        $("#mainContent").append(mainContentDiv);
                        var altNav = $("<button id='mainDisplay'>Main</button>" + "<button id = 'discussion'>Discussion Board</button>" + "<button id = 'news'>News</button>" + "<button id = 'highlights'>Highlights</button>" + "<button id ='purchase'>Purchase</button>");
                        $("#altNavPosition").append(altNav);


                    });



                };

            }, error: function () {
                alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
            }
        });

    });

    $(document).on("click", "#highlights", function () {




        $("#mainContent").empty();

        var highlightVideos = {
            part: 'snippet',
            key: 'AIzaSyAfOEz01Vv4pWi9EtqUDb8Z5nlthL3mjA0',
            type: "video",
            q: test,
            maxResults: 5
        };
        url = 'https://www.googleapis.com/youtube/v3/search';

        $.getJSON(url, highlightVideos, function (response) {
            for (var i = 0; i < response.items.length; i++) {
                console.log(response);
                var videoIds = response.items[i].id.videoId;
                var frame = $("<iframe width='640' height='360' src='https://www.youtube.com/embed/" + videoIds + "' frameborder='0' allowfullscreen></iframe>");
                $("#mainContent").append(frame);
            }

            });





    });





});