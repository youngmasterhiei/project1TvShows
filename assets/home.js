$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyBF0-HGi0c3tguSJlJzuqIWqCo6pEhHqyI",
        authDomain: "tv-show-website.firebaseapp.com",
        databaseURL: "https://tv-show-website.firebaseio.com",
        projectId: "tv-show-website",
        storageBucket: "tv-show-website.appspot.com",
        messagingSenderId: "617203917896"
    };

firebase.initializeApp(config);


function addShow(){
    var showItem = $("#addToWatchList").val();
    var listItem = $("<li></li>");
    listItem.append(showItem);
    $("#watchList").append(listItem);
}

function removeShow(){
    $("#watchList").remove(this.listItem)
}



    $("#loginSubmit").on("click", function () {
        event.preventDefault();
        event.stopPropagation();
    
        var username = $("#username").val();
        var password = $("#password").val();
        var credential = firebase.auth.EmailAuthProvider.credential(username, password);
        var auth = firebase.auth();
        var currentUser = auth.currentUser;

        $("#password").val("");
        $("#username").val("");
        console.log(username + password);
  
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(firebaseUser) {
            $("#displayLoginStatus").html(username + "has logged in");

        })
        .catch(function(error) {
            $("#displayLoginStatus").html("email and password are required");

        });
    
    });


$("#addUser").on("click", function(){
    event.preventDefault();
    event.stopPropagation();


    var username = $("#username").val();
    var password = $("#password").val();

    $("#password").val("");
    $("#username").val("");
    firebase.auth().createUserWithEmailAndPassword(username, password)
    .then(function(firebaseUser) {
        $("#displayLoginStatus").html(username + "was created");

    })
    .catch(function(error) {
        $("#displayLoginStatus").html("email and password are required");
    });

    


});



$("#signOut").on("click", function(){
    
    firebase.auth().signOut()
    .then(function(firebaseUser) {
        $("#displayLoginStatus").html(username + " has signed out");

    })
    .catch(function (err) {
        $("#displayLoginStatus").html("Uhhh... this is weird. Something went wrong, please try to signout again...?");
    });



});

$("#guestLogin").on("click", function(){
    firebase.auth().signInAnonymously()
    .then(function(firebaseUser) {
        $("#displayLoginStatus").html("You are now signed in as guest");

    })
    .catch(function(error) {
        $("#displayLoginStatus").html("Something went wrong, please try again.");

    });



});













});