CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL AUTO_INCREMENT,
  `cuerpo` varchar(500) NOT NULL,
  `creado_en` DATETIME NOT NULL,
  `actualizado_en` DATETIME NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_mensaje`),
  KEY `fk_id_status_mensajes_idx` (`id_status`),
  CONSTRAINT `fk_id_status_mensajes` FOREIGN KEY (`id_status`) REFERENCES `status_mensajes` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `status_mensajes` (
  `id_status` tinyint(1) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `status_usuarios` (
  `id_status` tinyint(1) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `nombre_de_usuario` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `creado_en` DATETIME NOT NULL,
  `actualizado_en` DATETIME NOT NULL,
  `id_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_id_status_usuarios_idx` (`id_status`),
  CONSTRAINT `fk_id_status_usuarios` FOREIGN KEY (`id_status`) REFERENCES `status_usuarios` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
