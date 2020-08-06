buttonColors = ["red", "blue", "green", "yellow"];

var level=0;
var oneTime=false;
var i=0;



var gamePattern = [];
var userClickedPattern = [];


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);


  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  makeSound(randomColor);

}




$(document).keydown(function(){




  if (!oneTime)
  {
    $("h1").text("level "+ level);
    nextSequence();

  oneTime=true;
}

});


$("body").click(function(){

  if (!oneTime)
  {
    $("h1").text("level "+ level);
    nextSequence();

  oneTime=true;
}



});



$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



function makeSound(a) {
  var audio = new Audio("sounds/" + a + ".mp3");
  audio.play();
}

function animatePress(currColor) {
  $("." + currColor).addClass("pressed")


  setTimeout(function() {
    $("." + currColor).removeClass("pressed");
  }, 100);

}


function checkAnswer(currLevel)
{
  if (userClickedPattern[currLevel]===gamePattern[currLevel])
  {

  console.log(true);
  if (userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function() {

      nextSequence();
    }, 1000);

  }
}

  else
  {
  console.log(false);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();


  $("body").addClass("game-over")


  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);


  $("h1").text("Game Over, Press Any Key To Restart")

  startAgain();

}
}


function startAgain()
{
  level=0;
  oneTime=false;
  gamePattern=[];
}
