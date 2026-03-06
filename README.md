# Pasos para conectar el frontend de la rama Feature/boardgamePage a la API

** Pasos a seguir ** para conectar el contenido de la rama a la correspondiente API para poder ver el contenido que se va a mostrar en la página web

## Enlance a la rama del repositorio del backend

Hacer una copia en local de la siguiente rama: https://github.com/HobbiesL-I/BackendTrabajo_Laura_Inma/tree/Feature/BackendBoardgame

## Aplicaciones necesarias
-Visual Studio Code
-Docker Desktop

## Iniciar API
-**Iniciar el Docker**
    -Una vez hecha la copia en local abrimos la carpeta descargada dentro de Visual Studio Code y abrimos una terminal nueva.
    -Si la terminal powershell no funciona escribe cmd para cambiar a una terminal CMD
    -Dentro de la terminal vamos a lanzar el docker mediante la instrucción: docker-compose -f docker-compose.dev.yaml up -d
    -Una vez creado el docker, a veces ocurre que a los pocos segundos esta se para. Si ese es el caso, para volver a encenderla se puede hacer de dos formas:
        -Darle al boton play del contenedor dentro de la aplicación de Docker Desktop
        -Usar la siguiente instruccion en la terminal: docker-compose -f docker-compose.dev.yaml start

-**Instalar e Iniciar la API**
    -En la terminal primero escribimos npm install para instalar todas las bibliotecas usadas en el proyecto.
    -Una vez instalado todo escribimos npm start. Si la instrucción ha funcionado correctamente en la consola deberá salir el mensaje **Iniciando el backend en el puerto 8080**

Una vez iniciados el docker y la API, al abrir **boardgameListPage y boardgamePage** aparecerá la página rellenada con la información del juego de mesa en su correspondiente apartado.

-**Comprobación de las funciones de la API en Postman**
    -Si se quiere comprobar que función hace cada API se puede hacer a través de Postman.
    - Dentro del backend hay un archivo llamado **hobbies_boardgames.postman_collection.json**. Dentro están todas las funciones actuales de get, post y put de las tablas de valoraciones y juegos de mesa. Para usarlo se debe importar la colección dentro de la aplicación Postman.    