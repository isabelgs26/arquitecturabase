describe('El sistema', function () {
  let sistema;

  beforeEach(function () {
    sistema = new Sistema();
  });

  it('agregar usuario', function () {
    sistema.agregarUsuario('juan', 'juan', '1234');
    expect(sistema.numeroUsuarios()).toEqual(1);
  });

  it('eliminar usuario', function () {
    sistema.agregarUsuario('juan', 'juan', '1234');
    sistema.eliminarUsuario('juan');
    expect(sistema.numeroUsuarios()).toEqual(0);
  });

  it('obtener usuario', function () {
    sistema.agregarUsuario('juan', 'juan', '1234');
    const usuarios = sistema.obtenerUsuarios();
    expect(usuarios['juan']).toBeDefined();
  });

  it('usuario activo', function () {
    sistema.agregarUsuario('juan', 'juan', '1234');
    expect(sistema.usuarioActivo('juan')).toBeTrue();
    expect(sistema.usuarioActivo('pedro')).toBeFalse();
  });
});