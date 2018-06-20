$(document).ready(function () {

    var show = [];
    var collection = [];
    var test = "";
    var j = 1;

    var genreSearchTerm = "";
    $("#trendingBtn").on("click", function () {
        $("#mainContent").empty();

        j++;
        callAPI();
        console.log(j);
    })//on click
    $("#previousBtn").on("click", function () {
        $("#mainContent").empty();

        j--;
        callAPI();
        console.log(j);
    });//on click
    
    $(".genreChoice").on("click", function () {
        event.preventDefault();
        $("#mainContent").empty();
         genreSearchTerm = $(this).val();
        callAPI();
    });
        function callAPI() {
            if (j <= 1) {
                $("#previousBtn").hide();
            }
            else if (j >= 2) {
                $("#previousBtn").show();
            }
    
            var tvShowQueryByGenre = "http://api.themoviedb.org/3/discover/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&page=" + j + "&sort_by=popularity.desc&with_genres=" + genreSearchTerm;

        $.ajax({
            url: tvShowQueryByGenre,
            method: "GET",
            success: function (response) {

                console.log(response);

                for (var i = 0; i < response.results.length; i++) {

                    show[i] = {
                        title: response.results[i].name,
                        overview: response.results[i].overview,
                        poster: response.results[i].poster_path,
                    };


                    var image = $("<img>");
                    var title = response.results[i].name;
                    var description = response.results[i].overview;
                    image.attr("src", "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path);
                    image.addClass("imageStyle");
                    image.attr(show[i])

                    var collapseDiv = $("<div class='row hideShow'></div>");
                    var descriptionDiv = $("<div class='card card-body'><p>" + description + "</p></div>");
                    var tvDescriptionButton = $("  <button class='btn btn-primary slideToggle' type='button' >Show Description</button>");



                    var eachImageDiv = $("<div>");
                    var titleDiv = $("<h3>"+title+"</h3>");
                    titleDiv.addClass("titleStyle");
                    eachImageDiv.append(titleDiv);
                    eachImageDiv.append(image);
                    // eachImageDiv.append("<p>" + description + "</p>");
                    collapseDiv.append(descriptionDiv);
                    eachImageDiv.append(tvDescriptionButton);
                    eachImageDiv.append(collapseDiv);
                    
                    $(collapseDiv).hide();


                    $("#mainContent").append(eachImageDiv);
                    eachImageDiv.addClass("genreDiv");

                    $(image).on("click", function () {
                        $("#previousBtn").hide();
                        $("#trendingBtn").hide();
                        console.log(this);
                        $("#mainContent").empty();
                        $("#altNavPosition").empty();

                        var poster = $(this).attr("poster");
                        var image = $("<img>").addClass("resizeImage").attr("src", "https://image.tmdb.org/t/p/w500" + poster);
                        var title = $(this).attr("title");
                        var summary = $(this).attr("overview");


                        test = title + " tv show";
                        var watchListName = title;

                        localStorage.setItem("title", watchListName);
                       
                        var addToWatchListButton = $("<button id='addToWatchList'>Add to Watchlist</button>");

                        var mainContentDivG = $("<div>");
                        var titleDiv = $("<h3>"+title+"</h3>");
                        titleDiv.addClass("titleStyle");
                        mainContentDivG.append(titleDiv);
                        mainContentDivG.append(image);
                        mainContentDivG.append("<p>" + summary + "</p>");
                        mainContentDivG.addClass("genreDivClick");
                        $("#mainContent").append(mainContentDivG);

                        var altNav = $("<button id='mainDisplay'>Main</button>" + "<button id = 'discussion'>Discussion Board</button>" + "<button id = 'news'>News</button>" + "<button id = 'highlights'>Highlights</button>" + "<button id ='purchase'>Purchase</button>");
                        $("#mainContent").append(addToWatchListButton);

                        $("#altNavPosition").append(altNav);

                        $(document).on("click", "#mainDisplay", function () {


                            $("#mainContent").empty();
                            $("#altNavPosition").empty();


                            $("#mainContent").append(mainContentDivG);
                            $("#mainContent").append(addToWatchListButton);

                            $("#altNavPosition").append(altNav);
                            
                        });
                    });


                };
             

            }, error: function () {
                $("#mainContent").html("<strong>Were going to give it to you straight, something went wrong with the api, were not sure what, but i promise a TMDB programmer is working hard to figure it out, please try again later.</strong>").addClass("text-danger");
            }
        });

    };
    
    $(document).on("click", ".slideToggle", function () {

        $(this).parent().find(".hideShow").slideToggle("slow", function () {

        });
    });
    $(document).on("click", "#highlights", function () {




        $("#mainContent").empty();

        var highlightVideos = {
            part: 'snippet',
            key: 'AIzaSyAfOEz01Vv4pWi9EtqUDb8Z5nlthL3mjA0',
            type: "video",
            q: test,
            maxResults: 10
        };
        url = 'https://www.googleapis.com/youtube/v3/search';

        $.getJSON(url, highlightVideos, function (response) {
            for (var i = 0; i < response.items.length; i++) {
                console.log(response);
                var videoIds = response.items[i].id.videoId;
                var frame = $("<iframe width='355' height='200' src='https://www.youtube.com/embed/" + videoIds + "' frameborder='0' allowfullscreen></iframe>");
                $("#mainContent").append(frame);
            }

        });





    });
    $(document).on("click", "#news", function () {



        event.preventDefault();
        $("#mainContent").empty();


        var tvShowNewsQuery = "https://newsapi.org/v2/everything?q=" + test + "&sources=bbc-news,entertainment-weekly,buzzfeed,google-news,the-huffington,the-verge,wired-post&apiKey=7d5dfd55160e485e8d9ec889b85e0bef ";

        $.ajax({
            url: tvShowNewsQuery,
            method: "GET",
            success: function (response) {
                console.log(response);
                for (var i = 0; i < 7; i++) {

                    if(response.totalResults === 0){
                        $("#mainContent").html("There are currently no News Articles for the " + test + " please try again later or use google. " + "<h5 class='text-danger'>This message will self destruct in 5 seconds.</h5> ");

                    }
                    else {

                   
                    var articleTitle = response.articles[i].title;
                    var articleDescription = response.articles[i].description;
                    var articleUrl = response.articles[i].url;
                    var mainContentDiv = $("<div>");
                    var articleListItem = $("<li>");
                    var link = $("<a href = '" + articleUrl + "' target = 'blank'>Read More</a><br><br>");
                    $(mainContentDiv).append(" <li><strong>Title: </strong>" + "<u>" + articleTitle + "</u>" + "<br></li>");
                    $(mainContentDiv).append(articleDescription + "<br>");

                    $(mainContentDiv).append(link);
                    // $(articleListItem).append(mainContentDiv);
                    $("#mainContent").append(mainContentDiv);
                    }

                }
            }, error: function () {
                $("#mainContent").html("<strong>Were going to give it to you straight, something went wrong with the api, were not sure what, but i promise a NewsAPI programmer is working hard to figure it out, please try again later.</strong>").addClass("text-danger");
            }
        });
    });

    $(document).on("click", "#purchase", function () {
        $("#mainContent").empty();

        var tvShowQueryForId = "https://itunes.apple.com/search?term=" + test + "&media=tvShow&entity=tvSeason";


        $.ajax({
            url: tvShowQueryForId,
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var tvShowAppleId = response.results[0].artistId;
                var tvShowPurchaseQuery = "https://itunes.apple.com/lookup?id=" + tvShowAppleId + "&sort=recent&media=tvShow&entity=tvSeason";

                $.ajax({
                    url: tvShowPurchaseQuery,
                    method: "GET",
                    dataType: "json",
                    success: function (response) {
                        //    var purchaseData =  JSON.parse(response);

                        console.log(response);
                        for (i = 1; i < response.results.length; i++) {

                            collection[i] = {
                                collectionName: response.results[i].collectionName,
                                collectionCost: response.results[i].collectionPrice,
                                collectionImage: response.results[i].artworkUrl100,
                                collectionViewUrl: response.results[i].collectionViewUrl
                            };

                            var artistId = response.results[i].artistId;
                            var collectionCost = response.results[i].collectionPrice;
                            var collectionImage = response.results[i].artworkUrl100;
                            var collectionName = response.results[i].collectionName;
                            var collectionViewUrl = response.results[i].collectionViewUrl;
                            var image = $("<img>").attr("src", collectionImage);

                            image.attr(collection[i]);
                            var collectionLink = $("<a href='" + collectionViewUrl + "' target = 'blank'> View all episodes</a>");
                            var mainContentDiv = $("<div>");
                            var eachSeasonDiv = $("<div>");
                            eachSeasonDiv.append(image);
                            eachSeasonDiv.append(collectionName);
                            
                            eachSeasonDiv.append(collectionLink);
                            eachSeasonDiv.append(" $" + collectionCost);

                            console.log(collection);
                            $("#mainContent").prepend(eachSeasonDiv);
                        }
                    }
                });
            }
        });
    });


});