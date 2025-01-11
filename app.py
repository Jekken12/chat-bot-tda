import nltk
nltk.download('popular')
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
from keras.models import load_model
import json
import random
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Cargar el modelo
model = load_model('model.h5')

# Inicializar Flask
app = Flask(__name__)
app.secret_key = '1234'  # Necesaria para usar flash messages

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@127.0.0.1/tdah'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de Usuario
class Usuario(db.Model):
    __tablename__ = 'usuarios'  # Especifica el nombre de la tabla
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Cargar el modelo de spaCy en español
import spacy
nlp = spacy.load("es_core_news_sm")  # Usamos el modelo en español de spaCy

# Cargar las intenciones y los datos preprocesados
with open('intents.json', encoding='utf-8') as file:
    intents = json.load(file)
words = pickle.load(open('texts.pkl', 'rb'))
classes = pickle.load(open('labels.pkl', 'rb'))

# Funciones de procesamiento del texto
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    if ints:
        tag = ints[0]['intent']
        list_of_intents = intents_json['intents']
        for i in list_of_intents:
            if i['tag'] == tag:
                result = random.choice(i['responses'])
                break
        return result
    else:
        return "Lo siento, no entendí eso."

def chatbot_response(msg):
    # Procesar siempre el mensaje como si fuera en español
    res = getResponse(predict_class(msg, model), intents)
    return res

# Ruta para la página principal
@app.route("/")
def home():
    return render_template("index.html")  # Asegúrate de que index.html esté en la carpeta templates

# Ruta para obtener respuestas del chatbot
@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    print("get_bot_response: " + userText)

    # Procesar el mensaje como siempre en español
    chatbot_response_text = chatbot_response(userText)

    return chatbot_response_text

# Ruta para el registro
@app.route('/registro', methods=['GET', 'POST'])  # Ruta para la página de registro
def registro():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['password_confirm']

        # Validar que las contraseñas coincidan
        if password != confirm_password:
            flash("Las contraseñas no coinciden.")
            return redirect(url_for('registro'))

        # Verificar si el usuario ya existe
        if Usuario.query.filter_by(username=username).first():
            flash("El nombre de usuario ya está registrado.")
            return redirect(url_for('registro'))

        # Registrar al usuario
        hashed_password = generate_password_hash(password)  # Sin el método
        nuevo_usuario = Usuario(username=username, email=email, password=hashed_password)
        db.session.add(nuevo_usuario)
        db.session.commit()
        flash("Registro exitoso.")
        return redirect(url_for('home'))

    return render_template('registro.html')

# Ruta para el inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Verificar si el usuario existe
    user = Usuario.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        flash("Inicio de sesión exitoso.")
        return redirect(url_for('home'))
    else:
        flash("El usuario no existe o la contraseña es incorrecta.")
        return redirect(url_for('registro'))

# Modelo de Diario
class Diario(db.Model):
    __tablename__ = 'diario'  # Especifica el nombre de la tabla
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)  # Relación con la tabla de usuarios
    fecha = db.Column(db.Date, nullable=False)
    contenido = db.Column(db.Text, nullable=False)

# Ruta para guardar el diario
@app.route('/guardar_diario', methods=['POST'])
def guardar_diario():
    if request.method == 'POST':
        username = request.form['username']
        fecha = request.form['fecha']
        contenido = request.form['comentarios']

        # Verificar si el usuario existe
        usuario = Usuario.query.filter_by(username=username).first()
        if not usuario:
            flash("El usuario no existe. Regístrate primero.")
            return redirect(url_for('registro'))

        # Guardar entrada en el diario
        nueva_entrada = Diario(user_id=usuario.id, fecha=fecha, contenido=contenido)
        db.session.add(nueva_entrada)
        db.session.commit()
        flash("Entrada del diario guardada exitosamente.")
        return redirect(url_for('home'))

# Ruta para el diario
@app.route('/diario')
def diario():
    return render_template('diario.html')  # Asegúrate de que diario.html esté en la carpeta templates

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/articulos')
def articulos():
    return render_template('articulos.html')

@app.route('/reto1')
def reto1():
    return render_template('reto1.html')

@app.route('/reto2')
def reto2():
    return render_template('reto2.html')

@app.route('/reto3')
def reto3():
    return render_template('reto3.html')

@app.route('/reto4')
def reto4():
    return render_template('reto4.html')

@app.route('/reto5')
def reto5():
    return render_template('reto5.html')

if __name__ == "__main__":
    db.create_all()  # Crea las tablas en la base de datos
    app.run(debug=True)