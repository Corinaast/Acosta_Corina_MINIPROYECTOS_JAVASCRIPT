document.addEventListener("DOMContentLoaded", () => {
  const mensajeInicio = document.getElementById("mensajeInicio");
  mensajeInicio.textContent = "JavaScript se ejecutó correctamente.";

  configurarEventosClick();
  configurarEventosMouse();
  configurarEventoInput();
  configurarEventoChange();
  configurarEventoKeydown();
  configurarEventoSubmit();
});

function configurarEventosClick() {
  const btnClick = document.getElementById("btnClick");
  const btnDobleClick = document.getElementById("btnDobleClick");
  const resultadoClick = document.getElementById("resultadoClick");

  btnClick.addEventListener("click", () => {
    resultadoClick.textContent = "El usuario dio un clic.";
  });

  btnDobleClick.addEventListener("dblclick", () => {
    resultadoClick.textContent = "El usuario hizo doble clic.";
  });
}

function configurarEventosMouse() {
  const tarjetaMouse = document.getElementById("tarjetaMouse");

  tarjetaMouse.addEventListener("mouseover", () => {
    tarjetaMouse.textContent = "El mouse está sobre la caja.";
    tarjetaMouse.classList.add("activa");
  });

  tarjetaMouse.addEventListener("mouseout", () => {
    tarjetaMouse.textContent = "Pase el mouse sobre esta caja.";
    tarjetaMouse.classList.remove("activa");
  });
}

function configurarEventoInput() {
  const nombre = document.getElementById("nombre");
  const textoEscrito = document.getElementById("textoEscrito");

  nombre.addEventListener("input", () => {
    textoEscrito.textContent = nombre.value || "Nada todavía";
  });
}

function configurarEventoChange() {
  const carrera = document.getElementById("carrera");
  const carreraSeleccionada = document.getElementById("carreraSeleccionada");

  carrera.addEventListener("change", () => {
    carreraSeleccionada.textContent = carrera.value || "Ninguna";
  });
}

function configurarEventoKeydown() {
  const buscador = document.getElementById("buscador");
  const teclaPresionada = document.getElementById("teclaPresionada");

  buscador.addEventListener("keydown", (evento) => {
    teclaPresionada.textContent = `${evento.key} (código: ${evento.code})`;
  });
}

function configurarEventoSubmit() {
  const formularioDemo = document.getElementById("formularioDemo");
  const resultadoFormulario = document.getElementById("resultadoFormulario");

  formularioDemo.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const correo = document.getElementById("correo").value;
    resultadoFormulario.textContent = correo
      ? `Correo enviado: ${correo}`
      : "Escriba un correo válido.";
  });
}
