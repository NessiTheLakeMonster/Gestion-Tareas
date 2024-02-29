-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-02-2024 a las 16:45:11
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_tareas_dev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', '2024-02-29 16:44:28', '2024-02-29 16:44:28'),
(2, 'Programador', '2024-02-29 16:44:28', '2024-02-29 16:44:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_asignados`
--

DROP TABLE IF EXISTS `roles_asignados`;
CREATE TABLE IF NOT EXISTS `roles_asignados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_rol` int DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles_asignados`
--

INSERT INTO `roles_asignados` (`id`, `id_rol`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(2, 2, 2, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(3, 2, 3, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(4, 1, 4, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(5, 1, 5, '2024-02-29 16:45:02', '2024-02-29 16:45:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240116123205-create-user.js'),
('20240116154945-create-tarea.js'),
('20240117093904-create-roles.js'),
('20240117094853-create-roles-asignados.js'),
('20240118185930-create-tareas-asignadas.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `dificultad` varchar(255) NOT NULL,
  `horas_previstas` int NOT NULL,
  `horas_realizadas` int DEFAULT NULL,
  `realizacion` int DEFAULT NULL,
  `completada` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `descripcion`, `dificultad`, `horas_previstas`, `horas_realizadas`, `realizacion`, `completada`, `createdAt`, `updatedAt`) VALUES
(1, 'Tristis libero vulticulus enim demens adipisci sponte cupressus. Spiculum comes vomica viduo crepusculum stips una. Cribro campana valetudo vir ter adsuesco.', 'baja', 72, 33, 0, 0, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(2, 'Bellicus adiuvo campana cur. A ver suscipio vulgaris vociferor repudiandae valde adulatio ocer tempore. Deorsum tripudio ut conturbo denuo testimonium creator talus.', 'media', 50, 63, 0, 0, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(3, 'Necessitatibus repudiandae adduco succurro curriculum temeritas argumentum quaerat. Summisse maiores verto coniecto catena aut audax aperio. Concido alioqui soluta pecus crur arma.', 'baja', 27, 0, 0, 0, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(4, 'Animi ambulo sollers trans volup suus spectaculum terra creo cupiditate. Sortitus substantia tui degusto cariosus admoveo unde xiphias. Debeo cultura ultio sumo succurro vis defetiscor.', 'baja', 96, 23, 0, 0, '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(5, 'Placeat adimpleo succedo demum delectatio chirographum. Viriliter vester vulgo ipsum. Pauci aestas trans despecto virgo ventosus aurum cruciamentum consequuntur.', 'baja', 35, 17, 0, 0, '2024-02-29 16:45:02', '2024-02-29 16:45:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_asignadas`
--

DROP TABLE IF EXISTS `tareas_asignadas`;
CREATE TABLE IF NOT EXISTS `tareas_asignadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tarea` int DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tarea` (`id_tarea`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Soledad', 'Rendón Ballesteros', 'Ramon_MunozGurule6@yahoo.com', '1234', '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(2, 'Juan', 'de Anda Cerda', 'Barbara_MontanoValdivia@hotmail.com', '1234', '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(3, 'Mónica', 'Delatorre Jiménez', 'Isabel_VelazquezParra@yahoo.com', '1234', '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(4, 'Antonio', 'Cervántez Rivera', 'Fernando.GamboaVelasco@hotmail.com', '1234', '2024-02-29 16:45:02', '2024-02-29 16:45:02'),
(5, 'Sancho', 'Villegas Cortés', 'JoseEmilio.CadenaPedraza@gmail.com', '1234', '2024-02-29 16:45:02', '2024-02-29 16:45:02');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `roles_asignados`
--
ALTER TABLE `roles_asignados`
  ADD CONSTRAINT `roles_asignados_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `roles_asignados_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tareas_asignadas`
--
ALTER TABLE `tareas_asignadas`
  ADD CONSTRAINT `tareas_asignadas_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`),
  ADD CONSTRAINT `tareas_asignadas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
