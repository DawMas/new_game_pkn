'use strict'


var playerMove = document.querySelectorAll('.player-move');

var boxNew = document.getElementById('new-game');

var output = document.getElementById("text-out");
var outputOver = document.getElementById('text-over');

var resultPlayer = document.getElementById('result-player');
var resultComp = document.getElementById('result-comp');
var gameNumber = document.getElementById('game-number');
var gameTable = document.getElementById('game-table');

var modals = document.querySelectorAll('.modal');
var modalSection = document.querySelector('#modals-overlay');
var closeButtoms = document.querySelectorAll('.modal .close');

var params = {
    numberOfGames: 3,
    playerWin: 0,
    compWin: 0,
    canPlay: true,
}


var draw = function () {
    var number = Math.random();
    number = Math.round(number * 2 + 1);
    return number;
}
var names = function (number) {
    var out = '';
    number == 1 ? out = 'paper' : number == 2 ? out = 'stone' : out = 'scissors';
    return out;
}
var log = function (text) {
    output.innerHTML = '<br><br>' + text;
    showModal();

}
var logOver = function () {
    outputOver.innerHTML = '<br> Game over, press the new game button!';
}

var logTable = function (p, s, c) {
    gameTable.insertAdjacentHTML('afterbegin', '<tr><td>' + names(p) + '</td><td>' + s + '</td><td>' + names(c) + '</td></tr>');
}
var isNumber = function (number) {
    (isNaN(number) || !number || number <= 0) ? (log('Please insert number > 0'), params.canPlay = false) : ( params.canPlay = true);
}
var showModal = function () {
    for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove('show');
    }
    modalSection.classList.add('show');
    document.querySelector('#modal-score').classList.add('show');
}

var hideModal = function () {
    modalSection.classList.remove('show');
}


var playGame = function (event) {

    var player = event.target.getAttribute('data-move');

    var comp = draw();

    if ((player == 1 && comp == 2) || (player == 2 && comp == 3) || (player == 3 && comp == 1)) {
        logTable(player, 'Win', comp);
        params.playerWin++;

    }
    else if (player == comp) {
        logTable(player, 'Draw', comp);

    }
    else {
        logTable(player, 'Lose', comp);
        params.compWin++;

    };

    if (params.playerWin >= params.numberOfGames) {
        params.canPlay = false;
        log('You WIN!! Click \'New Game\' button');
       
    }
    else if (params.compWin >= params.numberOfGames) {
        params.canPlay = false;
        log('Comp WIN !! Click \'New Game\' button');
      
    }
    resultPlayer.innerHTML = params.playerWin;
    resultComp.innerHTML = params.compWin;
}

for (var i = 0; i < playerMove.length; i++) {
        playerMove[i].addEventListener('click', function(event){
            params.canPlay ? playGame(event) : log('<br> Game over, press the new game button!')
        })
}

for (var i = 0; i < closeButtoms.length; i++) {
    closeButtoms[i].addEventListener('click', hideModal);
}
boxNew.addEventListener('click', function () {
  //  output.innerHTML = '';
   // outputOver.innerHTML = '';
    resultPlayer.innerHTML = '';
    resultComp.innerHTML = '';
    gameTable.innerHTML = '';
    params.playerWin = 0;
    params.compWin = 0;
    isNumber(params.numberOfGames = prompt('How many games do You want to play?'));
    gameNumber.innerHTML = params.numberOfGames;
    resultComp.innerHTML = 0;
    resultPlayer.innerHTML = 0;

})

