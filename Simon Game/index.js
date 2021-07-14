var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started=false;

$(document).keypress(function() {
  if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});



  $(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    $("#" + userChosenColor).fadeOut(100).fadeIn(100);
    animate(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });


/*--------------------------All Functions-------------------------*/

function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animate(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  if (level > 0) {
    $("h1").text("level " + level);
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animate(name) {
  $("#" + name).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}
}


function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}
