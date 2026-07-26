// ============================================================
// CARPETA 13 - PANEL PRINCIPAL
// Integra APIs, storage, graficos, alertas y temporizadores.
// ============================================================

// ------------------------------
// 1. API utilizadas
// ------------------------------
var API_PAISES = "https://countriesnow.space/api/v0.1/countries/flag/images";
var API_CLIMA = "https://api.open-meteo.com/v1/forecast";
var API_FLAGS = "https://flagcdn.com/w160";

// ------------------------------
// 2. Elementos principales del DOM
// ------------------------------
var nombreSesion = document.getElementById("nombreSesion");
var btnCerrarSesion = document.getElementById("btnCerrarSesion");

var kpiPaises = document.getElementById("kpiPaises");
var kpiUltimoPais = document.getElementById("kpiUltimoPais");
var kpiCiudad = document.getElementById("kpiCiudad");
var kpiTemperatura = document.getElementById("kpiTemperatura");

var selectPais = document.getElementById("selectPais");
var banderaPreview = document.getElementById("banderaPreview");
var btnGuardarPais = document.getElementById("btnGuardarPais");
var resultadoPais = document.getElementById("resultadoPais");

var selectCiudad = document.getElementById("selectCiudad");
var btnConsultarClima = document.getElementById("btnConsultarClima");
var resultadoClima = document.getElementById("resultadoClima");

var campoMensaje = document.getElementById("campoMensaje");
var estadoMensaje = document.getElementById("estadoMensaje");

var btnSweet = document.getElementById("btnSweet");
var btnToast = document.getElementById("btnToast");

var btnActualizarGrafico = document.getElementById("btnActualizarGrafico");
var datosSession = document.getElementById("datosSession");
var datosLocal = document.getElementById("datosLocal");
var btnGuardarLocal = document.getElementById("btnGuardarLocal");
var btnLimpiarLocal = document.getElementById("btnLimpiarLocal");
var btnVerStorage = document.getElementById("btnVerStorage");

// ------------------------------
// 3. Variables globales simples
// ------------------------------
var paises = [];
var temporizador;
var graficoPractica;

// ------------------------------
// 4. Evento inicial
// ------------------------------
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
  // Mostrar nombre guardado en sessionStorage
  var usuario = sessionStorage.getItem("usuario");
  if (usuario) {
    nombreSesion.textContent = usuario;
  } else {
    nombreSesion.textContent = "Sin sesion";
  }

  // Cargar paises en el select
  cargarPaises();

  // Dibujar grafico inicial
  crearGrafico();

  // Actualizar informacion de storage
  actualizarStorageEnPantalla();
  actualizarKpis();
}

// ------------------------------
// 5. Eventos de botones y campos
// ------------------------------

// Cerrar sesion: limpiar sessionStorage y regresar al login
btnCerrarSesion.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "index.html";
});

// Guardar nacionalidad seleccionada en localStorage
btnGuardarPais.addEventListener("click", function () {
  var valor = selectPais.value;
  if (!valor) {
    Swal.fire("Atencion", "Seleccione un pais primero.", "info");
    return;
  }
  localStorage.setItem("nacionalidadGuardada", valor);
  Toastify({
    text: "Nacionalidad guardada: " + valor,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#198754" }
  }).showToast();
  actualizarKpis();
});

// Consultar clima de la ciudad seleccionada
btnConsultarClima.addEventListener("click", consultarClima);

// Evento input con temporizador
campoMensaje.addEventListener("input", function () {
  estadoMensaje.textContent = "Escribiendo...";
  clearTimeout(temporizador);
  temporizador = setTimeout(function () {
    estadoMensaje.textContent = "";
  }, 1000);
});

// SweetAlert2 confirmacion
btnSweet.addEventListener("click", function () {
  Swal.fire({
    title: "Desea continuar?",
    text: "Esta es una confirmacion de SweetAlert2.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Si, continuar",
    cancelButtonText: "Cancelar"
  }).then(function (resultado) {
    if (resultado.isConfirmed) {
      Swal.fire("Confirmado", "Accion ejecutada correctamente.", "success");
    }
  });
});

