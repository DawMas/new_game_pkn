'use strict'

var boxPaper = document.getElementById("paper-button");
var boxStone = document.getElementById("stone-button");
var boxScissors = document.getElementById("scissors-button");

var boxNew = document.getElementById('new-game');

var output = document.getElementById("text-out");
var outputOver = document.getElementById('text-over');

var resultPlayer = document.getElementById('result-player');
var resultComp = document.getElementById('result-comp');
var gameNumber = document.getElementById('game-number');
var gameTable = document.getElementById('game-table');


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
    number == 1 ? out = 'paper' : number == 2 ? out = 'stone' : out = 'scissors';
    return out;
}
var log = function (text) {
    output.innerHTML = '<br>' + text;
}
var logOver = function () {
    outputOver.innerHTML = '<br> Game over, press the new game button!';
}

var logTable = function (p, s, c) {
    gameTable.insertAdjacentHTML('afterbegin', '<tr><td>' + names(p) + '</td><td>' + s + '</td><td>' + names(c) + '</td></tr>');
}
var isNumber = function (number) {
    (isNaN(number) || !number || number <= 0) ? (log('Please insert number > 0'), canPlay = false) : (log(''), canPlay = true);
}

var playerMove = function (player) {

    var comp = draw();
    console.log(comp);

    if ((player == 1 && comp == 2) || (player == 2 && comp == 3) || (player == 3 && comp == 1)) {
        logTable(player, 'Win', comp);
        playerWin += 1;

    }
    else if (player == comp) {
        logTable(player, 'Draw', comp);

    }
    else {
        logTable(player, 'Lose', comp);
        compWin += 1;
    };

    if (playerWin >= numberOfGames) {
        log('You WIN!! Click \'New Game\' button');
        canPlay = false;

    }
    else if (compWin >= numberOfGames) {
        log('Comp WIN !! Click \'New Game\' button');
        canPlay = false;
    }
    resultPlayer.innerHTML = playerWin;
    resultComp.innerHTML = compWin;
}

boxPaper.addEventListener('click', function () {

    canPlay ? playerMove(1) : logOver();
});
boxStone.addEventListener('click', function () {
    canPlay ? playerMove(2) : logOver();
});
boxScissors.addEventListener('click', function () {
    canPlay ? playerMove(3) : logOver();
});

boxNew.addEventListener('click', function () {
    output.innerHTML = '';
    outputOver.innerHTML = '';
    resultPlayer.innerHTML = '';
    resultComp.innerHTML = '';
    gameTable.innerHTML = '';
    playerWin = 0;
    compWin = 0;
    isNumber(numberOfGames = prompt('How many games do You want to play?'));
    gameNumber.innerHTML = numberOfGames;
    resultComp.innerHTML = 0;
    resultPlayer.innerHTML = 0;

})

