//funcion que ara que al precionar ver mas se muestren mas prendas

const prendasOcultas = document.querySelectorAll(".prendas__ocultas");
const btnVerMas = document.querySelector(".ver__mas");
const cardSuelta = document.querySelector(".cuartoproducto");

btnVerMas.addEventListener("click", () => {
  prendasOcultas.forEach((prenda) => {
    if (prenda.style.display === "block") {
      prenda.style.display = "none";
      cardSuelta.style.display="none";
    } else {
      prenda.style.display = "block";
      cardSuelta.style.display="block";
    }
  });

  if (btnVerMas.textContent === "Ver menos") {
    btnVerMas.textContent = "Ver más";
  } else {
    btnVerMas.textContent = "Ver menos";
  }
  //865 hasta 1366 hacer config en css
  //solucionar error imagen 1030
  //usar matchmedia para la ultima configuracion
});
