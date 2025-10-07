function Sistema() {
    this.usuarios = {};
    this.contadorId = 1;

    this.agregarUsuario = function (nick, email, password) {
        this.usuarios[nick] = new Usuario(nick, email, password); this.contadorId++;
        return this.contadorId;
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
        if (this.usuarios.hasOwnProperty(nick)) {
            delete this.usuarios[nick];
            return true;
        }
        return false;
    }

    this.numeroUsuarios = function () {
        return Object.keys(this.usuarios).length;
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }
}

function Usuario(nick, email, password) {
    this.nick = nick;
    this.email = email;
    this.password = password;
}
