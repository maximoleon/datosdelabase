<?php

require_once 'ControladorGeneral.php';

class ControladorUsuario extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function agregar($datos) {
        try {
            $parametros = array("nombre" => $datos['nombre']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIOS_X_NOMBRE, $parametros);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (count($array) == 0) {
                $parametros = array("nombre" => $datos['nombre'], "clave" => md5($datos['clave']), "nvlAcceso" => $datos['nvlAcceso']);
                $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_USUARIO, $parametros);
            }else {
                throw new Exception('El usuario ya existe');
            }
            return $this->buscarUltimoUsuario();
        } catch (Exception $ex) {
            throw new Exception("usuario-agregar: " . $ex->getMessage());
        }
    }

    public function buscar($datos) {
        try {
            $parametros = array("valor" => "%".$datos['valor']."%");
            $resultado = null;
            switch ($datos['criterio']) {
                case '1':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIOS_X_NOMBRE, $parametros);
                    break;
                case '2':
                    $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIOS_X_NIVELACCESO, $parametros);
                    break;
                default:
                    throw new Exception("Error al Buscar");
                    break;
            }
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("usuario-buscar: " . $ex->getMessage());
        }
    }

    private function buscarUltimoUsuario() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::MAX_ID_USUARIO, $parametros);
            $fila = $resultado->fetch();

            $parametros = array("id" => $fila[0]);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $ex) {
            throw new Exception("usuario-ultimo: " . $ex->getMessage());
        }
    }

    public function listar($datos = null) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_USUARIOS);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $ex) {
            throw new Exception("usuario-listar: " . $ex->getMessage());
        }
    }

    public function eliminar($datos) {
        try {
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_USUARIO, $parametros);
        } catch (Exception $ex) {
            throw new Exception("usuario-eliminar: " . $ex->getMessage());
        }
    }

    public function reset($datos) {
        try {
            $parametros = array("clave_usuario" => md5('12345678'), "id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::RESET_CLAVE_USUARIO, $parametros);
        } catch (Exception $ex) {
            throw new Exception("usuario-reset: " . $ex->getMessage());
        }
    }

    public function modificar($datos) {
        try {
            $parametros = array("nombre" => $datos['nombre'], "nvlAcceso" => $datos['nvlAcceso'], "id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_USUARIO, $parametros);
        } catch (Exception $ex) {
            throw new Exception("usuario-modificar: " . $ex->getMessage());
        }
    }

}
