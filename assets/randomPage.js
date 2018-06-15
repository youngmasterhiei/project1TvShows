$(document).ready(function () {
  var search = "";
  var show = "";
  var RandomTvShowQueryByGenre = "";

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


  for (i=0; i < 10; i++){
    debugger;
    var randomGenre = genres[Math.floor(Math.random() * genres.length)];
    console.log(randomGenre);

    search = randomGenre.id;
    RandomTvShowQueryByGenre = "http://api.themoviedb.org/3/discover/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&with_genres=" + search;

    callApi();
  }
 
function callApi(){


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
      // image.attr(show[i]);

      var eachImageDiv = $("<div>");
      var imageDiv = $("<div>").addClass(" float");
      eachImageDiv.append("Title: " + title);
      eachImageDiv.append(image);

      eachImageDiv.addClass("card float");
      imageDiv.append(eachImageDiv);

      $("#mainContent").append(eachImageDiv);


    
    }

  });

};

});