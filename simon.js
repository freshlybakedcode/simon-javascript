var sequence = [];        //Computer generated sequence
var userSequence = [];    //User's input
var numberOfAttempts;     //How many pads the user has pressed in a round
var count;                //Number of rounds successfully passed
var strictMode = false;   //Is strict mode on?
var powerOn =  true;      //Is the power on?
var gameInPlay = false;   //Is anyone playing a game?
var relevantPad;          //Which pad are we dealing with right now?

//Interactive page elements
var scoreNumbers = document.querySelector('.count .number');    //The score in the UI
var strictLed = document.querySelector('.led');                 //The LED above the strict button
var greenPad = document.querySelector('.pad-green');            //Green pad (0)
var redPad = document.querySelector('.pad-red');                //Red pad (1)
var bluePad = document.querySelector('.pad-blue');              //Blue pad (2)
var yellowPad = document.querySelector('.pad-yellow');          //Yellow pad (3)
var allPads = document.getElementsByClassName('pad');           //All the pads

function newGameSetup() {
  sequence.length = 0;
  userSequence.length = 0;
  numberOfAttempts = 0;
  count = 0;
}

function createSequence() {
  var randomnumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  sequence.push(randomnumber);
  console.log('Sequence: ', sequence);
}

function configureSequence() {
  for (let i=0; i<sequence.length; i++) {
    setTimeout( function timer(){
      playAudioAndSound(sequence[i]);
    }, i*600 );
  }
}

function playAudioAndSound(key) {
  switch (key) {
    case 0:
      var audio = new Audio('./audio/simonSound1.mp3');
      relevantPad = greenPad;
      break;
    case 1:
      var audio = new Audio('./audio/simonSound2.mp3');
      relevantPad = redPad;
      break;
    case 2:
      var audio = new Audio('./audio/simonSound3.mp3');
      relevantPad = yellowPad;
      break;
    case 3:
      var audio = new Audio('./audio/simonSound4.mp3');
      relevantPad = bluePad;
      break;
    case 4:
      var audio = new Audio('./audio/incorrect.mp3');
      relevantPad = "allPads";
      break;
    default:
      console.log('Something broke in a horrendous fashion.');
  }
  console.log(relevantPad);
  if(powerOn) {
    audio.play();
    if (relevantPad !== "allPads") {            //Single pad
      setTimeout(function(){
        relevantPad.classList.remove('lit');
      }, 500);
      relevantPad.classList.add('lit');
    } else {                                    //User made error, light up all pads
      setTimeout(function(){
        greenPad.classList.remove('lit');
        redPad.classList.remove('lit');
        bluePad.classList.remove('lit');
        yellowPad.classList.remove('lit');
      }, 500);
      greenPad.classList.add('lit');
      redPad.classList.add('lit');
      bluePad.classList.add('lit');
      yellowPad.classList.add('lit');
    }
  }
}

function giveUserAnotherChance() {
  let tempCount = count;
  count = '!!';
  updateCount();
  userSequence.length = 0;
  numberOfAttempts = 0;
  setTimeout(function(){
    configureSequence();
    count = tempCount;
    updateCount();
  }, 1500);
}

function userLoses() {
  console.log(`You fucked up, but got to round ${count}.`);
  gameInPlay = false;
}

function playGame() {
  gameInPlay = true;
  updateCount();
  userSequence = [];
  numberOfAttempts = 0;
  console.log('numberOfAttempts', numberOfAttempts);
  createSequence();
  configureSequence();
}

function updateCount() {
  scoreNumbers.innerHTML = ("0" + count).slice(-2);
}

//Pad input control
for(i=0; i<allPads.length; i++) {
  allPads[i].addEventListener('click', function() {
    if(powerOn && gameInPlay) {
      userSequence.push(JSON.parse(this.id));
        
      if(userSequence[numberOfAttempts] !== sequence[numberOfAttempts]) {
        playAudioAndSound(4);
        if(strictMode) {
          userLoses();
        } else {
          giveUserAnotherChance();
        }
      } else if (userSequence[numberOfAttempts] === sequence[numberOfAttempts] && userSequence.length !== sequence.length) {
        playAudioAndSound(userSequence[numberOfAttempts]);
        console.log('That is the correct pad');
        numberOfAttempts++;
      } else if (userSequence[numberOfAttempts] === sequence[numberOfAttempts] && userSequence.length === sequence.length) {
        playAudioAndSound(userSequence[numberOfAttempts]);
        console.log('That is the correct sequence! Next round.')
        count++;
        updateCount();
        setTimeout(function(){
          playGame();
        }, 1500);
      } else {
        console.log('Something else totally fucked itself');
      }
    }
  });
}

//Button controls
var powerSwitch = document.querySelector('.switch-slider').addEventListener('click', function() {
  this.classList.toggle('on');
  powerOn = !powerOn;
  console.log('powerOn: ', powerOn);
  if (powerOn) {
    scoreNumbers.classList.remove('hidden');
  } else {
    scoreNumbers.classList.add('hidden');
    newGameSetup();
    updateCount();
    gameInPlay = false;
    strictLed.classList.remove('lit');
    greenPad.classList.remove('lit');
    redPad.classList.remove('lit');
    bluePad.classList.remove('lit');
    yellowPad.classList.remove('lit');
  }
});

var strictButton = document.querySelector('.button-strict').addEventListener('click', function (){
  if (powerOn) {
    strictLed.classList.toggle('lit');
    strictMode = !strictMode;
  }
});

var startButton = document.querySelector('.button-start').addEventListener('click', function() {
  if (powerOn) {
    newGameSetup();
    playGame();
  }
});
