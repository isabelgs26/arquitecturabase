const fs = require("fs");
const express = require('express');
const app = express();
const modelo = require('./servidor/modelo.js');

const PORT = process.env.PORT || 3000;

// Crear instancia del sistema
let sistema = new modelo.Sistema();

app.use(express.static(__dirname + "/"));

app.get("/", function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.agregarUsuario(nick);
    response.json(res);
});


app.get("/obtenerUsuarios", function (request, response) {
    let res = sistema.obtenerUsuarios();
    response.json(res);
});

app.get("/usuarioActivo/:nick", function (request, response) {
    let nick = request.params.nick;
    let activo = sistema.usuarioActivo(nick);
    response.json({ nick: nick, activo: activo });
});

app.get("/numeroUsuarios", function (request, response) {
    let num = sistema.numeroUsuarios();
    response.json({ numeroUsuarios: num });
});

app.get("/eliminarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = sistema.eliminarUsuario(nick);
    response.json(res);
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});