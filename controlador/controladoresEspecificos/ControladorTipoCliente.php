<?php

require_once 'ControladorGeneral.php';
require_once '../persistencia/DbSentencias.php';

class ControladorTipoCliente extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("tipo" => $datos["tipo"]);
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_TIPO_CLIENTE, $parametros);
            return $this->buscarUltimoTipoCliente();
        } catch (Exception $e) {
            throw new Exception("TipoC-agregar: " . $e->getMessage());
        }
    }

    private function buscarUltimoTipoCliente() {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMO_TIPO_CLIENTE);
            return $resultado->fetch();
        } catch (Exception $e) {
            throw new Exception("TipoC-ultimo: " . $e->getMessage());
        }
    }

    public function eliminar($datos) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_TIPO_CLIENTE, $parametros);
            return $resultado;
        } catch (Exception $e) {
            throw new Exception("TipoC-eliminar: " . $e->getMessage());
        }
    }

    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_TIPOS_CLIENTE);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("TipoC-listar: " . $e->getMessage());
        }
    }

    public function modificar($datos) {
        try {
            $parametros = array("tipo" => $datos["tipo"],
                        "id" => $datos['id']
            );
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_TIPO_CLIENTE, $parametros);
        } catch (Exception $e) {
            throw new Exception("TipoC-modifcar: " . $e->getMessage());
        }
    }

}
