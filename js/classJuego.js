export class Juego{
    constructor(varCodigo, varJuego, varCategoria, varDescripcion, varPublicado){
        this.codigo = varCodigo;
        this.juego = varJuego;
        this.categoria = varCategoria;
        this.descripcion = varDescripcion;
        this.publicado = varPublicado;
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
        return this.cantidad;
     }

     get getPublicado() {
        return this.publicado;
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
     set setPublicado(publicado) {
        this.publicado = publicado;
     }
};