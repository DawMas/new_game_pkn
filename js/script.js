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
var startButton = document.querySelector('#new-game-start');
var playerName = document.getElementById('player-name');
var modalNewGame = document.getElementById('modal-new-game');

var params = {
    numberOfGames: 3,
    playerWin: 0,
    compWin: 0,
    canPlay: true,
    roundNumber: 0,
    playerName: 'Player',
    progress: [],
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

var logScores = function () {
    var scores = '';
    for (var i = 0; i < params.progress.length; i++) {
        scores += '<tr><td>' + params.progress[i].round + '</td>'
            + '<td>' + params.progress[i].playerMove + '</td>'
            + '<td>' + params.progress[i].compMove + '</td>'
            + '<td>' + params.progress[i].roundScore + '</td>'
            + '<td>' + params.progress[i].gameScore + '</td></tr>';
    }
    output.insertAdjacentHTML('beforeend',
        '<br><br><table><tr><th>Round</th><th>Your move</th><th>Comp move</th><th>Round score</th><th>Game score</th></tr>'
        + scores + '</table >')
}
var logTable = function (p, s, c) {
    gameTable.insertAdjacentHTML('afterbegin', '<tr><td>' + names(p) + '</td><td>' + s + '</td><td>' + names(c) + '</td></tr>');
}
var showModal = function (event) {
    for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove('show');
    }
    modalSection.classList.add('show');
    document.querySelector('#modal-score').classList.add('show');
}
var hideModal = function () {
    modalSection.classList.remove('show');
}
modalSection.addEventListener('click', hideModal);
startButton.addEventListener('click', function (event) {
    params.playerName = document.getElementById('input-player-name').value;
    playerName.innerHTML = params.playerName;
    params.numberOfGames = document.getElementById('input-game-number').value;
    if (isNaN(params.numberOfGames) || params.numberOfGames <= 0) {
        modalNewGame.lastElementChild.innerHTML = 'Please insert number > 0';
    }
    else {
        gameNumber.innerHTML = params.numberOfGames;
        hideModal();
    }
});

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    })
}

var playGame = function (event) {

    var player = event.target.getAttribute('data-move');
    var comp = draw();
    var score;

    if ((player == 1 && comp == 2) || (player == 2 && comp == 3) || (player == 3 && comp == 1)) {
        score = 'Win'
        logTable(player, score, comp);
        params.playerWin++;
        params.roundNumber++;
    }
    else if (player == comp) {
        score = 'Draw';
        logTable(player, score, comp);
        params.roundNumber++;
    }
    else {
        score = 'Lose';
        logTable(player, score, comp);
        params.compWin++;
        params.roundNumber++;
    };
    params.progress.push({
        round: params.roundNumber,
        playerMove: names(player),
        compMove: names(comp),
        roundScore: score,
        gameScore: (params.playerWin + ' : ' + params.compWin)
    });


    if (params.playerWin >= params.numberOfGames) {
        params.canPlay = false;
        log('You WIN!! Click \'New Game\' button');
        logScores();

    }
    else if (params.compWin >= params.numberOfGames) {
        params.canPlay = false;
        log('Comp WIN !! Click \'New Game\' button');
        logScores();
    }
    resultPlayer.innerHTML = params.playerWin;
    resultComp.innerHTML = params.compWin;
}

for (var i = 0; i < playerMove.length; i++) {
    playerMove[i].addEventListener('click', function (event) {
        params.canPlay ? playGame(event) : log('<br> Game over, press the new game button!')
    })
}

for (var i = 0; i < closeButtoms.length; i++) {
    closeButtoms[i].addEventListener('click', hideModal);
}

boxNew.addEventListener('click', function () {

    resultPlayer.innerHTML = '';
    resultComp.innerHTML = '';
    gameTable.innerHTML = '';
    params.playerWin = 0;
    params.compWin = 0;
    params.roundNumber = 0;
    params.progress = [];
    modalNewGame.lastElementChild.innerHTML = '';
    resultComp.innerHTML = 0;
    resultPlayer.innerHTML = 0;
    showModal();
    modalNewGame.classList.add('show');

})

