<?php

interface DbSentencias {

//Usuario
    const INSERTAR_USUARIO = "INSERT INTO usuarios (`nombre_usuario`,`clave_usuario`,`nivelAcceso_usuario`)VALUES (?,?,?);";
    const ELIMINAR_USUARIO = "DELETE FROM usuarios WHERE id_usuario = ?;";
    const ACTUALIZAR_USUARIO = "UPDATE usuarios SET `nombre_usuario`= ?,`nivelAcceso_usuario`= ? WHERE id_usuario = ?";
    const RESET_CLAVE_USUARIO = "UPDATE usuarios SET `clave_usuario`= ? WHERE id_usuario = ?";
    const BUSCAR_USUARIOS_X_NOMBRE = "SELECT * FROM usuarios WHERE `nombre_usuario` LIKE ?;";
    const BUSCAR_USUARIOS_X_NIVELACCESO = "SELECT * FROM usuarios WHERE `nivelAcceso_usuario` LIKE ?;";
    const LISTAR_USUARIOS = "SELECT `id_usuario`,`nombre_usuario`,`nivelAcceso_usuario` FROM usuarios";
    const MAX_ID_USUARIO = "SELECT MAX(id_usuario) FROM usuarios";
    const BUSCAR_USUARIO = "SELECT * FROM usuarios WHERE id_usuario = ?;";
    const CANTIDAD_USUARIOS = "SELECT COUNT(*) FROM `db_yacomo`.`usuarios`;";
//Sesion
    const BUSCAR_USUARIO_X_NOM_CLAVE = "SELECT `id_usuario`,`nombre_usuario`,`nivelAcceso_usuario`,`clave_usuario` FROM usuarios WHERE nombre_usuario = ?";
//FActura
    const INSERTAR_FACTURA = "INSERT INTO `db_yacomo`.`facturas` (`fecha_factura`,`id_cliente_factura`,`id_tipo_factura`) VALUES (NOW(),?,?);";
    const MAX_NRO_FACTURA = "SELECT MAX(nro_factura) FROM facturas";
    const BUSCAR_FACTURAS = "SELECT * FROM facturas WHERE ? LIKE ?;";
    const LISTAR_FACTURAS = "SELECT * FROM facturas";
    const CANTIDAD_FACTURAS = "SELECT COUNT(*) FROM `db_yacomo`.`facturas`;";
    
    
//Detalles Factura
    const INSERTAR_DETALLE_FACTURA = "INSERT INTO `db_yacomo`.`detallesfactura` (`cantidad_detalleFactura`,`id_producto_detalleFactura`,`nro_factura_detalleFactura`) VALUES (?,?,?);";
    const MAX_ID_DETALLE_FACTURA = "SELECT MAX(id_detalleFactura) FROM detallesfactura";
    const BUSCAR_DETALLE_FACTURA = "SELECT * FROM detallesfactura WHERE ? LIKE ?;";
    //Historico Factura
    const INSERTAR_HISTORICO_FACTURA = "INSERT INTO `db_yacomo`.`historicosfactura` (`nro_factura_historicosFactura`,`id_usuario_historicosFactura`) VALUES (?,?);";
    const MAX_ID_HISTORICO_FACTURA = "SELECT MAX(id_historicosFactura) FROM historicosfactura";
    const BUSCAR_HISTORICO_FACTURA = "SELECT * FROM historicosfactura WHERE ? LIKE ?;";
//TiposFactura
    const LISTAR_TIPOS_FACTURA = 'SELECT * FROM tiposfactura';
    const INSERTAR_TIPO_FACTURA = 'INSERT INTO tiposfactura (tipo_tipofactura) VALUES (?)';
    const BUSCAR_ULTIMO_TIPO_FACTURA = 'SELECT * FROM tiposfactura WHERE id_tipofactura=(SELECT MAX(id_tipofactura) FROM tiposfactura)';
    const ELIMINAR_TIPO_FACTURA = 'DELETE FROM tiposfactura WHERE id_tipofactura = ?';
    const ACTUALIZAR_TIPO_FACTURA = 'UPDATE tiposfactura SET tipo_tipofactura = ? WHERE id_tipofactura = ?';
    const BUSCAR_TIPO_FACTURA = "SELECT * FROM tiposfactura WHERE ? LIKE ?;";

# CLIENTE
    const INSERTAR_CLIENTE = 'INSERT INTO clientes (cuil_cliente, nombre_cliente , telefono_cliente , direccion_cliente , id_provincia_cliente , id_tipoCliente_cliente ) VALUES (?, ?, ?, ?, ?, ?)';
    const LISTAR_CLIENTE = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente';
    const ACTUALIZAR_CLIENTE = 'UPDATE clientes SET cuil_cliente=?, nombre_cliente=?, telefono_cliente=?, direccion_cliente=?, id_provincia_cliente=?, id_tipoCliente_cliente=? WHERE id_cliente=?';
    const ELIMINAR_CLIENTE = 'DELETE FROM clientes WHERE id_cliente= ?';
    const BUSCAR_ULTIMO_CLIENTE = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE id_cliente=(SELECT MAX(id_cliente) FROM clientes)';
    const CANTIDAD_CLIENTES = "SELECT COUNT(*) FROM `db_yacomo`.`clientes`;";
    #--- CRITERIOS DE BUSQUEDAS CLIENTE
    const BUSCAR_CLIENTES = "SELECT * FROM `db_yacomo`.`clientes` WHERE ? = ?;";
    const BUSCAR_CLIENTE_X_CUIL = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE cuil_cliente LIKE ? ORDER BY cuil_cliente';
    const BUSCAR_CLIENTE_X_NOMBRE = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE nombre_cliente LIKE ? ORDER BY nombre_cliente';
    const BUSCAR_CLIENTE_X_TELEFONO = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE telefono_cliente LIKE ? ORDER BY telefono_cliente';
    const BUSCAR_CLIENTE_X_DIRECCION = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE direccion_cliente LIKE ? ORDER BY direccion_cliente';
    const BUSCAR_CLIENTE_X_PROVINCIA = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE nombre_provincia LIKE ? ORDER BY nombre_provincia';
    const BUSCAR_CLIENTE_X_TIPO = 'SELECT * FROM clientes INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente INNER JOIN provincias ON id_provincia_cliente = id_provincia  WHERE tipo_tipoCliente LIKE ? ORDER BY tipo_tipoCliente';
    const BUSCAR_CLIENTE_X_ID = 'SELECT * FROM clientes INNER JOIN provincias ON id_provincia_cliente = id_provincia INNER JOIN tiposcliente ON id_tipoCliente_cliente = id_tipoCliente WHERE id_cliente LIKE ? ORDER BY id_cliente';

