$(document).ready(function () {


var showItem ="";

    var email = "";
    var password = "";
    var credential = "";
    var auth = "";
    var currentUser = "";

    var watchlist = "";
    var dataReference = "";
    var config = {
        apiKey: "AIzaSyBF0-HGi0c3tguSJlJzuqIWqCo6pEhHqyI",
        authDomain: "tv-show-website.firebaseapp.com",
        databaseURL: "https://tv-show-website.firebaseio.com",
        projectId: "tv-show-website",
        storageBucket: "tv-show-website.appspot.com",
        messagingSenderId: "617203917896"
    };

    firebase.initializeApp(config);

    var ref = firebase.database().ref("users");
    $("#loginSubmit").on("click", function () {
        event.preventDefault();
        event.stopPropagation();

        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        var auth = firebase.auth();
        currentUser = auth.currentUser;

        if (!email || !password) {
            return console.log("email and pass are required");

        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("signIn error", error);

        });

    });

    $("#signUp").on("click", function () {
        event.preventDefault();
        event.stopPropagation();


        var email = $("#signUpEmail").val();
        var password = $("#signUpPassword").val();
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        var auth = firebase.auth();
        currentUser = auth.currentUser;
        if (!email || !password) {
            return console.log("email and password required");

        }


        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {


        })



            .catch(function (error) {
                console.log("register error", error);





            });




    });



    $("#signOut").on("click", function () {

        event.preventDefault();
        event.stopPropagation();

        firebase.auth().signOut();


    });
    firebase.auth().onAuthStateChanged(function (currentUser) {
        if (currentUser) {
            console.log(currentUser.uid);

            var userID = ref.child(currentUser.uid);
            dataReference = currentUser.uid;

            localStorage.setItem(currentUser.uid, dataReference);


            userID.update({
                email: currentUser.email,
                uid: currentUser.uid,
                watchlist: watchlist
            });

            userID.on("value", function(snapshot){
                var showItem = snapshot.val().showItem;
                $("#watchList").append("<li>" + snapshot.val().showItem + "</li>");
                
                });

        }
    });





    $(document).on("click", "#addToWatchList", function () {
        var watchListName = localStorage.getItem("title");


        var showItem = watchListName;
        var listItem = $("<li></li>");
        // listItem.append(showItem);
        // $("#watchList").append(listItem);


console.log(listItem);
        var userID = ref.child(dataReference);

        userID.update({
            showItem: showItem

        });

userID.on("value", function(snapshot){

// $("#watchList").append("<li>" + snapshot.val().showItem + "</li>");

});


    });

 


    // database.ref().on("value", function (snapshot) {
    //     // Change the HTML
    //     $("#playerOneStats").text(snapshot.val().statsP1);
    //     $("#playerTwoStats").text(snapshot.val().statsP2);

    //     buttonLockOn = snapshot.val().buttonLockOn;
    //     firstPlayerChosen = snapshot.val().firstPlayerChosen;
    //     firstPlayerTurn = snapshot.val().firstPlayerTurn;


    // database.ref("players/playerOne").on("value", function (snapshot) {
    //     players.playerOne.name = snapshot.val().name;
    //     players.playerOne.choice = snapshot.val().choice;

    //     $("#playerOneName").text(snapshot.val().name);
    //     $("#displayPlayerOneChoice").text(snapshot.val().choice);

    // });


});