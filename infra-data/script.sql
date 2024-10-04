-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Campo para la fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Campo para la fecha de actualización
);

-- Crear tabla de herramientas
CREATE TABLE IF NOT EXISTS herramientas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    peso DOUBLE NOT NULL,
    idcategoria INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Campo para la fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Campo para la fecha de actualización
    FOREIGN KEY (idcategoria) REFERENCES categorias(id) ON DELETE CASCADE ON UPDATE CASCADE  -- Clave externa con ON DELETE/UPDATE
);

-- Crear índice para optimizar consultas en id_categoria de herramientas
CREATE INDEX idx_herramientas_idcategoria ON herramientas (idcategoria);