    # TIPO DE CLIENTE
    const LISTAR_TIPOS_CLIENTE = 'SELECT * FROM tiposcliente';
    const INSERTAR_TIPO_CLIENTE = 'INSERT INTO tiposcliente (tipo_tipoCliente) VALUES (?)';
    const BUSCAR_ULTIMO_TIPO_CLIENTE = 'SELECT * FROM tiposcliente WHERE id_tipoCliente=(SELECT MAX(id_tipoCliente) FROM tiposcliente)';
    const ELIMINAR_TIPO_CLIENTE = 'DELETE FROM tiposcliente WHERE id_tipoCliente = ?';
    const ACTUALIZAR_TIPO_CLIENTE = 'UPDATE tiposcliente SET tipo_tipoCliente = ? WHERE id_tipoCliente = ?';

    # PROVINCIA
    const LISTAR_PROVINCIA = 'SELECT * FROM provincias ORDER BY nombre_provincia';

    # DEPARTAMENTO
    const LISTAR_DEPARTAMENTO = 'SELECT * FROM departamentos WHERE id_provincia_departamento = ? ORDER BY nombre_departamento';

    # LOCALIDAD
    const LISTAR_LOCALIDAD = 'SELECT * FROM localidades WHERE id_departamento_localidad = ? ORDER BY nombre_localidad';
    //PRODUCTO
    const INSERTAR_PRODUCTO = "INSERT INTO `db_yacomo`.`productos` (`cod_producto`, `nombre_producto`, `precio_producto`, `stock_producto`, `disponible_producto`)
VALUES (?, ?, ?, ?, ?);";
    const ELIMINAR_PRODUCTO = "DELETE FROM `db_yacomo`.`productos` WHERE `id_producto` = ?;";
    const BUSCAR_HISTORICO_PRODUCTO = "SELECT `id_historicoPrecio`, 
	`fecha_historicoPrecio`, 
	`precio_historicoPrecio`, 
	`id_producto_historicoPrecio`
	 
	FROM 
	`db_yacomo`.`historicosprecio` WHERE `id_producto_historicoPrecio` = ?
	ORDER BY `fecha_historicoPrecio` DESC
LIMIT 1;";
    const LISTAR_PRODUCTOS = "SELECT * FROM `db_yacomo`.`productos`";
    const LISTAR_PRODUCTOS_DISPONIBLES = "SELECT * FROM `db_yacomo`.`productos` WHERE `disponible_producto` = 'si'";
    const BUSCAR_ULTIMOPRODUCTO = "SELECT  * FROM `db_yacomo`.`productos` WHERE id_producto = (SELECT MAX(id_producto) FROM productos);";
    const ACTUALIZAR_PRODUCTO = "UPDATE `db_yacomo`.`productos` 
	SET
	`cod_producto` = ? , 
	`nombre_producto` = ? , 
	`precio_producto` = ? , 
	`stock_producto` = ? , 
	`disponible_producto` = ?
	WHERE
	`id_producto` = ?;";
    const INSERTAR_HISTORICO_PRODUCTO = "INSERT INTO `db_yacomo`.`historicosprecio` 
	(
	`fecha_historicoPrecio`, 
	`precio_historicoPrecio`, 
	`id_producto_historicoPrecio`
	)
	VALUES
	( 
	NOW(), 
	? , 
	?
	);";
    const BUSCAR_PRODUCTO = "SELECT `id_producto`, `cod_producto`, `nombre_producto`, `precio_producto`, `stock_producto`, `disponible_producto` FROM `db_yacomo`.`productos`;";
    const BUSCAR_PRODUCTOS = "SELECT * FROM `db_yacomo`.`productos` WHERE ? LIKE ?;";
//Historico Precios
    const BUSCAR_HISTORICOS_X_ID = "SELECT * FROM `db_yacomo`.`historicosprecio` WHERE id_producto_historicoPrecio = ?;";
    const BUSCAR_HISTORICO_PRECIO = "SELECT * 
 FROM `db_yacomo`.`historicosprecio` 
 WHERE (`id_producto_historicoPrecio` = ? AND ? <= `fecha_historicoPrecio`) 
 ORDER BY `fecha_historicoPrecio`
 LIMIT 1;";
    
