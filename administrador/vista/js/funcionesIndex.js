$(function () {
    var TallerAvanzada = {};
    var locacion = location.href;
    (function (app) {
        app.init = function () {
            app.buscarCantidadProductos();
            app.buscarCantidadFacturas();
            app.buscarCantidadClientes();
            app.buscarCantidadUsuarios();
            app.usuario();
        };

        app.buscarCantidadProductos = function () {
            var url = locacion + "controlador/ruteador/Ruteador.php?accion=cantidad&formulario=Producto";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    $("#panel_productos").html(datos[0]['COUNT(*)']);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.usuario = function () {
            $("#nombre_usuario_bienvenida").html(localStorage['nombre_usuario']);
        };
        
        app.buscarCantidadFacturas = function () {
            
            var url = "controlador/ruteador/Ruteador.php?accion=cantidad&formulario=Factura";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    $("#panel_facturas").html(datos[0]['COUNT(*)']);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.buscarCantidadClientes = function () {
            
            var url = "controlador/ruteador/Ruteador.php?accion=cantidad&formulario=Cliente";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    $("#panel_clientes").html(datos[0]['COUNT(*)']);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.buscarCantidadUsuarios = function () {
            
            var url = "controlador/ruteador/Ruteador.php?accion=cantidad&formulario=Usuario";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    $("#panel_usuarios").html(datos[0]['COUNT(*)']);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.botones = function () {
            $("#panel_productos_link").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/producto.html');
                    $.getScript("vista/js/funcionesProducto.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#panel_facturas_link").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/factura.html');
                    $.getScript("vista/js/funcionesFactura.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#panel_usuarios_link").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/usuario.html');
                    $.getScript("vista/js/funcionesUsuario.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#panel_clientes_link").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/cliente.html');
                    $.getScript("vista/js/funcionesCliente.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });
            

        };
        app.init();
        app.botones();
    })(TallerAvanzada);
});
