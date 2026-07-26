// PASO 7 - Fetch JSON Local
// Se usa fetch para leer un archivo JSON local del proyecto.
// IMPORTANTE: Requiere Live Server o un servidor local para funcionar.
// No se puede abrir con doble clic en el archivo HTML.

async function cargarJSONLocal() {
  var resultado = document.getElementById("resultado");
  resultado.textContent = "Cargando archivo JSON...";

  try {
    var respuesta = await fetch("./data/academico.json");
    if (!respuesta.ok) {
      throw new Error("No se pudo leer el archivo JSON.");
    }
    var datos = await respuesta.json();

    // Navegar el JSON y extraer informacion
    var institucion = datos.institucion.nombre;
    var periodo = datos.institucion.periodo;
    var estudiantes = datos.institucion.estudiantes;

    var salida = "Institucion: " + institucion + "\n";
    salida += "Periodo: " + periodo + "\n\n";
    salida += "Estudiantes:\n";

    estudiantes.forEach(function (est) {
      var notas = est.materias[0].notas;
      var suma = notas.reduce(function (a, b) { return a + b; }, 0);
      var promedio = (suma / notas.length).toFixed(2);
      salida += "- " + est.nombre + " (ID: " + est.id + ") - Promedio: " + promedio + "\n";
    });

    resultado.textContent = salida;
    resultado.style.whiteSpace = "pre-wrap";
  } catch (error) {
    console.error("Error:", error);
    resultado.textContent = "Error al cargar el JSON. Asegurese de usar Live Server.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var btnCargar = document.getElementById("btnCargar");
  btnCargar.addEventListener("click", cargarJSONLocal);
});
