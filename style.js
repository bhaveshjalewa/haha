document.addEventListener("DOMContentLoaded", function(){

let startBtn = document.getElementById("startBtn");
let startScreen = document.getElementById("startScreen");
let gameContainer = document.getElementById("gameContainer");

console.log("JS Loaded");
console.log(startBtn);

startBtn.addEventListener("click", function(){
    console.log("Button Clicked");

    startScreen.style.display = "none";
    gameContainer.style.display = "block";
});

});
