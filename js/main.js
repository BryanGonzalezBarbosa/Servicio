// Esperamos a que todo el HTML cargue primero
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleccionamos el botón y el menú
    const botonMenu = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    // Le agregamos un evento de clic al botón
    botonMenu.addEventListener("click", function() {
        // Toggle hace que si la clase "abierto" no está, se la ponga, y si ya está, se la quite.
        sidebar.classList.toggle("abierto");
    });
    
});