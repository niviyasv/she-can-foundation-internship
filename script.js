// FIREBASE IMPORTS

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// FIREBASE CONFIG

const firebaseConfig = {

    apiKey: "AIzaSyArvYms31PTxpSMQ5dU9Cz7ZGsBMqFfz_0",

    authDomain:
    "she-can-foundation-internship.firebaseapp.com",

    databaseURL:
    "https://she-can-foundation-internship-default-rtdb.asia-southeast1.firebasedatabase.app/",

    projectId:
    "she-can-foundation-internship",

    storageBucket:
    "she-can-foundation-internship.firebasestorage.app",

    messagingSenderId:
    "384810620274",

    appId:
    "1:384810620274:web:0d93fc0aa604d3879af9eb"

};


// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// SMOOTH SCROLL

function scrollToContact() {

    document.getElementById("contact")
    .scrollIntoView({
        behavior: "smooth"
    });

}

window.scrollToContact = scrollToContact;


// FORM SUBMIT

document.getElementById("contactForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let message =
    document.getElementById("message").value.trim();

    let successMessage =
    document.getElementById("successMessage");


    // VALIDATION

    if (name.length < 3) {

        successMessage.style.color = "red";

        successMessage.innerText =
        "Name must be at least 3 characters";

        return;
    }

    let emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {

        successMessage.style.color = "red";

        successMessage.innerText =
        "Enter a valid email";

        return;
    }

    if (message.length < 10) {

        successMessage.style.color = "red";

        successMessage.innerText =
        "Message must contain at least 10 characters";

        return;
    }


    // SAVE TO FIREBASE

    push(ref(database, "messages"), {

        name: name,
        email: email,
        message: message

    });


    // SUCCESS MESSAGE

    successMessage.style.color =
    "lightgreen";

    successMessage.innerText =
    "Form Submitted Successfully!";


    // RESET FORM

    document.getElementById("contactForm").reset();

});


// QUOTE API

async function fetchQuote() {

    try {

        let response = await fetch(
            "https://api.quotable.io/random"
        );

        let data = await response.json();

        document.getElementById("quote")
        .innerText =
        `"${data.content}"`;

    }

    catch (error) {

        document.getElementById("quote")
        .innerText =
        "Empowering women creates stronger communities.";

    }

}

fetchQuote();