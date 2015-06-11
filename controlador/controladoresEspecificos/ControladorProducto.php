<?php

require_once 'ControladorGeneral.php';
require_once 'ControladorHistoricoProducto.php';

class ControladorProducto extends ControladorGeneral {

    private $refProducto;

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $disponible = 2;
            if (isset($datos['disponible'])) {
                $disponible = 1;
            }
            $parametros = array("codigo" => $datos['codigo'], "nombre" => $datos['nombre'], "precio" => $datos['precio'], "stock" => $datos['stock'], "disponible" => $disponible);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_PRODUCTO, $parametros);
            return $this->buscarUltimoProducto();
        } catch (Exception $e) {
            throw new Exception("Producto-agregar: " . $e->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array("criterio" => $datos['criterio'], "valor" => "%" . $datos['valor'] . "%");
            $query = str_replace("? LIKE ?", $parametros['criterio'] . " LIKE '" . $parametros['valor'] . "'", DbSentencias::BUSCAR_PRODUCTOS);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            //print_r($query);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $e) {
            throw new Exception("Producto-buscar: " . $e->getMessage());
        }
    }

    private function buscarUltimoProducto() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOPRODUCTO, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            throw new Exception("Producto-ultimo: " . $e->getMessage());
        }
    }

    public function listarD($datos = null) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_PRODUCTOS_DISPONIBLES);
            $arrayProductos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $return = array();
            foreach ($arrayProductos as $row) {
                $return[] = array('id_producto' => $row['id_producto'],
                    'cod_producto' => $row['cod_producto'],
                    'nombre_producto' => $row['nombre_producto'],
                    'precio_producto' => $row['precio_producto'],
                    'stock_producto' => $row['stock_producto'],
                    'disponible_producto' => $row['disponible_producto']);
            }
            return $arrayProductos;
        } catch (Exception $e) {
            throw new Exception("Producto-listar: " . $e->getMessage());
        }
    }

    public function listar($datos = null) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_PRODUCTOS);
            $arrayProductos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $return = array();
            foreach ($arrayProductos as $row) {
                $return[] = array('id_producto' => $row['id_producto'],
                    'cod_producto' => $row['cod_producto'],
                    'nombre_producto' => $row['nombre_producto'],
                    'precio_producto' => $row['precio_producto'],
                    'stock_producto' => $row['stock_producto'],
                    'disponible_producto' => $row['disponible_producto']);
            }
            return $arrayProductos;
        } catch (Exception $e) {
            throw new Exception("Producto-listar: " . $e->getMessage());
        }
    }

    public function eliminar($datos) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_PRODUCTO, $parametros);
        } catch (Exception $e) {
            throw new Exception("Producto-eliminar: " . $e->getMessage());
        }
    }

    public function modificar($datos) {
        try {
            $disponible = 2;
            if (isset($datos['disponible'])) {
                $disponible = 1;
            }
            $parametros = array("codigo" => $datos['codigo'], "nombre" => $datos['nombre'], "precio" => $datos['precio'], "stock" => $datos['stock'], "disponible" => $disponible, "id" => $datos['id']);
            $param = array("criterio" => "id_producto", "valor" => $datos['id'] );
            
            $prod = $this->buscar($param);
            
            $precioAntiguo = $prod[0]["precio_producto"];
            $controlador = new ControladorHistoricoProducto();
            
            $parametros2 = array("precio" => $precioAntiguo, "id" => $datos['id']);
            $controlador->validarPrecioHistorico($parametros, $parametros2);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_PRODUCTO, $parametros);
        } catch (Exception $e) {
            throw new Exception("Producto-modificar: " . $e->getMessage());
        }
    }

    public function encontrar($datos) {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_PRODUCTO, $parametros);
            $res = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $res;
        } catch (Exception $e) {
            throw new Exception("Producto-encontrar: " . $e->getMessage());
        }
    }
    
    public function obtenerPrecio($datos) {
        try {
            $parametros = array("id" => $datos['id'],"fecha" => $datos['fecha']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_HISTORICO_PRECIO, $parametros);
            $res = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (count($res)!=0) {
                return $res[0]["precio_historicoPrecio"];
            }else{
                $parametros = array("criterio" => "id_producto", "valor" => $datos['id']);
                $prod = $this->buscar($parametros);
                return $prod[0]["precio_producto"];
            }
        } catch (Exception $e) {
            throw new Exception("Producto-obtenerPrecio: " . $e->getMessage());
        }
    }

}

?>