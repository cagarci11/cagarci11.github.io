// Actualizar reloj
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    m = m < 10 ? '0' + m : m;
    document.getElementById('clock').textContent = h + ':' + m;
}

setInterval(updateClock, 1000);
updateClock();

// Función para simular abrir Apps
function openApp(appName) {
    console.log("Abriendo: " + appName);
    // Aquí puedes hacer que aparezca un mensaje o una ventana real
    alert("Has abierto " + appName + ". ¡Pronto estará disponible!");
}