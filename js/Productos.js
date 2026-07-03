

// funcion para mostrar las imagenes de las prendas de otros colores

const botones = document.querySelectorAll(".colores");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto");
    const img = producto.querySelector(".prenda1");

    img.src = boton.dataset.img;
  });
});



