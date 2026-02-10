const peliculas = {
  "iron-man": {
    titulo: "Iron Man ",
    imagen: "imagenes/iron-man.jpg",
    descripcion: "Tony Stark se enfrenta a un poderoso enemigo mientras lucha con su propia identidad."
  },
  "guardianes-de-la-galaxia": {
    titulo: "Guardianes de la Galaxia",
    imagen: "imagenes/guardianes-de-la-galaxia.jpg",
    descripcion: "Un grupo de inadaptados se une para salvar la galaxia. lorem"
  },
  "capitana-marvel": {
    titulo: "Capitana Marvel",
    imagen: "imagenes/capitana marvel.jpg",
    descripcion: "Carol Danvers descubre sus poderes y su verdadero origen."
  },
  "MARVEL X-MEN": {
    titulo: "X-Men",
    imagen: "imagenes/MARVEL X-MEN.jpg",
    descripcion: "Un grupo de mutantes lucha por su supervivencia en un mundo hostil."
  },
  "Lida de la justicia": {
    titulo: "Liga de la Justicia",
    imagen: "imagenes/Lida de la justicia.jpg",
    descripcion: "Un grupo de superhéroes se une para proteger la Tierra."
  },
  "Batman vs Superman": {
    titulo: "Batman vs Superman",
    imagen: "imagenes/Batman vs Superman.jpg",
    descripcion: "Batman y Superman se enfrentan en una batalla épica."
  },
  "doctor strange": {
    titulo: "Doctor Strange",
    imagen: "imagenes/doctor strange.jpg",
    descripcion: "Un neurocirujano descubre el mundo de la magia y las dimensiones ocultas."
  },


  
};

// 1 Leer el id de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2️ Si existe la peli, la mostramos
if (peliculas[id]) {
  document.getElementById("titulo").textContent = peliculas[id].titulo;
  document.getElementById("imagen").src = peliculas[id].imagen;
  document.getElementById("imagen").alt = peliculas[id].titulo;
  document.getElementById("descripcion").textContent = peliculas[id].descripcion;
} else {
  document.getElementById("detalle-pelicula").innerHTML = `
    <p>Película no encontrada</p>
    <a href="index.html">← Volver</a>
  `;
}
