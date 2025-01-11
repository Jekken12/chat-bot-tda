let selectedParagraph = ""; // Párrafo seleccionado
let difficultyTime = 0; // Tiempo de lectura según dificultad
let progressInterval; // Intervalo de progreso
let startTime, endTime; // Control de tiempo
let timerInterval; // Intervalo del temporizador, debe ser global


function startGame(difficulty) {
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("game-area").style.display = "block";

    // Definir párrafo y tiempo según la dificultad
    const paragraphs = {
        easy: [
            { title: "El TDAH en niños", text: "El trastorno por déficit de atención e hiperactividad (TDAH) es una afección crónica que afecta a millones de niños y a menudo continúa en la edad adulta. El TDAH incluye una combinación de problemas persistentes, tales como dificultad para mantener la atención, hiperactividad y comportamiento impulsivo.  Los niños con TDAH también pueden tener dificultades con la baja autoestima, las relaciones problemáticas y el bajo rendimiento escolar. Los síntomas a veces disminuyen con la edad.  Sin embargo, algunas personas nunca superan por completo sus síntomas de TDAH. Pero pueden aprender estrategias para tener éxito. Aunque el tratamiento no cura el TDAH, puede ayudar mucho con los síntomas. El tratamiento comúnmente involucra medicamentos e intervenciones conductuales. El diagnóstico y tratamiento tempranos pueden hacer una gran diferencia en el resultado." },
            { title: "Quetzalcóatl (mito azteca)", text: "Quetzalcóatl, o serpiente emplumada, era un poderoso dios mesoamericano. Había enseñado numerosas cosas a los humanos, como cultivar o medir el tiempo. Podía cambiar de forma, y en una ocasión que tomó la forma del dios del viento (Ehécatl), bajó al inframundo. El dios del inframundo y de la muerte era su padre, llamado Mictlantecuhtli. El motivo de su ida al inframundo no fue otro que el de robar los huesos de los muertos y, a partir de ahí, crear una nueva raza de humanos. Cuando estaba saliendo del inframundo, a Ehécatl / Quetzalcóatl se le cayeron los huesos, que fueron picoteados por un ave. Los huesos perdieron su forma debido a los picotazos, por lo que la nueva raza humana salió deforme y condenada a la muerte." },
            { title: "Medusa y Perseo", text: "Medusa era una de las tres gorgonas, seres monstruosos que convertían en piedra a quien miraran. Sus cabellos eran serpientes y tenían colmillos semejantes a los de jabalí. Otras versiones dicen que Medusa tenía una extraordinaria belleza hasta que Atenea la transformó en un monstruo. Perseo, hijo de Zeus y Dánae fue retado por el rey Polidectes a matar a una de las gorgonas: Medusa. Perseo fue ayudado por los dioses: Hermes le dio unas sandalias aladas para poder volar, Hades le dio un casco que lo hacía invisible y, Atenea, un escudo. El héroe se adentró en la guarida de Medusa y utilizó el escudo de Atenea como espejo. De esta forma, podía ver a Medusa sin que ella lo mirara directamente a él y así evitar convertirse en piedra. Perseo le cortó la cabeza y la guardó en un saco. La cabeza cortada conservaba la capacidad de transformar en piedra. Perseo la utilizó para tal fin al convertir en roca al monstruo que iba a devorar a Andrómeda y para petrificar a Polidectes. De la sangre de Medusa nació Pegaso, el caballo alado." }
        ],
        medium: [
            { title: "¿Qué es Ingeniería?", text: "La ingeniería es una profesión basada en el uso de los conocimientos científicos para transformar ideas en acción. De cada orientación depende la especialidad que con más intensidad se enseñe. Pero dado que la ingeniería trabaja con el mundo real, las áreas de la física y la química son comunes a todas las carreras, conjuntamente con la matemática que sirve para modelar los fenómenos que se estudian. A diferencia de las ciencias puras cuyo objetivo es el conocimiento por el conocimiento en sí mismo, la ingeniería se basa en la aplicación del conocimiento científico en la solución de problemas reales. En muchos aspectos se puede asociar la ingeniería a un arte. Porque requiere de capacidad creativa y de imaginación para concebir cosas que aún no existen. Luego aplica los conocimientos científicos de manera sistemática para transformar esa idea en una realidad. Emplea la ciencia como un medio, pero está íntimamente ligada con la experimentación, y la gestión. Su objetivo final es lograr resultados con el mejor uso de los recursos. Para desarrollarse en el mundo de la ingeniería se requiere interés y aptitud hacia las ciencias básicas y las matemáticas; habilidad para aplicarlas a los problemas prácticos; visualizar relaciones, describirlas en palabras e interpretar los resultados en términos de objetivos. Pero fundamentalmente lo que se requiere es una mente analítica, creatividad y sentido común. El propósito de la enseñanza de la ingeniería es liberar, desarrollar y entrenar estas habilidades y aptitudes." },
            { title: "Las 12 pruebas de Hércules",text: "Las doce pruebas fueron impuestas a Hércules como una forma de penitencia y expiación por sus acciones pasadas. A pesar de ser hijo de Zeus, Hércules era mortal y había cometido un terrible acto bajo la influencia de la diosa Hera, quien buscaba vengarse de él debido a su linaje divino y a la infidelidad de Zeus. En un ataque de locura inducido por Hera, Hércules mató a su esposa Megara y a sus hijos. Cuando recuperó la cordura y se dio cuenta de la magnitud de su crimen, Hércules sintió una profunda culpa y desesperación. Buscando purificar su alma y redimirse ante los dioses, el héroe acudió al oráculo de Delfos, quien le aconsejó que se sometiera a servidumbre bajo las órdenes de su primo Euristeo, rey de Micenas, durante doce años y completara las tareas que este le impusiera. 1.-León de Nemea | Matar al feroz león que aterrorizaba Nemea y cuya piel era impenetrable. 2.-Hidra de Lerna | Derrotar a la hidra, una serpiente acuática de múltiples cabezas, cortando y quemando sus cabezas. 3.-Cierva de Cerinea | Capturar la cierva dorada de Cerinea, conocida por sus veloces y dorados cuernos. 4.-Jabalí del monte Erimanto | Capturar vivo al descomunal jabalí que devastaba los campos de Erimanto. 5.-Aves del Lago Estinfalo | Ahuyentar y capturar a las aves devoradoras que infestaban el lago Estinfalo. 6.-Establo de Augías | Limpiar en un solo día los establos del rey Augías, donde se acumulaba una inmensa cantidad de estiércol. 7.-Toro de Creta | Capturar al furioso toro de Creta y llevarlo ante el rey Euristeo. 8.-Yeguas de Diomedes | Dominar y llevar de vuelta las yeguas carnívoras de Diomedes, el rey tracio. 9.-Cinturón de Hipólita | Obtener el cinturón de Hipólita, la reina de las Amazonas. 10.-Ganado de Gerión | Robar el ganado del gigante Gerión, que poseía tres cuerpos y vivía en el extremo occidental del mundo. 11.-Manzanas del jardín de las Hespérides | Obtener las manzanas doradas del jardín custodiado por las Hespérides y el dragón Ladón. 12.-Cerbero, el perro de tres cabezas | Descender al inframundo y traer a Cerbero, el feroz perro guardián, ante Euristeo.",
            },
            { title: "¿Qué es la química?", text: "La química es la ciencia que estudia la composición, estructura y propiedades de la materia, incluyendo su relación con la energía y también los cambios que pueden darse en ella a través de las llamadas reacciones. Es la ciencia que estudia las sustancias y las partículas que las componen, así como las distintas dinámicas que entre éstas pueden darse. La química es una de las grandes ciencias contemporáneas, cuya aparición revolucionó el mundo para siempre. Esta ciencia ha ofrecido explicaciones funcionales y comprobables para la compleja conducta de los materiales conocidos, capaces de explicar tanto su permanencia como sus cambios. Por otro lado, los conocimientos químicos están presentes en la vida cotidiana, en la medida en que empleamos sustancias naturales y creamos otras artificiales. Procesos como la cocción, la fermentación, la metalurgia, la creación de materiales inteligentes e incluso muchos de los procesos que tienen lugar en nuestros cuerpos, pueden ser explicados a través de una perspectiva química (o bioquímica). Por otro lado, el dominio de la química permitió el surgimiento de la industria: la transformación de materiales a voluntad del hombre para crear objetos útiles o los materiales necesarios para fabricarlos. En ese sentido, se trata de una de las ciencias que mayor impacto ha tenido en el mundo y en la historia de la humanidad." }
        ],
        hard: [
            { title: "Napoleón Bonaparte", text: "Napoleón Bonaparte (1769-1821) fue un general y político francés nacido en Córcega que reinó como emperador de Francia con el nombre de Napoleón I de 1804 a 1814 y de nuevo brevemente en 1815. Estableció el mayor imperio continental europeo desde Carlomagno e introdujo reformas liberales en las tierras que conquistó a costa de las destructivas Guerras Napoleónicas (1803-1815). Nacido en el seno de una familia de la nobleza menor corsa, Napoleón alcanzó la prominencia en el ejército francés durante las guerras revolucionarias francesas (1792-1802), donde lideró campañas militares en Italia y Egipto. Se hizo con el control de la República Francesa en el golpe de Estado del 18 de brumario de 1799 y se coronó emperador de Francia en 1804. Napoleón y su famosa Grande Armée lucharon contra varias coaliciones de potencias europeas; en el momento de los Tratados de Tilsit de julio de 1807, su autoridad abarcaba la mayor parte de Europa occidental y central. Sin embargo, tras el desastroso fracaso de su invasión a Rusia en 1812, la mayor parte de Europa se volvió contra él. Fue derrotado y exiliado a la isla mediterránea de Elba en abril de 1814, para regresar triunfante a Francia al año siguiente, iniciando el periodo de su segundo reinado conocido como los Cien Días. Pronto fue derrotado de nuevo en la batalla de Waterloo (18 de junio de 1815), tras lo cual fue exiliado por última vez a la isla de Santa Elena, en el Atlántico Sur, donde murió el 5 de mayo de 1821. Napoleón es recordado sobre todo por su carrera militar, a lo largo de la cual libró 60 batallas y solo perdió siete. Sus innovaciones militares cambiaron la guerra europea: utilizó el servicio militar obligatorio, popularizó la implantación de los cuerpos de ejército como la unidad más grande de un ejército y fue pionero en ciertas tácticas militares que se han estudiado desde entonces. A menudo se lo considera, junto a Alejandro Magno y Julio César, uno de los generales más brillantes de la historia. También implantó un conjunto de leyes civiles, más conocido como el Código Napoleónico, que se adoptó en gran parte de la Europa continental e influyó en los sistemas judiciales de muchas naciones modernas. Considerado alternativamente como reformador y autócrata, belicista y defensor de las libertades, Napoleón goza de una reputación controvertida, pero sigue siendo una de las figuras más conocidas de la historia occidental." },
            { title : "Orgullo y prejuicio",
                "text": "Orgullo y prejuicio, escrita por Jane Austen, es una novela que explora las relaciones humanas en la Inglaterra del siglo XIX, centrada en la vida de la familia Bennet. La historia se centra en Elizabeth Bennet, una joven inteligente y decidida, que vive con sus padres y hermanas en una sociedad donde las expectativas sobre el matrimonio y las clases sociales son estrictas. Elizabeth se enfrenta a los prejuicios sociales, que la sociedad dicta respecto al amor y el matrimonio, y se ve atraída por el misterioso y aparentemente orgulloso Sr. Darcy. La relación entre Elizabeth y Darcy comienza con malentendidos y prejuicios mutuos, pero a medida que ambos personajes se conocen mejor, surgen cambios en sus corazones. A lo largo de la novela, Elizabeth va descubriendo que sus primeras impresiones de Darcy eran erróneas, y que, a pesar de su orgullo inicial, él es una persona noble y generosa. Por otro lado, Darcy también se enfrenta a sus propios prejuicios y aprenda a apreciar la inteligencia y la independencia de Elizabeth. La novela aborda temas como el orgullo, el prejuicio, las diferencias sociales y el amor verdadero, cuestionando las normas sociales y el papel que juega el dinero en las decisiones de matrimonio. A través de los personajes de Elizabeth y Darcy, Austen nos muestra cómo el amor verdadero no depende de la riqueza o el estatus social, sino de la comprensión, el respeto mutuo y la superación de las primeras impresiones. Además, la obra explora la importancia de la autocomprensión y el crecimiento personal, ya que ambos personajes deben reflexionar sobre sus propios defectos para alcanzar la felicidad juntos. Orgullo y prejuicio es una obra que sigue siendo muy relevante en la actualidad, destacando la importancia de la honestidad y la comunicación en las relaciones humanas."
            },
            {
                title: "Cien años de soledad",
                text: "Cien años de soledad, escrita por Gabriel García Márquez, es una de las obras más representativas del realismo mágico y la literatura latinoamericana. La novela narra la historia de la familia Buendía a lo largo de varias generaciones, comenzando con José Arcadio Buendía, quien fundó el pueblo ficticio de Macondo. A través de los Buendía, García Márquez explora temas universales como el amor, el destino, la soledad, el poder y la muerte. A lo largo de la obra, los personajes se ven atrapados en un ciclo de repetición, donde los mismos errores y tragedias se repiten a lo largo de las generaciones. Uno de los temas clave de la novela es la soledad, que afecta a todos los miembros de la familia Buendía, quienes, a pesar de sus esfuerzos por escapar de ella, terminan repitiendo los mismos patrones de conducta. El amor, por otro lado, es una fuerza poderosa, pero también destructiva. Los personajes se ven arrastrados por sus pasiones, que a menudo los llevan a situaciones trágicas. La obra también reflexiona sobre el tiempo, presentando una visión circular del mismo, en la que el pasado, el presente y el futuro se entrelazan. A lo largo de la historia, el realismo mágico se mezcla con la realidad, creando una atmósfera en la que lo extraordinario se presenta como algo natural. La historia se desarrolla en un mundo en el que lo sobrenatural es parte de la vida cotidiana, desde la ascensión al cielo de Remedios, la bella, hasta la presencia de fantasmas y el poder de la alquimia. El estilo narrativo de García Márquez es único, con frases largas y poéticas que, a menudo, mezclan lo real con lo imaginario. Cien años de soledad también hace referencia a la historia de América Latina, con sus luchas políticas y sociales, y presenta una crítica a la repetición de la historia y la falta de cambio. La obra es un testimonio de la capacidad de García Márquez para crear un mundo literario complejo, lleno de simbolismos y significados profundos, que sigue siendo relevante en el contexto de la literatura universal."
            }
        ]
    };

    const times = {
        easy: 300, // 5 minutos
        medium: 240, // 4 minutos
        hard: 180 // 3 minutos
    };

    // Seleccionar un párrafo aleatorio según la dificultad
    const selectedParagraph = paragraphs[difficulty][Math.floor(Math.random() * paragraphs[difficulty].length)];
    const difficultyTime = times[difficulty];

    // Limpiar el área de párrafos
    const paragraphContainer = document.getElementById("paragraph");
    paragraphContainer.innerHTML = ""; // Limpiar el contenido previo

    // Crear los elementos de título y texto para el párrafo seleccionado
    const paragraphElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    const textElement = document.createElement("p");

    titleElement.textContent = selectedParagraph.title; // Establecer el título
    textElement.textContent = selectedParagraph.text;   // Establecer el texto

    // Agregar los elementos al contenedor de párrafos
    paragraphElement.appendChild(titleElement);
    paragraphElement.appendChild(textElement);
    paragraphContainer.appendChild(paragraphElement); // Agregar al DOM

    // Establecer el título del párrafo
    document.getElementById("paragraph-title").innerText = "Lee el siguiente párrafo:";

    // Mostrar el botón de finalización de lectura
    document.getElementById("finish-reading").style.display = "block";

    // Iniciar la barra de progreso y el temporizador
    startProgress(difficultyTime);
    startTimer(difficultyTime);
    startTime = new Date();
}