    const CANTIDAD_PRODUCTOS = "SELECT COUNT(*) FROM `db_yacomo`.`productos`;";
    
    //Estadísticas
    # Ventas por provincias
    const VENTAS_X_PROVINCIA = 'SELECT nombre_provincia AS nombre, COUNT(*) AS cantidad FROM `facturas` INNER JOIN `clientes` ON `id_cliente_factura` = `id_cliente` INNER JOIN `provincias` ON `id_provincia_cliente` = id_provincia GROUP BY nombre_provincia  ORDER BY nombre_provincia';
    const PRODUCTOS_MAS_VENDIDOS = 'SELECT `nombre_producto` AS nombre, COUNT(`id_producto_detalleFactura`) AS cantidad FROM `detallesfactura` 
INNER JOIN `productos` ON `id_producto` = `id_producto_detalleFactura` GROUP BY `id_producto_detalleFactura`';
    
    //const FACTURAS_EMITIDA_EN_PERIODO = 'SELECT * FROM `facturas` WHERE `fecha_factura` >= ? AND `fecha_factura` <= ?';
    //const FACTURAS_EMITIDA_EN_PERIODO = 'SELECT fecha_factura AS fecha, COUNT(*) AS cantidad FROM `facturas` WHERE `fecha_factura` >= ? AND `fecha_factura` <= ?';
    const FACTURAS_EMITIDA_EN_X_PERIODO = 'SELECT nro_factura AS Factura, fecha_factura AS Fecha, nombre_cliente AS Cliente, nombre_usuario AS Usuario FROM `facturas` INNER JOIN historicosfactura ON nro_factura_historicosFactura = nro_factura INNER JOIN usuarios ON id_usuario = id_usuario_historicosFactura INNER JOIN clientes ON id_cliente = id_cliente_factura WHERE `fecha_factura` >= ? AND `fecha_factura` <= ?';
    const FACTURAS_X_USUARIO = 'SELECT nro_factura AS "Factura", fecha_factura AS "Fecha", nombre_usuario AS "Usuario" FROM facturas INNER JOIN `historicosfactura` ON `nro_factura` = `nro_factura_historicosFactura` INNER JOIN `usuarios` ON `id_usuario` = `id_usuario_historicosFactura` WHERE `nombre_usuario` = ?';
    const VENTAS_PRODUCTO_X_PERIODO = 'SELECT cantidad_detalleFactura AS Cantidad, id_detalleFactura AS "Numero Factura", nombre_cliente AS Cliente, fecha_factura AS Fecha FROM facturas INNER JOIN detallesfactura ON nro_factura = nro_factura_detalleFactura INNER JOIN productos ON id_producto = id_producto_detalleFactura INNER JOIN clientes ON id_cliente_factura = id_cliente WHERE fecha_factura >= ? AND fecha_factura <= ? AND id_producto = ?';
    
    const VENTAS_PRODUCTO_A_CLIENTE = "SELECT `nombre_producto` AS 'Producto', `cantidad_detalleFactura` AS 'Cantidad', `id_detalleFactura` AS 'Numero Factura', `nombre_cliente` AS 'Cliente', `fecha_factura` AS 'Fecha' FROM `facturas` INNER JOIN `detallesfactura` ON `nro_factura` = `nro_factura_detalleFactura` INNER JOIN `productos` ON `id_producto` = `id_producto_detalleFactura` INNER JOIN `clientes` ON `id_cliente_factura` = `id_cliente` WHERE `fecha_factura` >= ? AND `fecha_factura` <= ?";
    
    const VENTAS_A_CLIENTES = 'SELECT nombre_cliente AS Cliente, COUNT(id_cliente_factura) AS "Cantidad" FROM clientes INNER JOIN facturas ON id_cliente = id_cliente_factura GROUP BY nombre_cliente ORDER BY nombre_cliente ASC';
    
    const TIPOS_FACTURAS_GENERADAS = 'SELECT tipo_tipoFactura AS Tipo, COUNT(*) AS Cantidad FROM facturas INNER JOIN tiposfactura ON id_tipo_factura = id_tipoFactura GROUP BY tipo_tipoFactura';
    
}
