// MenuVertical.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MenuVertical.css';

const MenuVertical = ({ nombreUsuario }) => {
  // Deriva la inicial del nombre de usuario en mayúscula
  const inicial = nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() : '';

  return (
    <div className="menu-vertical">
      {/* Avatar y nombre del usuario */}
      <div className="user-info">
        <Link to="/">
          <div className="avatar">{inicial}</div> {/* Muestra la inicial en el avatar */}
        </Link>
        <h2 className="user-name">{nombreUsuario || 'Usuario Desconocido'}</h2> {/* Muestra el nombre del usuario */}
      </div>

      {/* Opciones del menú con enlaces de navegación */}
      <div className="menu-options">
        <Link to="/area-trabajo">
          <button>Área de trabajo</button>
        </Link>
        <Link to="/calidad">
          <button>Calidad</button>
        </Link>
        <Link to="/inventario">
          <button>Inventario</button>
        </Link>
        <Link to="/activa-usuario">
          <button>Activa Usuario</button>
        </Link>
      </div>

      {/* Información de la empresa */}
      <div className="company-info">
        <p>Información de la empresa</p>
        <p>Nombre</p>
        <p>Teléfono</p>
        <p>Dirección</p>
      </div>
    </div>
  );
};

export default MenuVertical;

