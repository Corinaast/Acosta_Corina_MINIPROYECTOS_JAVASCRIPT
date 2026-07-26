// PASO 1 - Alert inicial
// JavaScript se ejecuta cuando la pagina ya cargo.
// Se usa DOMContentLoaded para asegurar que el DOM este listo.

document.addEventListener("DOMContentLoaded", function () {
  var resultado = document.getElementById("resultado");
  resultado.textContent = "JavaScript se ejecuto correctamente al cargar la pagina.";
  alert("La pagina ha cargado. JavaScript esta activo.");
});
