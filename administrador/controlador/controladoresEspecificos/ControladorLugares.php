<?php

require_once 'ControladorGeneral.php';

class ControladorLugares extends ControladorGeneral {

    public function __construct() {
        parent::__construct();
    }

    public function listar($datos) {
        try {
            $listado = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_PROVINCIA);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("Lugar-listar: " . $e->getMessage());
        }
    }
}
