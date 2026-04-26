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
    const musicaSJ = document.getElementById('bg-music');
    const musicaSafari = document.getElementById('safari-music');

    // Función interna para parar todo antes de abrir una app nueva
    function pararTodo() {
        musicaSJ.pause();
        musicaSafari.pause();
    }

    titulo.innerText = nombreApp;
    ventana.style.display = 'flex';
    pararTodo(); // Paramos cualquier música que estuviera sonando

    if (nombreApp === 'Galería') {
        contenido.innerHTML = `
            <div class="gallery-grid">
                <img src="oroRosa.jpg" class="gallery-item" onclick="playVideo('ValgaPena.mp4')">
                <img src="sadSummer.jpg" class="gallery-item" onclick="playVideo('40noches.mp4')">
                <img src="casanova.jpg" class="gallery-item" onclick="playVideo('ganas.mp4')">
                <img src="23A.jpg" class="gallery-item" onclick="playVideo('tanFrio.mp4')">
            </div>
        `;
    } 
    else if (nombreApp === 'Safari' || nombreApp === 'Navegador') {
        contenido.innerHTML = `
            <div class="safari-container">
                <div class="safari-address-bar">
                    <div class="url-text">conamør.com</div>
                </div>
                <div class="safari-offline-content">
                    <div class="broken-heart-pixel" style="font-size: 50px; margin-bottom: 20px;">💔</div>
                    <h2>Sin conexión a Internet</h2>
                    <p>Comprueba tu conexión Wi-Fi o de datos móviles, o recibe una notificación cuando vuelva la conexión</p>
                </div>
            </div>
        `;
        musicaSafari.play().catch(e => console.log("Audio bloqueado"));
    }
    else if (nombreApp === 'San Jorge') {
        contenido.innerHTML = `
            <div class="sj-container">
                <h2 class="sj-title">VALE POR UNA FOTO DE FOTOMATÓN</h2>
                <img src="rosas.webp" class="sj-foto">
                <p class="sj-text">Supongo que el día de San Jorge es subjetivo...</p>
            </div>
        `;
        musicaSJ.play().catch(e => console.log("Audio bloqueado"));
    } 
    else {
        contenido.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Contenido en desarrollo...</p>';
    }
}

function closeCustomApp() {
    const ventana = document.getElementById('custom-window');
    const musicaSJ = document.getElementById('bg-music');
    const musicaSafari = document.getElementById('safari-music');

    if (ventana) {
        ventana.style.display = 'none';
        
        // Pausar y resetear música de San Jorge
        musicaSJ.pause();
        musicaSJ.currentTime = 0;
        
        // Pausar y resetear música de Safari
        musicaSafari.pause();
        musicaSafari.currentTime = 0;
    }
}

function playVideo(videoSrc) {
    const contenido = document.getElementById('app-content-area');
    
    contenido.innerHTML = `
        <div class="video-player-container">
            <div class="back-btn" onclick="openApp('Galería')">← Volver</div>
            <video class="full-video" controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Tu navegador no soporta vídeos.
            </video>
        </div>
    `;
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
