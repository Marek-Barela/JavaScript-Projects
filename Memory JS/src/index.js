import "./sass/style.sass"

const easyButton = document.getElementById("easy-button"),
    mediumButton = document.getElementById("medium-button"),
    hardButton = document.getElementById("hard-button"),
    gameMenu = document.getElementById("game-menu");

let easyMode = 18,
    mediumMode = 30,
    hardMode = 42,
    createBoardElements = `<div class="tile"></div>`,
    gameBoard = document.querySelector(".game-board"),
    cards;

let activeCard = "";
const activeCards = [];

let gamePairs,
    gameResult = 0;

//three arrays with different colors
const cardsColorEasy = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "gray", "gray", "lightgreen", "lightgreen", "cadetblue", "cadetblue", "violet", "violet"],

cardsColorMedium = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "gray", "gray", "lightgreen", "lightgreen", "cadetblue", "cadetblue", "violet", "violet" ,"lightred", "lightred", "lightblue", "lightblue", "lightyellow", "lightyellow", "lightergreen", "lightergreen", "lightbrown", "lightbrown", "lightgrey", "lightgrey"],

cardsColorHard = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "gray", "gray", "lightgreen", "lightgreen", "cadetblue", "cadetblue", "violet", "violet" ,"lightred", "lightred", "lightblue", "lightblue", "lightyellow", "lightyellow", "lightergreen", "lightergreen", "lightbrown", "lightbrown", "lightgrey", "lightgrey", "orange", "orange", "white", "white", "royalblue", "royalblue", "skyblue", "skyblue", "skyblue", "skyblue", "plum", "plum"];


//Start game with selected mode
//by pressing one of three buttons

function startGame(gameMode, gameModeArray) {
    for (let i = 0; gameMode > i; i++) {
        gameBoard.innerHTML += createBoardElements
    }
    gamePairs = gameMode / 2;
    init(gameModeArray)
}

//Initialize game board with random colors
function init(gameModeArray) {
    //Copy the original table so that you do not change the original array value
    let cardColorCopy = [...gameModeArray]
    //Change node list to array 
    cards = gameBoard.querySelectorAll(".tile");
    cards = [...cards];
    //set random position for every card
    cards.forEach((card) => {
        let position = Math.floor(Math.random() * cardColorCopy.length);
        card.classList.add(cardColorCopy[position])
        cardColorCopy.splice(position, 1)
    })
    hideCards()
}

//Show unhidden game cards and hide them after 1500 milliseconds
//And create listener for every card
function hideCards() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 1500)
}

function clickCard() {
    this.classList.remove("hidden");

    // If the same element is clicked return
    if (this === activeCards[0]) {
        return
    }

    //Display first card after first click
    //set first card into active cards array
    if (activeCards.length === 0) {
        activeCards[0] = this
        return
    } else {
        //Remove the listener for the duration of the animation
        cards.forEach((card) => {
            card.removeEventListener("click", clickCard)
        })
        //Display second card after socond click
        //and set second card into active cards array
        activeCards[1] = this

        //Create animation for every card with duration 500 milliseconds
        setTimeout(() => {
            //If both cards have the same color change their color
            //to transparent and delete them from game array
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("transparent"))
                cards = cards.filter((card) => {
                    return !card.classList.contains("transparent")
                })
                //Add + 1 pair every time you find a colors
                gameResult++
                //If all pairs have been found, reset the game
                if (gameResult === gamePairs) {
                    resetGame()
                }
            } else {
                //If cards are different
                //hide them again after 500 milliseconds
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //Reset array with active cards
            activeCards.length = 0
            //Again create listeners for every card
            cards.forEach((card) => {
                card.addEventListener("click", clickCard)
            })
        }, 500)
    }
}

//Reset game
function resetGame() {
    gameResult = 0
    gameBoard.innerHTML = ""
    gameMenu.style.display = "block"
}

//Hide menu after start
function hideMenuGame() {
    gameMenu.style.display = "none"
}

//three available game modes
easyButton.addEventListener("click", function () {
    resetGame()
    hideMenuGame()
    startGame(easyMode, cardsColorEasy)
})

mediumButton.addEventListener("click", function () {
    resetGame()
    hideMenuGame()
    startGame(mediumMode, cardsColorMedium)
})

hardButton.addEventListener("click", function () {
    resetGame()
    hideMenuGame()
    startGame(hardMode, cardsColorHard)
})