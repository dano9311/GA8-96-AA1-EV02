import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuVertical from './Components/MenuVertical/MenuVertical';
import LoginForm from './Components/LoginForm/LoginForm';
import AreaTrabajo from './Pages/AreaTrabajo/AreaTrabajo';
import Calidad from './Pages/Calidad/Calidad';
import Inventario from './Pages/Inventario/Inventario';
import ActivaUsuario from './Pages/ActivaUsuario/ActivaUsuario';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [nombreUsuario, setNombreUsuario] = useState(''); // Almacena el nombre del usuario

  // Función que se pasa a LoginForm y se ejecuta al loguearse
  const handleLogin = (username) => {
    setNombreUsuario(username); // Actualiza el nombre del usuario logueado
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} /> {/* Pasa la función de login */}

        {/* Rutas protegidas */}
        <Route
          path="/area-trabajo"
          element={
            <PrivateRoute>
              <div style={{ display: 'flex', height: '100vh' }}>
                <MenuVertical nombreUsuario={nombreUsuario} />
                <div style={{ width: '80%' }}>
                  <AreaTrabajo />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/calidad"
          element={
            <PrivateRoute>
              <div style={{ display: 'flex', height: '100vh' }}>
                <MenuVertical nombreUsuario={nombreUsuario} />
                <div style={{ width: '80%' }}>
                  <Calidad />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <PrivateRoute>
              <div style={{ display: 'flex', height: '100vh' }}>
                <MenuVertical nombreUsuario={nombreUsuario} />
                <div style={{ width: '80%' }}>
                  <Inventario />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/activa-usuario"
          element={
            <PrivateRoute>
              <div style={{ display: 'flex', height: '100vh' }}>
                <MenuVertical nombreUsuario={nombreUsuario} />
                <div style={{ width: '80%' }}>
                  <ActivaUsuario />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
