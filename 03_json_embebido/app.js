// PASO 3 - JSON embebido
// Objeto JSON escrito directamente en JavaScript.
// Se accede a sus propiedades con notacion de punto.

var estudiante = {
  nombre: "Ana Torres",
  carrera: "Tecnologias de la Informacion",
  semestre: 4,
  materias: ["Aplicaciones Web", "Base de Datos", "Redes"]
};

document.addEventListener("DOMContentLoaded", function () {
  var btnMostrar = document.getElementById("btnMostrar");
  var resultado = document.getElementById("resultado");

  btnMostrar.addEventListener("click", function () {
    var salida = "Nombre: " + estudiante.nombre + "\n";
    salida += "Carrera: " + estudiante.carrera + "\n";
    salida += "Semestre: " + estudiante.semestre + "\n";
    salida += "Materias: " + estudiante.materias.join(", ");
    resultado.textContent = salida;
    resultado.style.whiteSpace = "pre-wrap";
  });
});
