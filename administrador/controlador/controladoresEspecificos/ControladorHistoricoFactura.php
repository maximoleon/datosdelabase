<?php

require_once 'ControladorGeneral.php';
class ControladorHistoricoFactura extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("nroFactura" => $datos["nroFactura"], "idUsuario" => $datos["idUsuario"]);
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_HISTORICO_FACTURA, $parametros);
            return $this->buscarUltimoHistoricoFactura();
        } catch (Exception $ex) {
            throw new Exception("HistF-agregar: " . $ex->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array( "criterio" => $datos['criterio'],"valor" => "%".$datos['valor']."%");
            $query = str_replace("? LIKE ?", $parametros['criterio']." LIKE '".$parametros['valor']."'", DbSentencias::BUSCAR_HISTORICO_FACTURA);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("HistF-buscar: " . $ex->getMessage());
        }
    }

    private function buscarUltimoHistoricoFactura() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::MAX_ID_HISTORICO_FACTURA, $parametros);
            $id = $resultado->fetch();

            $parametros = array("criterio" => "id_historicosFactura","valor" => $id[0]);
            $resultado = $this->buscar($parametros);
            return $resultado;
        } catch (Exception $ex) {
            throw new Exception("HistF-ultimo: " . $ex->getMessage());
        }
    }

}
