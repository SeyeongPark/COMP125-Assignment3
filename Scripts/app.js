/*File name : app.js
  Author's name : Seyeong Park
  Web site name : SYeong
  File description: This JavaScript code is for html files */


"use strict";

// IIFE -Immediately Ivoked Function Expression
(function () {
    let title = document.title.toLowerCase();
    function highlightActiveLink(id) 
    {
        let navAnchors = document.querySelectorAll("li a");
        for (const anchor of navAnchors) 
        {
         anchor.className = "nav-link";
        }
        for (const anchor of navAnchors) 
        {
            let anchorString = anchor.getAttribute("id");
            if (id === anchorString)
            {
                anchor.className = "nav-link active";
            }
        }
    }


    function validateForm() {
        let contact = new Contact();
        let contactForm = document.forms[0];
        contactForm.noValidate = true;
        let errorMessage = document.getElementById("errorMessage");
        let firstName = document.getElementById("firstName");
        firstName.addEventListener("blur", (event) => {
            if (firstName.value.length < 2) {
                firstName.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid First Name with a length of 2 or more characters";
            }
            else {
                contact.firstName = firstName.value;
                errorMessage.hidden = true;
            }
        });        
        let lastName = document.getElementById("lastName");
        lastName.addEventListener("blur", (event) => {
            if (lastName.value.length < 2) {
                lastName.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid Last Name with a length of 2 or more characters";
            }
            else {
                contact.lastName = lastName.value;
                errorMessage.hidden = true;
            }
        });
        let contactNumber = document.getElementById("contactNumber");
        contactNumber.addEventListener("blur", (event) => {
            let contactNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
            if (!contactNumberPattern.test(contactNumber.value)) {
                contactNumber.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid Contact Number";
            }
            else {
                contact.contactNumber = contactNumber.value;
                errorMessage.hidden = true;
            }
        });
        let emailAddress = document.getElementById("emailAddress");
        emailAddress.addEventListener("blur", (event) => {
            let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!emailPattern.test(emailAddress.value)) {
                emailAddress.focus();
                errorMessage.hidden = false;
                errorMessage.textContent = "Please enter a Valid email address";
            }
            else {
                contact.emailAddress = emailAddress.value;
                errorMessage.hidden = true;
            }
        });
        let shortMessage = document.getElementById("shortMessage");
        shortMessage.addEventListener("blur", (event) => {
            contact.shortMessage = shortMessage.value;
        });
        // creates a "hook" or reference to the button element with an id of "submitButton"
        let submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Submit Button Clicked");
            console.log(contact.toString());
            console.log(contact.toJSON());
            localStorage.setItem("contact", contact.toString());
            console.log(localStorage.getItem("contact"));
            localStorage.clear();
        });
    }
        // Set page content on the web address bar
        function setPageContent() {        
            loadHeader();   
            // content switcher     
            switch (title) {
                case "home":
                    loadHomeData();
                    break;
                case "contact":
                    loadContactData();
                    break;
                case "projects":
                    loadProjectData();
                    break; 
                default:
                    break;
            }
            loadFooter();
        }
    // function for Load header
    function loadHeader() {
        console.info("Header Loading...");
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - configures the message
        XHR.open("GET", "./Scripts/Views/partials/header.html");
        // step 3 - Executes the request
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let header = document.getElementsByTagName("header")[0];
                let headerData = XHR.responseText;
                header.innerHTML = headerData;
            }
        });
    }
    function loadHomeData() {
        console.info("Homepage Loading...");
        highlightActiveLink();
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - configures the message
        XHR.open("GET", "./Scripts/paragraphs.json");
        // step 3 - Executes the request
        XHR.send();
        // step 4 - register the readystate event 
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let dataFile = JSON.parse(XHR.responseText);
                let ParagraCont = dataFile.paragraphContent;
                console.log(ParagraCont);
                // Declare each paragraph by using classname and creating element
                let jumbotron = document.getElementsByClassName("jumbotron")[0];
                let HomePra = document.createElement("p");
                 //Call paragraphs from 'paragraphs.json' file
                HomePra.innerHTML = ParagraCont[0].Textcontent;
                 // Print jumbotron
                jumbotron.appendChild(HomePra);
            }
        });
    }
    function loadContactData() {
        console.info("Contact Content Loading...");
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - configures the message
        XHR.open("GET", "./contact.html");
        // step 3 - Executes the request
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let main = document.getElementsByTagName("main")[0];
                let mainData = XHR.responseText;
                main.innerHTML = mainData;
                validateForm();
            }
        });
    }
    function loadProjectData() {
        console.info("Project Loading...");
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - configures the message
        XHR.open("GET", "./Scripts/paragraphs.json");
        // step 3 - Executes the request
        XHR.send();
        // step 4 - register the readystate event 
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let dataFile = JSON.parse(XHR.responseText);
                let Paragraphs = dataFile.paragraphContent;        
                let jumbotron = document.getElementsByClassName("jumbotron")[0];

                // Declare each paragraph
                let firPr = document.getElementById("p1");      
                let secPr = document.getElementById("p2");
                let thrPr = document.getElementById("p3");

                //Call paragraphs from 'paragraphs.json' file
                firPr.innerHTML = Paragraphs[1].Projec1;
                secPr.innerHTML = Paragraphs[1].Projec2;
                thrPr.innerHTML = Paragraphs[1].Projec3;

                // Print jumbotron
                jumbotron.appendChild(firPr);
                jumbotron.appendChild(secPr);
                jumbotron.appendChild(thrPr);            
            }
        });
    }
        // function for Load footer
    function loadFooter() {
        console.info("Footer Loading...");
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - configures the message
        XHR.open("GET", "./Scripts/Views/partials/footer.html");
        // step 3 - Executes the request
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if ((XHR.readyState === 4) && (XHR.status === 200)) {
                let header = document.getElementsByTagName("footer")[0];
                let headerData = XHR.responseText;
                header.innerHTML = headerData;
            }
        });
    }


    // named function
    function Start() {
        setPageContent();
    }

    window.addEventListener("load", Start);

    // Slide function for the project of 'Taking Picture' in project.html
    let slideIndex = 0;
    showSlides();    
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

})();