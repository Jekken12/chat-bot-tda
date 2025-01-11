import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import json
import pickle
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD # Importación correcta de SGD
import random

# tokenizing and lematizing
words=[]
classes = []
documents = []
ignore_words = ['?', '!']
data_file = open('intents.json', encoding='utf-8').read()
intents = json.loads(data_file)

for intent in intents['intents']:
    for pattern in intent['patterns']:
        #tokenize each word
        w = nltk.word_tokenize(pattern)
        words.extend(w)
        #add documents in the corpus
        documents.append((w, intent['tag']))
        # add to our classes list
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
# lemmatize and lower each word and remove duplicates
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words]
words = sorted(list(set(words)))
# sort classes
classes = sorted(list(set(classes)))
# documents = combination between patterns and intents
print (len(documents), "documents")
# classes = intents
print (len(classes), "classes", classes)
# words = all words, vocabulary
print (len(words), "unique lemmatized words", words)
pickle.dump(words,open('texts.pkl','wb'))
pickle.dump(classes,open('labels.pkl','wb'))
# create our training data
training = []
# create an empty array for our output
output_empty = [0] * len(classes)

# Crear el conjunto de entrenamiento
training = []  # Asegúrate de que 'training' sea una lista

for doc in documents:
    # Inicializar nuestra bolsa de palabras
    bag = []
    # Lista de palabras tokenizadas para el patrón
    pattern_words = doc[0]
    # Lematizar cada palabra - crear la palabra base, para representar palabras relacionadas
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]

    # Crear nuestro array de bolsa de palabras con 1 si se encuentra la palabra en el patrón actual
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)

    # La salida es un '0' para cada etiqueta y '1' para la etiqueta actual (para cada patrón)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1

    # Agregar el bag y la fila de salida a la lista 'training'
    training.append([bag, output_row])

# Guardar los datos de entrenamiento
pickle.dump(training, open('training.pkl', 'wb'))

# Mezclamos nuestras características
random.shuffle(training)

# Accedemos a los patrones y a las intenciones usando un solo índice
train_x = [item[0] for item in training]  # Patrones
train_y = [item[1] for item in training]  # Intenciones

print("Training data created")

# Create model - 3 layers. First layer 128 neurons, second layer 64 neurons and 3rd output layer contains number of neurons
# equal to number of intents to predict output intent with softmax
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

# Utilizamos el argumento 'learning_rate' en lugar de 'lr'
sgd = SGD(learning_rate=0.01, momentum=0.9, nesterov=True)

model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

#fitting and saving the model
hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)
model.save('model.h5')
print("model created")