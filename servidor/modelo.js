function Sistema() {
    this.usuarios = {};
    this.contadorId = 1;

    this.agregarUsuario = function (nick, email, password) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick, email, password);
            res.nick = nick;
        } else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    this.usuarioActivo = function (nick) {
        let res = { "activo": false };
        if (this.usuarios[nick]) {
            res.activo = true;
        }
        return res;
    }

    this.eliminarUsuario = function (nick) {
        let res = { "eliminado": false };
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
            res.eliminado = true;
        }
        return res;
    }

    this.numeroUsuarios = function () {
        return { "num": Object.keys(this.usuarios).length };
    }
}

function Usuario(nick, email, password) {
    this.nick = nick;
    this.email = email;
    this.password = password;
}
module.exports.Sistema = Sistema;