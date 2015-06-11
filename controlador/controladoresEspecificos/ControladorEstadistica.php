<?php
require_once 'ControladorGeneral.php';
class ControladorEstadistica extends ControladorGeneral{
    function __construct() {
        parent::__construct();
    }
    
    function generarVentasProvincia(){
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::VENTAS_X_PROVINCIA);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("ventas-provincia-listar: " . $e->getMessage());
        }
    }
    
    function generarProductosMasVendidos(){
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::PRODUCTOS_MAS_VENDIDOS);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("productos-vendidos-listar: " . $e->getMessage());
        }
    }
    
    function generarFacturasEmitidasEnPeriodo($datos){
        try {
            $parametros = ["inicio" => $datos['fechaInicio'], "fin" => $datos['fechaFin']];
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::FACTURAS_EMITIDA_EN_X_PERIODO, $parametros);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("facturas-emitidas-listar: " . $e->getMessage());
        }
    }
    
    function generarFacturasXUsuario($datos){
        try {
            $parametros = ["usuario" => $datos['usuario']];
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::FACTURAS_X_USUARIO, $parametros);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("facturas-x-usuario: " . $e->getMessage());
        }
    }
    
    function generarVentasProductoXperiodo($datos){
        try {
            $parametros = ["inicio" => $datos['fechaInicio'], "fin" => $datos['fechaFin'], "producto" => $datos['producto']];
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::VENTAS_PRODUCTO_X_PERIODO, $parametros);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("ventas-x-producto: " . $e->getMessage());
        }
    }
    
    function generarVentasProductoCliente($datos){
        try {
            $parametros = ["inicio" => $datos['fechaInicio'], "fin" => $datos['fechaFin']];
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::VENTAS_PRODUCTO_A_CLIENTE, $parametros);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("VentasProductoCliente: " . $e->getMessage());
        }
    }
    
    function generarVentasXclientes(){
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::VENTAS_A_CLIENTES);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("ventas-x-clientes: " . $e->getMessage());
        }
    }
    
    function generarTiposFacturasEmitidas(){
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::TIPOS_FACTURAS_GENERADAS);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("tipos-facturas-generadas: " . $e->getMessage());
        }
    }

}
