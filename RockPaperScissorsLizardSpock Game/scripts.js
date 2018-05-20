document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	var instructionButton = document.getElementById('instruction-button'),
	    creditsButton = document.getElementById('credits-button'),
	    startGameButton = document.getElementById('start-button'),
	    instructionModal = document.getElementById('instruction-modal'),
	    creditsModal = document.getElementById('credits-modal'),
	    closeModalOne = document.querySelectorAll('.close-modal')[0],
	    closeModalTwo = document.querySelectorAll('.close-modal')[1],
	    errorMessage = document.getElementById('error-message'),
	    startGameContainer = document.getElementById('start-game-container'),
	    playGameContainer = document.getElementById('play-game-container'),
		nameInput = document.getElementById('name-field'),
	    playerName = document.getElementById('player-name'),
	    gameResult = document.getElementById('game-result'),
	    playerPointsHeader = document.getElementById('player-points'),
	    computerPointsHeader = document.getElementById('computer-points'),
	    playerChoiceHeader = document.getElementById('player-choice'),
	    computerChoiceHeader = document.getElementById('computer-choice'),
	    playerPoints = 0,
	    computerPoints = 0;

	//Show modal with instruction after click on "instruction" button
	instructionButton.addEventListener('click', function () {
		instructionModal.style.display = "block";
	});
	//Show modal with credits after click on "credits" button
	creditsButton.addEventListener('click', function () {
		creditsModal.style.display = "block";
	});
	//close instruction modal with click on "x" button
	closeModalOne.addEventListener('click', function () {
		instructionModal.style.display = "none";
	});
	//close credits modal with click on "x" button
	closeModalTwo.addEventListener('click', function () {
		creditsModal.style.display = "none";
	});
	//Start game after click on 'Start' button but prevent start if input is empty and display message
	startGameButton.addEventListener('click', function () {
		if (nameInput.value === "") {
			errorMessage.style.display = 'block';
			errorMessage.innerText = "this field cannot be empty";
		} else if (nameInput.value.length > 15) {
			errorMessage.style.display = 'block';
			errorMessage.innerText = "You can use maximum 15 marks";
		} else {
			errorMessage.style.display = 'none';
			errorMessage.innerText = "";
			startGame();
		}
	});
	//Hide menu container an show game container also 
	function startGame() {
		startGameContainer.style.display = "none";
		playGameContainer.style.display = 'block';
		setPlayerName();
	}
	//Set player name inside header
	function setPlayerName() {
		playerName.innerText = nameInput.value;
	}
	//Pick one of five symbols in game
	function choiceSymbol() {
		var rock = document.getElementById('rock'),
		    paper = document.getElementById('paper'),
		    scissors = document.getElementById('scissors'),
		    lizard = document.getElementById('lizard'),
		    spock = document.getElementById('spock');

		rock.addEventListener('click', function () {
			playerPick('rock');
		});
		paper.addEventListener('click', function () {
			playerPick('paper');
		});
		scissors.addEventListener('click', function () {
			playerPick('scissors');
		});
		lizard.addEventListener('click', function () {
			playerPick('lizard');
		});
		spock.addEventListener('click', function () {
			playerPick('spock');
		});
	}

	//get player/computer picks and show them in headers
	function playerPick(sign) {
		var playerSign = sign,
		computerSign = computerPick();

		playerChoiceHeader.innerText = playerSign;
		computerChoiceHeader.innerText = computerSign;
		checkResult(playerSign, computerSign);
	}

	//return one of five options selected randomly
	function computerPick() {
		var options = ['rock', 'paper', 'scissors', 'lizard', 'spock'],
		    option = options[Math.floor(Math.random() * options.length)];
		return option;
	}

	//select player by default as winner and check other options
	function checkResult(playerSign, computerSign) {
		var winner = 'player';
		if (playerSign == computerSign) {
			winner = 'draw';
		} else if (playerSign == 'paper' && computerSign == 'scissors' ||
               playerSign == 'rock' && computerSign == 'paper' ||
               playerSign == 'lizard' && computerSign == 'rock' ||
               playerSign == 'spock' && computerSign == 'lizard' ||
               playerSign == 'scissors' && computerSign == 'spock' ||
               playerSign == 'lizard' && computerSign == 'scissors' ||
               playerSign == 'paper' && computerSign == 'lizard' ||
               playerSign == 'spock' && computerSign == 'paper' ||
               playerSign == 'rock' && computerSign == 'spock' ||
               playerSign == 'scissors' && computerSign == 'rock') {
			winner = 'computer';
		}
		showWinner(winner);
	}

	//add + 1 point for winner //  display points and show winner in header
	function showWinner(winner) {
		if (winner == 'player') {
			playerPoints++;
			gameResult.innerText = nameInput.value + " + 1 point";
			playerPointsHeader.innerText = playerPoints;
		} else if (winner == 'computer') {
			computerPoints++;
			gameResult.innerText = "computer + 1 point";
			computerPointsHeader.innerText = computerPoints;
		} else if (winner == 'draw') {
			gameResult.innerText = 'Draw!';
		}
		calculatePoints();
	}
	//check who first earn 10 points
	function calculatePoints() {
		if (playerPoints == 10) {
			alert("Congratulations you won the game!");
			resetGame();
		} else if (computerPoints == 10) {
			alert("you have been defeated by computer :(");
			resetGame();
		}
	}
	//reset game
	function resetGame() {
		playerPoints = 0;
		computerPoints = 0;
		playerPointsHeader.innerText = 0;
		computerPointsHeader.innerText = 0;
		gameResult.innerText = '';
		playerChoiceHeader.innerText = '';
		computerChoiceHeader.innerText = '';
		startGameContainer.style.display = 'flex';
		playGameContainer.style.display = 'none';
	}
	choiceSymbol();
});