/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.6.17 : Database - db_yacomo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
# CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_yacomo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_yacomo`;

/*Table structure for table `clientes` */

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `cuil_cliente` int(11) NOT NULL,
  `nombre_cliente` varchar(50) NOT NULL,
  `telefono_cliente` int(20) NOT NULL,
  `direccion_cliente` varchar(200) NOT NULL,
  `id_provincia_cliente` int(11) NOT NULL,
  `id_tipoCliente_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cuil_cliente` (`cuil_cliente`),
  UNIQUE KEY `cuil_cliente_2` (`cuil_cliente`),
  KEY `id_tipoCliente_cliente` (`id_tipoCliente_cliente`),
  KEY `clientes_ibfk_2` (`id_provincia_cliente`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_tipoCliente_cliente`) REFERENCES `tiposcliente` (`id_tipoCliente`),
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`id_provincia_cliente`) REFERENCES `provincias` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `clientes` */

insert  into `clientes`(`id_cliente`,`cuil_cliente`,`nombre_cliente`,`telefono_cliente`,`direccion_cliente`,`id_provincia_cliente`,`id_tipoCliente_cliente`) values (8,2031432182,'DAvid',123456,'PAdre ARce',10,2),(9,2021541,'Emmanuel',4451,'Por ahi',23,2),(10,321,'Leo',435,'ds',12,1),(11,1221,'Lea',2343,'232dsa',12,2);

/*Table structure for table `detallesfactura` */

DROP TABLE IF EXISTS `detallesfactura`;

CREATE TABLE `detallesfactura` (
  `id_detalleFactura` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_detalleFactura` int(4) NOT NULL,
  `id_producto_detalleFactura` int(11) NOT NULL,
  `nro_factura_detalleFactura` int(11) NOT NULL,
  PRIMARY KEY (`id_detalleFactura`),
  KEY `id_producto_detalleFactura` (`id_producto_detalleFactura`),
  KEY `nro_factura_detalleFactura` (`nro_factura_detalleFactura`),
  CONSTRAINT `detallesfactura_ibfk_2` FOREIGN KEY (`id_producto_detalleFactura`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `detallesfactura_ibfk_3` FOREIGN KEY (`nro_factura_detalleFactura`) REFERENCES `facturas` (`nro_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

/*Data for the table `detallesfactura` */

insert  into `detallesfactura`(`id_detalleFactura`,`cantidad_detalleFactura`,`id_producto_detalleFactura`,`nro_factura_detalleFactura`) values (22,3,4,27),(23,3,4,30),(24,4,4,31),(25,2,4,32),(26,5,4,33),(27,2,1,34),(28,1,1,35),(29,1,1,36),(30,2,1,37),(31,1,1,38),(32,2,1,39),(33,2,5,41),(34,2,5,42),(35,4,5,43),(39,2,1,46),(40,1,4,46),(41,3,3,46),(42,2,5,46);

/*Table structure for table `facturas` */

DROP TABLE IF EXISTS `facturas`;

CREATE TABLE `facturas` (
  `nro_factura` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_factura` datetime NOT NULL,
  `id_cliente_factura` int(11) NOT NULL,
  `id_tipo_factura` int(11) NOT NULL,
  PRIMARY KEY (`nro_factura`),
  KEY `id_tipo_factura` (`id_tipo_factura`),
  KEY `id_cliente_factura` (`id_cliente_factura`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_tipo_factura`) REFERENCES `tiposfactura` (`id_tipoFactura`),
  CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`id_cliente_factura`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

/*Data for the table `facturas` */

insert  into `facturas`(`nro_factura`,`fecha_factura`,`id_cliente_factura`,`id_tipo_factura`) values (27,'2015-06-02 18:50:22',8,5),(30,'2015-06-02 18:51:10',8,5),(31,'2015-06-02 18:53:48',9,5),(32,'2015-06-02 19:52:48',11,6),(33,'2015-06-02 19:53:07',10,5),(34,'2015-06-02 20:01:39',11,5),(35,'2015-06-02 20:01:54',11,5),(36,'2015-06-02 20:02:03',11,5),(37,'2015-06-02 20:02:14',11,5),(38,'2015-06-02 20:02:22',11,5),(39,'2015-06-02 20:03:05',11,5),(41,'2015-06-02 20:53:04',11,5),(42,'2015-06-02 20:53:59',11,5),(43,'2015-06-02 20:55:06',11,5),(46,'2015-06-03 00:23:34',9,5);

/*Table structure for table `historicosfactura` */

DROP TABLE IF EXISTS `historicosfactura`;

CREATE TABLE `historicosfactura` (
  `id_historicosFactura` int(11) NOT NULL AUTO_INCREMENT,
  `nro_factura_historicosFactura` int(11) NOT NULL,
  `id_usuario_historicosFactura` int(11) NOT NULL,
  PRIMARY KEY (`id_historicosFactura`),
  KEY `id_usuario_historicosFactura` (`id_usuario_historicosFactura`),
  KEY `nro_factura_historicosFactura` (`nro_factura_historicosFactura`),
  CONSTRAINT `historicosfactura_ibfk_1` FOREIGN KEY (`id_usuario_historicosFactura`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `historicosfactura_ibfk_2` FOREIGN KEY (`nro_factura_historicosFactura`) REFERENCES `facturas` (`nro_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

/*Data for the table `historicosfactura` */

insert  into `historicosfactura`(`id_historicosFactura`,`nro_factura_historicosFactura`,`id_usuario_historicosFactura`) values (19,27,11),(20,30,11),(21,31,11),(22,32,11),(23,33,11),(24,34,11),(25,35,11),(26,36,11),(27,37,11),(28,38,11),(29,39,11),(30,41,11),(31,42,11),(32,43,11),(33,46,11);

/*Table structure for table `historicosprecio` */

DROP TABLE IF EXISTS `historicosprecio`;

CREATE TABLE `historicosprecio` (
  `id_historicoPrecio` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_historicoPrecio` datetime NOT NULL,
  `precio_historicoPrecio` double NOT NULL,
  `id_producto_historicoPrecio` int(11) NOT NULL,
  PRIMARY KEY (`id_historicoPrecio`),
  KEY `id_producto_historicoPrecio` (`id_producto_historicoPrecio`),
  CONSTRAINT `historicosprecio_ibfk_1` FOREIGN KEY (`id_producto_historicoPrecio`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `historicosprecio` */

insert  into `historicosprecio`(`id_historicoPrecio`,`fecha_historicoPrecio`,`precio_historicoPrecio`,`id_producto_historicoPrecio`) values (1,'2015-05-27 00:24:59',11,1),(2,'2015-06-02 18:50:22',24,4),(3,'2015-06-02 20:53:04',2,5),(4,'2015-06-02 23:01:48',12.5,3),(5,'2015-06-02 23:05:50',22.2,1),(6,'2015-06-03 00:54:42',22,5);

/*Table structure for table `historicostipocliente` */

DROP TABLE IF EXISTS `historicostipocliente`;

CREATE TABLE `historicostipocliente` (
  `id_historicoTipoCliente` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_historicoTipoCliente` datetime NOT NULL,
  `id_cliente_historicoTipoCliente` int(11) NOT NULL,
  `id_tipoCliente_historicoTipoCliente` int(11) NOT NULL,
  PRIMARY KEY (`id_historicoTipoCliente`),
  KEY `id_cliente_historicoTipoCliente` (`id_cliente_historicoTipoCliente`),
  KEY `id_tipoCliente_historicoTipoCliente` (`id_tipoCliente_historicoTipoCliente`),
  CONSTRAINT `historicostipocliente_ibfk_1` FOREIGN KEY (`id_cliente_historicoTipoCliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `historicostipocliente_ibfk_2` FOREIGN KEY (`id_tipoCliente_historicoTipoCliente`) REFERENCES `tiposcliente` (`id_tipoCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `historicostipocliente` */

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `cod_producto` int(5) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `precio_producto` double NOT NULL,
  `stock_producto` int(6) NOT NULL,
  `disponible_producto` enum('si','no') NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `cod_producto` (`cod_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `productos` */

insert  into `productos`(`id_producto`,`cod_producto`,`nombre_producto`,`precio_producto`,`stock_producto`,`disponible_producto`) values (1,12345,'Sprite',22.2,21,'si'),(3,11111,'Pepsi',12.5,52,'si'),(4,32143,'Coca cola',24,31,'si'),(5,12346,'Fanta',22,55,'si');

/*Table structure for table `provincias` */

DROP TABLE IF EXISTS `provincias`;

CREATE TABLE `provincias` (
  `id_provincia` int(11) NOT NULL,
  `nombre_provincia` varchar(100) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `provincias` */

insert  into `provincias`(`id_provincia`,`nombre_provincia`) values (1,'BUENOS AIRES'),(2,'CATAMARCA'),(3,'CHACO'),(4,'CHUBUT'),(5,'CORDOBA'),(6,'CORRIENTES'),(7,'ENTRE RIOS'),(8,'FORMOSA'),(9,'JUJUY'),(10,'LA PAMPA'),(11,'LA RIOJA'),(12,'MENDOZA'),(13,'MISIONES'),(14,'NEUQUEN'),(15,'RIO NEGRO'),(16,'SALTA'),(17,'SAN JUAN'),(18,'SAN LUIS'),(19,'SANTA CRUZ'),(20,'SANTA FE'),(21,'SANTIAGO DEL ESTERO'),(22,'TIERRA DEL FUEGO'),(23,'TUCUMAN');

/*Table structure for table `tiposcliente` */

DROP TABLE IF EXISTS `tiposcliente`;

CREATE TABLE `tiposcliente` (
  `id_tipoCliente` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_tipoCliente` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipoCliente`),
  UNIQUE KEY `tipo_tiposcliente` (`tipo_tipoCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tiposcliente` */

insert  into `tiposcliente`(`id_tipoCliente`,`tipo_tipoCliente`) values (1,'Consumidor Final'),(3,'Monotributista'),(2,'Responsable Inscripto');

/*Table structure for table `tiposfactura` */

DROP TABLE IF EXISTS `tiposfactura`;

CREATE TABLE `tiposfactura` (
  `id_tipoFactura` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_tipoFactura` varchar(2) NOT NULL,
  PRIMARY KEY (`id_tipoFactura`),
  UNIQUE KEY `tipo_tipoFactura` (`tipo_tipoFactura`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tiposfactura` */

insert  into `tiposfactura`(`id_tipoFactura`,`tipo_tipoFactura`) values (5,'A'),(6,'B'),(7,'C');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `clave_usuario` varchar(32) NOT NULL COMMENT 'cifrado',
  `nivelAcceso_usuario` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id_usuario`,`nombre_usuario`,`clave_usuario`,`nivelAcceso_usuario`) values (10,'asd','25d55ad283aa400af464c76d713c07ad',10),(11,'qwe','25d55ad283aa400af464c76d713c07ad',20),(12,'zxc','25d55ad283aa400af464c76d713c07ad',10),(13,'xcv2','25d55ad283aa400af464c76d713c07ad',15);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
