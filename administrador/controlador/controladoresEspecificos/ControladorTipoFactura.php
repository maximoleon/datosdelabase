<?php

require_once 'ControladorGeneral.php';
require_once '../persistencia/DbSentencias.php';

class ControladorTipoFactura extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("tipo" => $datos["tipo"]
            );
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_TIPO_FACTURA, $parametros);
            return $this->buscarUltimoTipoFactura();
        } catch (Exception $e) {
            throw new Exception("TipoF-agregar: " . $e->getMessage());
        }
    }

    private function buscarUltimoTipoFactura() {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMO_TIPO_FACTURA);
            return $resultado->fetch();
        } catch (Exception $e) {
            throw new Exception("TipoF-ultimo: " . $e->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array("criterio" => $datos['criterio'], "valor" => "%" . $datos['valor'] . "%");
            $query = str_replace("? LIKE ?", $parametros['criterio'] . " LIKE '" . $parametros['valor'] . "'", DbSentencias::BUSCAR_TIPO_FACTURA);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("TipoFactura-buscar: " . $ex->getMessage());
        }
    }

    public function eliminar($datos) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_TIPO_FACTURA, $parametros);
            return $resultado;
        } catch (Exception $e) {
            throw new Exception("TipoF-eliminar: " . $e->getMessage());
        }
    }

    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_TIPOS_FACTURA);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("TipoF-listar: " . $e->getMessage());
        }
    }

    public function modificar($datos) {
        try {
            $parametros = array("tipo" => $datos["tipo"],
                        "id" => $datos['id']
            );
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_TIPO_FACTURA, $parametros);
        } catch (Exception $e) {
            throw new Exception("TipoF-modificar: " . $e->getMessage());
        }
    }

}
