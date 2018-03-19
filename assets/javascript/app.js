 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBF7M76nqwU8m_uQZxJ5pJmaMgCxFf_GAA",
    authDomain: "train-timer-f4922.firebaseapp.com",
    databaseURL: "https://train-timer-f4922.firebaseio.com",
    projectId: "train-timer-f4922",
    storageBucket: "train-timer-f4922.appspot.com",
    messagingSenderId: "769276536856"
  };
  firebase.initializeApp(config);

 

  var database = firebase.database();

  $("#addTrainBtn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = $("#time").val().trim();
    var trainFreq = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Train Successfully Added!");

    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
    
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){




    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1,"years");

    var timeNow = moment();    
    console.log("current time: " +moment(timeNow).format("HH:mm"));

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("time difference: "+diffTime);

    var timeRemainder = diffTime % trainFreq;
    console.log("time %: " +timeRemainder);

    var minUntilTrain = trainFreq - timeRemainder;
    console.log("min until next train: "+ minUntilTrain);

    var nextTrain = moment().add(minUntilTrain, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

$("#trainData").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
"</td><td>" + (moment(nextTrain).format("HH:mm")) + "</td><td>" + minUntilTrain +"</td><td><button type='button' class='btn btn-primary btn-sm delete'>delete</button></td></tr>");

// $(".delete").on("click", function() {
//     $(this).database.ref.val().remove();
// });

$(".delete").on("click", function() {        
    $(this).parent().prevAll().parent().remove();

     });

     $(".delete").on("click", function() {        
        $(this).database.ref().childSnapshot().remove();
    
        });

  });



  //add delete train button, refresh times every minute and delete when next time = zero, show alert "your train has arrived"