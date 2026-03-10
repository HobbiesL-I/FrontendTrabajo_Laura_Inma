const urlMovies = `http://localhost:8080/hobbies/movies`;

const añadirPelicula = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const genre = document.getElementById("genre").value;
    const director = document.getElementById("director").value;
    const year = document.getElementById("year").value;
    const duration = document.getElementById("duration").value;
    const actors = document.getElementById("actors").value;
    const image = document.getElementById("image").value;
    const trailer = document.getElementById("trailer").value;

    

    if (!title || !description || !genre || !director || !year || !duration || !actors || !image) {
        Swal.fire({
                    title: 'Por favor rellena todos los campos',
                    confirmButtonText: 'Volver al formulario'
                });
        return;
    }
    const cargarGeneros = async () => {
        try {
            const result = await fetch(urlMovies);
            const peliculas = await result.json();

            // Obtener géneros únicos
            const generos = [...new Set(peliculas.map(p => p.genre))];

            const select = document.getElementById("genre");
            generos.forEach(genero => {
                const option = document.createElement("option");
                option.value = genero;
                option.textContent = genero;
                select.appendChild(option);
            });
        } catch (error) {
            console.error(error);
        }
    }

    cargarGeneros();

    const pelicula = {
        title: title,
        description: description,
        genre: genre,
        director: director,
        year: parseInt(year),
        duration: parseInt(duration),
        actors: actors,
        image: image,
        trailer: trailer
    };

    try {
        const res = await fetch(urlMovies, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pelicula)
        });

        if (res.ok) {
            Swal.fire({
                    title: 'Nuevos datos añadidos!',
                    text: 'Se ha añadido la película a la base de datos',
                    icon: 'success',
                    iconColor: '#318a3a',
                    confirmButtonText: 'Volver al catálogo',
                    confirmButtonColor: '#2a1418'
                }).then(() => {
                    window.location.href = `MovieListPage.html`;
                });
        } else {
            Swal.fire({
                    title: 'Error',
                    text: `Error: ${res.status}`,
                    icon: 'error'
                });
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("btn-añadir").addEventListener("click", añadirPelicula);