// Inventario.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import MenuVertical from '../../Components/MenuVertical/MenuVertical';
import Botones from '../../Components/Botones/Botones';
import './Inventario.css';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await api.get('/api/inventario');
        setProductos(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    obtenerProductos();
  }, []);

  const agregarProducto = async () => {
    try {
      const nuevoProducto = { producto: '', proveedor: '', cantidad: 0, precio: 0.0 };
      const respuesta = await api.post('/api/inventario', nuevoProducto);
      setProductos([...productos, respuesta.data]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const manejarCambio = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    // Manejar campos numéricos: cantidad y precio
    if (campo === 'cantidad') {
      nuevosProductos[index][campo] = parseInt(valor, 10) || 0;
    } else if (campo === 'precio') {
      nuevosProductos[index][campo] = parseFloat(valor) || 0.0;
    } else {
      nuevosProductos[index][campo] = valor;
    }
    nuevosProductos[index].editado = true;  // Nuevo campo temporal para control de edición
    setProductos(nuevosProductos);
  };

  const actualizarProducto = async (index) => {
    const producto = productos[index];
    if (producto.editado) {
      try {
        await api.put(`/api/inventario/${producto.id}`, producto);
        console.log('Producto actualizado con éxito');
        const nuevosProductos = [...productos];
        nuevosProductos[index].editado = false;
        setProductos(nuevosProductos);
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    }
  };

  const manejarSeleccionarTodo = () => {
    const nuevoEstadoSeleccionarTodo = !seleccionarTodo;
    setSeleccionarTodo(nuevoEstadoSeleccionarTodo);
    const nuevosProductos = productos.map(producto => ({
      ...producto,
      seleccionado: nuevoEstadoSeleccionarTodo,
    }));
    setProductos(nuevosProductos);
  };

  const manejarSeleccionIndividual = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].seleccionado = !nuevosProductos[index].seleccionado;
    setProductos(nuevosProductos);

    if (nuevosProductos.some(producto => !producto.seleccionado)) {
      setSeleccionarTodo(false);
    }
  };

  const eliminarProductos = async () => {
    const productosAEliminar = productos.filter(producto => producto.seleccionado);
    try {
      await Promise.all(
        productosAEliminar.map(async (producto) => {
          await api.delete(`/api/inventario/${producto.id}`);
        })
      );
      const productosFiltrados = productos.filter(producto => !producto.seleccionado);
      setProductos(productosFiltrados);
      setSeleccionarTodo(false);
    } catch (error) {
      console.error('Error al eliminar los productos:', error);
    }
  };

  return (
    <div className="inventario-container">
      <div className="menu-container">
        <MenuVertical />
      </div>

      <div className="contenido-principal">
        <h2>Inventario</h2>

        <div className="tabla-contenedor">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={seleccionarTodo}
                    onChange={manejarSeleccionarTodo}
                  />
                </th>
                <th>Producto</th>
                <th>Proveedor</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={producto.seleccionado || false}
                      onChange={() => manejarSeleccionIndividual(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={producto.producto}
                      onChange={(e) => manejarCambio(index, 'producto', e.target.value)}
                      onBlur={() => actualizarProducto(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={producto.proveedor}
                      onChange={(e) => manejarCambio(index, 'proveedor', e.target.value)}
                      onBlur={() => actualizarProducto(index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => manejarCambio(index, 'cantidad', e.target.value)}
                      onBlur={() => actualizarProducto(index)}
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={producto.precio}
                      onChange={(e) => manejarCambio(index, 'precio', e.target.value)}
                      onBlur={() => actualizarProducto(index)}
                      step="0.01"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="botones-contenedor">
          <Botones
            onNuevo={agregarProducto}
            onEliminar={eliminarProductos}
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

export default Inventario;
