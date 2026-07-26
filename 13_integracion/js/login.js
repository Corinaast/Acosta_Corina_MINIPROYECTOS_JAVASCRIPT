// ============================================================
// CARPETA 13 - LOGIN SIMULADO
// Simula un inicio de sesion con validaciones basicas,
// generacion de codigo aleatorio y redireccion al panel.
// ============================================================

// 1. Seleccione el formulario con getElementById.
var formLogin = document.getElementById("formLogin");

// 2. Seleccione el input del nombre.
var nombreUsuario = document.getElementById("nombreUsuario");

// 3. Seleccione el input de la contrasena.
var claveUsuario = document.getElementById("claveUsuario");

// 4. Seleccione el texto donde aparecera "Escribiendo...".
var estadoEscritura = document.getElementById("estadoEscritura");

// 5. Seleccione el boton para generar un numero aleatorio.
var btnCodigo = document.getElementById("btnCodigo");

// 6. Seleccione el contenedor donde se mostrara el codigo aleatorio.
var resultadoCodigo = document.getElementById("resultadoCodigo");

// 7. Cree una variable llamada temporizador.
// Esta variable servira para controlar el tiempo de espera.
var temporizador;

// 8. Evento input al campo nombreUsuario.
// Cada vez que el usuario escriba, debe aparecer "Escribiendo...".
// Despues de 1 segundo, el mensaje debe limpiarse.
nombreUsuario.addEventListener("input", function () {
  estadoEscritura.textContent = "Escribiendo...";

  // Limpiar el temporizador anterior si existe
  clearTimeout(temporizador);

  // Crear nuevo temporizador de 1 segundo
  temporizador = setTimeout(function () {
    estadoEscritura.textContent = "";
  }, 1000);
});

// 9. Evento click al boton btnCodigo.
// Genera un numero aleatorio entre 1000 y 9999 y lo muestra en pantalla.
btnCodigo.addEventListener("click", function () {
  var codigo = Math.floor(Math.random() * 9000) + 1000;
  resultadoCodigo.textContent = "Codigo de prueba: " + codigo;
  resultadoCodigo.classList.remove("alert-light");
  resultadoCodigo.classList.add("alert-success");
});

// 10. Evento submit al formulario.
// Valida que nombre y contrasena no esten vacios.
// Guarda el nombre en sessionStorage y el ultimo usuario en localStorage.
// Muestra una notificacion con Toastify y redirige a home.html.
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  var nombre = nombreUsuario.value.trim();
  var clave = claveUsuario.value.trim();

  // Validar campos vacios
  if (!nombre || !clave) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Debe ingresar nombre y contrasena."
    });
    return;
  }

  // Guardar en sessionStorage (se borra al cerrar pestana)
  sessionStorage.setItem("usuario", nombre);

  // Guardar ultimo usuario en localStorage (persiste)
  localStorage.setItem("ultimoUsuario", nombre);

  // Notificacion con Toastify
  Toastify({
    text: "Bienvenido, " + nombre + "!",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #1d4ed8, #123f9c)"
    }
  }).showToast();

  // Redirigir al panel principal
  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});
