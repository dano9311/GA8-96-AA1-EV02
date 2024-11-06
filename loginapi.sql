-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2024 a las 01:19:04
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `loginapi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calidad`
--

CREATE TABLE `calidad` (
  `id` int(11) NOT NULL,
  `informe` varchar(255) NOT NULL,
  `autor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `calidad`
--

INSERT INTO `calidad` (`id`, `informe`, `autor`) VALUES
(12, 'Informe prueba', 'Daniel Lozano'),
(15, 'Otro informe', 'Daniel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `producto` varchar(255) NOT NULL,
  `proveedor` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id`, `producto`, `proveedor`, `cantidad`, `precio`) VALUES
(1, 'Cinta doble faz', 'GrafiVisión', 22, '30000.00'),
(3, 'Correas plasticas', 'CintasMayor', 1000, '51000.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos_area`
--

CREATE TABLE `trabajos_area` (
  `id` int(11) NOT NULL,
  `producto` varchar(100) NOT NULL,
  `estado` enum('en progreso','en pausa','prioridad','entregado') DEFAULT 'en progreso',
  `cantidad` varchar(50) NOT NULL,
  `prioridad` int(11) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `trabajos_area`
--

INSERT INTO `trabajos_area` (`id`, `producto`, `estado`, `cantidad`, `prioridad`, `fecha_creacion`) VALUES
(1, 'collarines', 'en progreso', '5000', 0, '2024-11-01 23:02:00'),
(16, 'cintas', 'en progreso', '10000000', 0, '2024-11-05 16:32:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(250) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Inactivo',
  `Rol` enum('Administrador','Calidad','Operario') DEFAULT 'Operario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`, `Estado`, `Rol`) VALUES
(1, 'dlozano', '123', 'Inactivo', 'Calidad'),
(2, 'Jrodriguez', '123', 'Inactivo', 'Calidad'),
(3, 'usuario', '123', 'Inactivo', 'Calidad'),
(12, 'UP', '123', 'Inactivo', 'Calidad'),
(13, 'UP2', '7896', 'Inactivo', 'Calidad'),
(14, 'OtroUsuarioMas', '1478', 'Inactivo', 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calidad`
--
ALTER TABLE `calidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajos_area`
--
ALTER TABLE `trabajos_area`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calidad`
--
ALTER TABLE `calidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trabajos_area`
--
ALTER TABLE `trabajos_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
