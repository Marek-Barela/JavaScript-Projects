document.addEventListener("DOMContentLoaded", function() {

	var startGameBtn = document.getElementById("btnStart"),
		topContainer = document.getElementById("topContainer"),
		midContainer = document.getElementById("midContainer"),
		botContainer = document.getElementById("botContainer"),
		nickName = document.getElementById("nickName"),
		gameState = "notStarted";

	var player = {name:"", points: 0},
		computer = {points: 0};

	startGameBtn.addEventListener("click", function(){
		gameState = "started";
		newGame();
	});

	function newGame(){
		player.name = prompt("Enter your name", "Name");
			if (!player.name) {
				gameState = "notStarted";
				setGameState();
			}
		nickName.innerText = player.name;
		setGameState();
	};

	function setGameState() {
		switch(gameState) {
			case "started":
				topContainer.style.display = "none";
				midContainer.style.display = "block";
				botContainer.style.display = "block";
				break;
			case "ended":
				startGameBtn.innerText = "Play again!";
				topContainer.style.display = "block";
				midContainer.style.display = "none";
				botContainer.style.display = "none";
			case "notStarted":
				topContainer.style.display = "block";
				midContainer.style.display = "none";
				botContainer.style.display = "none";
		}
	};

	setGameState();

	var rock = document.getElementById("rock"),
		scissors = document.getElementById("scissors"),
		paper = document.getElementById("paper");

	var playerChoice = document.getElementById("playerChoice"),
		pcChoice = document.getElementById("pcChoice");

	rock.addEventListener("click", function(){playerPick("rock")});
	scissors.addEventListener("click", function(){playerPick("scissors")});
	paper.addEventListener("click", function(){playerPick("paper")});

	function playerPick(playerPick) {
		playerChoice.innerText = playerPick;
		computerPick();
		checkResult(playerPick, computerPick());
	};

	function computerPick(){
		options = ["rock","scissors","paper"];
		return options[Math.floor(Math.random()*3)];
	};

	var playerScore = document.getElementById("playerScore"),
		pcScore = document.getElementById("pcScore"),
		whoWon = document.getElementById("showWinner");

	function checkResult(playerPick, computerPick) {
		pcChoice.innerText = computerPick;
		var winner = "player";

		if (playerPick == computerPick) {
			winner = "none";
		}

		else if ((computerPick == "rock" & playerPick == "scissors") ||
				(computerPick == "scissors" & playerPick == "paper") ||
				(computerPick == "paper" & playerPick == "rock")) {
			winner = "computer";
		}

		if (winner == "player") {
			player.points ++;
			playerScore.innerText = player.points;
			whoWon.innerText = "Point for " + player.name + "!";
		}

		else if (winner == "computer") {
			computer.points ++;
			pcScore.innerText = computer.points;
			whoWon.innerText = "Point for Computer!";
		}

		else if (winner == "none") {
			whoWon.innerText = "No one won!";
		}

		gameResult();
	}

	function gameResult(){
		if (player.points == 10) {
			gameState = "ended";
			alert(player.name+" won the game!")
			resetGame();
			setGameState();
		}
		else if (computer.points == 10) {
			gameState = "ended";
			alert("Computer won the game!")
			resetGame();
			setGameState();
		}
	}

	function resetGame() {
		player.points = 0;
		computer.points = 0;
		playerScore.innerText = 0;
		pcScore.innerText = 0;
		whoWon.innerText = "";
	};
});