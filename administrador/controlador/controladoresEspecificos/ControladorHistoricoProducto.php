<?php

require_once 'ControladorGeneral.php';

class ControladorHistoricoProducto extends ControladorGeneral {

    public function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("precio" => $datos['precio'], "id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_HISTORICO_PRODUCTO, $parametros);
        } catch (Exception $e) {
            throw new Exception("HistP-agregar: " . $e->getMessage());
        }
    }

    public function listar($datos) {
        try {
            //BU
            $parametros = array("id" => $datos['id'], "fecha" => $datos['fecha']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_HISTORICO_PRECIO, $parametros);
            $array = $resultado->fetchAll();
            return $array[0]["precio_historicoPrecio"];
        } catch (Exception $e) {
            throw new Exception("HistP-listar: " . $e->getMessage());
        }
    }

    public function validarPrecioHistorico($datos, $datos2) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_HISTORICO_PRODUCTO, $parametros);
            $array = $resultado->fetchAll();
            $precio = array("precio" => $datos['precio']);
            if (count($array) > 0) {
                //SI ESTA SETEADO, COMPARAMOS PRECIO
                if ($precio['precio'] == $array[0]["precio_historicoPrecio"]) {
                    
                } else {
                    $this->agregar($datos2);
                    $this->agregar($datos);
                }
            } else {
                // SINO ESTA SETEADO LO AGREGAMOS
                $this->agregar($datos2);
                $this->agregar($datos);
            }
        } catch (Exception $e) {
            throw new Exception("HistP-validar: " . $e->getMessage());
        }
    }

    public function buscarPrecioAnterior($datos) {
        try {
            
        } catch (Exception $e) {
            throw new Exception("HistP-listar: " . $e->getMessage());
        }
    }

}
