function goTo(pageId) {
    // 1. Ocultar todas las pantallas
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    // 2. Mostrar la pantalla seleccionada
    const targetScreen = document.getElementById(pageId);
    if (targetScreen) {
        targetScreen.classList.add("active");
    } else {
        console.error("La pantalla " + pageId + " no existe.");
    }
}