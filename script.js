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

    // Referencias directas
    const musicaSJ = document.getElementById('bg-music');
    const musicaSafari = document.getElementById('safari-music');

    // 1. Reset total de audios antes de hacer NADA
    musicaSJ.pause();
    musicaSJ.currentTime = 0;
    musicaSafari.pause();
    musicaSafari.currentTime = 0;

    titulo.innerText = nombreApp;
    ventana.style.display = 'flex';

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
        // Reproducir solo Safari
        musicaSafari.play().catch(e => console.log("Error audio Safari"));
    }
    else if (nombreApp === 'San Jorge') {
        contenido.innerHTML = `
            <div class="sj-container">

            <h2 class="sj-title">VALE POR UNA FOTO DE FOTOMATÓN</h2>
            <p class="sj-subtext">espero q no expire nunca</p>
            <p class="sj-text">Supongo que el día de San Jorge es subjetivo...</p>
            <p class="sj-text">Pero tranqui que no te quedas sin tu rosa</p>

            <img src="rosas.webp" class="sj-foto">

            </div>
        `;
        // Reproducir solo SJ
        musicaSJ.play().catch(e => console.log("Error audio SJ"));
    }
    // musica
    else if (nombreApp === 'Musica') {
        contenido.innerHTML = `
            <div style="text-align:center; padding:40px; color:#333;">
                <h3>Tu Playlist</h3>
                <p style="color: #666; margin-top:10px;">Próximamente...</p>
            </div>
        `;
    }
    // notas
    else if (nombreApp === 'Notas') {
        let listaHTML = '';
        misNotasContenidos.forEach(nota => {
            listaHTML += `
            <div class="note-item" onclick="mostrarNotaPorId(${nota.id}, this)">
                <h4>${nota.titulo}</h4>
                <p>${nota.preview}</p>
                <span>${nota.fecha}</span>
            </div>
        `;
        });

        contenido.innerHTML = `
        <div class="notes-app-container">
            <div class="notes-sidebar">
                ${listaHTML}
            </div>
            <div class="notes-content" id="note-display">
                <p style="color:#8e8e93; text-align:center; margin-top:50px;">Selecciona una nota para leerla</p>
            </div>
        </div>
    `;
    }
    // exports
    else if (nombreApp === 'Amor' || nombreApp === 'Exports') {
        renderExportsList();
    }
    else {
        contenido.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Contenido en desarrollo...</p>';
    }
}

// Solo para la app notas:

// Definimos las notas fuera de las funciones para que estén disponibles siempre
const misNotasContenidos = [
    {
        id: 1,
        titulo: "2/150??",
        preview: "Las tornas han...",
        fecha: "10 de abril de 2026",
        cuerpo: "Las tornas han cambiado, \ny eso sí lo tengo claro \n150 rolas q ella si q se ha escuchado \nescuchando recy tiradas sobre el pasto \nahora sí q estoy soñando \nespinas y rosas decorando mi cuarto \nlo estaba manifestando \ncomo Nico miseria sin un duro en la cartera \npero está noche se cena donde la niña quiera \ny si pide la luna entera \nartemis III saldra rápido a por ella"
    },
    {
        id: 2,
        titulo: "...",
        preview: "Ahora me...",
        fecha: "28 de febrero de 2026",
        cuerpo: "Ahora me ha dado por los vinilos, \nmañana me dará por querer estar contigo"
    },
    {
        id: 3,
        titulo: "Lista",
        preview: "huevos...",
        fecha: "20 de abril de 2026",
        cuerpo: "patatas \ntaquitos de jamon \ntortitas \narroz \nfiletes de pollo \nleche sin lactosa \ncereales sin gluten \n(no puede comer mas)"
    }
];

function mostrarNotaPorId(id, elemento) {
    // Buscamos la nota en el array global
    const nota = misNotasContenidos.find(n => n.id === id);

    if (!nota) return;

    // Marcamos la nota activa visualmente
    document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
    elemento.classList.add('active');

    // Pintamos el contenido
    const display = document.getElementById('note-display');
    display.innerHTML = `
        <h2 class="note-detail-title">${nota.titulo}</h2>
        <span class="note-detail-date">${nota.fecha}</span>
        <div class="note-detail-body">${nota.cuerpo.replace(/\n/g, '<br>')}</div>
    `;

    // En móviles, hacemos que el scroll del contenido suba al principio al cambiar de nota
    display.scrollTop = 0;
}

