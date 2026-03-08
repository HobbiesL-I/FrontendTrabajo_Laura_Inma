const urlMovies = `http://localhost:8080/hobbies/movies`;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const cargarPelicula = async () => {
    try {
        const result = await fetch(`${urlMovies}/${id}`);
        const pelicula = await result.json();

        document.getElementById("title").value = pelicula.title;
        document.getElementById("description").value = pelicula.description;
        document.getElementById("genre").value = pelicula.genre;
        document.getElementById("director").value = pelicula.director;
        document.getElementById("year").value = pelicula.year;
        document.getElementById("duration").value = pelicula.duration;
        document.getElementById("actors").value = pelicula.actors;
        document.getElementById("image").value = pelicula.image;
        document.getElementById("volver").href = `peli.html?id=${id}`;

    } catch (error) {
        console.error(error);
    }
}

const guardarCambios = async () => {
    const pelicula = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        director: document.getElementById("director").value,
        year: parseInt(document.getElementById("year").value),
        duration: parseInt(document.getElementById("duration").value),
        actors: document.getElementById("actors").value,
        image: document.getElementById("image").value
    };

    try {
        const res = await fetch(`${urlMovies}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pelicula)
        });

        if (res.ok) {
            alert("¡Película actualizada!");
            window.location.href = `peli.html?id=${id}`;
        } else {
            alert("Error al actualizar la película");
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("btn-guardar").addEventListener("click", guardarCambios);

cargarPelicula();