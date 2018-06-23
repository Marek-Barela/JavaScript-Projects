import "./sass/style.sass"

let easyMode = 18,
    createBoardElements = `<div class="tile"></div>`,
    gameBoard = document.querySelector(".game-board"),
    cards;

let activeCard = "";
const activeCards = [];

let gamePairs,
    gameResult = 0;


const cardsColorEasy = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", "brown", "brown", "gray", "gray", "lightgreen", "lightgreen", "cadetblue", "cadetblue", "violet", "violet"]

function startGame(gameMode, gameModeArray) {
    for (let i = 0; gameMode > i; i++) {
        gameBoard.innerHTML += createBoardElements
    }
    gamePairs = gameMode / 2;
    init(gameModeArray)
}

function init(gameModeArray) {
    //Copy oryginal array
    let cardColorCopy = [...gameModeArray]
    //Change node list to array 
    cards = gameBoard.querySelectorAll(".tile");
    cards = [...cards];
    cards.forEach((card) => {
        let position = Math.floor(Math.random() * cardColorCopy.length);
        card.classList.add(cardColorCopy[position])
        cardColorCopy.splice(position, 1)
    })
    hideTiles()
}

function hideTiles() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 1300)
}

function clickCard() {
    this.classList.remove("hidden");

    if(this === activeCards[0]) {
        return
    }

    if (activeCards.length === 0) {
        activeCards[0] = this
        return
    } 
    
    else {
        cards.forEach((card) => {
            card.removeEventListener("click", clickCard)
        })
        activeCards[1] = this

        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"))
                cards = cards.filter((card) => {
                    return !card.classList.contains("off")
                })
                gameResult++
                if(gameResult === gamePairs) {
                    alert("Wygrana!")
                }
            }
            
            else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }

            activeCards.length = 0
            cards.forEach((card) => {
                card.addEventListener("click", clickCard)
            })
        }, 500)
    }
}

startGame(easyMode, cardsColorEasy)