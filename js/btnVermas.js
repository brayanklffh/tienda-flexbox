//funcion que ara que al precionar ver mas se muestren mas prendas

const prendasOcultas = document.querySelectorAll(".prendas__ocultas");
const btnVerMas = document.querySelector(".ver__mas");
const cardSuelta = document.querySelector(".cuartoproducto");
const productos = document.querySelector(".oculta");
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

      if (
      window.matchMedia("(min-width: 865px) and (max-width: 1367px)").matches) {
      cardSuelta.classList.toggle("prendas__ocultas");

    } 
    


  //865 hasta 1366 hacer config en css
  //solucionar error imagen 1030
  //usar matchmedia en pixel 966 a 865px
});

