function ClienteRest() {

    this.agregarUsuario = function (nick, email, password) {
        $.getJSON("/agregarUsuario/" + nick + "/" + email + "/" + password, function (data) {
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado con email: " + email);
            } else {
                console.log("El nick ya está ocupado");
            }
        });
    }
    this.agregarUsuario2 = function (nick) {
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nick,
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado")
                }
                else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios", function (data) {
            console.log("Lista de usuarios:", data);
        });
    }

    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios", function (data) {
            console.log("Número de usuarios:", data.num);
        });
    }

    this.usuarioActivo = function (nick) {
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data.activo) {
                console.log("El usuario " + nick + " está activo");
            } else {
                console.log("El usuario " + nick + " NO está activo");
            }
        });
    }

    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (data.eliminado) {
                console.log("Usuario " + nick + " eliminado correctamente");
            } else {
                console.log("No se pudo eliminar el usuario " + nick);
            }
        });
    }
}