'use strict'

var boxPaper = document.getElementById("paper-button");
var boxStone = document.getElementById("stone-button");
var boxScissors = document.getElementById("scissors-button");

var boxNew = document.getElementById('new-game');

var output = document.getElementById("text-out");

var gameNumber;

var draw = function () {
    var number = Math.random();
    number = Math.round(number * 2 + 1);
    console.log(number);
    return number;
}
var names = function (number) {
    var out = '';
    number == 1 ? out = 'Paper' : number == 2 ? out = 'Stone' : out = 'Scissors';
    return out;
}
var log = function (text) {
    output.innerHTML += '<br>' + text;
}
var playerMove = function (player) {

    var comp = draw();
    console.log(comp);

    if ((player == 1 && comp == 2) || (player == 2 && comp == 1) || (player == 3 && comp == 2)) {
        log('You Win ! You type: ' + names(player) + ' and Computer type: ' + names(comp));
    }
    else if (player == comp) {
        log('It\'s DRAW... You type: ' + names(player) + ' and Computer type: ' + names(comp));
    }
    else {
        log('You LOSE :(( Yoy type: ' + names(player) + ' and Computer type: ' + names(comp))
    };

}

boxPaper.addEventListener('click', function () {
    playerMove(1);
});
boxStone.addEventListener('click', function () {
    playerMove(2);
});
boxScissors.addEventListener('click', function () {
    playerMove(3);
});

boxNew.addEventListener('click', function(){
    output.innerHTML = '';
    gameNumber = window.prompt('How many games do You want to play?');
   

})

