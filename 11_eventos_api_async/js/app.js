document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mensajeInicio").textContent = "Aplicación lista.";

  configurarGato();
  configurarPerro();
  configurarSelector();
  configurarBuscarUsuario();
  configurarKeydown();
});

function configurarGato() {
  const btnGato = document.getElementById("btnGato");
  const resultadoGato = document.getElementById("resultadoGato");

  btnGato.addEventListener("click", async () => {
    resultadoGato.textContent = "Cargando curiosidad...";
    try {
      const respuesta = await fetch("https://catfact.ninja/fact");
      if (!respuesta.ok) throw new Error("No se pudo obtener el dato.");
      const datos = await respuesta.json();
      resultadoGato.textContent = datos.fact;
    } catch (error) {
      console.error("Falla:", error);
      resultadoGato.textContent = "Error al cargar la curiosidad de gato.";
    }
  });
}

function configurarPerro() {
  const btnPerro = document.getElementById("btnPerro");
  const imagenPerro = document.getElementById("imagenPerro");

  btnPerro.addEventListener("click", async () => {
    imagenPerro.src = "";
    imagenPerro.alt = "Cargando...";
    try {
      const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!respuesta.ok) throw new Error("No se pudo obtener la imagen.");
      const datos = await respuesta.json();
      imagenPerro.src = datos.message;
      imagenPerro.alt = "Imagen de perro aleatoria";
    } catch (error) {
      console.error("Falla:", error);
      imagenPerro.alt = "Error al cargar imagen.";
    }
  });
}

function configurarSelector() {
  const selectorApi = document.getElementById("selectorApi");
  const resultadoSelector = document.getElementById("resultadoSelector");

  selectorApi.addEventListener("change", async () => {
    const valor = selectorApi.value;
    if (!valor) {
      resultadoSelector.textContent = "Seleccione una opción.";
      return;
    }

    resultadoSelector.textContent = "Cargando...";

    try {
      let url = "";
      if (valor === "gato") {
        url = "https://catfact.ninja/fact";
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error en Cat Fact API.");
        const datos = await respuesta.json();
        resultadoSelector.textContent = `Gato: ${datos.fact}`;
      } else if (valor === "perro") {
        url = "https://dog.ceo/api/breeds/image/random";
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error en Dog API.");
        const datos = await respuesta.json();
        resultadoSelector.textContent = `Perro: ${datos.message}`;
      }
    } catch (error) {
      console.error("Falla:", error);
      resultadoSelector.textContent = "Error al consultar la API.";
    }
  });
}

function configurarBuscarUsuario() {
  const form = document.getElementById("formBuscarUsuario");
  const resultadoUsuario = document.getElementById("resultadoUsuario");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const id = document.getElementById("idUsuario").value;

    if (!id || id < 1 || id > 10) {
      resultadoUsuario.classList.add("d-none");
      return;
    }

    try {
      const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!respuesta.ok) throw new Error("Usuario no encontrado.");
      const usuario = await respuesta.json();

      document.getElementById("nombreUsuario").textContent = usuario.name;
      document.getElementById("correoUsuario").textContent = `Correo: ${usuario.email}`;
      document.getElementById("ciudadUsuario").textContent = `Ciudad: ${usuario.address.city}`;
      resultadoUsuario.classList.remove("d-none");
    } catch (error) {
      console.error("Falla:", error);
      resultadoUsuario.classList.add("d-none");
    }
  });
}

function configurarKeydown() {
  const textoPrueba = document.getElementById("textoPrueba");
  const estadoEscritura = document.getElementById("estadoEscritura");

  textoPrueba.addEventListener("keydown", (evento) => {
    estadoEscritura.textContent = `Tecla: "${evento.key}" | Código: ${evento.code}`;
  });
}
