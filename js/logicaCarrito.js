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
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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

// MODIFICACIÓN 2: Función para guardar el estado del carrito actual en LocalStorage
const sincronizarStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};


// MODIFICACIÓN 3: Función para renderizar todo el carrito cuando se recarga la página
const renderizarCarritoDesdeStorage = () => {
  añadirProducto.innerHTML = ""; // Limpiar por seguridad antes de redibujar

  
  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.dataset.lote = producto.lote;

    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.nombre}</td>
      <td class="precio">$${Number(producto.precio) * producto.cantidad}</td>
      <td class="cantidad">${producto.cantidad}</td>
      <td><button class="eliminar">X</button></td>
    `;
    añadirProducto.appendChild(fila);
  });

  sumarPrendaIguales(); // Actualizar el precio total en la interfaz
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
      sincronizarStorage(); // <-- Guardar cambios al incrementar cantidad
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
    sincronizarStorage(); // <-- Guardar cambios al empujar un nuevo producto
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
    sincronizarStorage(); // <-- Guardar cambios al eliminar o restar cantidad
  }
});


// vacia el carrito y el array en general
vaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();

  carrito = [];
  añadirProducto.innerHTML = "";

  sumarPrendaIguales();
  sincronizarStorage(); // <-- Limpiar también el almacenamiento local


  console.log("Carrito vacío");

});

// MODIFICACIÓN 4: Escuchar la carga del documento para pintar los productos persistidos
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarritoDesdeStorage();
});


//======================================================= MANDAR COMPRA A WHATZAP ========================================================
// Seleccionamos el botón de la compra
const botonComprar = document.querySelector("#enviar-whatsapp");

botonComprar.addEventListener("click", (e) => {
  e.preventDefault();

  // 1. Si el carrito está vacío, no hacemos nada
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de comprar.");
    return;
  }

  // 2. Definimos tu número de WhatsApp (con el código de país de Colombia: 57)
  const telefono = "573142861157"; // <-- Reemplaza con tu número real de celular

  // 3. Empezamos a armar el mensaje de texto plano
  let mensaje = "¡Hola! Me interesa comprar los siguientes productos de mi carrito:\n\n";

  // 4. Recorremos el carrito para añadir cada prenda al mensaje texto
  carrito.forEach((producto) => {
    mensaje += `📌 *${producto.nombre}*\n`;
    mensaje += `   • Cantidad: ${producto.cantidad}\n`;
    mensaje += `   • Lote/Color: ${producto.lote}\n`;
    mensaje += `   • Subtotal: $${Number(producto.precio) * producto.cantidad}\n`;
    mensaje += `   • Foto: ${producto.imagen}\n\n`; // Aquí mandamos la URL de la imagen
  });

  // 5. Calculamos el total global para cerrar el mensaje
  const totalFinal = carrito.reduce((total, p) => total + Number(p.precio) * p.cantidad, 0);
  mensaje += `💰 *TOTAL A PAGAR: $${totalFinal}*`;

  // 6. El truco final: encodeURIComponent convierte los espacios y saltos de línea 
  // en caracteres amigables que el navegador puede leer en una URL
  const mensajeEncriptado = encodeURIComponent(mensaje);

  // 7. Creamos la URL final de WhatsApp
  const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;

  // 8. Abrimos la pestaña de WhatsApp con el mensaje ya escrito
  window.open(urlWhatsApp, "_blank");
});