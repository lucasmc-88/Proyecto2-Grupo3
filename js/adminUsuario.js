import {
  campoRequerido,

} from "./validacionJuego.js";

import { Usuario } from "./classJuego.js";

let campoCodUS = document.getElementById("codUs");
let campoUsuario = document.getElementById("usuario");
let campoPass = document.getElementById("pass");
let campoAdmin = document.getElementById("admin");
let campoEstado = document.getElementById("estado");
let formularioUsuario = document.querySelector("#formUsuario");

let usuarioExistente = false; // variable bandera

let listaUsuarios = JSON.parse(localStorage.getItem("arrayUsuarioKey")) || [];

campoUsuario.addEventListener("blur", () => {
  campoRequerido(campoUsuario);
});

campoPass.addEventListener("blur", () => {
  campoRequerido(campoPass);
});

campoAdmin.addEventListener("blur", () => {
  campoRequerido(campoAdmin);
});

/*campoEstado.addEventListener("blur", () => {
  validarURL(campoEstado);
});*/

formularioUsuario.addEventListener("submit", guardarUsuario);

// cargo los Usuarios del localstorage en la lista

cargaInicial();

// emieza la logica CRUD

function guardarUsuario(e) {
  //prevenir el actualizar del submit
  e.preventDefault();

 
    console.log("los datos fueron enviados correctamente");
    if (usuarioExistente === false) {
      //crear Usuario
      crearUsuario();
    } else {
      //modificar Usuario
      modificarUsuario();
    }
  }


function crearUsuario() {
  // codigo unico
  let codigoUnico = Math.floor(Math.random() * 100);
  // crear objeto Usuario
  let usuarioNuevo = new Usuario(
    codigoUnico,
    campoUsuario.value,
    campoPass.value,
    campoAdmin.value,
  );
  console.log(usuarioNuevo);
  listaUsuarios.push(usuarioNuevo);
  console.log(listaUsuarios);
  limpiarFormulario();
  guardarLocalSorage();
  Swal.fire(
    "Usuario creado!!",
    "su Usuario se cargo correctamente!",
    "success"
  );
  crearFila(usuarioNuevo);
}

function limpiarFormulario() {
  //limpio formulario
  formularioUsuario.reset();
  //resetear las clases de los input
  campoCodUS.className = "form-control";
  campoUsuario.className = "form-control";
  campoPass.className = "form-control";
  campoAdmin.className = "form-control";

  usuarioExistente = false;
}

function guardarLocalSorage() {
  localStorage.setItem("arrayUsuarioKey", JSON.stringify(listaUsuarios));
}

function crearFila(Usuario) {
    let tablaUsuario = document.querySelector("#tablaUsuario");
  tablaUsuario.innerHTML += `<tr>
  <th>${Usuario.codigo}</th>
  <td>${Usuario.usuario}</td>
  <td>${Usuario.pass}</td>
  <td>${Usuario.admin}</td>
  <td>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="preEdicionUsuario('${Usuario.codigo}')"><i class="bi bi-pencil-square"></i></button>
    <button type="button" class="btn btn-danger" onclick="borrarUsuario('${Usuario.codigo}')"><i class="bi bi-trash3"></i></button>
  </td>
</tr>`;
}

function cargaInicial() {
  if (listaUsuarios.length > 0) {
    listaUsuarios.forEach((itemUsuario) => {
      crearFila(itemUsuario);
    });
  }
}
window.preEdicionUsuario = function (codigo) {
  console.log(codigo);
  //buscar el producto en el array
  let usuarioBuscado = listaUsuarios.find((itemUsuario) => {
    return itemUsuario.codigo === parseInt(codigo);
  });

  campoCodigo.value = usuarioBuscado.codigo;
  campoUsuario.value = usuarioBuscado.usuario;
  campoPass.value = usuarioBuscado.pass;
  campoAdmin.value = usuarioBuscado.admin;
  campoEstado.value = usuarioBuscado.estado;

  //cambiar la variable bandera productoExistente
  usuarioExistente = true;
};

function modificarUsuario() {
  console.log("desde modificar producto");
  Swal.fire({
    title: "¿Seguro qué desea modificar este Usuario?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento que quiero modificar dentro del array de productos
      let indiceUsuario = listaUsuarios.findIndex((itemUsuario) => {
        return itemUsuario.codigo === parseInt(campoCodigo.value);
      });

      console.log(indiceUsuario);
      //modificar los valores dentro del elemento del array de Usuarios
      listaUsuarios[indiceUsuario].Usuario = campoUsuario.value;
      listaUsuarios[indiceUsuario].pass = campoPass.value;
      listaUsuarios[indiceUsuario].admin = campoAdmin.value;
      listaUsuarios[indiceUsuario].estado = campoEstado.value;

      //actualizar el localStorage
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      //mostrar cartel al usuario
      Swal.fire(
        "Usuario modificado!",
        "Su Usuario fue modificado correctamente",
        "success"
      );
      //limpiar el formulario
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaUsuarios = document.querySelector("#tablaUsuario");
  tablaUsuarios.innerHTML = "";
}

window.borrarUsuario = function (codigo) {
  console.log("desde borrar Usuario");
  console.log(codigo);
  Swal.fire({
    title: "¿Seguro qué desea borrar este Usuario?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento en el array y borrarlo
      let nuevalistaUsuarios = listaUsuarios.filter((itemUsuario) => {
        return itemUsuario.codigo !== parseInt(codigo);
      });
      //actualizar el arreglo original y el localStorage
      listaUsuarios = nuevalistaUsuarios;
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();

      //mostrar cartel al usuario
      Swal.fire(
        "Usuario eliminado!",
        "Su Usuario fue eliminado correctamente",
        "success"
      );
    }
  });
};


//let campoAdmin = document.getElementById("admin");

function logueo(){
    let campoLogUs = document.getElementById("codidUsuarioUs");
    let campoLogPass = document.getElementById("idPass");

// campoUsuario.value;
//campoPass.value;
 //campoAdmin.value;
//campoEstado.value;

if (campoLogUs == "lucas" && campoLogPass == 123) {
    console.log("son iguales las contraseñas");
} else {
    console.log("puso mal la contraseña");
}

    //let campoLosADmin = document.getElementById("admin");
}



