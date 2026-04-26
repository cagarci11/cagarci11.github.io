// Función para cambiar de pantalla
function goTo(pageId) {
    const screens = document.querySelectorAll(".screen");
    
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add("active");
    }
}

// Función para actualizar el reloj
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Formato 00:00
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    document.getElementById('clock').textContent = hours + ':' + minutes;
}

// Iniciar reloj y actualizar cada segundo
setInterval(updateClock, 1000);
updateClock();