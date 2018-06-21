import "./sass/style.sass";
import "./JS/fontawesome-all.min";

document.addEventListener("DOMContentLoaded", function () {

    const kanbanButton = document.getElementById("kanban-button"),
        kanbanInput = document.getElementById("kanban-input"),
        kanbanBoard = document.getElementById("kanban-board");

    // Class will create single kanban board
    function Column(name) {
        let self = this;

        this.name = name;
        this.element = createColumn()

        function createColumn() {
            //create a few elements and set them into column
            let createColumnBody = document.createElement("div"),
                createColumnHeader = document.createElement("h2"),
                createInput = document.createElement("input"),
                createList = document.createElement("ul"),
                buttonContainer =document.createElement("div"),
                createAddButton = document.createElement("button"),
                createDeleteButton = document.createElement("button"),
                createSpan = document.createElement("span");

            //Create class for elements
            createColumnBody.className = "col-12"
            createList.className = "board__list"
            createAddButton.className = "board__add-button"
            createDeleteButton.className = "board__delete-button"
            createSpan.className= "fas fa-trash-alt"
            // Append text into paragraph and buttons
            createColumnHeader.innerText = name
            createAddButton.innerText = "Dodaj"
            //Create listener which one will create new card inside board
            createAddButton.addEventListener("click", function () {
                let columnInputValue = createInput.value;
                if(columnInputValue === "") {
                    return alert("Pole nie może być puste")
                }
                let cardValue = new Card(columnInputValue);

                function creatCard(card) {
                    createList.appendChild(card.element)
                }
                creatCard(cardValue)
                createInput.value = ""
            })

            // Create listener which one will allow to delete board
            createDeleteButton.addEventListener("click", function () {
                self.element.remove()
            })

            //Append all created elements into one div
            createColumnBody.appendChild(createColumnHeader)
            createColumnBody.appendChild(createInput)
            createDeleteButton.appendChild(createSpan)
            buttonContainer.appendChild(createAddButton)
            buttonContainer.appendChild(createDeleteButton)
            createColumnBody.appendChild(buttonContainer)
            createColumnBody.appendChild(createList)
            return createColumnBody;
        }
    }

    //Class will create card inside board 
    function Card(description) {
        let self = this;

        this.description = description
        this.element = createCard()

        function createCard() {
            let listItem = document.createElement("li"),
                listButton = document.createElement("button"),
                createSpan = document.createElement("span");

            //create listener which one will allow to delete card
            listButton.addEventListener("click", function () {
                self.element.remove()
            })


            //Create class for element
            createSpan.className= "fas fa-trash-alt"

            //Create text for button and list item 
            listItem.innerText = description

            //Append element into list item
            listButton.appendChild(createSpan)
            listItem.appendChild(listButton)

            return listItem
        }
    }

    // Create kanban board
    kanbanButton.addEventListener("click", function () {
        let columnName = kanbanInput.value;
        if(columnName === "") {
            return alert("Pole nie może być puste")
        }
        let column = new Column(columnName);
        kanbanBoard.appendChild(column.element);
        kanbanInput.value = ""
    })
})