$(document).ready(function () {
  var search = "";
  var show = [];
  var RandomTvShowQueryByGenre = "";
  var collection = [];
  var test = "";

  var genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


  for (i = 0; i < 10; i++) {
    var randomGenre = genres[Math.floor(Math.random() * genres.length)];
    console.log(randomGenre);

    search = randomGenre.id;
    RandomTvShowQueryByGenre = "http://api.themoviedb.org/3/discover/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&with_genres=" + search;

    callApi();
  }

  function callApi() {


    $.ajax({
      url: RandomTvShowQueryByGenre,
      method: "GET",


      success: function (response) {

        console.log(response);
        var randomResponse = response.results[Math.floor(Math.random() * response.results.length)];
        console.log(randomResponse);

        show[i] = {
          title: randomResponse.name,
          overview: randomResponse.overview,
          poster: randomResponse.poster_path,

        };
        var image = $("<img>");
        var title = randomResponse.name;
        image.attr("src", "https://image.tmdb.org/t/p/w500" + randomResponse.poster_path);
        image.addClass("imageStyle");
        image.attr(show[i]);

        // image.attr(show[i]);

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

          var watchListName = title;


          localStorage.setItem("title", watchListName);
          var summary = $(this).attr("overview");
          var addToWatchListButton = $("<button id='addToWatchList'>Add to Watchlist</button>");

          var mainContentDiv = $("<div>");

          $(mainContentDiv).addClass("float");

          $(mainContentDiv).append("Show: " + title + "<br>");
          $(mainContentDiv).append(image);

          $(mainContentDiv).append("Overview: " + summary);
          $("#mainContent").append(mainContentDiv);
          var altNav = $("<button id='mainDisplay'>Main</button>" + "<button id = 'discussion'>Discussion Board</button>" + "<button id = 'news'>News</button>" + "<button id = 'highlights'>Highlights</button>" + "<button id ='purchase'>Purchase</button>");
          $("#mainContent").append(addToWatchListButton);

          $("#altNavPosition").append(altNav);

          $(document).on("click", "#mainDisplay", function () {


            $("#mainContent").empty();
            $("#altNavPosition").empty();


            $(mainContentDiv).append("Show: " + title + "<br>");
            $(mainContentDiv).append(image);

            $("#mainContent").append(mainContentDiv);
            $("#altNavPosition").append(altNav);
          });
        });

      }, error: function () {
        alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
    }

    });

  };
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


    var tvShowNewsQuery = "https://newsapi.org/v2/everything?q=" + test + "&sources=bbc-news,the-huffington-post&apiKey=7d5dfd55160e485e8d9ec889b85e0bef ";

    $.ajax({
        url: tvShowNewsQuery,
        method: "GET",
        success: function (response) {
            console.log(response);
            for (var i = 0; i < 7; i++) {

                var articleTitle = response.articles[i].title;
                var articleDescription = response.articles[i].description;
                var articleUrl = response.articles[i].url;
                var mainContentDiv = $("<div>");
                var link = $("<a href = '" + articleUrl + "' target = 'blank'>Read More</a>");
                $(mainContentDiv).append("Title: " + articleTitle + "<br>");
                $(mainContentDiv).append(articleDescription);

                $(mainContentDiv).append(link);
                $("#mainContent").append(mainContentDiv);


            }
        }, error: function () {
            alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
        }
    });
});

$(document).on("click", "#purchase", function(){
    $("#mainContent").empty();

var tvShowPurchaseQuery = "https://itunes.apple.com/search?term=" + test + "&media=tvShow&entity=tvSeason";


    $.ajax({
        url: tvShowPurchaseQuery,
        method: "GET",
        dataType: "json",
        success: function (response) {
        //    var purchaseData =  JSON.parse(response);
       
            console.log(response);
            for(i=0; i<response.results.length; i++){

                collection[i] = {
                    collectionName: response.results[i].collectionName,
                    collectionCost:  response.results[i].collectionPrice,
                    collectionImage: response.results[i].artworkUrl100,
                    

                };

            var artistId = response.results[i].artistId;
            var collectionCost = response.results[i].collectionPrice;
            var collectionImage = response.results[i].artworkUrl100;
            var collectionName = response.results[i].collectionName;
            var image = $("<img>").attr("src", collectionImage);
            
            image.attr(collection[i]);

            var track = response.results[i].trackViewUrl;
            var mainContentDiv = $("<div>");
            var eachSeasonDiv = $("<div>");
            eachSeasonDiv.append(collectionName);
            eachSeasonDiv.append(image);
            eachSeasonDiv.append("$" + collectionCost);
           
            collection.sort();
            console.log(collection);
            $("#mainContent").append(eachSeasonDiv);
            // $("#mainContent").filter();
            }


        
        }
});
});




});