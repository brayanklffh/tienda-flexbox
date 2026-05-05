//mostrar lista de compras del carrito

const mostrarListaCarrito = document.querySelector(".img-carrito");
const ListaCarrito = document.querySelector(".carrito");
const body = document.querySelector("body");
const MediaMovil = window.matchMedia("(max-width: 768px)");

if (MediaMovil.matches) {
  mostrarListaCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    ListaCarrito.classList.toggle("activo");
  });

  body.addEventListener("click", () => {
    ListaCarrito.classList.remove("activo");
  });
} else {
  // Mostrar carrito al pasar el mouse sobre el ícono
  mostrarListaCarrito.addEventListener("mouseenter", (e) => {
    ListaCarrito.classList.add("activo");
  });

  // Ocultar carrito cuando el mouse sale del ícono o de la lista
  body.addEventListener("click", () => {
    ListaCarrito.classList.remove("activo");
  });

  // evita que el click “afecte” al carrito
  ListaCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}




//funcionamiento del carrito
let carrito = [];

let loteSeleccionado = "";


const productosDisponibles = document.querySelector(".productos");
const añadirProducto = document.querySelector(".añadirProductosCarrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const totalHTML = document.querySelector("#total-valor");


// seleccionar lote
const duplicados = document.querySelectorAll(".colores");

duplicados.forEach((color) => {
  color.addEventListener("click", (e) => {
    loteSeleccionado = e.target.dataset.numerodelote;
    console.log("Lote seleccionado:", loteSeleccionado);
  });
});


// funcion total
const sumarPrendaIguales = () => {
  const total = carrito.reduce((total, producto) => {
    return total + Number(producto.precio) * producto.cantidad;
  }, 0);

  if (totalHTML) {
    totalHTML.textContent = total;
  }

  console.log("Total:", total);
};


// agregar producto
productosDisponibles.addEventListener("click", (event) => {
  if (event.target.classList.contains("agregar-a-carrito")) {

    if (loteSeleccionado === "") {
      alert("Selecciona un producto primero");
      return;
    }

    const productoExistente = carrito.find(
      (p) => p.lote === loteSeleccionado
    );

    //si ya existe suma
    if (productoExistente) {
      productoExistente.cantidad++;

      const fila = añadirProducto.querySelector(
        `tr[data-lote="${loteSeleccionado}"]`
      );

      if (fila) {
        fila.querySelector(".cantidad").textContent =
          productoExistente.cantidad;

        fila.querySelector(".precio").textContent =
          `$${Number(productoExistente.precio) * productoExistente.cantidad}`;
      }

      sumarPrendaIguales();
      return;
      
    }

    // crear nuevo producto
    const contenedor = event.target.closest(".producto");

    const producto = {
      id: contenedor.dataset.id,
      imagen: contenedor.querySelector("img").src,
      nombre: contenedor.querySelector(".prendas").textContent,
      precio: contenedor.dataset.precio,
      lote: loteSeleccionado,
      cantidad: 1,
    };
   //añade a carrito el objeto de producto
    carrito.push(producto);

    const fila = document.createElement("tr");
    fila.dataset.lote = loteSeleccionado;

    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.nombre}</td>
      <td class="precio">$${producto.precio}</td>
      <td class="cantidad">${producto.cantidad}</td>
      <td><button class="eliminar">X</button></td>
    `;

    añadirProducto.appendChild(fila);

    loteSeleccionado = "";

    sumarPrendaIguales();
  }
});


// eliminar o restar producto o cantidad
añadirProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {

    const fila = e.target.closest("tr");
    const lote = String(fila.dataset.lote);

    const producto = carrito.find((p) => p.lote === lote);

    if (!producto) return;

    producto.cantidad--;
       //si la cantidad es mayor que 0 se actualiza
    if (producto.cantidad > 0) {

      fila.querySelector(".cantidad").textContent =
        producto.cantidad;

      fila.querySelector(".precio").textContent =
        `$${Number(producto.precio) * producto.cantidad}`;

    } else {

      fila.remove();

      carrito = carrito.filter((p) => p.lote !== lote);
    }

    sumarPrendaIguales();
  }
});


// vacia el carrito y el array en general
vaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();

  carrito = [];
  añadirProducto.innerHTML = "";

  sumarPrendaIguales();

  console.log("Carrito vacío");
});

