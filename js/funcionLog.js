$(function () {
    var TallerAvanzada = {};
    (function (app) {
        var locacion = "http://" + window.location.host + "/DBF01/";
        app.init = function () {
            app.validarSession();
            app.FullScreen();
            app.bindings();
        };

        app.validarSession = function () {
            if (localStorage["active"]) {
               $(location).attr('href', location.origin + "/DBF01/administrador");
            }
        };

        // Encuentra el método correcto, llama al elemento correcto
        app.FullScreen = function () {
            var element = document.documentElement;
            if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        };

        app.CancelFullScreen = function () {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        };

        app.bindings = function () {
            $("#btnIngresar").on('click', function (event) {
                app.login();
            });
        };
        app.login = function () {
            var url = locacion + "controlador/ruteador/Ruteador.php?accion=login";

            var datosEnviar = {nombre_usuario: $("#nombre_usuario").val(), clave: $("#clave").val()};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    if (datos.control == 0) {
                        localStorage["active"] = true;
                        localStorage["usuario"] = datos.usuario;
                        localStorage["nombre_usuario"] = $("#nombre_usuario").val();
                        localStorage["acceso"] = datos.acceso;
                        $(location).attr('href', "administrador");
                    }
                    app.FullScreen();
                },
                error: function (datos) {
                    alert("login: " + datos.responseText);
                    //console.log(datos);
                }
            });
        };
        app.logout = function (data) {
            //alert("Entre en logout");
            var url = locacion + "controlador/ruteador/Ruteador.php?accion=logout&formulario=Sesion";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'text',
                success: function (datos) {
                    $("#login").data("salir", false);
                    $("#login").html('Login');
                    localStorage.clear();
                    $("#contenido").load(locacion + ' #contenido');
                    //app.generarBarraNavegacion();
                    // app.CancelFullScreen();
                    //window.location = locacion;
                },
                error: function (datos) {

                }
            });
        };
        app.init();
    })(TallerAvanzada);
});
