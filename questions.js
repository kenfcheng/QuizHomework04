var questions = [
    {
        question: "Which of the following is a valid type of function javascript supports?",
        choices: ["named function", "anonymous function", "none", "both"],
        answer: "both"
    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        choices: ["<javascript>", "<js>", "<script>", "All of the Above"],
        answer: "<script>"
    },
    {
        question: "The external JavaScript file must contain <script> tag. True or False?",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        question: "When being assigned to a variable, strings must be enclosed in what?",
        choices: ["parenthesis", "curly brackets", "quotes", "comma"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 76;
// Time Intervals
var holdInterval = 0;
// Time Penalty
var penalty = 10;
//  new element
var ulCreate = document.createElement("ul");

// Timer and Display
timer.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});