<?php

require_once 'ControladorGeneral.php';
require_once 'ControladorCliente.php';
require_once 'ControladorProducto.php';
require_once 'ControladorDetalle.php';
require_once 'ControladorHistoricoFactura.php';
require_once 'ControladorTipoFactura.php';

class ControladorFactura extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    private function validar($datos) {
        if (isset($datos["factura"])) {
            if (isset($datos["factura"]["cuil"])) {
                $cuil = trim($datos["factura"]["cuil"]);
                if ($cuil == "" || filter_var($cuil, FILTER_VALIDATE_INT) === FALSE || $cuil < 0) {
                    throw new Exception("Cuil incorrecto");
                }
            } else {
                throw new Exception("Cuil incorrecto");
            }
            if (isset($datos["factura"]["tipo"])) {
                $tipo = trim($datos["factura"]["tipo"]);
                if ($tipo == "" || filter_var($tipo, FILTER_VALIDATE_INT) === FALSE || $tipo < 0) {
                    throw new Exception("Tipo incorrecto");
                }
            } else {
                throw new Exception("Tipo incorrecto");
            }
            if (isset($datos["factura"]["usuario"])) {
                $usuario = trim($datos["factura"]["usuario"]);
                if ($usuario == "" || filter_var($usuario, FILTER_VALIDATE_INT) === FALSE || $usuario != $_SESSION['usuario']) {
                    throw new Exception("Usuario incorrecto");
                }
            } else {
                throw new Exception("Usuario incorrecto");
            }
        } else {
            throw new Exception("Factura incorrecto");
        }
        if (isset($datos["detalles"])) {
            if (count($datos["detalles"]) > 0) {
                foreach ($datos["detalles"] as $detalle) {
                    if (isset($detalle["codigo"])) {
                        $cod = trim($detalle["codigo"]);
                        if ($cod == "" || filter_var($cod, FILTER_VALIDATE_INT) === FALSE || $cod < 0) {
                            throw new Exception("Codigo incorrecto");
                        }
                    } else {
                        throw new Exception("Codigo incorrecto");
                    }
                    if (isset($detalle["cantidad"])) {
                        $cant = trim($detalle["cantidad"]);
                        if ($cant == "" || filter_var($cant, FILTER_VALIDATE_INT) === FALSE || $cant < 1) {
                            throw new Exception("Cantidad incorrecto");
                        }
                    } else {
                        throw new Exception("Cantidad incorrecto");
                    }
                }
            } else {
                throw new Exception("Detalles incorrecto");
            }
        } else {
            throw new Exception("Detalles incorrecto");
        }
    }

    public function agregar($datos) {
        try {
            $this->validar($datos);
            
            //Busco el cliente con el cuil
            $parametros = array("criterio" => "1", "valor" => $datos["factura"]["cuil"]);
            $controladorCliente = new ControladorCliente();
            $idCliente = $controladorCliente->buscar($parametros)[0]["id_cliente"];
            
            //Guardo la FActura con id del cliente y el id del tipo de factura
            $parametros = array("id_cliente" => $idCliente, "tipoFactura" => $datos["factura"]["tipo"]);
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_FACTURA, $parametros);
            $factura = $this->buscarUltimaFactura();
            
            //Guardo todos los detalles
            $controladorDetalle = new ControladorDetalle();
            foreach ($datos["detalles"] as $detalle) {//Recorro los detalles
                //Busco el producto con el codigo
                $parametros = array("criterio" => "cod_producto", "valor" => $detalle["codigo"]);
                $controladorProducto = new ControladorProducto();
                $producto = $controladorProducto->buscar($parametros);
                $idProducto = $producto[0]["id_producto"];
                
                //Verifico si el stock del producto alcanza
                if ($producto[0]["stock_producto"] < $detalle["cantidad"]) {
                    throw new Exception("Stock insuficiente de ".$producto[0]["nombre_producto"]);
                }
                
                //Guardo el detalle
                $parametros = array("cantidad" => $detalle["cantidad"], "id_producto" => $idProducto, "nroFactura" => $factura[0]["nro_factura"]);
                $controladorDetalle->agregar($parametros);
                
                //Actualizo el stock del producto
                $nuevostock = $producto[0]["stock_producto"] - $detalle["cantidad"];
                $parametros = array("codigo" =>$producto[0]["cod_producto"], "nombre" => $producto[0]["nombre_producto"], "precio" => $producto[0]["precio_producto"], "stock" => $nuevostock,"disponible" => $producto[0]["disponible_producto"],"id" => $producto[0]["id_producto"]);
                $controladorProducto->modificar($parametros);
            }
            //Guardo el historico de Facturas
            $parametros = array("nroFactura" => $factura[0]["nro_factura"], "idUsuario" => $datos["factura"]["usuario"]);
            $controladorHistoricoFactura = new ControladorHistoricoFactura();
            $controladorHistoricoFactura->agregar($parametros);
            return $factura;
        } catch (Exception $ex) {
            throw new Exception("Factura-agregar: " . $ex->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array("criterio" => $datos['criterio'], "valor" => "%" . $datos['valor'] . "%");
            $query = str_replace("? LIKE ?", $parametros['criterio'] . " LIKE '" . $parametros['valor'] . "'", DbSentencias::BUSCAR_FACTURAS);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("Factura-buscar: " . $ex->getMessage());
        }
    }

    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_FACTURAS);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            for ($index = 0; $index < count($array); $index++) {
                //Busco el Cliente de la FActura
                $idCliente = $array[$index]["id_cliente_factura"];
                unset($array[$index]["id_cliente_factura"]);
                $controladorCliente = new ControladorCliente();
                $parametros = array("criterio" => "7", "valor" => $idCliente);
                $cliente = $controladorCliente->buscar($parametros);
                $array[$index]["clienteCuil"] = $cliente[0]["cuil_cliente"];
                $array[$index]["clienteNombre"] = $cliente[0]["nombre_cliente"];
                //Busco el TipoFactura de la Factura
                $idTipoF = $array[$index]["id_tipo_factura"];
                unset($array[$index]["id_tipo_factura"]);
                $controladorTipoF = new ControladorTipoFactura();
                $parametros = array("criterio" => "id_tipofactura", "valor" => $idTipoF);
                $tipoF = $controladorTipoF->buscar($parametros);
                $array[$index]["tipoFId"] = $tipoF[0]["id_tipoFactura"];
                $array[$index]["tipoFDesc"] = $tipoF[0]["tipo_tipoFactura"];
                //Busco los Detalles de la Factura
                $controladorDetalles = new ControladorDetalle();
                $parametros = array("criterio" => "nro_factura_detalleFactura", "valor" => $array[$index]["nro_factura"]);
                $detalles = $controladorDetalles->buscar($parametros);
                $controladorProducto = new ControladorProducto();
                for ($index1 = 0; $index1 < count($detalles); $index1++) {
                    $parametros = array("criterio" => "id_producto", "valor" => $detalles[$index1]["id_producto_detalleFactura"]);
                    $producto = $controladorProducto->buscar($parametros);
                    $detalles[$index1]["cod_producto"] = $producto[0]["cod_producto"];
                    $detalles[$index1]["nombre_producto"] = $producto[0]["nombre_producto"];
                    //$detalles[$index1]["precio_producto"] = $producto[0]["precio_producto"];
                    $parametros = array("fecha" => $array[$index]["fecha_factura"], "id" => $producto[0]["id_producto"]);
                    $detalles[$index1]["precio_producto"] = $controladorProducto->obtenerPrecio($parametros);
                    unset($detalles[$index1]["id_producto_detalleFactura"]);
                    unset($detalles[$index1]["nro_factura_detalleFactura"]);
                }
                $array[$index]["detalles"] = $detalles;
            }
            return $array;
        } catch (Exception $ex) {
            throw new Exception("Factura-listar: " . $ex->getMessage());
        }
    }

    private function buscarUltimaFactura() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::MAX_NRO_FACTURA, $parametros);
            $nro = $resultado->fetch();
            $parametros = array("criterio" => "nro_factura", "valor" => $nro[0]);
            $resultado = $this->buscar($parametros);
            return $resultado;
        } catch (Exception $ex) {
            throw new Exception("Factura-ultima: " . $ex->getMessage());
        }
    }

}
