
import {Juego} from "./classJuego.js"
import {campoRequerido, validarNumero, validarURL, validacionGeneral} from "./validacionJuego.js"
// traigo los elementos que se necesitan del html

let campoCodigo = document.getElementById("codigo");
let campoJuego = document.getElementById("nomJuego");
let campoDescripcion = document.getElementById("descripcion");
let campoCategoria = document.getElementById("categoria");
let campoPublicado = document.getElementById("publicado");
let formularioJuego = document.querySelector('#formJuego');


let juegoExistente = false; // variable bandera

// si hay juegos en local storage, quiero que se guarden en el array los juegos
let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegoKey")) || [];



// asociar un evento a cada elemento

campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});

campoJuego.addEventListener("blur", () => {
  campoRequerido(campoJuego);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCategoria.addEventListener("blur", () => {
  console.log("desde cantidad");
  campoRequerido(campoCategoria);
});

campoPublicado.addEventListener("blur", () => {
  console.log("desde url");
  validarURL(campoPublicado);
});

formularioJuego.addEventListener("submit", guardarjuego);

// cargo los juegos del localstorage en la lista

 cargaInicial();

// emieza la logica CRUD

function guardarjuego(e) {
  //prevenir el actualizar del submit
  e.preventDefault();
  //verificar que todos los datos sean validos
  if (
    validacionGeneral(
      campoCodigo,
      campoJuego,
      campoDescripcion,
      campoCategoria,
      campoPublicado
    )
  ) {
     console.log("los datos fueron enviados correctamente");
    if (juegoExistente === false) {
      //crear juego
      crearJuego();
    } else {
      //modificar juego
     modificarjuego();
    }
  }
}

function crearJuego(){
  // generar una funcion crearCodigUnico() que retorne codigo unico
  // crear objeto Juego 
  let juegoNuevo = new Juego(
    campoCodigo.value, 
    campoJuego.value,
    campoCategoria.value,  
    campoDescripcion.value, 
    campoPublicado.value
    );
    console.log(juegoNuevo);
    listaJuegos.push(juegoNuevo);
    console.log(listaJuegos);
    // limpiar formulario
    limpiarFormulario();
    // guardar el array en local storage
    guardarLocalSorage();
    //cargar los juegos
    crearFila(juegoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value del formulario
  formularioJuego.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCategoria.className = "form-control";
  campoPublicado.className = "form-control";

  //resetear la variable bandera o booleana para el caso de modificarjuego
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
  <td>${juego.publicado}</td>
  <td>
    <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
    <button class="btn btn-danger"><i class="bi bi-trash3"></i></button>
  </td>
</tr>`

}

function cargaInicial(){
  if (listaJuegos.length > 0) {
    //crear fila
    listaJuegos.forEach(itemJuego => { crearFila(itemJuego);});
  } 
}