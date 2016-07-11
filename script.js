$(document).ready(function(){
  console.log("Good to go!")
  var turn = 1;
  var cpuSequence = [];
  var userSequence = [];
  var placeInUserSequence = 0;
  var userTurn = false;
  var colors = ['green', 'red', 'blue', 'yellow']
  var intervalRun;
  var score = 0;
  var speed = 1;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $('#begin').click(function(){
    if (userTurn == false){
      animateBoard();
      userTurn = true;
    }
  });
  function animateBoard() {
    cpuSequence.push(getRandomInt(0,3));
    placeInUserSequence = 0;
    var i = 0;
    intervalRun = setInterval(function(){
      if (i < cpuSequence.length) {
        $('.simon').eq(cpuSequence[i]).css('opacity', 1);
        window.setTimeout(function(){
          $('.simon').css('opacity', .2);
        }, (500 * speed));
        i++;
      }
      else if (i == cpuSequence.length) {
        clearInterval(intervalRun);
      };
    }, (1000 * speed));
    if (speed > 0.5) {
      speed = speed - 0.05;
    }
    userTurn = true;
  }
  $('.simon').click(function(){
    if (userTurn == true) {
      $(this).css('opacity', 1);
      var thisColor = $(this).attr('id');
      var thisNumber = colors.indexOf(thisColor);
      setTimeout(function(){
        $('.simon').css('opacity', .2);
      }, (500 * speed));
      userSequence.push(thisNumber);
      console.log(userSequence);
      console.log(cpuSequence);
      if (userSequence[placeInUserSequence] == cpuSequence[placeInUserSequence]) {
        placeInUserSequence++;
        if (userSequence.length == cpuSequence.length) {
          userTurn = false;
          userSequence = [];
          score++;
          $('#score').text(score + " points")
          animateBoard();
        }
      }
      else {
        userTurn = false;
        alert('LOSE');
        score = 0;
        $('#score').text(score + " points")
        placeInUserSequence = 0;
        userSequence = [];
        cpuSequence = [];
      }
    }
  })

});
