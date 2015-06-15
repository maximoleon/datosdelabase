<?php
require_once 'ControladorGeneral.php';
require_once 'ControladorProducto.php';
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
            $refProducto = new ControladorProducto();
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::TIPOS_FACTURAS_GENERADAS);
            
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            
            $retorno = array();
            $retorno["grafico"] = $listado;
            
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::CANTIDAD_FACTURADA_X_TIPO);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $totalA = 0;
            $totalB = 0;
            $totalC = 0;
            $subTotal = 0;
            $countA = 0;
            $countB = 0;
            $countC = 0;
            foreach ($listado as $value) {
                $dato = array("id" => $value["id_producto_detalleFactura"], "fecha" => $value["fecha_factura"]);
                
                $subTotal = $value["cantidad_detalleFactura"] * $refProducto->obtenerPrecio($dato);
                switch ($value["tipo_tipoFactura"]){
                    case "A":
                        $totalA += $subTotal;
                        $countA++;
                        break;
                    case "B":
                        $totalB += $subTotal;
                        $countB++;
                        break;
                    case "C":
                        $countC++;
                        $totalC += $subTotal;
                        break;
                    default:
                        throw new Exception("SE murio todo =( Yacomo");
                }
            }
            $aa = array();
            
            $retorno["tabla"][0] = array("tipo" => "A","total" => $totalA,"cantidad" => $countA);
            $retorno["tabla"][1] = array("tipo" => "B","total" => $totalB,"cantidad" => $countB);
            $retorno["tabla"][2] = array("tipo" => "C","total" => $totalC,"cantidad" => $countC);
            //$retorno["tabla"] = array("A" => $totalA, "B" => $totalB, "C" => $totalC, "Ac" => $countA, "Bc" => $countB, "Cc" => $countC);
            return $retorno;
        } catch (Exception $e) {
            throw new Exception("tipos-facturas-generadas: " . $e->getMessage());
        }
    }

}
