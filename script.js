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
    // Dentro de la función openApp(nombreApp)...

    else if (nombreApp === 'Notas') {
        const misNotas = [
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

        let listaHTML = '';
        misNotas.forEach(nota => {
            // ARREGLADO: Comillas corregidas aquí abajo
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
    else {
        contenido.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Contenido en desarrollo...</p>';
    }
}

// Solo para la app notas:
function mostrarNotaPorId(id, elemento) {
    // 1. Buscamos la nota en el array (tenemos que declarar misNotas fuera o volver a definir el array aquí)
    // Para que sea más fácil, recuperamos los datos del array que ya definiste en openApp
    const notas = [
        { id: 1, titulo: "2/150??", fecha: "10 de abril de 2026", cuerpo: "Las tornas han cambiado..." },
        { id: 2, titulo: "...", fecha: "28 de febrero de 2026", cuerpo: "Ahora me ha dado por los vinilos..." },
        { id: 3, titulo: "Lista", fecha: "20 de abril de 2026", cuerpo: "patatas..." }
    ];
    
    const nota = notas.find(n => n.id === id);

    // 2. Quitamos el active de los demás
    document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
    elemento.classList.add('active');

    // 3. Pintamos
    const display = document.getElementById('note-display');
    display.innerHTML = `
        <h2 class="note-detail-title">${nota.titulo}</h2>
        <span class="note-detail-date">${nota.fecha}</span>
        <div class="note-detail-body">${nota.cuerpo.replace(/\n/g, '<br>')}</div>
    `;
    
    // 4. OPCIONAL: En móvil, podemos hacer scroll automático hacia abajo para ver la nota
    if(window.innerWidth < 600) {
        display.scrollIntoView({ behavior: 'smooth' });
    }
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