// Toastify notificacion
btnToast.addEventListener("click", function () {
  Toastify({
    text: "Notificacion exitosa con Toastify!",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    style: {
      background: "linear-gradient(to right, #198754, #20c997)"
    }
  }).showToast();
});

// Actualizar grafico con numeros aleatorios
btnActualizarGrafico.addEventListener("click", actualizarGraficoAleatorio);

// Guardar dato de prueba en localStorage
btnGuardarLocal.addEventListener("click", function () {
  var fecha = new Date().toLocaleString();
  localStorage.setItem("datoPrueba", "Guardado el " + fecha);
  localStorage.setItem("contadorVisitas", (parseInt(localStorage.getItem("contadorVisitas") || "0") + 1).toString());
  actualizarStorageEnPantalla();
  Toastify({
    text: "Dato guardado en localStorage.",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#1d4ed8" }
  }).showToast();
});

// Limpiar localStorage
btnLimpiarLocal.addEventListener("click", function () {
  localStorage.clear();
  actualizarStorageEnPantalla();
  actualizarKpis();
  Toastify({
    text: "localStorage limpiado.",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#dc3545" }
  }).showToast();
});

// Actualizar vista de storage
btnVerStorage.addEventListener("click", actualizarStorageEnPantalla);

// ------------------------------
// 6. Funciones
// ------------------------------

// Cargar paises desde la API y llenar el select
async function cargarPaises() {
  try {
    var respuesta = await fetch(API_PAISES);
    if (!respuesta.ok) throw new Error("No se pudieron cargar los paises.");
    var datos = await respuesta.json();
    paises = datos.data || [];

    // Ordenar por nombre
    paises.sort(function (a, b) {
      var nombreA = a.name || "";
      var nombreB = b.name || "";
      return nombreA.localeCompare(nombreB);
    });

    // Limpiar select y agregar opcion por defecto
    selectPais.innerHTML = '<option value="">Seleccione un pais...</option>';

    // Llenar el select con paises
    paises.forEach(function (pais) {
      var option = document.createElement("option");
      option.value = pais.name;
      option.textContent = pais.name + " (" + (pais.iso2 || "") + ")";
      selectPais.appendChild(option);
    });

    // Restaurar valor guardado
    var guardado = localStorage.getItem("nacionalidadGuardada");
    if (guardado) {
      selectPais.value = guardado;
      mostrarPaisSeleccionado();
    }
  } catch (error) {
    console.error("Error al cargar paises:", error);
    selectPais.innerHTML = '<option value="">Error al cargar paises</option>';
  }
}

// Mostrar informacion del pais seleccionado con bandera de flagsapi.com
function mostrarPaisSeleccionado() {
  var valor = selectPais.value;
  if (!valor) {
    resultadoPais.innerHTML = "";
    banderaPreview.style.display = "none";
    banderaPreview.src = "";
    return;
  }

  var pais = paises.find(function (p) {
    return p.name === valor;
  });

  if (!pais) {
    resultadoPais.innerHTML = "<p>Pais no encontrado.</p>";
    banderaPreview.style.display = "none";
    return;
  }

  var codigoPais = (pais.iso2 || "").toLowerCase();
  var urlBandera = API_FLAGS + "/" + codigoPais + ".png";

  // Mostrar bandera junto al selector
  banderaPreview.src = urlBandera;
  banderaPreview.alt = "Bandera de " + pais.name;
  banderaPreview.style.display = "block";

  // Mostrar tarjeta con bandera grande
  resultadoPais.innerHTML =
    '<div class="country-card">' +
    '<img src="' + urlBandera + '" alt="Bandera de ' + pais.name + '" ' +
    'style="width:128px; height:auto; border-radius:8px; border:1px solid #ddd; margin-bottom:12px;" ' +
    'onerror="this.style.display=\'none\'">' +
    '<h3>' + pais.name + '</h3>' +
    '<p><strong>Codigo ISO:</strong> ' + codigoPais.toUpperCase() + '</p>' +
    '</div>';

  // Actualizar KPI
  kpiPaises.textContent = parseInt(kpiPaises.textContent) + 1;
  kpiUltimoPais.textContent = pais.name;
}

