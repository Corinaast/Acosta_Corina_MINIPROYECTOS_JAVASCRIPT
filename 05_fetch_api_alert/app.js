// PASO 5 - Fetch API Alert
// Se usa fetch para consultar una API externa (CatFact).
// Primero se pide la informacion, luego se convierte a JSON con .json().
// Se usa async/await para manejar la asincronia de forma ordenada.

async function cargarDatoGato() {
  var resultado = document.getElementById("resultado");
  resultado.textContent = "Cargando dato desde la API...";

  try {
    var respuesta = await fetch("https://catfact.ninja/fact");
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener el dato.");
    }
    var datos = await respuesta.json();
    resultado.textContent = "Curiosidad de gato: " + datos.fact;
  } catch (error) {
    console.error("Error:", error);
    resultado.textContent = "Error al cargar el dato. Intente de nuevo.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var btnCargar = document.getElementById("btnCargar");
  btnCargar.addEventListener("click", cargarDatoGato);
});
