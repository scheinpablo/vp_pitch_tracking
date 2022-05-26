# Pitch Tracking
Materia: 22.47 Procesamiento de Voz

Autores: Santiago Arribere y Pablo Scheinfeld

Instituto Tecnológico de Buenos Aires

Video explicativo: https://www.youtube.com/watch?v=e1YCz0tNGB0

Algoritmo de YIN: http://audition.ens.fr/adc/pdf/2002_JASA_YIN.pdf

#### Ejecución API

```
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

La API se ejecuta en el puerto 8000.

Acceder mediante un navegador a http://localhost:8000/docs.
#### Ejecución Web App

Requisito: Ejecutar previamente la API.

Abrir una nueva terminal


```
    cd web_app
    npm i yarn
    yarn install
    npm start
```
La Web App se ejecuta en el puerto 3000.

Acceder mediante un navegador a http://localhost:3000.

