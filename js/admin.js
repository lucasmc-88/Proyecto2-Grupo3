import {campoRequerido, validarNumero, validarURL, validacionGeneral} from "./validacionJuego.js"
import {Juego} from "./classJuego.js"

// traigo los elementos que se necesitan del html

let campoCodigo = document.getElementById("codigo");
let campoJuego = document.getElementById("nomJuego");
let campoDescripcion = document.getElementById("descripcion");
let campoCategoria = document.getElementById("categoria");
let campoURL = document.getElementById("url");
let campoPublicado = document.getElementById("publicado");
let valorCampoPublicado = "No Publicado";
let campoImgpri = document.getElementById("imgPri");
let campoImgsec = document.getElementById("imgSec");
let formularioJuego = document.querySelector('#formJuego');


let juegoExistente = false; // variable bandera

let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegoKey")) || [];


let btnDatosPrueba = document.getElementById('btnDatosPrueba');


btnDatosPrueba.addEventListener('click',cargarDatosPrueba);

campoPublicado.addEventListener("click", ()=> {
  ;
  if (valorCampoPublicado === "No Publicado") {
    valorCampoPublicado = "Publicado";
  }else {
    valorCampoPublicado = "No Publicado";
  }
})
campoJuego.addEventListener("blur", () => {
  campoRequerido(campoJuego);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCategoria.addEventListener("blur", () => {
  campoRequerido(campoCategoria);
});

campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});

formularioJuego.addEventListener("submit", guardarjuego);

// cargo los juegos del localstorage en la lista

 cargaInicial();

// emieza la logica CRUD

let btnDestacada = document.getElementById('destacada')

btnDestacada.addEventListener('click', function () {
  if (btnDestacada.classList.contains('btn-warning')) {
    btnDestacada.classList.remove('btn-warning')
    btnDestacada.classList.add('btn-primary')
  }else{
    btnDestacada.classList.remove('btn-primary')
    btnDestacada.classList.add('btn-warning')}
})
function guardarjuego(e) {
  //prevenir el actualizar del submit
  e.preventDefault();
  //verificar que todos los datos sean validos
  if (
    validacionGeneral(
      //campoCodigo,
      campoJuego,
      campoDescripcion,
      campoCategoria,
      campoURL
    )
  ) {
 
    if (juegoExistente === false) {
      crearJuego();
    } else {
     modificarJuego();
    }
  }
}

function crearJuego(){

  let codigoUnico = Math.floor(Math.random()*100);
  let juegoNuevo = new Juego(
    codigoUnico, 
    campoJuego.value,
    campoCategoria.value,  
    campoDescripcion.value, 
    campoURL.value,
    valorCampoPublicado,
    campoImgpri.value,
    campoImgsec.value
    );
  
    listaJuegos.push(juegoNuevo);

    
    guardarLocalSorage();
    Swal.fire(
      'Juego creado!!',
      'su juego se cargo correctamente!',
      'success'
    )
    limpiarFormulario();
    crearFila(juegoNuevo);

}

function limpiarFormulario() {
  //limpio formulario
  formularioJuego.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCategoria.className = "form-control";
  campoURL.className = "form-control";
  valorCampoPublicado = "No Publicado";
  juegoExistente = false;
}

function guardarLocalSorage() {
  localStorage.setItem("arrayJuegoKey", JSON.stringify(listaJuegos));
}
function crearFila(juego){
  let tablaJuego = document.querySelector('#tablaJuego');
  tablaJuego.innerHTML += `<tr>
  <th>${juego.codigo}</th>
  <td>${juego.juego}</td>
  <td>${juego.categoria}</td>
  <td>${juego.descripcion}</td>
  <td>${juego.url}</td>
  <td>${juego.publicado}</td>
  <td>${juego.imgPri}</td>
  <td>${juego.imgSec}</td>
  <td>
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="preEdicionJuego('${juego.codigo}')"><i class="bi bi-pencil-square"></i></button>
  <button type="button" class="btn btn-danger" onclick="borrarJuego('${juego.codigo}')"><i class="bi bi-trash3"></i></button>
  <button type="button" class="btn btn-primary" id="destacada"><i class="bi bi-star"></i></i></button>
  </td>
</tr>`

}

