<?php

session_start();
if (empty($_SESSION['active'])) { //si no hay sesion
    if (isset($_POST['nombre_usuario'])) {
        //echo 'estoy dentro';
        require_once '../controladoresEspecificos/ControladorSesion.php';
        $sesion = new ControladorSesion();
        $usuario = $sesion->login($_POST);
        $retorno = array("control" => 0,"usuario" => $usuario["usuario"],"acceso" => $usuario["acceso"]);
        echo json_encode($retorno); //Bienvenido culiao
    } else {
        //echo 'me hago el vivo';
        echo 1; //Se esta pasando de vivo el culiao
    }
} else {
    require_once '../persistencia/ControladorPersistencia.php';
    $refPersistencia = ControladorPersistencia::obtenerCP();
    try {
        $refPersistencia->iniciarTransaccion();
        
        $formulario = $_GET['formulario'];
        $accion = $_GET['accion'];
        $controlador = 'Controlador' . $formulario;
        require_once '../controladoresEspecificos/' . $controlador . '.php';
        $datosFormulario = $_POST;
        $refControlador = new $controlador($datosFormulario);
        $resultado = $refControlador->$accion($datosFormulario);
        echo json_encode($resultado);
        $refPersistencia->confirmarTransaccion();
    } catch (Exception $ex) {
        echo $ex->getMessage();
        $refPersistencia->rollBackTransaccion();
    } finally {
        $refPersistencia->cerrarConexion();
    }
}
    