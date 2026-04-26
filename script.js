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
    console.log("Intentando abrir app: " + nombre);

    // 1. Buscamos la ventana y el título
    const ventana = document.getElementById('custom-window');
    const titulo = document.getElementById('window-title');
    
    if (ventana && titulo) {
        titulo.innerText = nombre; // Cambia "Cargando..." por el nombre
        ventana.style.display = 'flex'; // Muestra la ventana
    } else {
        console.error("No se encontró la ventana o el título en el HTML");
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

function closeCustomApp() {
    const ventana = document.getElementById('custom-window');
    if (ventana) {
        ventana.style.display = 'none';
    }
}