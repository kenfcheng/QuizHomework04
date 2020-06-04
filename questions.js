function initQuiz() {
    //  Initialize "time remaining" variable
        let timeRemaining=0;
    
    // function loadQuestions() {
        const questions = [
            {
                title: "Commonly used data types DO NOT include:",
                title: "Question 1: Commonly used data types DO NOT include:",
                choices: ["strings", "booleans", "alerts", "numbers"],
                answer: "alerts"
            },
            {
                title: "The condition in an if / else statement is enclosed within ____.",
                title: "Question 2: The condition in an if / else statement is enclosed within ____.",
                choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
                answer: "parentheses"
            },
            {
                title: "The instructions for a function are enclosed within ____.",
                title: "Question 3: The instructions for a function are enclosed within ____.",
                choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
                answer: "curly brackets"
            },
            {
                title: "A property of an object that is a function is called a ____.",
                title: "Question 4: A property of an object that is a function is called a ____.",
                choices: ["method", "string", "stylesheet", "boolean"],
                answer: "method"
            },
            {
                title: "The logical operator that represents 'or' is ____.",
                title: "Question 5: The logical operator that represents 'or' is ____.",
                choices: ["||", "OR", "&&", "==="],
                answer: "||"
            }
          ];
    //  Clicking the "Start Quiz" button starts the quiz, hides the landing container, and displays the quiz container
        const startButtonEl = document.getElementById("start-button");
        const timeRemainingEl = document.getElementById("time-remaining");
        const questionTitleEl = document.getElementById("question-title");
        const choiceEls = document.querySelectorAll(".button-js");
        const resultMessageEl = document.getElementById("result-message");
        const finalScoreEl = document.getElementById("final-score");
        const numQuestions = questions.length;
        function startQuiz() {
            const landingContainerEl = document.getElementById("landing-container");
            const quizContainerEl = document.getElementById("quiz-container");
            const finalContainerEl = document.getElementById("final-container");
            landingContainerEl.setAttribute("class","container d-none");
            quizContainerEl.setAttribute("class","container");
            let currentQuestion = 1;
            let score = 0;
    //  Upon starting the quiz, the time remaining variable is assigned a value equal to 15 seconds * the number of questions and starts decreasing by 1 each second
            let timeRemaining=numQuestions * 15;
            timeRemainingEl.setAttribute("value",timeRemaining);
            console.log("Timer started");
            //  Method for stopping the interval once it has started obtained from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
            let myInterval = setInterval(function() {
                if (timeRemaining<1) {
                    console.log("Timer finished!");
                    clearInterval(myInterval);
                    quizContainerEl.setAttribute("class","container d-none");
                    finalContainerEl.setAttribute("class","container");
                    return;
                }
                timeRemaining = timeRemaining - 1;
                timeRemainingEl.setAttribute("value",timeRemaining);
            },1000);
            let clickTimeout = false;
            questionTitleEl.innerHTML = questions[0].title;
            for (let i=0; i<choiceEls.length; i++) {
                choiceEls[i].innerHTML = questions[0].choices[i];
                choiceEls[i].addEventListener("click",function() {
                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(myInterval);
                    resultMessageEl.setAttribute("class","row border-top border-light");
                    if (choiceEls[i].innerHTML === questions[currentQuestion - 1].answer) {
                        resultMessageEl.children[0].children[0].innerHTML = "Correct!";
                    } else {
                        resultMessageEl.children[0].children[0].innerHTML = "Incorrect";
                        timeRemaining = timeRemaining - 15;
                        if (timeRemaining < 0) {
                            timeRemaining = 0;
                        }
                        timeRemainingEl.setAttribute("value",timeRemaining);
                    }
                    currentQuestion++;
                    if (currentQuestion>questions.length) {
                        console.log("last question reached");
                        score = timeRemaining;
                    }
                    setTimeout(function() {
                        if (currentQuestion>questions.length) {
                            // move to result page
                            quizContainerEl.setAttribute("class","container d-none");
                            finalContainerEl.setAttribute("class","container");
                            finalScoreEl.setAttribute("value",score);
                        } else {
                            for (let i=0; i<choiceEls.length; i++) {
                                questionTitleEl.innerHTML = questions[currentQuestion-1].title;
                                choiceEls[i].innerHTML = questions[currentQuestion-1].choices[i];
                            }
                            resultMessageEl.setAttribute("class","row border-top border-light d-none");
                            clickTimeout = false;
                            myInterval = setInterval(function() {
                                if (timeRemaining<1) {
                                    console.log("Timer finished!");
                                    clearInterval(myInterval);
                                    quizContainerEl.setAttribute("class","container d-none");
                                    finalContainerEl.setAttribute("class","container");
                                    return;
                                }
                                timeRemaining = timeRemaining - 1;
                                timeRemainingEl.setAttribute("value",timeRemaining);
                            },1000);
                        }
                    },2000);
                })
            }
    
        }
        startButtonEl.addEventListener("click",startQuiz);
    
    
    
    //  During the quiz, the "quiz question" field has the current question, and the answer buttons have the possible answers for that question
    //  When the user clicks one of the answer buttons, if it is the correct answer, the message "Correct" is displayed, and if not, the message "Incorrect" is displayed and 15 seconds deducted from the timer.  Either way, a new question is then loaded
    //  When the final question is answered or the timer reaches zero, the quiz container is hidden and the score container is displayed, where the user enters their initials
    
    
    }
    
    initQuiz(); 
        
    // };
    // loadQuestions(); 