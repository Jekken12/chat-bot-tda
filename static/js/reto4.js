document.getElementById("startGame").addEventListener("click", startGame);

const frutas = ["Manzana", "Plátano", "Naranja", "Fresa", "Pera", "Uva", "Mango", "Sandía", "Kiwi", "Papaya"];
const distractores = ["Casa", "Coche", "Televisión", "Computadora", "Reloj", "Silla", "Montaña", "Perro", "Gato", "Sol", "Luna", "Teléfono", "Cafetera", "Camisa", "Zapato", "Avión", "Tren", "Moto", "Cuaderno", "Lámpara", "Bicicleta", "Pelota", "Libro", "Espejo", "Sombrero", "Radio", "Monitor", "Teclado", "Ratón", "Ventilador", "Puerta", "Ventana", "Cuchara", "Tenedor", "Cuchillo", "Plato", "Cámara", "Reloj", "Micrófono", "Botella", "Llaves", "Cartera", "Mochila", "Ropa", "Anillo", "Collar", "Pendientes", "Vaso", "Taza", "Bolígrafo", "Papel", "Silla", "Mesa", "Banco"];

let timeLeft, score, errors, words = [];

function startGame() {
    let difficulty = document.getElementById("difficulty").value;
    score = 0;
    errors = 0;
    document.getElementById("points").innerText = score;
    document.getElementById("errors").innerText = errors;
    document.getElementById("message").innerText = "Selecciona 10 frutas antes de que se acabe el tiempo.";
    
    document.getElementById("backgroundMusic").play(); // Iniciar música

    if (difficulty === "facil") {
        timeLeft = 30;
        words = generateWords(20, 10);
    } else if (difficulty === "medio") {
        timeLeft = 20;
        words = generateWords(50, 10);
    } else {
        timeLeft = 15;
        words = generateWords(100, 10);
    }

    document.getElementById("timeLeft").innerText = timeLeft;
    displayWords(words);

    let timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").innerText = timeLeft;
        if (timeLeft <= 0 || score >= 10 || errors > 3) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function generateWords(total, correctCount) {
    let wordList = [];
    let selectedFrutas = frutas.sort(() => 0.5 - Math.random()).slice(0, correctCount);
    let selectedDistractores = distractores.sort(() => 0.5 - Math.random()).slice(0, total - correctCount);
    wordList = [...selectedFrutas, ...selectedDistractores].sort(() => 0.5 - Math.random());
    return wordList;
}

function displayWords(words) {
    let gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "";
    
    words.forEach(word => {
        let wordElement = document.createElement("span");
        wordElement.classList.add("word");
        wordElement.innerText = word;
        wordElement.addEventListener("click", () => checkWord(word, wordElement));
        gameArea.appendChild(wordElement);
    });
}

function checkWord(word, element) {
    if (frutas.includes(word)) {
        score++;
        element.style.background = "green";
        element.style.color = "white";
        element.style.pointerEvents = "none";
    } else {
        errors++;
        element.style.background = "red";
        element.style.color = "white";
        element.style.pointerEvents = "none";
    }
    document.getElementById("points").innerText = score;
    document.getElementById("errors").innerText = errors;

    if (score >= 10 || errors > 3) {
        endGame();
    }
}

function endGame() {
    document.getElementById("backgroundMusic").pause(); // Detener música
    document.getElementById("backgroundMusic").currentTime = 0;

    if (score >= 10) {
        document.getElementById("message").innerText = "🎉 ¡Felicidades! Has seleccionado las 10 frutas correctamente.";
    } else if (errors > 3) {
        document.getElementById("message").innerText = "😓 ¡Has cometido más de 3 errores! Inténtalo de nuevo.";
    } else {
        document.getElementById("message").innerText = "⏳ ¡Tiempo agotado! Intenta mejorar tu rapidez.";
    }
}
