

let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegoKey")) || [];

listaJuegos.map((item) => { crearColumna(item) });
//listaJuegos.forEach((item) => {crearColumna(item)});


function crearColumna(juego) {
  if (juego.publicado === "Publicado") {  
  
    let grilla = document.getElementById('idDeportes');
    grilla.innerHTML += `<div class="swiper-slide">
  <div class="caja">
      <img src="${juego.imgPri}" alt="Imagen Juego">
      <div class="cajaTexto">
          <h2>${juego.juego}</h2>
          <h3>${juego.categoria}</h3>
          <div class="valoracion">
              <div class="estrellas">
                  <i class='bx bxs-star'></i>
                  <span>7.8</span>
              </div>
              <div class="btnVerMas">
                  <a href="#">Más Detalles</a>
              </div>
          </div>
      </div>
  </div>
</div>`
  }
};

