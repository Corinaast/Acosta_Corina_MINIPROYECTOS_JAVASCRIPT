const estudiantes = [
  { nombre: "Ana Torres", carrera: "Tecnologías de la Información", notas: [15, 18, 16] },
  { nombre: "Luis García", carrera: "Software", notas: [14, 12, 17] },
  { nombre: "María López", carrera: "Sistemas", notas: [19, 20, 18] },
  { nombre: "Carlos Ruiz", carrera: "Tecnologías de la Información", notas: [11, 13, 14] },
  { nombre: "Laura Díaz", carrera: "Software", notas: [16, 17, 19] },
  { nombre: "Pedro Sánchez", carrera: "Sistemas", notas: [10, 14, 12] },
  { nombre: "Sofía Martínez", carrera: "Tecnologías de la Información", notas: [18, 19, 20] },
  { nombre: "Andrés Vargas", carrera: "Software", notas: [13, 15, 11] }
];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnMostrar").addEventListener("click", () => {
    mostrarEstudiantes(estudiantes);
  });

  document.getElementById("btnPromedios").addEventListener("click", () => {
    mostrarPromedios(estudiantes);
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    document.getElementById("cuerpoTabla").innerHTML = "";
    document.getElementById("mensaje").textContent = "Tabla limpiada.";
  });

  document.getElementById("buscador").addEventListener("input", () => {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const filtrados = estudiantes.filter((e) =>
      e.nombre.toLowerCase().includes(texto)
    );
    mostrarEstudiantes(filtrados);
  });

  document.getElementById("filtroCarrera").addEventListener("change", () => {
    const valor = document.getElementById("filtroCarrera").value;
    const filtrados = valor
      ? estudiantes.filter((e) => e.carrera === valor)
      : estudiantes;
    mostrarEstudiantes(filtrados);
  });

  document.getElementById("formEstudiante").addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const carrera = document.getElementById("nuevaCarrera").value;
    const nota = parseFloat(document.getElementById("nuevaNota").value);

    if (!nombre || !carrera || isNaN(nota) || nota < 0 || nota > 20) {
      document.getElementById("mensaje").textContent = "Complete todos los campos correctamente.";
      return;
    }

    estudiantes.push({ nombre, carrera, notas: [nota] });
    document.getElementById("mensaje").textContent = `Estudiante "${nombre}" agregado.`;
    mostrarEstudiantes(estudiantes);
    evento.target.reset();
  });
});

function calcularPromedio(notas) {
  const suma = notas.reduce((total, nota) => total + nota, 0);
  return (suma / notas.length).toFixed(1);
}

function mostrarEstudiantes(lista) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  const mensaje = document.getElementById("mensaje");

  if (lista.length === 0) {
    cuerpoTabla.innerHTML = "";
    mensaje.textContent = "No se encontraron resultados.";
    return;
  }

  mensaje.textContent = `Mostrando ${lista.length} estudiante(s).`;

  let html = "";
  lista.forEach((est, i) => {
    const promedio = calcularPromedio(est.notas);
    const claseNota = promedio >= 16 ? "nota-alta" : "";
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${est.nombre}</td>
        <td>${est.carrera}</td>
        <td>${est.notas.join(", ")}</td>
        <td class="${claseNota}">${promedio}</td>
      </tr>
    `;
  });
  cuerpoTabla.innerHTML = html;
}

function mostrarPromedios(lista) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  const mensaje = document.getElementById("mensaje");

  if (lista.length === 0) {
    mensaje.textContent = "No hay datos para calcular.";
    return;
  }

  mensaje.textContent = "Promedios calculados.";

  let html = "";
  lista.forEach((est, i) => {
    const promedio = calcularPromedio(est.notas);
    const claseNota = promedio >= 16 ? "nota-alta" : "";
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${est.nombre}</td>
        <td>${est.carrera}</td>
        <td>${est.notas.join(", ")}</td>
        <td class="${claseNota}">${promedio}</td>
      </tr>
    `;
  });
  cuerpoTabla.innerHTML = html;
}
