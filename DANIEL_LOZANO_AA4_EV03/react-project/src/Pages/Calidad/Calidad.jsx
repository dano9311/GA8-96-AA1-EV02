// Calidad.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import MenuVertical from '../../Components/MenuVertical/MenuVertical';
import Botones from '../../Components/Botones/Botones';
import './Calidad.css';

const Calidad = () => {
  const [informes, setInformes] = useState([]);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);

  useEffect(() => {
    const obtenerInformes = async () => {
      try {
        const respuesta = await api.get('/api/calidad');
        setInformes(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los informes:', error);
      }
    };
    obtenerInformes();
  }, []);

  const agregarInforme = async () => {
    try {
      const nuevoInforme = { informe: '', autor: '' };
      const respuesta = await api.post('/api/calidad', nuevoInforme);
      setInformes([...informes, respuesta.data]);
    } catch (error) {
      console.error('Error al agregar informe:', error);
    }
  };

  const manejarCambio = (index, campo, valor) => {
    const nuevosInformes = [...informes];
    nuevosInformes[index][campo] = valor;
    nuevosInformes[index].editado = true;  // Nuevo campo temporal para control de edición
    setInformes(nuevosInformes);
  };

  const actualizarInforme = async (index) => {
    const informe = informes[index];
    if (informe.editado) {  // Solo actualizar si se ha editado
      try {
        await api.put(`/api/calidad/${informe.id}`, informe);  // Actualiza el informe en la base de datos
        console.log('Informe actualizado con éxito');
        const nuevosInformes = [...informes];
        nuevosInformes[index].editado = false;
        setInformes(nuevosInformes);
      } catch (error) {
        console.error('Error al actualizar el informe:', error);
      }
    }
  };

  const manejarSeleccionarTodo = () => {
    const nuevoEstadoSeleccionarTodo = !seleccionarTodo;
    setSeleccionarTodo(nuevoEstadoSeleccionarTodo);
    const nuevosInformes = informes.map(informe => ({
      ...informe,
      seleccionado: nuevoEstadoSeleccionarTodo,
    }));
    setInformes(nuevosInformes);
  };

  const manejarSeleccionIndividual = (index) => {
    const nuevosInformes = [...informes];
    nuevosInformes[index].seleccionado = !nuevosInformes[index].seleccionado;
    setInformes(nuevosInformes);

    if (nuevosInformes.some(informe => !informe.seleccionado)) {
      setSeleccionarTodo(false);
    }
  };

  const eliminarInformes = async () => {
    const informesAEliminar = informes.filter(informe => informe.seleccionado);
    try {
      await Promise.all(
        informesAEliminar.map(async (informe) => {
          await api.delete(`/api/calidad/${informe.id}`);
        })
      );
      const informesFiltrados = informes.filter(informe => !informe.seleccionado);
      setInformes(informesFiltrados);
      setSeleccionarTodo(false);
    } catch (error) {
      console.error('Error al eliminar los informes:', error);
    }
  };

  return (
    <div className="calidad-container">
      <div className="menu-container">
        <MenuVertical />
      </div>

      <div className="contenido-principal">
        <h2>Calidad</h2>

        <div className="tabla-contenedor">
          <table className="tabla-informes">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={seleccionarTodo}
                    onChange={manejarSeleccionarTodo}
                  />
                </th>
                <th>Informe</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              {informes.map((informe, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={informe.seleccionado || false}
                      onChange={() => manejarSeleccionIndividual(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={informe.informe}
                      onChange={(e) => manejarCambio(index, 'informe', e.target.value)}
                      onBlur={() => actualizarInforme(index)}  // Actualización en onBlur
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={informe.autor}
                      onChange={(e) => manejarCambio(index, 'autor', e.target.value)}
                      onBlur={() => actualizarInforme(index)}  // Actualización en onBlur
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="botones-contenedor">
          <Botones
            onNuevo={agregarInforme}
            onEliminar={eliminarInformes}
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

export default Calidad;
