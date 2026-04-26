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
function openApp(nombreApp) {
    const ventana = document.getElementById('custom-window');
    const titulo = document.getElementById('window-title');
    const contenido = document.getElementById('app-content-area');
    const musica = document.getElementById('bg-music');

    titulo.innerText = nombreApp;
    ventana.style.display = 'flex';

    // Lógica para el contenido de San Jorge
    if (nombreApp === 'San Jorge') {
        contenido.innerHTML = `
        <div class="sj-container">
            <h2 class="sj-title">VALE POR UNA FOTO DE FOTOMATÓN</h2>
            <p class="sj-text">espero q no expire nunca</p>
            <p class="sj-subtext">Supongo que el día de San Jorge es subjetivo</p>
            <p class="sj-subtext">Pero tranqui que no te quedas sin tu rosa</p>

            <img src="rosas.webp" class="sj-foto">

        </div>
    `;
        // Intentar reproducir música
        musica.play().catch(e => console.log("El navegador bloqueó el auto-play, haz clic en la ventana"));
    } else {
        // Para las otras apps, dejamos el contenido vacío o genérico
        contenido.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Contenido en desarrollo...</p>';
        musica.pause(); // Pausar música si abres otra cosa
    }
}

function closeCustomApp() {
    const ventana = document.getElementById('custom-window');
    const musica = document.getElementById('bg-music');
    if (ventana) {
        ventana.style.display = 'none';
        musica.pause();
        musica.currentTime = 0; // Reinicia la canción
    }
}

function syncBattery() {
    // Verificamos si el navegador soporta esta función
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            
            // Función para actualizar el texto en la pantalla
            function updateBatteryUI() {
                const level = Math.floor(battery.level * 100);
                const isCharging = battery.charging ? "⚡" : "🔋";
                
                // Buscamos el elemento con la clase "battery" que creamos antes
                const batteryElement = document.querySelector('.battery');
                if (batteryElement) {
                    batteryElement.textContent = `${level}% ${isCharging}`;
                }
            }

            // Actualizar al cargar
            updateBatteryUI();

            // Escuchar si cambia el porcentaje o si se conecta el cargador
            battery.addEventListener('levelchange', updateBatteryUI);
            battery.addEventListener('chargingchange', updateBatteryUI);
        });
    } else {
        console.log("Tu navegador no permite leer la batería real.");
    }
}

// Ejecutamos la función
syncBattery();
