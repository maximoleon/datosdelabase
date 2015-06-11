<?php

require_once 'ControladorGeneral.php';

class ControladorSesion extends ControladorGeneral {

    function __construct() {
        parent::__construct();
    }

    public function login($datos) {
        try {
            $parametros = array("nombre_usuario" => $datos['nombre_usuario']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO_X_NOM_CLAVE, $parametros);
            
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (count($array) == 1) {
                if (md5($datos['clave']) == $array[0]['clave_usuario']) {
                    $_SESSION['active'] = true;
                    $_SESSION['usuario'] = $array[0]['id_usuario'];
                    $_SESSION['nombre_usuario'] = $array[0]['nombre_usuario'];
                    $_SESSION['nivelAcceso_usuario'] = $array[0]['nivelAcceso_usuario'];
                    $retorno = array("usuario" => $array[0]['id_usuario'],"acceso" => $array[0]['nivelAcceso_usuario']);
                    return $retorno;
                } else {
                    throw new Exception('La clave es incorrecta');
                }
            } else {
                throw new Exception('El usuario no existe');
            }
        } catch (Exception $ex) {
            throw new Exception('Sesion-Login: ' . $ex->getMessage());
            //return array("Sesion-Login" . $ex->getMessage());
        }
    }

    public function logout($parametro) {
        try {
            $id = session_id();
            if (session_destroy()) {
                $_SESSION = array();
            }else{
                throw new Exception('No se pudo destruir la sesion');
            }
        } catch (Exception $ex) {
            throw new Exception('Sesion-logout: ' . $ex->getMessage());
        }
    }

}
