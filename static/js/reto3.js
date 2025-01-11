// Variables de control
let timeLeft = 300; // 5 minutos por defecto
let timer;
let isRunning = false;
let isWorkSession = true;
let workTime = 300;
let breakTime = 60;
let completedSessions = 0;

// Sonidos
const alarmSound = new Audio("static/sonidos/alarma.mp3");

// Elementos del DOM
const timeDisplay = document.getElementById("time-display");
const progressBar = document.querySelector(".progress-bar");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");
const statusText = document.getElementById("status-text");
const rewardText = document.getElementById("reward-text");

// Formatea el tiempo en mm:ss
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Actualiza el temporizador y la barra de progreso
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
    let totalTime = isWorkSession ? workTime : breakTime;
    progressBar.style.width = `${(timeLeft / totalTime) * 100}%`;
}

// Iniciar temporizador
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                completeSession();
            }
        }, 1000);
    }
}

// Pausar temporizador
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Reiniciar temporizador
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    timeLeft = workTime;
    completedSessions = 0;
    updateDisplay();
    statusText.textContent = "Preparado para empezar";
    rewardText.textContent = "";
}

// Completar una sesión
function completeSession() {
    clearInterval(timer);
    alarmSound.play();

    if (isWorkSession) {
        completedSessions++;
        statusText.textContent = "¡Toma un descanso!";
        timeLeft = breakTime;
    } else {
        statusText.textContent = "¡Tiempo de trabajar!";
        timeLeft = workTime;
    }

    isWorkSession = !isWorkSession;
    updateDisplay();
    isRunning = false;

    // Mostrar recompensa si completó 3 sesiones sin pausa
    if (completedSessions % 3 === 0 && isWorkSession) {
        rewardText.textContent = "🎉 ¡Bien hecho! Has completado 3 sesiones seguidas.";
    }
}

// Actualizar los tiempos personalizados
workTimeInput.addEventListener("change", () => {
    workTime = workTimeInput.value * 60;
    if (isWorkSession) {
        timeLeft = workTime;
        updateDisplay();
    }
});

breakTimeInput.addEventListener("change", () => {
    breakTime = breakTimeInput.value * 60;
    if (!isWorkSession) {
        timeLeft = breakTime;
        updateDisplay();
    }
});

// Cambiar entre modo nocturno y diurno
document.getElementById('nightModeBtn').addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
});

// Guardar el historial de sesiones
function saveSessionHistory(workTime, breakTime) {
    let history = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    const sessionData = {
        workTime: workTime,
        breakTime: breakTime,
        date: new Date().toLocaleString()
    };
    history.push(sessionData);
    localStorage.setItem('sessionHistory', JSON.stringify(history));
}

// Mostrar el historial de sesiones
function showSessionHistory() {
    let history = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    const historyContainer = document.getElementById('sessionHistory');
    historyContainer.innerHTML = ''; // Limpiar historial antes de mostrar
    history.forEach(session => {
        const sessionItem = document.createElement('div');
        sessionItem.classList.add('session-item');
        sessionItem.textContent = `Trabajo: ${session.workTime} min | Descanso: ${session.breakTime} min | Fecha: ${session.date}`;
        historyContainer.appendChild(sessionItem);
    });
}

// Llamar a la función para mostrar el historial al cargar la página
document.addEventListener('DOMContentLoaded', showSessionHistory);

// Solicitar permiso para mostrar notificaciones
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Mostrar notificación cuando la fase termine
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: 'static/icon.png'  // O cualquier icono que elijas
        });
    }
}

// Ejemplo: Mostrar una notificación al finalizar la fase de trabajo
function onWorkSessionEnd() {
    showNotification("¡Tiempo de trabajo terminado!", "Es hora de descansar.");
}

// Llamar a esta función cuando termine la fase de trabajo o descanso


// Eventos de botones
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Inicializar pantalla
updateDisplay();
