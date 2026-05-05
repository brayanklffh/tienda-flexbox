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