// Evento change para mostrar info del pais
selectPais.addEventListener("change", mostrarPaisSeleccionado);

// Consultar clima actual
async function consultarClima() {
  var valor = selectCiudad.value;
  if (!valor) return;

  var partes = valor.split(",");
  var latitud = parseFloat(partes[0]);
  var longitud = parseFloat(partes[1]);
  var nombreCiudad = partes[2];

  resultadoClima.innerHTML = "<p>Cargando clima...</p>";

  try {
    var url = API_CLIMA + "?latitude=" + latitud + "&longitude=" + longitud + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";
    var respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("No se pudo obtener el clima.");
    var datos = await respuesta.json();

    var temperatura = datos.current.temperature_2m;
    var humedad = datos.current.relative_humidity_2m;
    var viento = datos.current.wind_speed_10m;

    resultadoClima.innerHTML =
      '<div class="weather-card">' +
      '<h3>' + nombreCiudad + '</h3>' +
      '<p><strong>Temperatura:</strong> ' + temperatura + ' °C</p>' +
      '<p><strong>Humedad:</strong> ' + humedad + ' %</p>' +
      '<p><strong>Viento:</strong> ' + viento + ' km/h</p>' +
      '</div>';

    // Guardar en localStorage para KPI
    localStorage.setItem("ultimaCiudad", nombreCiudad);
    localStorage.setItem("ultimaTemperatura", temperatura + " °C");

    // Actualizar KPI
    kpiCiudad.textContent = nombreCiudad;
    kpiTemperatura.textContent = temperatura + " °C";
  } catch (error) {
    console.error("Error al consultar clima:", error);
    resultadoClima.innerHTML = "<p>Error al obtener el clima.</p>";
  }
}

// Crear grafico de barras con Chart.js
function crearGrafico() {
  var ctx = document.getElementById("graficoPractica").getContext("2d");
  graficoPractica = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      datasets: [{
        label: "Ventas mensuales",
        data: [12, 19, 3, 5, 2, 8],
        backgroundColor: [
          "rgba(29, 78, 216, 0.7)",
          "rgba(25, 135, 84, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(220, 53, 69, 0.7)",
          "rgba(13, 202, 240, 0.7)",
          "rgba(108, 117, 125, 0.7)"
        ],
        borderColor: [
          "rgba(29, 78, 216, 1)",
          "rgba(25, 135, 84, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(13, 202, 240, 1)",
          "rgba(108, 117, 125, 1)"
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Actualizar grafico con numeros aleatorios
function actualizarGraficoAleatorio() {
  if (!graficoPractica) return;

  var nuevosDatos = [];
  for (var i = 0; i < 6; i++) {
    nuevosDatos.push(Math.floor(Math.random() * 30) + 1);
  }

  graficoPractica.data.datasets[0].data = nuevosDatos;
  graficoPractica.update();

  Toastify({
    text: "Grafico actualizado con datos aleatorios.",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#1d4ed8" }
  }).showToast();
}

// Mostrar datos de sessionStorage y localStorage
function actualizarStorageEnPantalla() {
  // sessionStorage
  var sessionData = "";
  for (var i = 0; i < sessionStorage.length; i++) {
    var clave = sessionStorage.key(i);
    sessionData += clave + ": " + sessionStorage.getItem(clave) + "\n";
  }
  datosSession.textContent = sessionData || "sessionStorage vacio.";

  // localStorage
  var localData = "";
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    localData += clave + ": " + localStorage.getItem(clave) + "\n";
  }
  datosLocal.textContent = localData || "localStorage vacio.";
}

// Actualizar KPIs desde localStorage
function actualizarKpis() {
  var ciudad = localStorage.getItem("ultimaCiudad");
  var temp = localStorage.getItem("ultimaTemperatura");
  var ultimoPais = localStorage.getItem("nacionalidadGuardada");

  if (ciudad) kpiCiudad.textContent = ciudad;
  if (temp) kpiTemperatura.textContent = temp;
  if (ultimoPais) kpiUltimoPais.textContent = ultimoPais;
}

// Mostrar toast con un mensaje
function mostrarToast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#1d4ed8" }
  }).showToast();
}
