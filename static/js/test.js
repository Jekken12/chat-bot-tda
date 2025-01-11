// Definimos las preguntas
const preguntas = [
    "¿Con qué frecuencia comete errores cuando tiene que trabajar en un proyecto aburrido o difícil?",
    "¿Con qué frecuencia tiene dificultades para mantener su atención cuando está aburrido o con un trabajo repetitivo?",
    "¿Con qué frecuencia tiene dificultades para concentrarse en cuestiones que otras personas le comunican?",
    "¿Con qué frecuencia tiene dificultades para concretar los detalles de un proyecto una vez que las partes más difíciles se han conseguido?",
    "¿Con qué frecuencia tiene dificultades en ordenar las cosas en una tarea que requiere organización?",
    "Cuando tiene una tarea que requiere mucha reflexión, ¿con qué frecuencia la evita o demora en iniciarla?",
    "¿Con qué frecuencia extravía cosas o tiene dificultades para encontrarlas en su casa o en el trabajo?",
    "¿Con qué frecuencia se distrae por actividad o ruido a su alrededor?",
    "¿Con qué frecuencia tiene dificultades para recordar citas u obligaciones?",
    "¿Con qué frecuencia se inquieta o mueve sus manos o pies cuando tiene que permanecer sentado durante largo tiempo?",
    "¿Con qué frecuencia abandona su asiento en reuniones o en otras situaciones en las cuales debe permanecer sentado?",
    "¿Con qué frecuencia tiene sensación de inquietud?",
    "¿Con qué frecuencia tiene dificultades para relajarse durante el tiempo libre?",
    "¿Con qué frecuencia se nota forzado en realizar actividades, como impulsado por un motor?",
    "¿Con qué frecuencia habla demasiado en ambientes sociales?",
    "Cuando mantiene una conversación, ¿con qué frecuencia permite que los demás terminen sus intervenciones?",
    "¿Con qué frecuencia tiene dificultad para esperar su turno en situaciones que requieran una espera?",
    "¿Con qué frecuencia interrumpe a los demás mientras están ocupados?"
];

// Generar preguntas dinámicamente en el formulario
const preguntasContainer = document.getElementById("preguntas");

preguntas.forEach((pregunta, index) => {
    let div = document.createElement("div");
    div.classList.add("pregunta");
    div.innerHTML = `
        <p>${index + 1}. ${pregunta}</p>
        <div class="opciones">
            <label><input type="radio" name="p${index}" value="0" required> Nunca</label>
            <label><input type="radio" name="p${index}" value="1"> Algunas veces</label>
            <label><input type="radio" name="p${index}" value="2"> Muy a menudo</label>
        </div>
    `;
    preguntasContainer.appendChild(div);
});

// Función para calcular el resultado del test
function calcularTDAH() {
    let respuestas = [];
    for (let i = 0; i < preguntas.length; i++) {
        let seleccion = document.querySelector(`input[name="p${i}"]:checked`);
        if (seleccion) {
            respuestas.push(parseInt(seleccion.value));
        } else {
            alert(`Por favor, responde todas las preguntas.`);
            return;
        }
    }

    // Calcular puntaje total
    let puntajeTotal = respuestas.reduce((total, valor) => total + valor, 0);
    let porcentajeTDAH = (puntajeTotal / 36) * 100;

    // Interpretación del resultado
    let interpretacion = "";
    if (porcentajeTDAH <= 20) {
        interpretacion = "Muy baja probabilidad de TDAH.";
    } else if (porcentajeTDAH <= 40) {
        interpretacion = "Baja posibilidad, algunos síntomas ocasionales.";
    } else if (porcentajeTDAH <= 60) {
        interpretacion = "Probabilidad moderada, podrían existir síntomas de TDAH.";
    } else if (porcentajeTDAH <= 80) {
        interpretacion = "Alta probabilidad, recomendable evaluación con un psicólogo.";
    } else {
        interpretacion = "Muy alta probabilidad, múltiples síntomas característicos de TDAH.";
    }

    // Mostrar resultado en pantalla
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p>Puntaje Total: ${puntajeTotal}/36</p>
        <p>Porcentaje de TDAH: <strong>${porcentajeTDAH.toFixed(2)}%</strong></p>
        <p>${interpretacion}</p>
    `;
    resultadoDiv.style.background = porcentajeTDAH >= 60 ? "#ffb3b3" : porcentajeTDAH >= 40 ? "#ffe6b3" : "#b3ffb3";
}
