<?php

require_once 'ControladorGeneral.php';

class ControladorCliente extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("cuilCliente" => $datos["cuilCliente"],
                        "nombreCliente" => $datos["nombreCliente"],
                        "telefonoCliente" => $datos["telefono"],
                        "direccionCliente" => $datos["direccion"],
                        "idProvincia" => $datos["provincia"],
                        "idTipoCliente" => $datos["tipo"]
            );
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_CLIENTE, $parametros);
            return $this->buscarUltimoCliente();
        } catch (Exception $e) {
            throw new Exception("Cliente-agregar: " . $e->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array("valor" => "%".$datos['valor']."%");
            $resultado = null;
            switch ($datos['criterio']) {
                case '1':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_CUIL, $parametros);
                    break;
                case '2':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_NOMBRE, $parametros);
                    break;
                case '3':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_TELEFONO, $parametros);
                    break;
                case '4':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_DIRECCION, $parametros);
                    break;
                case '5':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_PROVINCIA, $parametros);
                    break;
                case '6':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_TIPO, $parametros);
                    break;
                case '7':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CLIENTE_X_ID, $parametros);
                    break;
                default:
                    throw new Exception("Error al Buscar");
            }
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $e) {
            throw new Exception("Cliente-buscar: " . $e->getMessage());
        }
    }

    public function eliminar($datos) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_CLIENTE, $parametros);
            //return $resultado;
        } catch (Exception $e) {
            throw new Exception("Cliente-eliminar: " . $e->getMessage());
        }
    }

    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_CLIENTE);
            $listado = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $listado;
        } catch (Exception $e) {
            throw new Exception("Cliente-listar: " . $e->getMessage());
        }
    }

    public function modificar($datos) {
        try {
            $parametros = array("cuilCliente" => $datos["cuilCliente"],
                        "nombreCliente" => $datos["nombreCliente"],
                        "telefonoCliente" => $datos["telefono"],
                        "direccionCliente" => $datos["direccion"],
                        "idProvincia" => $datos["provincia"],
                        "idTipoCliente" => $datos["tipo"],
                        "id" => $datos['id']
            );
            $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_CLIENTE, $parametros);
            //return $this->buscarUltimoCliente();
        } catch (Exception $e) {
            throw new Exception("Cliente-modificar: " . $e->getMessage());
        }
    }

    private function buscarUltimoCliente() {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMO_CLIENTE);
            return $resultado->fetch();
        } catch (Exception $e) {
            throw new Exception("Cliente-ultimoCLiente: " . $e->getMessage());
        }
    }
}
