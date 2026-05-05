// configuracion del footer desplegable
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