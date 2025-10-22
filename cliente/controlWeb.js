function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div id="mAU" class="form-group">';
        cadena += '<label for="nick">Nick:</label>';
        cadena += '<input type="text" class="form-control" id="nick">';
        cadena += '<label for="email" class="mt-2">Email:</label>';
        cadena += '<input type="email" class="form-control" id="email">';
        cadena += '<label for="password" class="mt-2">Password:</label>';
        cadena += '<input type="password" class="form-control" id="password">';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary mt-2">Agregar Usuario</button>';
        cadena += '</div>';

        $("#au").append(cadena);

        $("#btnAU").on("click", function () {
            let nick = $("#nick").val().trim();
            let email = $("#email").val().trim();
            let password = $("#password").val().trim();
            if (nick && email && password) {
                rest.agregarUsuario(nick, email, password);
                $("#mAU").remove();
            } else {
                alert("Por favor, completa todos los campos");
            }
        });
    }
    this.salir = function () {
        //localStorage.removeItem("nick"); location.reload();
        $.removeCookie("nick");
        alert("Sesión cerrada correctamente. ¡Hasta pronto!");
    }

    this.comprobarSesion = function () {
        //let nick = localStorage.getItem("nick");
        let nick = $.cookie("nick");
        if (nick) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        }
        else {
            cw.mostrarAgregarUsuario();
        }
    }
    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div id="mOU" class="form-group">';
        cadena += '<button id="btnOU" type="submit" class="btn btn-info">Obtener Lista de Usuarios</button>';
        cadena += '<div id="listaUsuarios" class="mt-3"></div>';
        cadena += '</div>';

        $("#au").html(cadena);

        $("#btnOU").on("click", function () {
            $.getJSON("/obtenerUsuarios", function (data) {
                let listaDiv = $("#listaUsuarios");
                listaDiv.empty(); // Limpiar lista anterior

                if (Object.keys(data).length === 0) {
                    listaDiv.html('<div class="alert alert-warning">No hay usuarios registrados</div>');
                } else {
                    let html = '<div class="card"><div class="card-header"><h5>Usuarios Registrados</h5></div><div class="card-body">';
                    html += '<table class="table table-striped">';
                    html += '<thead><tr><th>Nick</th><th>Email</th></tr></thead><tbody>';

                    for (let nick in data) {
                        let usuario = data[nick];
                        html += '<tr>';
                        html += '<td>' + usuario.nick + '</td>';
                        html += '<td>' + (usuario.email || 'No especificado') + '</td>';
                        html += '</tr>';
                    }

                    html += '</tbody></table>';
                    html += '</div></div>';
                    listaDiv.html(html);
                }
            });
        });
    }



    this.mostrarEliminarUsuario = function () {
        let cadena = '<div id="mEU" class="form-group">';
        cadena += '<label for="nickEliminar">Nick a eliminar:</label>';
        cadena += '<input type="text" class="form-control" id="nickEliminar">';
        cadena += '<button id="btnEU" type="submit" class="btn btn-danger mt-2">Eliminar Usuario</button>';
        cadena += '</div>';

        $("#au").html(cadena);

        $("#btnEU").on("click", function () {
            let nick = $("#nickEliminar").val().trim();
            if (nick) {
                rest.eliminarUsuario(nick);
                $("#mEU").remove();
            } else {
                alert("Por favor, introduce un nick válido");
            }
        });
    }

    this.mostrarNumeroUsuarios = function () {
        let cadena = '<div id="mNU" class="form-group">';
        cadena += '<button id="btnNU" type="submit" class="btn btn-warning">Consultar Número de Usuarios</button>';
        cadena += '<div id="resultadoNumero" class="mt-3 alert alert-info"></div>';
        cadena += '</div>';

        $("#au").html(cadena);

        $("#btnNU").on("click", function () {
            // Usamos el método alternativo para poder mostrar el resultado en la página
            $.getJSON("/numeroUsuarios", function (data) {
                $("#resultadoNumero").html("Número total de usuarios: <strong>" + data.num + "</strong>");
            });
        });
    }
    this.mostrarUsuarioActivo = function () {
        let cadena = '<div id="mUA" class="form-group">';
        cadena += '<label for="nickConsultar">Consultar estado de usuario:</label>';
        cadena += '<input type="text" class="form-control" id="nickConsultar" placeholder="Introduce el nick">';
        cadena += '<button id="btnUA" type="submit" class="btn btn-secondary mt-2">Consultar Estado</button>';
        cadena += '<div id="resultadoEstado" class="mt-3"></div>';
        cadena += '</div>';

        $("#au").html(cadena);

        $("#btnUA").on("click", function () {
            let nick = $("#nickConsultar").val().trim();
            if (nick) {
                $.getJSON("/usuarioActivo/" + nick, function (data) {
                    let resultadoDiv = $("#resultadoEstado");
                    resultadoDiv.empty(); // Limpiar resultado anterior

                    if (data.activo) {
                        resultadoDiv.html('<div class="alert alert-success">El usuario <strong>' + nick + '</strong> está <strong>ACTIVO</strong></div>');
                    } else {
                        resultadoDiv.html('<div class="alert alert-danger">El usuario <strong>' + nick + '</strong> <strong>NO existe</strong> en el sistema</div>');
                    }
                }).fail(function () {
                    $("#resultadoEstado").html('<div class="alert alert-warning">Error al consultar el usuario</div>');
                });
            } else {
                alert("Por favor, introduce un nick válido");
            }
        });
    }

}