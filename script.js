// Declared variables
const highScore = document.querySelector("#highScore");
const clear = document.querySelector("#clear");
const goBack = document.querySelector("#goBack");

// will clear the scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Pull from local storage
const allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (const i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// goes to index.html
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});