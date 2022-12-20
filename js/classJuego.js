export class Juego {
  constructor(varCodigo, varJuego, varCategoria, varDescripcion, varUrl, varPublicado) {
    this.codigo = varCodigo;
    this.juego = varJuego;
    this.categoria = varCategoria;
    this.descripcion = varDescripcion;
    this.url = varUrl;
    this.publicado = varPublicado
  }

  //getters y setters
  get getCodigo() {
    return this.codigo;
  }

  get getJuego() {
    return this.juego;
  }

  get getCategoria() {
    return this.categoria;
  }

  get getDescripcion() {
    return this.descripcion;
  }

  get geturl() {
    return this.url;
  }

  set setCodigo(codigo) {
    this.codigo = codigo;
  }

  set setJuego(juego) {
    this.juego = juego;
  }

  set setCategoria(categoria) {
    this.categoria = categoria;
  }

  set setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }
  set seturl(url) {
    this.url = url;
  }
}


export class Usuario {
  constructor(varCodigo, varUsuario, varPass, varAdmin, varEstado) {
    this.codigo = varCodigo;
    this.usuario = varUsuario;
    this.pass = varPass;
    this.admin = varAdmin;
    this.estado = varEstado;
  }

  //getters y setters
  get getCodigo() {
    return this.codigo;
  }

  get getUsuario() {
    return this.usuario;
  }
  get getPass() {
    return this.pass;
  }
  get getadmin() {
    return this.admin;
  }
  get geturl() {
    return this.url;
  }
  set setCodigo(codigo) {
    this.codigo = codigo;
  }
  set setUsuario(usuario) {
    this.usuario = usuario;
  }
  set setPass(pass) {
    this.pass = pass;
  }
  set setAdmin(admin) {
    this.admin = admin;
  }
  set setEstado(estado) {
    this.estado = estado;
  }
}

