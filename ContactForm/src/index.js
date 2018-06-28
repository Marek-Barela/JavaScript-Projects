import "./sass/style.sass";
import { config } from "./config/config";

firebase.initializeApp(config);

var messageRef = firebase.database().ref("messages");

//Submit form
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", submitForm)

function inputValue(val) {
    return document.getElementById(val).value
}

function submitForm() {
    let name = inputValue("name"),
    subject = inputValue("subject"),
    email = inputValue("email"),
    message = inputValue("message");

    saveMessage(name, subject, email, message)
}

//Save data in firebase
function saveMessage(name, subject, email, message) {
    let newMessage = messageRef.push();
    
    newMessage.set({
        name: name,
        subject: subject,
        email: email,
        message: message
    });
}