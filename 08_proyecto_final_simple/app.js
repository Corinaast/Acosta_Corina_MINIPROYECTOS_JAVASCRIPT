// PASO 8 - Proyecto Final Simple
// Integra tres conceptos:
// 1. API externa para cargar imagen de perro (Dog CEO API)
// 2. JSON local para calcular promedio de un estudiante
// 3. API externa para mostrar una curiosidad de gato (CatFact API)

// --- Seccion 1: Imagen de perro desde API ---
async function cargarImagenPerro() {
  var estadoImagen = document.getElementById("estadoImagen");
  var imagenPerro = document.getElementById("imagenPerro");

  estadoImagen.textContent = "Cargando imagen...";
  imagenPerro.src = "";

  try {
    var respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!respuesta.ok) throw new Error("Error al obtener imagen.");
    var datos = await respuesta.json();
    imagenPerro.src = datos.message;
    estadoImagen.textContent = "Imagen cargada.";
  } catch (error) {
    console.error("Error:", error);
    estadoImagen.textContent = "Error al cargar imagen.";
  }
}

// --- Seccion 2: Promedio desde JSON local ---
async function calcularPromedioLuis() {
  var resultadoPromedio = document.getElementById("resultadoPromedio");
  resultadoPromedio.textContent = "Cargando datos...";

  try {
    var respuesta = await fetch("./data/academico.json");
    if (!respuesta.ok) throw new Error("Error al leer JSON.");
    var datos = await respuesta.json();

    var luis = datos.institucion.estudiantes[1];
    var notas = luis.materias[0].notas;
    var suma = notas.reduce(function (a, b) { return a + b; }, 0);
    var promedio = (suma / notas.length).toFixed(2);

    resultadoPromedio.textContent = luis.nombre + " - Promedio: " + promedio + " (Notas: " + notas.join(", ") + ")";
  } catch (error) {
    console.error("Error:", error);
    resultadoPromedio.textContent = "Error al calcular promedio.";
  }
}

// --- Seccion 3: Curiosidad de gato desde API ---
async function cargarDatoGato() {
  var resultadoDato = document.getElementById("resultadoDato");
  resultadoDato.textContent = "Cargando dato...";

  try {
    var respuesta = await fetch("https://catfact.ninja/fact");
    if (!respuesta.ok) throw new Error("Error al obtener dato.");
    var datos = await respuesta.json();
    resultadoDato.textContent = datos.fact;
  } catch (error) {
    console.error("Error:", error);
    resultadoDato.textContent = "Error al cargar el dato.";
  }
}

// --- Eventos ---
document.addEventListener("DOMContentLoaded", function () {
  // Cargar imagen automaticamente al iniciar
  cargarImagenPerro();

  // Evento click para cada boton
  document.getElementById("btnOtraImagen").addEventListener("click", cargarImagenPerro);
  document.getElementById("btnPromedio").addEventListener("click", calcularPromedioLuis);
  document.getElementById("btnDato").addEventListener("click", cargarDatoGato);
});
