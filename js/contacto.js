let nombre = document.getElementById("nombre")
let mensaje = document.getElementById("mensaje")
let email = document.getElementById("email")

email.addEventListener("blur", () => {
    campoEmail(email)
})
nombre.addEventListener("blur", () => {
    campoNombre(nombre)
})

mensaje.addEventListener("blur", () => {
    campoMensaje(mensaje)
})

const campoNombre = (input) => {
    if (input.value.trim().length > 4) {
        input.className = "form-control is-valid";
        return true;
      } else {
        input.className = "form-control is-invalid";
        return false;
      }
}
const campoMensaje = (input) => {
    if(input.value.trim().length >= 10) {
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }
}
const campoEmail = (input) => {
    let patron = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if (patron.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
      } else {
        input.className = "form-control is-invalid";
        return false;
      }
}