function startProgress(time) {
    let progress = document.getElementById("progress");
    let width = 0;
    clearInterval(progressInterval);
    progress.style.width = "0%";

    const step = 100 / time; // Avance por segundo

    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
        } else {
            width += step;
            progress.style.width = width + "%";
        }
    }, 1000); // Se actualiza cada segundo
}

function startTimer(duration) {
    let timerDisplay = document.getElementById("timer");
    let timeLeft = duration;

    const timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.innerText = `Tiempo restante: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        } else {
            timeLeft--;
        }
    }, 1000);
}

function finishReading() {
    endTime = new Date(); // Capturar tiempo de lectura

    // Detener la barra de progreso
    clearInterval(progressInterval);  // Esto detiene el progreso de la barra

    // Detener el temporizador
    clearInterval(timerInterval);  // Esto detiene el temporizador

    document.getElementById("paragraph").style.display = "none";
    document.getElementById("finish-reading").style.display = "none";

    document.getElementById("timer").innerText = "Lectura finalizada.";

    // Llamamos a la función para cargar las preguntas
    loadQuestions();  // Aquí es donde se muestran las preguntas

    document.getElementById("questions").style.display = "block";
}

// Generamos preguntas aleatorias
const allQuestions = [
    "¿De qué trata el párrafo?",
    "¿Cuál es la idea principal?",
    "Menciona una palabra clave del párrafo.",
    "¿Qué información nueva aprendiste del párrafo?",
    "¿Qué ejemplo se menciona en el párrafo?",
    "¿Por qué es importante lo que se menciona en el párrafo?",
    "¿Qué detalle se destaca en el párrafo?",
    "¿Qué hecho o evento se menciona en el párrafo?",
    "¿Cómo se relaciona este párrafo con lo que se ha dicho previamente?",
    "¿Qué conclusión se puede sacar del párrafo?",
    "¿Cuál es el tono del párrafo? (Ejemplo: formal, informal, serio, humorístico)",
    "¿Hay algún dato numérico en el párrafo? Si es así, menciona uno.",
    "¿Quiénes son los personajes o sujetos mencionados en el párrafo?",
    "¿Qué se está describiendo en el párrafo?",
    "¿Qué acción ocurre en el párrafo?",
    "¿Qué emociones se transmiten en el párrafo?",
    "¿Qué causa o efecto se describe en el párrafo?",
    "¿El párrafo presenta alguna opinión o punto de vista?",
    "¿Qué se sugiere o recomienda en el párrafo?",
    "¿Cómo podría resumirse el párrafo en una sola frase?"
];

// Función para seleccionar 3 preguntas aleatorias
function getRandomQuestions() {
    let shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random()); // Mezclamos las preguntas
    return shuffledQuestions.slice(0, 3); // Seleccionamos las primeras 3 preguntas
}

function loadQuestions() {
    let selectedQuestions = getRandomQuestions();  // Aquí seleccionamos las 3 preguntas aleatorias

    let questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";  // Limpiamos cualquier contenido previo

    // Generamos preguntas en el DOM
    selectedQuestions.forEach((question, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${question}</p><input type="text" id="answer-${index}" placeholder="Escribe tu respuesta aquí">`;
        questionContainer.appendChild(div);
    });

    // Mostramos el contenedor de preguntas
    document.getElementById("questions").style.display = "block";
}

function finishAnswering() {
    document.getElementById("questions").style.display = "none";

    // **Solo se vuelve a mostrar el párrafo sin preguntas ni respuestas**
    document.getElementById("paragraph").style.display = "block";

    document.getElementById("score-input").style.display = "block";
}

function showMotivationalMessage() {
    let score = document.getElementById("score").value;
    let message = "";

    if (score == 3) {
        message = "¡Excelente trabajo! 😊";
    } else if (score == 2) {
        message = "¡Muy bien! Sigue mejorando. 💪";
    } else {
        message = "¡No te desanimes! Sigue practicando. 🚀";
    }

    document.getElementById("motivation-message").innerText = message;
    document.getElementById("restart-button").style.display = "block";
}

function restartGame() {
    location.reload();  // Recarga la página y reinicia el juego
}
