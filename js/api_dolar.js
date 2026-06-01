// SELECCIONAR ELEMENTOS DEL DOM
const formulario = document.getElementById("form-dolar");
const inputFecha = document.getElementById("fecha-dolar");
const resultado = document.getElementById("contenedor-cotizaciones");
const today = new Date();

// FUNCIÓN PARA MOSTRAR COTIZACIÓN 
function mostrarCotizacion(datos, titulo) {
    resultado.innerHTML = `
        <h2>${titulo}</h2>
        <p> <strong> Dólar Oficial: </strong> 
        <br>
        Compra: $ ${datos.oficial.value_buy} / Venta: $${datos.oficial.value_sell} </p>
        <p> <strong>Dólar Blue:</strong>
        <br>
        Compra: $${datos.blue.value_buy} / Venta: $${datos.blue.value_sell} </p>
        <p class="fecha-consulta"> Consulta: ${inputFecha.value || "última disponible"}</p>
    `;
}

// FUNCIÓN PARA OBTENER COTIZACIÓN POR FECHA (versión histórica)
function obtenerCotizacionPorFecha(fecha) {
    resultado.innerHTML = "<p> Cargando cotización...</p>";
    
    fetch(`https://api.bluelytics.com.ar/v2/historical?day=${fecha}`)
        .then(response => response.json())
        .then(data => {
            // Verificar si llegaron datos válidos
            if (data.blue && data.oficial) {
                mostrarCotizacion(data, `Cotización del ${fecha}`);
            } else {
                resultado.innerHTML = "<p> No hay datos disponibles para esta fecha. Probá con otra fecha (ej: 2026-05-15).</p>";
            }
        })
        .catch(error => {
            console.error("Error al consultar la API:", error);
            resultado.innerHTML = "<p> Error al cargar la cotización. Verificá tu conexión o probá otra fecha.</p>";
        });
}

// FUNCIÓN PARA OBTENER LA ÚLTIMA COTIZACIÓN 
function obtenerUltimaCotizacion() {
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())
        .then(data => {
            mostrarCotizacion(data, '📈 Última cotización del dólar');
        })
        .catch(error => {
            console.error("Error:", error);
            resultado.innerHTML = "<p> Error al cargar la cotización actual.</p>";
        });
}

// ESCUCHAR EL ENVÍO DEL FORMULARIO
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que recargue la página
    
    const fechaSeleccionada = inputFecha.value;
    
    if (!fechaSeleccionada) {
        alert("Por favor, seleccioná una fecha.");
        return;
    }
    
    obtenerCotizacionPorFecha(fechaSeleccionada);
});

// AL CARGAR LA PÁGINA, MOSTRAR LA ÚLTIMA COTIZACIÓN 
obtenerUltimaCotizacion();
