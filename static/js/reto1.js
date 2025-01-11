document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const timerDisplay = document.getElementById("time");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const difficultySelect = document.getElementById("difficulty");
    const attemptsDisplay = document.getElementById("attempts");
    const winsDisplay = document.getElementById("wins");

    const successSound = document.getElementById("success-sound");
    const failSound = document.getElementById("fail-sound");

    let countdown;
    let timeLeft = 10;
    let correctNumber;
    let attempts = 0;
    let wins = 0;
    
    function startGame() {
        message.textContent = "";
        grid.innerHTML = "";
        attempts++;
        attemptsDisplay.textContent = attempts;
    
        let gridSize = parseInt(difficultySelect.value);
        let totalCells = gridSize * gridSize;
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
        // Limpiar clases anteriores y asignar nueva clase según dificultad
        grid.classList.remove("grid-4", "grid-5", "grid-6");
        grid.classList.add(`grid-${gridSize}`);
    
        let baseNum = Math.floor(Math.random() * 10);
        correctNumber = baseNum;
    
        let differentIndex = Math.floor(Math.random() * totalCells);
        for (let i = 0; i < totalCells; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = i === differentIndex ? baseNum + 1 : baseNum;
    
            if (i === differentIndex) {
                cell.dataset.correct = "true";
            }
    
            cell.addEventListener("click", () => {
                if (cell.dataset.correct) {
                    message.textContent = "¡Correcto! 🎉";
                    message.style.color = "green";
                    wins++;
                    winsDisplay.textContent = wins;
                    successSound.play();
                    clearInterval(countdown);
                } else {
                    message.textContent = "Incorrecto, intenta otra vez.";
                    message.style.color = "red";
                    failSound.play();
                }
            });
    
            grid.appendChild(cell);
        }
    
        adjustTimer(gridSize);
        startTimer();
    }
    

    function adjustTimer(size) {
        if (size === 4) timeLeft = 10;
        else if (size === 5) timeLeft = 7;
        else timeLeft = 5;

        timerDisplay.textContent = timeLeft;
    }

    function startTimer() {
        clearInterval(countdown);
        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(countdown);
                message.textContent = "¡Se acabó el tiempo! ⏳";
                message.style.color = "red";
            }
        }, 1000);
    }

    restartButton.addEventListener("click", startGame);
    difficultySelect.addEventListener("change", startGame);

    startGame();
});
