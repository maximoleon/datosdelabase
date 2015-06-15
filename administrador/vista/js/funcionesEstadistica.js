$(function () {
    var TallerAvanzada = {};
    (function (app) {
        var locacion = "http://" + window.location.host + "/DBF01/";
        app.init = function () {
            app.bindings();
            app.calendario();
            app.ocultar();
            app.ocultarTablas();
            
            //var locacion = "http://" + window.location.host + "/DBF01/";
        };

        app.bindings = function () {
            $("#mostrarVentasXprov").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                $("#ventasXprov").show();
                app.ventasXprovincia();
            });

            $("#mostrarTopXprod").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                $("#topProductos").show();
                app.productosMasVendidos();
            });

            $("#mostrarFacturasXperiodo").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                $("#facturasXperiodo").show();
            });

            $("#mostrarFacturasXusuario").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                app.autoCompletarUsuario();
                $("#facturasXusuario").show();
            });

            $("#mostrarVentasProductoXperiodo").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                app.autoCompletarProducto();
                $("#ventasProductoXperiodo").show();
            });

            $("#mostrarVentasXclientes").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                app.ventasXclientes();
                $("#ventasXclientes").show();
            });

            $("#mostrarVentasProductoCliente").on('click', function (event) {   //Evento onclick boton
                app.ocultar();
                $("#ventasProductoCliente").show();
            });

            $("#mostrarFacturasXtipo").on('click', function (event) {   //Evento onclick boton
                
                app.ocultar();
                app.tiposFacturasGeneradas();
                $("#facturasXtipo").show();
            });

            // BOTONES DE TABLAS
            $("#btnGenerarFacturasXperiodo").on('click', function (event) {
                app.facturasEmitidasPeriodo($("#txtFacturasXperiodoINICIO").val(), $("#txtFacturasXperiodoFIN").val());
            });

            $("#btnGenerarFacturasXusuario").on('click', function (event) {
                app.facturasXusuario();
            });

            $("#btnGenerarVentasProductoXperiodo").on('click', function (event) {
                app.ventasProductoXperiodo($("#txtVentasProductoXperiodoINICIO").val(), $("#txtVentasProductoXperiodoFIN").val(), $("#txtVentasProductoXperiodoPRODUCTO").val());
            });

            $("#btnGenerarVentasProductoCliente").on('click', function (event) {
                app.ventasProductoCliente($("#txtVentasProductoClienteINICIO").val(), $("#txtVentasProductoClienteFIN").val());
            });
        };

        app.ocultar = function () {
            $("#ventasXprov").hide();
            $("#facturasXperiodo").hide();
            $("#topProductos").hide();
            $("#facturasXperiodo").hide();
            $("#facturasXusuario").hide();
            $("#ventasProductoXperiodo").hide();
            $("#ventasXclientes").hide();
            $("#ventasProductoCliente").hide();
            $("#facturasXtipo").hide();
        };

        app.ocultarTablas = function () {
            //Ocultando tablas
            $("#tablaFacturasXperiodo").hide();
            $("#tablaFacturasXusuario").hide();
            $('#tablaVentasProductoXperiodo').hide();
            $('#tableVentasXclientes').hide();
            $('#tablaVentasProductoCliente').hide();
            $("#tablaFacturasXtipo").hide();
        };

        app.calendario = function () {
            $("#txtFacturasXperiodoINICIO").datepicker({dateFormat: 'yy-mm-dd'});
            $("#txtFacturasXperiodoFIN").datepicker({dateFormat: 'yy-mm-dd'});
            $("#txtVentasProductoXperiodoINICIO").datepicker({dateFormat: 'yy-mm-dd'});
            $("#txtVentasProductoXperiodoFIN").datepicker({dateFormat: 'yy-mm-dd'});
            $("#txtVentasProductoClienteINICIO").datepicker({dateFormat: 'yy/mm/dd'});
            $("#txtVentasProductoClienteFIN").datepicker({dateFormat: 'yy/mm/dd'});
        };
        
        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = locacion;
            }
        };

        app.ventasXprovincia = function () {
            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarVentasProvincia&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    app.graficoVentasXprovincia(datos);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.productosMasVendidos = function () {
            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarProductosMasVendidos&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    app.graficoProductosMasVendidos(datos);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.facturasEmitidasPeriodo = function (fecInicio, fecFin) {

            var datosEnviar = {fechaInicio: fecInicio, fechaFin: fecFin};

            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarFacturasEmitidasEnPeriodo&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.cargarTablaFacturasXperiodo(datos);
                },
                error: function (datos) {
                }

            });
        };

        app.facturasXusuario = function () {

            app.autoCompletarUsuario();

            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarFacturasXUsuario&formulario=Estadistica";
            var datosEnviar = {usuario: $("#txtFacturasXusuario").val()};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.cargarTablaFacturasXusuario(datos);
                }
            });
        };

        app.ventasProductoXperiodo = function (fecInicio, fecFin, prod) {

            var producto = prod.split(' | ');
            producto = producto[0];

            var datosEnviar = {fechaInicio: fecInicio, fechaFin: fecFin, producto: producto};

            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarVentasProductoXperiodo&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.cargarTablaVentasProductoXperiodo(datos);
                },
                error: function (datos) {
                }

            });
        };

        app.ventasXclientes = function () {

            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarVentasXclientes&formulario=Estadistica";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    app.cargarTablaVentasXclientes(datos);
                }
            });
        };

        app.ventasProductoCliente = function (inicio, fin) {

            var datosEnviar = {fechaInicio: inicio, fechaFin: fin};

            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarVentasProductoCliente&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.cargarTablaVentasProductoCliente(datos);
                },
                error: function (datos) {

                }

            });
        };

        app.tiposFacturasGeneradas = function () {
            var url = locacion+"controlador/ruteador/Ruteador.php?accion=generarTiposFacturasEmitidas&formulario=Estadistica";
            
            var acum = 0;
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    app.acciones(data);
                    console.log(data)
                    app.cargarTablaFacturasXtipo(data["tabla"]);
                    var acum = data["tabla"][0]["cantidad"]+data["tabla"][1]["cantidad"]+data["tabla"][2]["cantidad"];
                    /*$.each(data, function (clave, factura) {
                        acum += parseInt(factura.Cantidad);
                    });*/
                    app.graficoTiposFacturasGeneradas(data["grafico"], acum);
                },
                error: function (data) {

                }
            });
        };

        // Funciones autocompletar textBox
        app.autoCompletarUsuario = function () {
            var base = new Array();
            $.ajax({
                url: locacion+"controlador/ruteador/Ruteador.php?accion=listar&formulario=Usuario",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, usuario) {
                        base.push(usuario.nombre_usuario);
                    });
                },
                error: function (data) {
                }
            });
            $("#txtFacturasXusuario").autocomplete({
                source: base,
                autoFocus: true,
                minLength: 3,
                select: function (event, ui) {
                    $("#txtFacturasXusuario").val(ui.item.value);
                }
            });
        };

        app.autoCompletarProducto = function () {
            var base = new Array();
            $.ajax({
                url: locacion+"controlador/ruteador/Ruteador.php?accion=listar&formulario=Producto",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, producto) {
                        base.push(producto.id_producto + " | " + producto.nombre_producto);
                    });
                },
                error: function (data) {
                }
            });
            $("#txtVentasProductoXperiodoPRODUCTO").autocomplete({
                source: base,
                autoFocus: true,
                minLength: 1,
                select: function (event, ui) {
                    $("#txtVentasProductoXperiodoPRODUCTO").val(ui.item.value);
                }
            });
        };

        /*************************** INICIO TABLAS **********************************/
        //Cargar tabla Facturas Emitidas X Periodo
        app.cargarTablaFacturasXperiodo = function (datos) {
            
            //Limpio la tabla
            $('#tablaFacturasXperiodo').dataTable().fnDestroy();
            $('#tablaFacturasXperiodo').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "Usuario"},
                    {"data": "Factura"},
                    {"data": "Fecha"},
                    {"data": "Cliente"}
                ]
            }).api();
            $('#tablaFacturasXperiodo').show();
        };

        app.cargarTablaFacturasXusuario = function (datos) {
            
            //Limpio la tabla
            $('#tablaFacturasXusuario').dataTable().fnDestroy();
            $('#tablaFacturasXusuario').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "Usuario"},
                    {"data": "Fecha"},
                    {"data": "Factura"}
                ]
            }).api();
            $("#tablaFacturasXusuario").show();
        };

        app.cargarTablaVentasProductoXperiodo = function (datos) {
            $("#tituloTablaVentasProductoXperiodo").html($("#txtVentasProductoXperiodoPRODUCTO").val());

            //Limpio la tabla
            $('#tablaVentasProductoXperiodo').dataTable().fnDestroy();
            $('#tablaVentasProductoXperiodo').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "Cantidad"},
                    {"data": "Numero Factura"},
                    {"data": "Fecha"},
                    {"data": "Cliente"}
                ]
            }).api();
            $('#tablaVentasProductoXperiodo').show();
        };

        app.cargarTablaVentasXclientes = function (datos) {
            
            //Limpio la tabla
            $('#tableVentasXclientes').dataTable().fnDestroy();
            $('#tableVentasXclientes').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "Cliente"},
                    {"data": "Cantidad"}
                ]
            }).api();
            $("#tableVentasXclientes").show();
        };

        app.cargarTablaVentasProductoCliente = function (datos) {
            $("#tituloTablaVentasProductoCliente").html($("#txtVentasProductoClienteINICIO").val() + " - " + $("#txtVentasProductoClienteFIN").val())

            //Limpio la tabla
            $('#tablaVentasProductoCliente').dataTable().fnDestroy();
            $('#tablaVentasProductoCliente').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "Producto"},
                    {"data": "Cantidad"},
                    {"data": "Numero Factura"},
                    {"data": "Cliente"},
                    {"data": "Fecha"}
                ]
            }).api();
            $('#tablaVentasProductoCliente').show();
        };

        app.cargarTablaFacturasXtipo = function (datos) {
            //Limpio la tabla
            
            
            console.log("datos");
            console.log(datos);
            $('#tablaFacturasXtipo').dataTable().fnDestroy();

            $('#tablaFacturasXtipo').dataTable({
                data: datos,
                "searching": false,
                "columns": [
                    {"data": "tipo"},
                    {"data": "cantidad"},
                    {"data": "total"}
                ]
            }).api();
            $('#tablaFacturasXtipo').show();
        };
        /*************************** FIN TABLAS **********************************/

        /*************************** INICIO GRAFICOS **********************************/

        app.graficoProductosMasVendidos = function (datos) {
            var Datos = [];
            var labeles = [];
            var valores = [];
            $.each(datos, function (clave, producto) {
                labeles.push(producto.nombre);
                valores.push(producto.cantidad);
            });

            var datasetes = [
                {
                    fillColor: 'rgba(91,228,146,0.6)', //COLOR DE LAS BARRAS
                    strokeColor: 'rgba(57,194,112,0.7)', //COLOR DEL BORDE DE LAS BARRAS
                    highlightFill: 'rgba(73,206,180,0.6)', //COLOR "HOVER" DE LAS BARRAS
                    highlightStroke: 'rgba(66,196,157,0.7)', //COLOR "HOVER" DEL BORDE DE LAS BARRAS
                    data: valores
                }
            ];

            var Datos = {
                labels: labeles,
                datasets: datasetes
            };

            //Dibujo en el canvas
            var contexto = document.getElementById('grafico2').getContext('2d');
            window.Barra = new Chart(contexto).Bar(Datos, {responsive: true});
        };

        app.graficoVentasXprovincia = function (datos) {
            var Datos = [];
            var labeles = [];
            var valores = [];
            $.each(datos, function (clave, provincia) {
                labeles.push(provincia.nombre);
                valores.push(provincia.cantidad);
            });

            var datasetes = [
                {
                    fillColor: 'rgba(128,163,143,0.8)', //COLOR DE LAS BARRAS
                    strokeColor: 'rgba(57,194,112,0.7)', //COLOR DEL BORDE DE LAS BARRAS
                    highlightFill: 'rgba(73,206,180,1)', //COLOR "HOVER" DE LAS BARRAS
                    highlightStroke: 'rgba(66,196,157,0.7)', //COLOR "HOVER" DEL BORDE DE LAS BARRAS
                    data: valores
                }
            ];

            var Datos = {
                labels: labeles,
                datasets: datasetes
            };

            //Dibujo en el canvas
            var contexto = document.getElementById('grafico').getContext('2d');
            window.Barra = new Chart(contexto).Bar(Datos, {responsive: true});
        };

        app.graficoTiposFacturasGeneradas = function (data, total) {
            
            var colores = [["#FF0000", "#CE0505"], ["#0900FF", "#0600B0"], ["#1EFF00", "#15B000"]]; //Truchada xDD
            var datos = [];

            $.each(data, function (clave, factura) {
                var contenido = {value: parseInt(factura.Cantidad), color: colores[clave][0], highlight: colores[clave][1], label: "Factura tipo " + factura.Tipo + " (" + Math.trunc((parseInt(factura.Cantidad) * 100 / total)) + "%)"};
                datos.push(contenido);
            });

            var contexto = document.getElementById("graficoTortaFacturasXtipo").getContext("2d");
            window.Pastel = new Chart(contexto).Pie(datos);
        };

        /*************************** FIN GRAFICOS **********************************/

        /*
         app.torta = function () { var Datos = [ { value: 300, color: "#E10517", highlight: "#E10573", label: "Producto A" }, { value: 500, color: "#4305E1", highlight: "#7243E9", label: "Producto B" }, { value: 150, color: "#13EB08", highlight: "#5FFC57", label: "Producto C" } ]; var contexto = document.getElementById("canvas").getContext("2d"); window.Pastel = new Chart(contexto).Pie(Datos); };
         */

        app.init();

    })(TallerAvanzada);
});