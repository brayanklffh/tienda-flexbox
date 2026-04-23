//funcion que ara que al precionar ver mas se muestren mas prendas

const prendasOcultas = document.querySelectorAll(".prendas__ocultas");
const btnVerMas = document.querySelector(".ver__mas");

btnVerMas.addEventListener("click", () => {
  prendasOcultas.forEach((prenda) => {
    if (prenda.style.display === "block") {
      prenda.style.display = "none";
    } else {
      prenda.style.display = "block";
    }
  });

  if (btnVerMas.textContent === "Ver menos") {
    btnVerMas.textContent = "Ver más";
  } else {
    btnVerMas.textContent = "Ver menos";
  }
});

// funcion para mostrar las imagenes de las prendas de otros colores

const botones = document.querySelectorAll(".colores");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto");
    const img = producto.querySelector(".prenda1");

    img.src = boton.dataset.img;
  });
});

// configuracion del footer deslegable
const infoOcultaFooter = document.querySelector(".footer-contenedor");
const footer = document.querySelector("footer");

const esMovil = window.matchMedia("(max-width: 768px)");

if (esMovil.matches) {
  // celular
  footer.addEventListener("click", () => {
    infoOcultaFooter.classList.toggle("mostrar");
    footer.classList.toggle("margenInterno");
  });
} else {
  // computador
  footer.addEventListener("mouseenter", () => {
    infoOcultaFooter.classList.add("mostrar");
    footer.classList.add("margenInterno");
  });

  footer.addEventListener("mouseleave", () => {
    infoOcultaFooter.classList.remove("mostrar");
    footer.classList.remove("margenInterno");
  });
}

//mostrar lista de compras del carrito

const mostrarListaCarrito = document.querySelector("#img-carrito");
const ListaCarrito = document.querySelector("#carrito");
const body = document.querySelector("body");
const MediaMovil = window.matchMedia("(max-width: 768px)");

if (MediaMovil.matches) {
  mostrarListaCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    ListaCarrito.classList.toggle("activo");
  });

  body.addEventListener("click", () => {
    console.log("body");
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



