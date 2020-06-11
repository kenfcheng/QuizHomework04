// High Score Section

// Declared variables
const highScore = document.querySelector("#highScore");
const clear = document.querySelector("#clear");
const goBack = document.querySelector("#goBack");

// Event listener to clear scores
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
// Retreives local stroage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (let i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}
// Event listener to move to index page
goBack.addEventListener("click", function () {
  window.location.replace("index.html");
});
