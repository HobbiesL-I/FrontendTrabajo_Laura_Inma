async function cargarPelicula() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const response = await fetch("http://localhost:8080/hobbies/movies");
  const peliculas = await response.json();

  const pelicula = peliculas.find(p => p.id == id);

  if (pelicula) {
    document.getElementById("title").textContent = pelicula.title;
    document.getElementById("image").src = "./imagenes/" + pelicula.image;
    document.getElementById("image").alt = pelicula.title;
    document.getElementById("description").textContent = pelicula.description;
    document.getElementById("genre").textContent = pelicula.genre;
    document.getElementById("director").textContent = pelicula.director;
    document.getElementById("year").textContent = pelicula.year;
    document.getElementById("actors").textContent = pelicula.actors;
    document.getElementById("duration").textContent = pelicula.duration + " min";
  } else {
    document.getElementById("detalle-pelicula").innerHTML = `
      <p>Película no encontrada</p>
      <a href="MoviePage.html">← Volver</a>
    `;
  }
}

cargarPelicula();
