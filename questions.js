let questions = [
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
const score = 0;
const questionIndex = 0;

const currentTime = document.querySelector("#currentTime");
const timer = document.querySelector("#startTime");
const questionsDiv = document.querySelector("#questionsDiv");
const wrapper = document.querySelector("#wrapper");

const secondsLeft = 76;
// Time Intervals
const holdInterval = 0;
// Time Penalty
const penalty = 10;
//  new element
const ulCreate = document.createElement("ul");

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

// Question and Choice rendering
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        const userQuestion = questions[questionIndex].title;
        const userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

     // New Question Choices
     userChoices.forEach(function (newItem) {
        const listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//Compares choices with answers
function compare(event) {
    const element = event.target;

    if (element.matches("li")) {

        const createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
       
        if (element.textContent == questions[questionIndex].answer) {score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
           
        } else {
           secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    // Question Index
    questionIndex++;

    if (questionIndex >= questions.length) {
       allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

     // Heading
     const createH1 = document.createElement("h1");
     createH1.setAttribute("id", "createH1");
     createH1.textContent = "Done!"
 
     questionsDiv.appendChild(createH1);
 
     // Paragraph
     const createP = document.createElement("p");
     createP.setAttribute("id", "createP");
 
     questionsDiv.appendChild(createP);

      //Time Remaining
    if (secondsLeft >= 0) {
        const timeRemaining = secondsLeft;
        const createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Final Score:" + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

