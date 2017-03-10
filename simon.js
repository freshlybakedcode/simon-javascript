$(function() {
  $('.button-strict').click(function() {
    $(this).prev().toggleClass('lit');
  });

  $('.switch-slider').click(function() {
    $(this).toggleClass('on');
  });
});

var sequence = [];

function createSequence() {
  var randomnumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  sequence.push(randomnumber);
  console.log(sequence);
}

function playSequence() {
  for (i=0; i<sequence.length; i++) {
    switch (sequence[i]) {
      case 0:
        var audio = new Audio('./audio/simonSound1.mp3');
        var relevantPad = '.pad-green';
        break;
      case 1:
        var audio = new Audio('./audio/simonSound2.mp3');
        var relevantPad = '.pad-red';
        break;
      case 2:
        var audio = new Audio('./audio/simonSound3.mp3');
        var relevantPad = '.pad-yellow';
        break;
      case 3:
        var audio = new Audio('./audio/simonSound4.mp3');
        var relevantPad = '.pad-blue';
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
}

function getUserInput() {
  $('.pad').hover(function() {
    $(this).toggleClass('lit');
  });

}

createSequence();
playSequence();
getUserInput();
