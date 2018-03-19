 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBF7M76nqwU8m_uQZxJ5pJmaMgCxFf_GAA",
    authDomain: "train-timer-f4922.firebaseapp.com",
    databaseURL: "https://train-timer-f4922.firebaseio.com",
    projectId: "train-timer-f4922",
    storageBucket: "",
    messagingSenderId: "769276536856"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainBtn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = moment($("#time").val().trim(), "HH:mm");
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

    console.log(childSnaphot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var timeNow = moment().format("HH:mm");

    console.log(timeNow);

    


  })