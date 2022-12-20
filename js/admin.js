
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

let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegoKey")) || [];




/*campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});*/

campoJuego.addEventListener("blur", () => {
  campoRequerido(campoJuego);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCategoria.addEventListener("blur", () => {
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
      //campoCodigo,
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
     modificarJuego();
    }
  }
}

function crearJuego(){
  // codigo unico
  let codigoUnico = Math.floor(Math.random()*100);
  // crear objeto Juego 
  let juegoNuevo = new Juego(
    codigoUnico, 
    campoJuego.value,
    campoCategoria.value,  
    campoDescripcion.value, 
    campoPublicado.value
    );
    console.log(juegoNuevo);
    listaJuegos.push(juegoNuevo);
    console.log(listaJuegos);
    limpiarFormulario();
    guardarLocalSorage();
    Swal.fire(
      'Juego creado!!',
      'su juego se cargo correctamente!',
      'success'
    )
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
  campoPublicado.className = "form-control";

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
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="preEdicionJuego('${juego.codigo}')"><i class="bi bi-pencil-square"></i></button>
    <button type="button" class="btn btn-danger" onclick="borrarJuego('${juego.codigo}')"><i class="bi bi-trash3"></i></button>
  </td>
</tr>`

}

function cargaInicial(){
  if (listaJuegos.length > 0) {
    listaJuegos.forEach(itemJuego => { crearFila(itemJuego);});
  } 
}

window.preEdicionJuego = function (codigo) {
  console.log(codigo);
  //buscar el producto en el array
  let juegoBuscado = listaJuegos.find((itemJuego) => {
    return itemJuego.codigo === parseInt(codigo);
  });

  campoCodigo.value = juegoBuscado.codigo;
  campoJuego.value = juegoBuscado.juego;
  campoDescripcion.value = juegoBuscado.descripcion;
  campoCategoria.value = juegoBuscado.categoria;
  campoPublicado.value = juegoBuscado.publicado;

  //cambiar la variable bandera productoExistente
  juegoExistente = true;
};


function modificarJuego() {
  console.log("desde modificar producto");
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

      console.log(indiceJuego);
      //modificar los valores dentro del elemento del array de productos
      listaJuegos[indiceJuego].juego = campoJuego.value;
      listaJuegos[indiceJuego].descripcion = campoDescripcion.value;
      listaJuegos[indiceJuego].categoria = campoCategoria.value;
      listaJuegos[indiceJuego].publicado = campoPublicado.value;

      //actualizar el localStorage
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      //mostrar cartel al usuario
      Swal.fire(
        "Juego modificado!",
        "Su Juego fue modificado correctamente",
        "success"
      );
      //limpiar el formulario
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaJuegos = document.querySelector("#tablaJuego");
  tablaJuegos.innerHTML = "";
}

window.borrarJuego = function (codigo) {
  console.log("desde borrar juego");
  console.log(codigo);
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
      //opcion 1 encontrar el indice con findIndex y usar splice(indice,1);
      //opcion 2 usando filter
      let nuevaListaJuegos = listaJuegos.filter((itemJuego) => {
        return itemJuego.codigo !== parseInt(codigo);
      });
      //actualizar el arreglo original y el localStorage
      listaJuegos = nuevaListaJuegos;
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();

      //mostrar cartel al usuario
      Swal.fire(
        "Juego eliminado!",
        "Su juego fue eliminado correctamente",
        "success"
      );
    }
  });
};