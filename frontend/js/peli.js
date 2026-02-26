const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const response = await fetch("http://localhost:8080/hobbies/movies");
const peliculas = await response.json();

const pelicula = peliculas[id];

if (pelicula) {
  document.getElementById("titulo").textContent = pelicula.titulo;
  document.getElementById("imagen").src = pelicula.imagen;
  document.getElementById("imagen").alt = pelicula.titulo;
  document.getElementById("descripcion").textContent = pelicula.descripcion;
  document.getElementById("genero").textContent = pelicula.genero;
  document.getElementById("director").textContent = pelicula.director;
  document.getElementById("año").textContent = pelicula.año;
  document.getElementById("actores").textContent = pelicula.actores.join(", ");
  document.getElementById("duracion").textContent = pelicula.duracion;
} else {
  document.getElementById("detalle-pelicula").innerHTML = `
    <p>Película no encontrada</p>
    <a href="index.html">← Volver</a>
  `;
}
