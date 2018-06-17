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


var ref = firebase.database().ref("data-modeling");
var loginsRef = ref.child("userWriteable/loginQueue");
var accountsRef = ref.child("userReadable/accounts");

var userWatchList = [];


function addShow(){
    var showItem = $("#addToWatchList").val();
    var listItem = $("<li></li>");
    listItem.append(showItem);
    $("#watchList").append(listItem);
}

function removeShow(){
    $("#watchList").remove(this.listItem);
    
}



    $("#loginSubmit").on("click", function () {
        event.preventDefault();
        event.stopPropagation();
    
        var email = $("#email").val();
        var password = $("#password").val();
        var username = $("username").val();
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        var auth = firebase.auth();
        var currentUser = auth.currentUser;
        var messagesRef = ref.child("userWriteable/messageQueue");


        $("#password").val("");
        $("#username").val("");
        console.log(email + password);
  
        firebase.auth().signInWithEmailAndPassword(email, password)
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
    var email = $("#username").val();

    var password = $("#password").val();

    $("#password").val("");
    $("#username").val("");
    firebase.auth().createUserWithEmailAndPassword(email, password)
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



loginsRef.on("child_added", function (snapshot){
    console.log("login queue received", snapshot.val());
    var user = snapshot.val();
    var userRef = snapshot.val();
    
    user.lastLogin = Date.now();
    
    accountsRef.child(user.uid).update(user)
    .then(function (){
        return userRef.remove();
    });
    
    
    
    });


firebase.auth().onAuthStateChanged(function(user){


    user = user;
    if (user) {
        var loginQueueRef = firebase.database().ref('/data-modeling/userWriteable/loginQueue');
        var userLoginRef = loginQueueRef.child(user.uid);
        console.log(userLoginRef.toString(), user);
        userLoginRef.set({
            email: user.email,
            uid: user.uid,
            
        })
        .catch(function (event){
            console.log("login error", event)
        });
    }
})

function watchList (){
    if(!user) return console.log("not logged in");


var messageQueueRef = firebase.database().ref("/data-modeling/userWriteable/messageQueue");
userMessageRef = messageQueueRef.child(user.uid);
userMessageRef.set({
    email: user.email,
    messageText: messageText
});
};


messagesRef.on("child_added", function (snapshot){
    var messagesRef = snapshot.ref;
    var uid = snapshot.key;
    var message = snapshot.val();
    var usermessages = ref.child("userReadable/messages").child(uid);

    message.timestamp = Date.now();
    userMessages.push(message)
    .then(function (){
        return messagesRef.remove();
    })
})

});