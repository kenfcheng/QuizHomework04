var questions = [
  {
    question:
      "Which of the following is a valid type of function javascript supports?",
    choices: ["named function", "anonymous function", "none", "both"],
    answer: "both",
  },
  {
    question:
      "What is the HTML tag under which one can write the JavaScript code?",
    choices: ["<javascript>", "<js>", "<script>", "All of the Above"],
    answer: "<script>",
  },
  {
    question:
      "The external JavaScript file must contain <script> tag. True or False?",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question:
      "When being assigned to a variable, strings must be enclosed in what?",
    choices: ["parenthesis", "curly brackets", "quotes", "comma"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log",
  },
];

// Variables
var score = 0;
let questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

let secondsLeft = 60;
// Time Intervals
var holdInterval = 0;
// Time Penalty
var penalty = 10;
//  Create element
var ulCreate = document.createElement("ul");

// Timer and Display
timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// Question and Choice rendering
function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }
  // New Question Choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
//Compares choices with answers
function compare(event) {
  var element = event.target;
  const createDiv = document.createElement("div");
  createDiv.setAttribute("id", "createDiv");

  if (element.matches("li")) {
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "Correct! The answer is:" + questions[questionIndex].answer;
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:" + questions[questionIndex].answer;
    }
  }

  // Tells You your score at the end
  questionIndex++;

  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent =
      "All Done!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  wrapper.appendChild(createDiv);
}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // Heading
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "Done!";

  questionsDiv.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  //Time Remaining
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Final Score:" + timeRemaining;

    questionsDiv.appendChild(createP2);
  }

  // Entering Initials
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

  // Stores Initials and Scores
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      let finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      let allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // ReDirects to Score Page
      window.location.replace("scores.html");
    }
  });
}
