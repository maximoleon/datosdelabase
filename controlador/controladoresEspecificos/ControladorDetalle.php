<?php
require_once 'ControladorGeneral.php';
class ControladorDetalle extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("cantidad" => $datos["cantidad"], "id_producto" => $datos["id_producto"], "nroFactura" => $datos["nroFactura"]);
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_DETALLE_FACTURA, $parametros);
            return $this->buscarUltimoDetalle();
        } catch (Exception $ex) {
            throw new Exception("Detalle-agregar: " . $ex->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array( "criterio" => $datos['criterio'],"valor" => "%".$datos['valor']."%");
            $query = str_replace("? LIKE ?", $parametros['criterio']." LIKE '".$parametros['valor']."'", DbSentencias::BUSCAR_DETALLE_FACTURA);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("Detalle-buscar: " . $ex->getMessage());
        }
    }

    private function buscarUltimoDetalle() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::MAX_ID_DETALLE_FACTURA, $parametros);
            $id = $resultado->fetch();
            $parametros = array("criterio" => "id_detalleFactura","valor" => $id[0]);
            $resultado = $this->buscar($parametros);
            return $resultado;
        } catch (Exception $ex) {
            throw new Exception("Detalle-ultimo: " . $ex->getMessage());
        }
    }

}
