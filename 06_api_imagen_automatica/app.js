// PASO 6 - API Imagen Automatica
// La funcion cargarImagen se ejecuta sola con DOMContentLoaded.
// Se usa la API de Dog CEO para obtener una imagen aleatoria de perro.
// El boton permite recargar otra imagen.

async function cargarImagen() {
  var estado = document.getElementById("estado");
  var imagenPerro = document.getElementById("imagenPerro");

  estado.textContent = "Cargando imagen...";
  imagenPerro.src = "";

  try {
    var respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la imagen.");
    }
    var datos = await respuesta.json();
    imagenPerro.src = datos.message;
    imagenPerro.alt = "Imagen de perro aleatoria";
    estado.textContent = "Imagen cargada correctamente.";
  } catch (error) {
    console.error("Error:", error);
    estado.textContent = "Error al cargar la imagen.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Se carga la imagen automaticamente al iniciar la pagina
  cargarImagen();

  var btnRecargar = document.getElementById("btnRecargar");
  btnRecargar.addEventListener("click", cargarImagen);
});
