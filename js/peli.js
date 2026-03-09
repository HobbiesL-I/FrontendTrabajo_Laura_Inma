
const url = `http://localhost:8080/hobbies/movies/`;
const urlValoraciones = `http://localhost:8080/hobbies/valorations`;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getPelicula = async () => {
    try {
        const result = await fetch(url);
        const peliculas = await result.json();
        const pelicula = peliculas.find(p => p.id == id);

        if (pelicula) {
            mostrarPelicula(pelicula);
            mostrarRecomendadas(peliculas, pelicula);
        } else {
            document.getElementById("detalle-pelicula").innerHTML = `
                <p>Película no encontrada</p>
                <a href="MoviePage.html">← Volver</a>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}

const mostrarPelicula = (pelicula) => {
    document.getElementById("hero-title").textContent = pelicula.title;
    document.getElementById("hero-bg").src = "./imagenes/" + pelicula.image;
    document.getElementById("genre").textContent = pelicula.genre;
    document.getElementById("director").textContent = pelicula.director;
    document.getElementById("year").textContent = pelicula.year;
    document.getElementById("duration").textContent = pelicula.duration + " min";
    document.getElementById("image").src = "./imagenes/" + pelicula.image;
    document.getElementById("image").alt = pelicula.title;
    document.getElementById("description").textContent = pelicula.description;
    document.getElementById("actors").textContent = pelicula.actors;
    document.getElementById("genre2").textContent = pelicula.genre;
    document.getElementById("director2").textContent = pelicula.director;
    document.getElementById("duration2").textContent = pelicula.duration + " min";
    document.getElementById("btn-valorar-link").href = `MovieValoration.html?id=${pelicula.id}`;
    document.getElementById("btn-editar-link").href = `editarPeli.html?id=${pelicula.id}`;

    const btnDelete = document.getElementById('btn-eliminar');
    btnDelete.innerHTML = `<i class="fa-solid fa-trash icon"></i> Eliminar`

    btnDelete.addEventListener('click', async (e) => {
        e.preventDefault();

        const confirmAction = await Swal.fire({
            title: '¡Estás a punto de eliminar la película!',
            html: `¿<strong>Segur@ que deseas eliminar</strong> la película <strong>${pelicula.title}</strong>? También se eliminarán todas las valoraciones que tenga.`,
            icon: 'warning',
            iconColor: '#8a3938',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmAction.isConfirmed) {
            await eliminarPelicula(id);
        }
        else {
            return
        }
    });
}

const eliminarPelicula = async () => {
    try {
        const res = await fetch(`http://localhost:8080/hobbies/movies/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            Swal.fire({
                title: '¡Película eliminada!',
                text: 'La película y sus valoraciones se han eliminado correctamente',
                icon: 'success',
                iconColor: '#318a3a',
                confirmButtonText: 'Volver al catálogo',
                confirmButtonColor: '#2a1418'
            }).then(() => {
                window.location.href = 'MovieListPage.html';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: `Error: ${confirmar.status}`,
                icon: 'error'
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const mostrarRecomendadas = (peliculas, pelicula) => {
    const recomendadas = peliculas
        .filter(p => p.genre === pelicula.genre && p.id != id)
        .slice(0, 4);

    const contenedor = document.getElementById("recomendadas");

    if (recomendadas.length > 0) {
        contenedor.innerHTML = recomendadas.map(p => `
            <div class="peli-recomendada" onclick="window.location.href='peli.html?id=${p.id}'">
                <img src="./imagenes/${p.image}" alt="${p.title}">
                <div class="peli-rec-info">
                    <strong>${p.title}</strong>
                    <span>${p.year} · ${p.duration} min</span>
                </div>
            </div>
        `).join("");
    } else {
        contenedor.innerHTML = "<p>No hay recomendaciones</p>";
    }
}

const getValoraciones = async () => {
    try {
        const result = await fetch(urlValoraciones);
        const todasValoraciones = await result.json();
        const valoraciones = todasValoraciones.filter(v => v.movie_id == id);

        mostrarValoraciones(valoraciones);
    } catch (error) {
        console.error(error);
    }
}

const mostrarValoraciones = (valoraciones) => {
    const lista = document.getElementById("valoraciones-lista");

    if (valoraciones && valoraciones.length > 0) {
        const avg = valoraciones.reduce((s, v) => s + v.score, 0) / valoraciones.length;
        const stars = document.getElementById("hero-stars");

        const avgEstrellas = Math.round(avg / 2);
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
            starsHtml += i <= avgEstrellas
                ? '<i class="fa-solid fa-star"></i>'
                : '<i class="fa-regular fa-star"></i>';
        }
        stars.innerHTML = starsHtml + `<span>${avg.toFixed(1)} / 10</span>`;

        lista.innerHTML = valoraciones.map(v => `
            <div class="valoracion-card">
                <div class="valoracion-header">
                    <span class="valoracion-user">👤 ${v.user_name}</span>
                    <span class="valoracion-estrellas">${v.score} / 10</span>
                </div>
                <p class="valoracion-comment">${v.comment}</p>
            </div>
        `).join("");
    }
}

getPelicula();
getValoraciones();