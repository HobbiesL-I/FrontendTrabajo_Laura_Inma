console.log("js conectado");
function goToMovie(url) {
    window.location.href = url;
}
document.addEventListener("DOMContentLoaded", () => {
  const filas = document.querySelectorAll('.fila');

  filas.forEach(fila => {
    const flechaIzquierda = fila.querySelector('.flecha.izquierda');
    const flechaDerecha = fila.querySelector('.flecha.derecha');
    const carrusel = fila.querySelector('.carrusel');
    const peliculas = fila.querySelectorAll('.pelicula');

    // Creamos una copia de las películas para simular infinito
    peliculas.forEach(pelicula => {
      const clone = pelicula.cloneNode(true);
      carrusel.appendChild(clone);
    });

    const scrollAmount = peliculas[0].offsetWidth + 20; 

    flechaDerecha.addEventListener('click', () => {
      carrusel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    flechaIzquierda.addEventListener('click', () => {
      carrusel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    carrusel.addEventListener('scroll', () => {
      if(carrusel.scrollLeft >= carrusel.scrollWidth / 2){
        carrusel.scrollLeft = 0;
      }
      if(carrusel.scrollLeft <= 0){
        carrusel.scrollLeft = carrusel.scrollWidth / 2;
      }
    });
  });
});

