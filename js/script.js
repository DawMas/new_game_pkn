'use strict'

var boxPaper = document.getElementById("paper-button");
var boxStone = document.getElementById("stone-button");
var boxScissors = document.getElementById("scissors-button");

var boxNew = document.getElementById('new-game');

var output = document.getElementById("text-out");

var resultPlayer = document.getElementById('result-player');
var resultComp = document.getElementById('result-comp');
var gameNumber = document.getElementById('game-number');

var numberOfGames = 3;
var playerWin = 0;
var compWin = 0;
var canPlay = true;


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
    output.innerHTML = '<br>' + text + output.innerHTML;
}
var playerMove = function (player) {

    var comp = draw();
    console.log(comp);

    if ((player == 1 && comp == 2) || (player == 2 && comp == 1) || (player == 3 && comp == 2)) {
        log('Win! You: ' + names(player) + '    Computer: ' + names(comp));
        playerWin += 1;

    }
    else if (player == comp) {
        log('It\'s DRAW... You: ' + names(player) + '    Computer: ' + names(comp));

    }
    else {
        log('LOSE :(( You type: ' + names(player) + '    Computer: ' + names(comp))
        compWin += 1;
    };

    if (playerWin >= numberOfGames) {
        log('You WIN!! To play again, please click \'New Game\' button');
        canPlay = false;

    }
    else if (compWin >= numberOfGames) {
        log('Comp WIN !! To play again, please click \'New Game\' button');
        canPlay = false;
    }
    resultPlayer.innerHTML = playerWin;
    resultComp.innerHTML = compWin;


}

boxPaper.addEventListener('click', function () {

    canPlay ? playerMove(1) : log('Game over, please press the new game button!');
});
boxStone.addEventListener('click', function () {
    canPlay ? playerMove(2) : log('Game over, please press the new game button!');
});
boxScissors.addEventListener('click', function () {
    canPlay ? playerMove(3) : log('Game over, please press the new game button!');
});

boxNew.addEventListener('click', function () {
    output.innerHTML = '';
    resultPlayer.innerHTML = '';
    resultComp.innerHTML = '';
    playerWin = 0;
    compWin = 0;
    numberOfGames = window.prompt('How many games do You want to play?');
    gameNumber.innerHTML = numberOfGames;
    canPlay = true;

})

