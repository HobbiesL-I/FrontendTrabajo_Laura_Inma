const urlMovies = `http://localhost:8080/hobbies/movies`;
const urlValoraciones = `http://localhost:8080/hobbies/valorations`;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let puntuacion = 0;

const cargarTitulo = async () => {
    try {
        const result = await fetch(urlMovies);
        const peliculas = await result.json();
        const pelicula = peliculas.find(p => p.id == id);

        if (pelicula) {
            document.getElementById("title").textContent = pelicula.title;
            document.getElementById("volver").href = `peli.html?id=${id}`;
        }
    } catch (error) {
        console.error(error);
    }
}

const iniciarEstrellas = () => {
    const estrellas = document.querySelectorAll(".estrella");

    estrellas.forEach(estrella => {
        estrella.addEventListener("click", () => {
            puntuacion = estrella.dataset.value;
            document.getElementById("puntuacion-texto").textContent = puntuacion;

            estrellas.forEach(e => {
                e.classList.toggle("activa", e.dataset.value <= puntuacion);
            });
        });
    });
}

const enviarValoracion = async () => {
    const user_name = document.getElementById("user_name").value || "anónimo";
    const comment = document.getElementById("comment").value;

    if (!comment) {
        Swal.fire({
            title: 'Por favor escribe un comentario',
            confirmButtonText: 'Volver al formulario'
        });
        return;
    }

    if (puntuacion == 0) {
        Swal.fire({
            title: 'Por favor selecciona una puntuación',
            confirmButtonText: 'Volver al formulario'
        });
        return;
    }

    const valoracion = {
        movie_id: parseInt(id),
        user_name: user_name,
        score: parseFloat(puntuacion) * 2, // convierte de escala 5 a escala 10
        comment: comment
    };

    try {
        const res = await fetch(urlValoraciones, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valoracion)
        });

        if (res.ok) {
            Swal.fire({
                title: '¡Valoración enviada!',
                text: 'Se ha añadido la valoracion a la película',
                icon: 'success',
                iconColor: '#318a3a',
                confirmButtonText: 'Volver al juego de mesa',
                confirmButtonColor: '#2a1418'
            }).then(() => {
                window.location.href = `peli.html?id=${id}`;
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

document.getElementById("btn-enviar").addEventListener("click", enviarValoracion);

cargarTitulo();
iniciarEstrellas();