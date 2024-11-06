import React, { useState } from 'react';
import api from '../../axiosConfig'; // Usando la instancia de axios configurada
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => { // Recibimos la función onLogin como prop
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(''); // Para almacenar el nombre de usuario
  const [clave, setClave] = useState(''); // Para almacenar la contraseña
  const [error, setError] = useState(''); // Para mostrar mensajes de error

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    try {
      // Realizar la solicitud POST a la API de login
      const response = await api.post('/auth/login', {
        usuario,
        clave
      });

      // Guardar el token en localStorage si el login es exitoso
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setError(''); // Limpia el error si el login es exitoso

        // Aquí asumimos que `usuario` es devuelto en el response (por ejemplo: response.data.usuario)
        const nombreCompleto = response.data.usuario; 
        onLogin(nombreCompleto); // Pasar el nombre de usuario a la función onLogin
        navigate('/area-trabajo'); // Redirigir a la pantalla principal
      } else {
        setError('Error en el inicio de sesión. Intente nuevamente.');
      }
    } catch (error) {
      // Mostrar mensaje de error detallado
      if (error.response && error.response.status === 401) {
        setError('Credenciales incorrectas.');
      } else {
        setError('Error de red. Intente nuevamente más tarde.');
      }
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>} {/* Mostrar el mensaje de error */}
        <div className='input-box'>
          <input
            type='text'
            placeholder='Username'
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <FaLock className='icon' />
        </div>
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
