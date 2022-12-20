

let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegoKey")) || [];

listaJuegos.map((item) => {crearColumna(item)});
//listaJuegos.forEach((item) => {crearColumna(item)});

function crearColumna(juego) {
  let grilla = document.getElementById('grilla');
  grilla.innerHTML +=` <div class="col-12 col-md-4 col-lg-3 mb-3 mx-3 text-black">
  <div class="card h-100">
    <img src="${juego.publico}" class="card-img-top" alt="${juego.juego}">
    <div class="card-body">
      <h5 class="card-title">${juego.juego}</h5>
      <p class="card-text">${juego.descripcion}</p>
    </div>
  </div>
</div>`
};