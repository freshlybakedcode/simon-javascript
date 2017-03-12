
var sequence = [];
var userSequence = [];
var numberOfAttempts;

function createSequence() {
  var randomnumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  sequence.push(randomnumber);
  console.log('Sequence: ', sequence);
}

function configureSequence() {
  for (let i=0; i<sequence.length; i++) {
      setTimeout( function timer(){
          playAudioAndSound(sequence[i]);
      }, i*500 );
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

function userLoses() {
  console.log(`You fucked up, but got to round ${sequence.length}.`);
}

function playGame() {
  userSequence = [];
  numberOfAttempts = 0;
  console.log('numberOfAttempts', numberOfAttempts);
  createSequence();
  configureSequence();
}

$(function() {
  $('.button-strict').click(function() {
    $(this).prev().toggleClass('lit');
  });
  $('.switch-slider').click(function() {
    $(this).toggleClass('on');
  });


  $('.pad').click(function() {
    userSequence.push(JSON.parse(this.id));
      console.log('userSequence: ', userSequence);
      console.log('numberOfAttempts', numberOfAttempts);
      console.log('userSequence[numberOfAttempts]', userSequence[numberOfAttempts], 'sequence[numberOfAttempts]', sequence[numberOfAttempts]);

    playAudioAndSound(userSequence[numberOfAttempts]);

    if(userSequence[numberOfAttempts] !== sequence[numberOfAttempts]) {
      userLoses();
    } else if (userSequence[numberOfAttempts] === sequence[numberOfAttempts] && userSequence.length !== sequence.length) {
      console.log('That is the correct pad');
      numberOfAttempts++;
    } else if (userSequence[numberOfAttempts] === sequence[numberOfAttempts] && userSequence.length === sequence.length) {
      console.log('That is the correct sequence! Next round.')
      setTimeout(function(){
        playGame();
      }, 1500);
    } else {
      console.log('Something else totally fucked itself');
    }
  });
});

playGame();