function cargaInicial(){
  if (listaJuegos.length > 0) {
    listaJuegos.forEach(itemJuego => { crearFila(itemJuego);});
  } 
}

window.preEdicionJuego = function (codigo) {

  let juegoBuscado = listaJuegos.find((itemJuego) => {
    return itemJuego.codigo === parseInt(codigo);
  });

  campoCodigo.value = juegoBuscado.codigo;
  campoJuego.value = juegoBuscado.juego;
  campoDescripcion.value = juegoBuscado.descripcion;
  campoCategoria.value = juegoBuscado.categoria;
  campoURL.value = juegoBuscado.url;
  campoPublicado.value = valorCampoPublicado;
  campoImgpri.value = juegoBuscado.imgPri;
  campoImgsec.value = juegoBuscado.imgSec;
  
  //cambiar la variable bandera productoExistente
  juegoExistente = true;
};


function modificarJuego() {

  Swal.fire({
    title: "¿Seguro qué desea modificar este Juego?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento que quiero modificar dentro del array de productos
      let indiceJuego = listaJuegos.findIndex((itemJuego) => {
        return itemJuego.codigo === parseInt(campoCodigo.value);
      });

      //modificar los valores dentro del elemento del array de Juegos
      listaJuegos[indiceJuego].juego = campoJuego.value;
      listaJuegos[indiceJuego].descripcion = campoDescripcion.value;
      listaJuegos[indiceJuego].categoria = campoCategoria.value;
      listaJuegos[indiceJuego].url = campoURL.value;
      listaJuegos[indiceJuego].publicado = valorCampoPublicado;
      listaJuegos[indiceJuego].imgPri = campoImgpri.value;
      listaJuegos[indiceJuego].imgSec = campoImgsec.value;


      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      Swal.fire(
        "Juego modificado!",
        "Su Juego fue modificado correctamente",
        "success"
      );
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaJuegos = document.querySelector("#tablaJuego");
  tablaJuegos.innerHTML = "";
}

window.borrarJuego = function (codigo) {
  Swal.fire({
    title: "¿Seguro qué desea borrar este juego?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento en el array y borrarlo
      let nuevaListaJuegos = listaJuegos.filter((itemJuego) => {
        return itemJuego.codigo !== parseInt(codigo);
      });
      //actualizar el arreglo original y el localStorage
      listaJuegos = nuevaListaJuegos;
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      Swal.fire(
        "Juego eliminado!",
        "Su juego fue eliminado correctamente",
        "success"
      );
    }
  });
};

function cargarDatosPrueba(){
  const datos = [
    {
      codigo: Math.floor(Math.random()*100),
      juego: "Call of Duty: Modern Warfare 2 2022",
      categoria: "Acción",
      descripcion:
        "En Call of Duty®: Modern Warfare® II, los jugadores se verán inmersos en un conflicto a escala global sin precedentes que incluye el regreso de Operadores icónicos de la fuerza operativa 141.",
      url: "https://www.youtube.com/watch?v=VWqqQUhzSDg&ab_channel=CallofDutyEspa%C3%B1ol",
      publicado :"Publicado",
      imgPri :" ",
      imgSec :" ",
    },
  ]

 if (!localStorage.getItem('arrayProductoKey')) {
   // quiero agregar los datos de productos
   console.log('cargar datos prueba');
   localStorage.setItem('arrayProductoKey', JSON.stringify(datos));
   listaJuegos = datos;
   //mostar en la tabla
   listaJuegos.forEach(itemJuego => {
     crearFila(itemJuego);
   })
 }
};



