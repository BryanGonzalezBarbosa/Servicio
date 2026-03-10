// 1. TU BASE DE DATOS LOCAL
// Aquí pones exactamente los nombres de tus archivos (con todo y el .mp3)
const miLibreria = [
    { titulo: "El Monte Everest", archivo: "El Monte Everest No Tiene Nada En Contra De Mi Porque Estoy En La Cima Del Mundo.mp3" },
    { titulo: "Bad Romance", archivo: "Lady Gaga - Bad Romance (Lyrics).mp3" },
    { titulo: "Smooth", archivo: "Santana - Smooth (Stereo) ft. Rob Thomas.mp3" }
];

// Atrapamos los elementos
const contenedor = document.getElementById('contenedorCanciones');
const modal = document.getElementById('cuadraditoPrueba');
const btnReproducir = document.getElementById('btnReproducirPrueba');
const btnCerrar = document.getElementById('btnCerrar');
const reproductor = document.getElementById('miReproductor');
const tituloModal = document.getElementById('tituloCancionPrueba');
const btnDescargar = document.getElementById('btnDescargar');
const btnDescargarPartitura = document.getElementById('btnDescargarPartitura');

// 2. GENERAR LA LISTA AUTOMÁTICAMENTE
miLibreria.forEach(cancion => {
    // Creamos un <li> y un <button> por cada canción en tu lista
    const elementoLista = document.createElement('li');
    const boton = document.createElement('button');
    
    boton.textContent = `${cancion.titulo}`;
    // Le armamos la ruta correcta: salimos de /html y entramos a /assets/musica/
    boton.dataset.src = `../assets/musica/${cancion.archivo}`; 
    boton.dataset.nombre = cancion.titulo;

    // Le agregamos la acción al botón recién creado
    boton.addEventListener('click', function() {
        reproductor.src = this.dataset.src;
        tituloModal.textContent = `Prueba: ${this.dataset.nombre}`; // Cambia el título del cuadradito
        btnDescargar.href = this.dataset.src; // Le pasamos la ruta de la canción
        btnDescargar.download = cancion.archivo; // Le decimos con qué nombre guardarlo
        const nombrePdf = cancion.archivo.replace('.mp3', '.pdf');
        btnDescargarPartitura.href = `../assets/partituras/${nombrePdf}`;
        btnDescargarPartitura.download = nombrePdf;
        modal.style.display = 'block';
        reproductor.pause(); 
        btnReproducir.textContent = 'Reproducir prueba';
    });

    elementoLista.appendChild(boton);
    contenedor.appendChild(elementoLista);
});

// 3. LA LÓGICA DEL TIEMPO (Se queda igual que antes)
btnReproducir.addEventListener('click', function() {
    if (reproductor.paused) {
        reproductor.currentTime = 0; // empezar desde el inicio
        reproductor.play();
        btnReproducir.textContent = 'Pausar prueba';
        reproductor.addEventListener('timeupdate', vigilarTiempo);
    } else {
        reproductor.pause();
        btnReproducir.textContent = 'Reproducir prueba';
    }
});

function vigilarTiempo() {
    if (reproductor.currentTime >= 30) { // detener a los 30 segundos
        reproductor.pause();
        reproductor.currentTime = 0; // opcional: regresar al inicio
        btnReproducir.textContent = 'Reproducir prueba';
        reproductor.removeEventListener('timeupdate', vigilarTiempo);
    }
}

btnCerrar.addEventListener('click', function() {
    modal.style.display = 'none';
    reproductor.pause();
});