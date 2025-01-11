const colorButtons = document.querySelectorAll(".color-btn");
const startButton = document.getElementById("start-btn");
const roundCount = document.getElementById("round-count");
const attemptsCount = document.getElementById("attempts");

let sequence = [];
let userSequence = [];
let round = 0;
let attempts = 0;

const sounds = {
    red: new Audio("static/sonidos/red.mp3"),
    blue: new Audio("static/sonidos/blue.mp3"),
    green: new Audio("static/sonidos/green.mp3"),
    yellow: new Audio("static/sonidos/yellow.mp3"),
    wrong: new Audio("static/sonidos/wrong.mp3")
};

function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function flashColor(color) {
    const button = document.querySelector(`.color-btn.${color}`);
    button.classList.add("active");
    sounds[color].play();
    setTimeout(() => {
        button.classList.remove("active");
    }, 500);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            flashColor(sequence[i]);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

function nextRound() {
    round++;
    roundCount.textContent = round;
    userSequence = [];
    sequence.push(getRandomColor());
    setTimeout(playSequence, 1000);
}

function resetGame() {
    sequence = [];
    userSequence = [];
    round = 0;
    attempts++;
    roundCount.textContent = "0";
    attemptsCount.textContent = attempts;
    sounds.wrong.play();
    alert("¡Fallaste! Comienza de nuevo.");
}

colorButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const color = event.target.dataset.color;
        userSequence.push(color);
        flashColor(color);

        if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
            resetGame();
        } else if (userSequence.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    });
});

startButton.addEventListener("click", () => {
    sequence = [];
    userSequence = [];
    round = 0;
    roundCount.textContent = "0";
    nextRound();
});
