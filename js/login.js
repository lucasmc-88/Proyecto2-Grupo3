

function entrar() {
  listaUsuario = JSON.parse(localStorage.getItem("arrayUsuarioKey"));

  let usu = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  console.log(usu, pass, listaUsuario, listaUsuario.usuario);

  let validacion = listaUsuario.find((user) => {
    if (user.usuario == usu) {
      return user;
    }
  });


  let display = document.getElementById('navAdmin').className;
  console.log('esta fuera del if', display);
  if (
    usu === validacion.usuario &&
    pass === validacion.pass &&
    validacion.admin === "Admin"
  ) {
    window.location.href = "/pages/admin.html";
    display.className = "nav-item";
    console.log('esta dentro del if', display);
  } else {
    if (
      usu === validacion.usuario &&
      pass === validacion.pass &&
      validacion.admin === "Cliente"
    ) {
      window.location.href = "index.html";
      
    } else {
      console.log("datos erroneos");
    }
  }
  console.log('esta dentro del if', display);
}
