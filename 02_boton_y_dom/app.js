// PASO 2 - Boton y DOM
// El usuario hace clic y JavaScript modifica el contenido del HTML.
// Se usa addEventListener para escuchar el evento click.

document.addEventListener("DOMContentLoaded", function () {
  var btnMostrar = document.getElementById("btnMostrar");
  var resultado = document.getElementById("resultado");

  btnMostrar.addEventListener("click", function () {
    resultado.textContent = "Hola, este mensaje fue escrito por JavaScript despues de un clic.";
    resultado.style.color = "#1d4ed8";
    resultado.style.fontWeight = "bold";
  });
});
