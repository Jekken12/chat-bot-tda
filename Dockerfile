# Usa una imagen base de Python
FROM python:3.9

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos esenciales
COPY app.py /app/
COPY requirements.txt /app/
COPY intents.json /app/
COPY labels.pkl /app/
COPY texts.pkl /app/
COPY model.h5 /app/

# Copia los archivos de frontend
COPY templates/ /app/templates/
COPY static/ /app/static/

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto donde corre Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
