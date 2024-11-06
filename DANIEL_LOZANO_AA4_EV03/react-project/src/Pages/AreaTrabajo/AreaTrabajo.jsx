import React, { useState, useEffect } from 'react';
import MenuVertical from '../../Components/MenuVertical/MenuVertical';
import Botones from '../../Components/Botones/Botones';
import api from '../../api/api';
import './AreaTrabajo.css';

const AreaTrabajo = () => {
  const [productos, setProductos] = useState([]);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);

  // Función para obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await api.get('/api/trabajos_area');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Función para agregar un nuevo producto
  const agregarProducto = async () => {
    try {
      const nuevoProducto = { producto: 'Nuevo Producto', estado: 'En progreso', cantidad: '0/50' };
      await api.post('/api/trabajos_area', nuevoProducto);
      obtenerProductos(); // Recarga los productos después de agregar
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Función para manejar cambios en los campos del producto
  const manejarCambio = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][campo] = valor;
    setProductos(nuevosProductos);
  };

  // Función para actualizar un producto en la base de datos
  const actualizarProducto = async (index) => {
    const producto = productos[index];
    try {
      await api.put(`/api/trabajos_area/${producto.id}`, producto);
      obtenerProductos(); // Recarga los productos después de actualizar
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // Función para eliminar productos seleccionados
  const eliminarProductos = async () => {
    const productosAEliminar = productos.filter(producto => producto.seleccionado);
    try {
      await Promise.all(
        productosAEliminar.map(async (producto) => {
          await api.delete(`/api/trabajos_area/${producto.id}`);
        })
      );
      obtenerProductos(); // Recarga los productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar productos:', error);
    }
  };

  // Función para alternar estado entre "Prioridad" y "En progreso"
  const priorizarProducto = async () => {
    const productosPriorizados = productos.map(producto =>
      producto.seleccionado
        ? { ...producto, estado: producto.estado === "Prioridad" ? "En progreso" : "Prioridad" }
        : producto
    );
    setProductos(productosPriorizados);

    try {
      await Promise.all(
        productosPriorizados
          .filter(producto => producto.seleccionado)
          .map(async (producto) => {
            await api.put(`/api/trabajos_area/${producto.id}`, { estado: producto.estado });
          })
      );
      obtenerProductos(); // Recarga los productos después de priorizar
    } catch (error) {
      console.error('Error al priorizar productos:', error);
    }
  };

  // Función para alternar estado entre "En pausa" y "En progreso"
  const pausarProducto = async () => {
    const productosPausados = productos.map(producto =>
      producto.seleccionado
        ? { ...producto, estado: producto.estado === "En pausa" ? "En progreso" : "En pausa" }
        : producto
    );
    setProductos(productosPausados);

    try {
      await Promise.all(
        productosPausados
          .filter(producto => producto.seleccionado)
          .map(async (producto) => {
            await api.put(`/api/trabajos_area/${producto.id}`, { estado: producto.estado });
          })
      );
      obtenerProductos(); // Recarga los productos después de pausar
    } catch (error) {
      console.error('Error al pausar productos:', error);
    }
  };

  // Función para alternar estado entre "Entregado" y "En progreso"
  const entregarProducto = async () => {
    const productosEntregados = productos.map(producto =>
      producto.seleccionado
        ? { ...producto, estado: producto.estado === "Entregado" ? "En progreso" : "Entregado" }
        : producto
    );
    setProductos(productosEntregados);

    try {
      await Promise.all(
        productosEntregados
          .filter(producto => producto.seleccionado)
          .map(async (producto) => {
            await api.put(`/api/trabajos_area/${producto.id}`, { estado: producto.estado });
          })
      );
      obtenerProductos(); // Recarga los productos después de entregar
    } catch (error) {
      console.error('Error al entregar productos:', error);
    }
  };

  return (
    <div className="area-trabajo-container">
      <div className="menu-container">
        <MenuVertical />
      </div>

      <div className="contenido-principal">
        <h2>Área de Trabajo</h2>

        <div className="tabla-contenedor">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={seleccionarTodo}
                    onChange={() => {
                      setSeleccionarTodo(!seleccionarTodo);
                      setProductos(productos.map(producto => ({ ...producto, seleccionado: !seleccionarTodo })));
                    }}
                  />
                </th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={producto.seleccionado || false}
                      onChange={() => {
                        const nuevosProductos = [...productos];
                        nuevosProductos[index].seleccionado = !nuevosProductos[index].seleccionado;
                        setProductos(nuevosProductos);
                      }}
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
                  <td>{producto.estado}</td>
                  <td>
                    <input
                      type="text"
                      value={producto.cantidad}
                      onChange={(e) => manejarCambio(index, 'cantidad', e.target.value)}
                      onBlur={() => actualizarProducto(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Botones
          onNuevo={agregarProducto}
          onEliminar={eliminarProductos}
          onPriorizar={priorizarProducto}
          onPausar={pausarProducto}
          onEntregar={entregarProducto}
          mostrarPriorizar={true}
          mostrarPausar={true}
          mostrarEntregar={true}
        />
      </div>
    </div>
  );
};

export default AreaTrabajo;
