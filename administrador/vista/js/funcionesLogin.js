$(function () {
    var TallerAvanzada = {};
    var locacion = "http://" + window.location.host + "/DBF01/";
    (function (app) {
        
        app.init = function () {
            app.controlLogin();
        };
        app.logout = function (data) {
            //alert("Entre en logout");
            var url = "controlador/ruteador/Ruteador.php?accion=logout&formulario=Sesion";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'text',
                success: function (datos) {
                    localStorage.clear();
                    $(location).attr('href', locacion);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.controlLogin = function () {
            if (localStorage["active"]) {
                $("#wrapper").show();
                $("#menu_nombreUsuario").html(localStorage['nombre_usuario']);

                app.crearSitio();
                $("#menu_salir").on('click', function (event) {
                    if (confirm("Seguro que desea Salir?")) {
                        app.logout();
                    }
                });

            } else {
                $(location).attr('href', locacion);
            }
        };

        app.crearSitio = function () {
            //
            $.get("menu.html", function (text) {
                $("#includeMenu").html(text);
            });
            //

            //
            $.get("inicio.html", function (text) {
                $("#contenido").html(text);
                $.getScript("vista/js/funcionesIndex.js");
            });
            //


            app.botones();
        };

        app.botones = function () {
            
            $("#navegar_index").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    window.location.reload();
                    //$("#contenido").load('index.html');
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });
            
            $("#navegar_Ventas").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/venta.html');
                    $.getScript("vista/js/funcionesVenta.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#navegar_Productos").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/producto.html');
                    $.getScript("vista/js/funcionesProducto.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#navegar_Facturas").on('click', function (event) {
                $("#contenido").load('vista/html/factura.html');
                $.getScript("vista/js/funcionesFactura.js");
            });

            $("#navegar_Usuarios").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/usuario.html');
                    $.getScript("vista/js/funcionesUsuario.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#navegar_Clientes").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/cliente.html');
                    $.getScript("vista/js/funcionesCliente.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#navegar_tipoCliente").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/tiposCliente.html');
                    $.getScript("vista/js/funcionesTiposCliente.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });

            $("#navegar_tipoFactura").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/tiposFactura.html');
                    $.getScript("vista/js/funcionesTiposFactura.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });
            $("#navegar_Estadisticas").on('click', function (event) {
                if (typeof localStorage["usuario"] != 'undefined') {
                    $("#contenido").load('vista/html/estadisticas.html');
                    $.getScript("vista/js/funcionesEstadistica.js");
                } else {
                    $(location).attr('href', location.origin + "/PhpProject3");
                }
            });


        };
        app.init();
    })(TallerAvanzada);
});
