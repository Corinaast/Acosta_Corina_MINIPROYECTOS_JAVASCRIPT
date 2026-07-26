document.addEventListener("DOMContentLoaded", () => {
  const btnCargarProductos = document.getElementById("btnCargarProductos");
  btnCargarProductos.addEventListener("click", cargarProductos);
});

async function cargarProductos() {
  const estadoCarga = document.getElementById("estadoCarga");
  const contenedorProductos = document.getElementById("contenedorProductos");

  estadoCarga.textContent = "Cargando productos de la API...";

  try {
    contenedorProductos.innerHTML = "";

    const respuesta = await fetch("https://dummyjson.com/products");

    if (!respuesta.ok) {
      throw new Error("No se obtuvo la información");
    }

    const datos = await respuesta.json();
    const productos = datos.products;

    console.log("JSON completo:", datos);
    console.log("Array de productos:", productos);

    for (const producto of productos) {
      crearTarjetaProducto(producto);
    }

    estadoCarga.textContent = `Productos cargados: ${productos.length}`;
  } catch (error) {
    console.error("Falla:", error);
    estadoCarga.textContent = "No se pudo cargar";
  }
}

function crearTarjetaProducto(producto) {
  const contenedorProductos = document.getElementById("contenedorProductos");

  const columna = document.createElement("div");
  columna.classList.add("col-12", "col-md-6", "col-lg-4");

  columna.innerHTML = `
    <article class="card producto-card shadow-sm">
      <img
        src="${producto.thumbnail}"
        alt="${producto.title}"
        class="card-img-top producto-img"
      >
      <div class="card-body">
        <span class="badge bg-secondary mb-2">${producto.category}</span>
        <h3 class="card-title">${producto.title}</h3>
        <p class="card-text producto-descripcion">${producto.description}</p>
        <p class="card-text"><strong>$${producto.price}</strong></p>
        <p class="card-text">Stock: ${producto.stock}</p>
        <p class="card-text">Rating: ${producto.rating}</p>
      </div>
    </article>
  `;

  contenedorProductos.appendChild(columna);
}
