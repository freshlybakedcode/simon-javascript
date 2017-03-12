$(function() {
  $('.button-strict').click(function() {
    $(this).prev().toggleClass('lit');
  });
  $('.switch-slider').click(function() {
    $(this).toggleClass('on');
  });
});

var sequence = [];
var userSequence = [];

function createSequence() {
  var randomnumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  sequence.push(randomnumber);
  console.log(sequence);
}

function configureSequence() {
  for (i=0; i<sequence.length; i++) {
    playAudioAndSound(sequence[i]);
  }
}

function playAudioAndSound(key) {
  switch (key) {
    case 0:
      var audio = new Audio('./audio/simonSound1.mp3');
      var relevantPad = '#0';
      break;
    case 1:
      var audio = new Audio('./audio/simonSound2.mp3');
      var relevantPad = '#1';
      break;
    case 2:
      var audio = new Audio('./audio/simonSound3.mp3');
      var relevantPad = '#2';
      break;
    case 3:
      var audio = new Audio('./audio/simonSound4.mp3');
      var relevantPad = '#3';
      break;
    default:
      console.log('Something broke terribly');
  }
  audio.play();
  setTimeout(function(){
    $(relevantPad).toggleClass('lit');
  }, 500);
  $(relevantPad).toggleClass('lit');
}

function getUserInput() {
  var numberOfAttempts = 0;
  $('.pad').click(function() {
    userSequence.push(JSON.parse(this.id));
      console.log(userSequence);
      console.log(numberOfAttempts);
      console.log(userSequence[numberOfAttempts], sequence[numberOfAttempts]);

    playAudioAndSound(userSequence[numberOfAttempts]);

    if(userSequence[numberOfAttempts] === sequence[numberOfAttempts]) {
      console.log('CORRECT');
    } else {
      userLoses(numberOfAttempts);
    }
    numberOfAttempts++;

  });
}

function userLoses(correctGuesses) {
  console.log(`You fucked up, but got ${correctGuesses} in a row correct.`);
}


createSequence();
configureSequence();
getUserInput();