// SOLO PARA EXPORTS
function renderExportsList() {
    const contenido = document.getElementById('app-content-area');
    const misArchivos = [
        { id: 1, nombre: "1/150 (no sé)", url: "1_150.mp4", tamano: "394 KB", subtitulo: "KARLO11" }
    ];

    let html = '<div class="exports-container">';
    misArchivos.forEach(archivo => {
        html += `
            <div class="music-item" onclick='abrirReproductor(${JSON.stringify(archivo)})'>
                <span class="icon-audio">🎵</span>
                <span class="file-name">${archivo.nombre}</span>
                <span class="file-size">${archivo.tamano}</span>
            </div>
        `;
    });
    html += '</div>';
    contenido.innerHTML = html;
}

// Función para mostrar el reproductor (Imagen 2)
function abrirReproductor(archivo) {
    const contenido = document.getElementById('app-content-area');
    
    contenido.innerHTML = `
        <div class="player-view">
            <div class="back-arrow" onclick="renderExportsList()">✕</div>
            
            <div class="album-cover" style="background: none;"> 
                <img src="1_150foto.jpeg" style="width:100%; height:100%; border-radius:15px; object-fit:cover;">
            </div>

            <div class="player-title">${archivo.nombre.replace('.mp3', '')}</div>
            <div class="player-subtitle">${archivo.subtitulo}</div>

            <audio id="audio-principal" autoplay>
                <source src="${archivo.url}" type="audio/mpeg">
            </audio>

            <div class="audio-timeline">
                <div class="timeline-bar">
                    <div class="timeline-progress" id="progreso-barra"></div>
                </div>
                <div class="time-labels">
                    <span id="tiempo-actual">0:00</span>
                    <span id="tiempo-total">0:00</span>
                </div>
            </div>

            <div class="player-btns">
                <span style="cursor:pointer">⏮</span>
                <div class="play-circle" style="cursor:pointer" onclick="togglePlay()">⏸</div>
                <span style="cursor:pointer">⏭</span>
            </div>
        </div>
    `;
    const audio = document.getElementById('audio-principal');
    const barra = document.getElementById('progreso-barra');
    const txtActual = document.getElementById('tiempo-actual');
    const txtTotal = document.getElementById('tiempo-total');

    // EVENTO: Cuando el audio carga, saca la duración total
    audio.onloadedmetadata = function() {
        txtTotal.innerText = formatearTiempo(audio.duration);
    };

    // EVENTO: Mientras el audio suena, mueve la barra y el tiempo
    audio.ontimeupdate = function() {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        barra.style.width = porcentaje + "%";
        txtActual.innerText = formatearTiempo(audio.currentTime);
    };
}

// Función para Play/Pause
function togglePlay() {
    const audio = document.getElementById('audio-principal');
    const btn = document.getElementById('play-pause-btn');

    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸"; // Cambia a icono de pausa
    } else {
        audio.pause();
        btn.innerText = "▶"; // Cambia a icono de play
    }
}

// Función para convertir segundos en formato 0:00
function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return min + ":" + (seg < 10 ? '0' : '') + seg;
}

// ESTA FUNCIÓN ES LA QUE CIERRA TODO
function closeCustomApp() {
    const ventana = document.getElementById('custom-window');
    const musicaSJ = document.getElementById('bg-music');
    const musicaSafari = document.getElementById('safari-music');
    const contenido = document.getElementById('app-content-area');

    if (ventana) {
        ventana.style.display = 'none';

        // Pausa forzada
        musicaSJ.pause();
        musicaSafari.pause();

        // Reset del tiempo
        musicaSJ.currentTime = 0;
        musicaSafari.currentTime = 0;

        // Limpiar el contenido para que si hay un video también se pare
        document.getElementById('app-content-area').innerHTML = "";
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
        navigator.getBattery().then(function (battery) {

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
