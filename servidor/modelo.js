function Sistema() {
    this.usuarios = {};
    this.contadorId = 1;

    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
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

function Usuario(nick) {
    this.nick = nick;
}
module.exports.Sistema = Sistema;