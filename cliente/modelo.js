function Sistema() {
    this.usuarios = {};
    this.agregarUsuario = function (nick) {
        this.usuarios[nick] = new Usuario(nick);
    }
    this.obtenerUsuario = function () {
        return this.usuarios;
    }
    this.usuarioActivo = function (nick) {
        if (this.usuarios[nick]) {
            return true;
        } else {
            return false;
        }
    }
    this.eliminarUsuario = function (nick) {
        delete this.usuarios[nick];
    }

}
function Usuario(nick, email, password) {
    this.nick = nick;
    this.email = email;
    this.password = password;
}
