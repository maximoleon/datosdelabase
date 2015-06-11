$(function () {
    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {
            app.generarBarraNavegacion();
            app.generarBotonLogin();
            app.bindings();
        };

        app.bindings = function () {
            $("#login").on('click', function (event) {
                if ($('#login').data("salir")) {
                    if (confirm("Seguro que desea Salir?")) {
                        app.logout();
                    }
                } else {
                    $("#modalLogin").modal({show: true});
                }
            });
            $("#btnIngresar").on('click', function (event) {
                app.login();
            });
        };

        app.generarBarraNavegacion = function () {
            var locacion = "http://" + window.location.host + "/DBF01/";
            
            //alert(loca);
            $('#barraNavegacion').html('<nav class="navbar navbar-default" role="navigation">' +
                    '<div class="container-fluid">' +
                    '<div class="navbar-header">' +
                    '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
                    '<span class="sr-only">Toggle navigation</span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '</button>' +
                    '<a class="navbar-brand active" href="' + locacion  + 'index.html">Pagina Principal</a>' +
                    '</div>' +
                    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
                    '<ul class="nav navbar-nav">' +
                    '<li><a href = "' + locacion  + 'vista/html/venta.html">Ventas</a></li>' +
                    '<li class="dropdown">' +
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Administrar <span class="caret"></span></a>' +
                    '<ul class="dropdown-menu" role="menu">' +
                    '<li><a href = "' + locacion  + 'vista/html/usuario.html">Usuarios</a></li>' +
                    '<li><a href = "' + locacion  + 'vista/html/cliente.html">Clientes</a></li>' +
                    '<li><a href = "' + locacion  + 'vista/html/producto.html">Productos</a></li>' +
                    '<li><a href = "' + locacion  + 'vista/html/factura.html">Facturas</a></li>' +
                    '<li class="divider"></li>' +
                    '<li><a href = "' + locacion  + 'vista/html/tiposCliente.html">Tipos de Cliente</a></li>' +
                    '<li><a href = "' + locacion  + 'vista/html/tiposFactura.html">Tipos de Factura</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '<li><a href = "' + locacion  + 'vista/html/estadisticas.html">Estadisitcas generales</a></li>' +
                    '</ul>' +
                    '<ul class="nav navbar-nav navbar-right">' +
                    '<li class="active" id="btnMetamorfico">' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</nav>');
        };

        app.generarBotonLogin = function () {
            if (sessionStorage["active"]) {
                //alert("sesion activa");
                $('#btnMetamorfico').html('<a id="login"><span class="glyphicon glyphicon-user"></span> Salir</a>');
                $("#login").data("salir", true);
                $("#login").data("usuario", sessionStorage["usuario"]);
            } else {
                //alert("sesion no activa");
                $('#btnMetamorfico').html('<a id="login">Login</a>');
            }
        };

        app.login = function () {
            var url = "controlador/ruteador/Ruteador.php?accion=login";
            var datosEnviar = {nombre_usuario: $("#nombre_usuario").val(), clave: $("#clave").val()};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    //alert(datos.control);
                    if (datos.control == 0) {
                        $("#modalLogin").modal('hide');
                        $("#login").html('<span class="glyphicon glyphicon-user"></span> Salir');
                        $("#login").data("salir", true);
                        sessionStorage["active"] = true;
                        sessionStorage["usuario"] = datos.usuario;
                        sessionStorage["acceso"] = datos.acceso;
                    }
                    //alert("Entró en SUCCESS: " + datos.control);
                },
                error: function (datos) {
                    alert("Error ajax login: " + datos.responseText);
                    console.log(datos);
                    $("#modalLogin").modal('hide');
                }
            });
        };

        app.logout = function (data) {
            //alert("Entre en logout");
            var url = "controlador/ruteador/Ruteador.php?accion=logout&formulario=Sesion";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'text',
                success: function (datos) {
                    $("#login").data("salir", false);
                    $("#login").html('Login');
                    sessionStorage.clear();
                    window.location = "http://localhost/DBF01/";
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.init();

    })(TallerAvanzada);


});
