document.addEventListener("DOMContentLoaded", async () => {

    // 1. Obtener películas de la API
    const response = await fetch("http://localhost:8080/hobbies/movies");
    const peliculas = await response.json();
   



    // 2. Agrupar por género
    const generos = {};
    peliculas.forEach(peli => {
        const genero = peli.genre || "Sin categoría";
        if (!generos[genero]) generos[genero] = [];
        generos[genero].push(peli);
    });

    // 3. Crear las filas por género
    const contenedor = document.getElementById("contenedor-peliculas");

    Object.keys(generos).forEach(genero => {
        const fila = document.createElement("section");
        fila.classList.add("fila");

        fila.innerHTML = `
            <h2>${genero}</h2>
            <button class="flecha izquierda">&lt;</button>
            <div class="pelis carrusel"></div>
            <button class="flecha derecha">&gt;</button>
        `;

        const carrusel = fila.querySelector(".carrusel");

        generos[genero].forEach(peli => {
            const article = document.createElement("article");
            article.classList.add("pelicula");
            article.innerHTML = `
                <img src="imagenes/${peli.image}" alt="${peli.title}">
                <h3>${peli.title}</h3>
                <button onclick="window.location.href='peli.html?id=${peli.id}'">Más información</button>
                <button>+</button>
            `;
            carrusel.appendChild(article);
        });

        contenedor.appendChild(fila);
    });

    // 4. Carrusel
    const filas = document.querySelectorAll(".fila");
    filas.forEach(fila => {
        const flechaIzquierda = fila.querySelector(".flecha.izquierda");
        const flechaDerecha = fila.querySelector(".flecha.derecha");
        const carrusel = fila.querySelector(".carrusel");

        flechaDerecha.addEventListener("click", () => {
            carrusel.scrollBy({ left: 260, behavior: "smooth" });
        });

        flechaIzquierda.addEventListener("click", () => {
            carrusel.scrollBy({ left: -260, behavior: "smooth" });
        });
    });

    // 5. Buscador
    const buscador = document.getElementById("s");
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        document.querySelectorAll(".pelicula").forEach(peli => {
            const titulo = peli.querySelector("h3").textContent.toLowerCase();
            peli.style.display = titulo.includes(texto) ? "block" : "none";
        });
    });
});

