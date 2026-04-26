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
    const musicaSafari = document.getElementById('safari-music');

    titulo.innerText = nombreApp;
    ventana.style.display = 'flex';

    // 1. Caso Galería
    if (nombreApp === 'Galería') {
        musica.pause();
        musicaSafari.pause();

        contenido.innerHTML = `
            <div class="gallery-grid">
                <img src="oroRosa.jpg" class="gallery-item" onclick="playVideo('ValgaPena.mp4')">
                <img src="sadSummer.jpg" class="gallery-item" onclick="playVideo('40noches.mp4')">
                <img src="casanova.jpg" class="gallery-item" onclick="playVideo('ganas.mp4')">
                <img src="23A.jpg" class="gallery-item" onclick="playVideo('tanFrio.mp4')">
            </div>
        `;
    } 
    // 2. Caso San Jorge
    else if (nombreApp === 'San Jorge') {
        musicaSafari.pause();
        contenido.innerHTML = `
            <div class="sj-container">
                <h2 class="sj-title">VALE POR UNA FOTO DE FOTOMATÓN</h2>
                <p class="sj-subtext">espero q no expire nunca</p>
                <p class="sj-subtext"></p>
                <p class="sj-text">Supongo que el día de San Jorge es subjetivo...</p>
                <p class="sj-text">Pero tranqui que no te quedas sin tu rosa</p>
                <img src="rosas.webp" class="sj-foto">
            </div>
        `;
        musica.play().catch(e => console.log("Audio bloqueado"));
    } 
    // Caso navegador
    else if (nombreApp === 'Safari' || nombreApp === 'Navegador') {

        contenido.innerHTML = `
            <div class="safari-container">
                <div class="safari-address-bar">
                    <div class="url-text">amorcegocupido.com</div>
                </div>
                <div class="safari-offline-content">
                    <img src="cora.png" class="broken-heart-img">
                    <h2>Sin conexión a Internet</h2>
                    <p>Comprueba tu conexión Wi-Fi o de datos móviles, o recibe una notificación cuando vuelva la conexión</p>
                </div>
            </div>
        `;

        musicaSafari.play().catch(e => console.log("Audio bloqueado"));
    }
    // 3. Cualquier otra App
    else {
        musica.pause();
        contenido.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Contenido en desarrollo...</p>';
    }
}

function closeCustomApp() {
    const ventana = document.getElementById('custom-window');
    const musica = document.getElementById('bg-music');
    const musicaSafari = document.getElementById('safari-music');

    if (ventana) {
        ventana.classList.remove('active');
        setTimeout(() => {
            ventana.style.display = 'none';
            
            // Paramos ambos audios
            musicaGeneral.pause();
            musicaGeneral.currentTime = 0;
            
            musicaSafari.pause();
            musicaSafari.currentTime = 0;
        }, 300);
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
