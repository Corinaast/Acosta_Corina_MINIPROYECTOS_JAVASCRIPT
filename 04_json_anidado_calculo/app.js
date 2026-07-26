// PASO 4 - JSON anidado y calculo
// JSON con varias capas de anidacion.
// Se navega con notacion de punto y se calcula el promedio con reduce.

var datos = {
  institucion: {
    nombre: "Universidad de practica",
    estudiantes: [
      {
        nombre: "Ana Torres",
        materias: [
          {
            nombre: "Aplicaciones Web",
            notas: [18, 17, 19]
          }
        ]
      },
      {
        nombre: "Luis Mora",
        materias: [
          {
            nombre: "Aplicaciones Web",
            notas: [14, 13, 15]
          }
        ]
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var btnCalcular = document.getElementById("btnCalcular");
  var resultado = document.getElementById("resultado");

  btnCalcular.addEventListener("click", function () {
    // Navegar el JSON anidado para llegar a Luis Mora
    var luis = datos.institucion.estudiantes[1];
    var notas = luis.materias[0].notas;

    // Calcular promedio usando reduce
    var suma = notas.reduce(function (acumulador, nota) {
      return acumulador + nota;
    }, 0);
    var promedio = (suma / notas.length).toFixed(2);

    var salida = "Institucion: " + datos.institucion.nombre + "\n";
    salida += "Estudiante: " + luis.nombre + "\n";
    salida += "Materia: " + luis.materias[0].nombre + "\n";
    salida += "Notas: " + notas.join(", ") + "\n";
    salida += "Promedio: " + promedio;

    resultado.textContent = salida;
    resultado.style.whiteSpace = "pre-wrap";
  });
});
