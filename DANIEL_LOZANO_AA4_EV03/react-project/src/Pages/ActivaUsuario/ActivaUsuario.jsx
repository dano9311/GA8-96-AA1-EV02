import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import MenuVertical from '../../Components/MenuVertical/MenuVertical';
import Botones from '../../Components/Botones/Botones';
import './ActivaUsuario.css';

const ActivaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await api.get('/api/usuarios');
        setUsuarios(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    obtenerUsuarios();
  }, []);

  const agregarUsuario = async () => {
    try {
      const nuevoUsuario = { usuario: '', clave: '', estado: 'Activo', rol: 'Operario' };
      const respuesta = await api.post('/api/usuarios/create', nuevoUsuario);
      setUsuarios([...usuarios, respuesta.data]);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const manejarCambio = (index, campo, valor) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios[index][campo] = valor;
    nuevosUsuarios[index].editado = true;
    setUsuarios(nuevosUsuarios);
  };

  const actualizarUsuario = async (index) => {
    const usuario = usuarios[index];
    if (usuario.editado) {
      try {
        await api.put(`/api/usuarios/update`, {
          id: usuario.id,
          usuario: usuario.usuario,
          estado: usuario.estado,
          rol: usuario.rol,
        });
        const nuevosUsuarios = [...usuarios];
        nuevosUsuarios[index].editado = false;
        setUsuarios(nuevosUsuarios);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }
    }
  };

  const actualizarClave = async (index) => {
    const usuario = usuarios[index];
    try {
      await api.patch(`/api/usuarios/updatePassword`, {
        id: usuario.id,
        clave: usuario.clave,
      });
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  };

  const manejarSeleccionarTodo = () => {
    const nuevoEstadoSeleccionarTodo = !seleccionarTodo;
    setSeleccionarTodo(nuevoEstadoSeleccionarTodo);
    const nuevosUsuarios = usuarios.map(usuario => ({
      ...usuario,
      seleccionado: nuevoEstadoSeleccionarTodo,
    }));
    setUsuarios(nuevosUsuarios);
  };

  const manejarSeleccionIndividual = (index) => {
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios[index].seleccionado = !nuevosUsuarios[index].seleccionado;
    setUsuarios(nuevosUsuarios);

    if (nuevosUsuarios.some(usuario => !usuario.seleccionado)) {
      setSeleccionarTodo(false);
    }
  };

  const eliminarUsuarios = async () => {
    const usuariosAEliminar = usuarios.filter(usuario => usuario.seleccionado);
    try {
      await Promise.all(
        usuariosAEliminar.map(async (usuario) => {
          await api.delete('/api/usuarios/delete', { data: { id: usuario.id } });
        })
      );
      const usuariosFiltrados = usuarios.filter(usuario => !usuario.seleccionado);
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.error('Error al eliminar los usuarios:', error);
    }
    setSeleccionarTodo(false);
  };

  return (
    <div className="activausuario-container">
      <div className="menu-container">
        <MenuVertical />
      </div>
      <div className="contenido-principal">
        <h2>Gestionar Usuarios</h2>
        <div className="tabla-contenedor">
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={seleccionarTodo}
                    onChange={manejarSeleccionarTodo}
                  />
                </th>
                <th>Usuario</th>
                <th>Clave</th>
                <th>Estado</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={usuario.seleccionado || false}
                      onChange={() => manejarSeleccionIndividual(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={usuario.usuario}
                      onChange={(e) => manejarCambio(index, 'usuario', e.target.value)}
                      onBlur={() => actualizarUsuario(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      value={usuario.clave}
                      onChange={(e) => manejarCambio(index, 'clave', e.target.value)}
                      onBlur={() => actualizarClave(index)}
                    />
                  </td>
                  <td>
                    <select
                      value={usuario.estado}
                      onChange={(e) => manejarCambio(index, 'estado', e.target.value)}
                      onBlur={() => actualizarUsuario(index)}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={usuario.rol}
                      onChange={(e) => manejarCambio(index, 'rol', e.target.value)}
                      onBlur={() => actualizarUsuario(index)}
                    >
                      <option value="Operario">Operario</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Calidad">Calidad</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="botones-contenedor">
          <Botones
            onNuevo={agregarUsuario}
            onEliminar={eliminarUsuarios}
            soloBotones={['nuevo', 'eliminar']}
            mostrarEntregar={false}
            mostrarPausar={false}
            mostrarPriorizar={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivaUsuario;
