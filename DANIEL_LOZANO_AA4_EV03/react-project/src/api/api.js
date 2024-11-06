//Este archivo configurará la instancia de axios para incluir automáticamente el token de autenticación.

import axios from 'axios';

// Crea una instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia a la URL de la API en producción
  headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para incluir el token en cada petición si está disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
