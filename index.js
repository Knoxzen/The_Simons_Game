
var buttoncolor = ["red", "blue", "green", "yellow"];
var userpattern = [];
var gamepattern = [];
var highscore = 0;
var gamelevel = 0;
var start = false;

// Function to start the game by keypress
$(document).keypress(function () {
  if (!start) {
    $("#title").text("Level " + gamelevel);
    nextsequence();
    start = true;
  }
});

// Function to perform button clicks
$(".butn").click(function () {
  var usercolor = $(this).attr("id");
  userpattern.push(usercolor);
  buttonpressed(usercolor);
  answercheck(userpattern.length - 1);
  soundplay(usercolor);
});

// Fubction to check the animation
function answercheck(nowlevel) {
  if (gamepattern[nowlevel] === userpattern[nowlevel]) {
    if (userpattern.length === gamepattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    $("#title").text("Gameover");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startover();
    soundplay("wrong");
  }
}

//Function to create the next color and play the animation
function nextsequence() {
  userpattern = [];
  gamelevel++;
  $("#title").text("Level " + gamelevel);
  var arrayValue = Math.floor(Math.random() * 4);
  var randomcolor = buttoncolor[arrayValue];
  gamepattern.push(randomcolor);

  $("#" + randomcolor)
    .removeClass(randomcolor)
    .addClass(randomcolor + "glow");
  setTimeout(function () {
    $("#" + randomcolor)
      .removeClass(randomcolor + "glow")
      .addClass(randomcolor);
  }, 200);
}

// Function for button press animation
function buttonpressed(color) {
  $("#" + color)
    .removeClass(color)
    .addClass(color + "glow");
  setTimeout(function () {
    $("#" + color)
      .removeClass(color + "glow")
      .addClass(color);
  }, 150);
}

function soundplay(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Reset's the game
function startover() {
  if (highscore < gamelevel) {
    highscore = gamelevel;
  } else {
    highscore = highscore;
  }
  $("#highscore").text("Highscore " + highscore);
  start = false;
  gamepattern = [];
  gamelevel = 0;
}

//music controls

function togglePlay() {
  var myAudio = document.getElementById("myAudio");
  return myAudio.paused ? myAudio.play() : myAudio.pause();
}

const button = document.querySelector("input");
button.addEventListener("click", updateButton);
function updateButton() {
  if (button.value === "music") {
    button.value = "muted";
  } else {
    button.value = "music";
  }
}
