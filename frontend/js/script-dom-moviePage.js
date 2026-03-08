const url = `http://localhost:8080/hobbies/movies`;

const getPeliculas = async () => {
    try {
        const result = await fetch(url);
        const peliculas = await result.json();
        const generos = agruparPorGenero(peliculas);
        crearFilas(generos);
        iniciarCarrusel();
        iniciarBuscador();
    } catch (error) {
        console.error(error);
    }
}

const agruparPorGenero = (peliculas) => {
    const generos = {};
    peliculas.forEach(peli => {
        const genero = peli.genre || "Sin categoría";
        if (!generos[genero]) generos[genero] = [];
        generos[genero].push(peli);
    });
    return generos;
}

const crearFilas = (generos) => {
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
}

const iniciarCarrusel = () => {
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
}



getPeliculas();