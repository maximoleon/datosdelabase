$(function () {
    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {
            app.bindings();

            app.calendario();
            app.ocultar();
            app.ocultarTablas();
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
            
            
            // BOTONES DE TABLAS
            $("#btnGenerarFacturasXperiodo").on('click', function (event){
                app.facturasEmitidasPeriodo($("#txtFacturasXperiodoINICIO").val(), $("#txtFacturasXperiodoFIN").val());
            });
            
            $("#btnGenerarFacturasXusuario").on('click', function (event){
                app.facturasXusuario();
            });
            
            $("#btnGenerarVentasProductoXperiodo").on('click', function (event){
                app.ventasProductoXperiodo($("#txtVentasProductoXperiodoINICIO").val(), $("#txtVentasProductoXperiodoFIN").val(), $("#txtVentasProductoXperiodoPRODUCTO").val());
            });
        };
        
        app.ocultar = function () {
            $("#ventasXprov").hide();
            $("#facturasXperiodo").hide();
            $("#topProductos").hide();
            $("#facturasXperiodo").hide();
            $("#facturasXusuario").hide();
            $("#ventasProductoXperiodo").hide();
        };
        
        app.ocultarTablas = function(){
            //Ocultando tablas
            $("#tablaFacturasXperiodo").hide();
            $("#tablaFacturasXusuario").hide();
            $('#tablaVentasProductoXperiodo').hide();
        };
        
        app.calendario = function(){
            $("#txtFacturasXperiodoINICIO").datepicker();
            $("#txtFacturasXperiodoFIN").datepicker();
            $("#txtVentasProductoXperiodoINICIO").datepicker();
            $("#txtVentasProductoXperiodoFIN").datepicker();
        };

        app.facturasXusuario = function () {
            
            app.autoCompletarUsuario();
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=generarFacturasXUsuario&formulario=Estadistica";
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
        
        app.cargarTablaFacturasXusuario= function (datos){
            
            oTable = $('#tablaFacturasXusuario').dataTable({
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
        
        app.autoCompletarUsuario = function () {
            var base = new Array();
            $.ajax({
                url: "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Usuario",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, usuario) {
                        base.push(usuario.nombre_usuario);
                    });
                },
                error: function(data){
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
                url: "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Producto",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, producto) {
                        base.push(producto.id_producto + " | " + producto.nombre_producto);
                    });
                },
                error: function(data){
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
        
        


        app.ventasXprovincia = function () {
            //alert("entre en localidade");
            var url = "../../controlador/ruteador/Ruteador.php?accion=generarVentasProvincia&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    var Datos = [];
                    var labeles = [];
                    var valores = [];
                    $.each(datos, function (clave, provincia) {
                        labeles.push(provincia.nombre);
                        valores.push(provincia.cantidad);
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
                    var contexto = document.getElementById('grafico').getContext('2d');
                    window.Barra = new Chart(contexto).Bar(Datos, {responsive: true});
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = "../../";
            }
        };

        app.productosMasVendidos = function () {
            //alert("entre en localidade");
            var url = "../../controlador/ruteador/Ruteador.php?accion=generarProductosMasVendidos&formulario=Estadistica";

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
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
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.facturasEmitidasPeriodo = function (inicio, fin) {
            
            var fecInicio = inicio.split('/');
            var fecFin = fin.split('/');
            //Decodifico la fecha en formato AAAA-MM-DD
            fecInicio = fecInicio[2] + "-" + fecInicio[0] + "-" + fecInicio[1];
            fecFin = fecFin[2] + "-" + fecFin[0] + "-" + fecFin[1];
            
            var datosEnviar = {fechaInicio: fecInicio, fechaFin: fecFin};
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=generarFacturasEmitidasEnPeriodo&formulario=Estadistica";

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
        //Cargar tabla Facturas Emitidas X Periodo
        app.cargarTablaFacturasXperiodo = function (datos){
            
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
        
        app.ventasProductoXperiodo = function (inicio, fin, prod) {
            
            var fecInicio = inicio.split('/');
            var fecFin = fin.split('/');
            var producto = prod.split(' | ');
            //Decodifico la fecha en formato AAAA-MM-DD
            fecInicio = fecInicio[2] + "-" + fecInicio[0] + "-" + fecInicio[1];
            fecFin = fecFin[2] + "-" + fecFin[0] + "-" + fecFin[1];
            producto = producto[0];
            
            var datosEnviar = {fechaInicio: fecInicio, fechaFin: fecFin, producto: producto};
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=generarVentasProductoXperiodo&formulario=Estadistica";

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
        
        app.cargarTablaVentasProductoXperiodo = function(datos){
            $("#tituloTablaVentasProductoXperiodo").html($("#txtVentasProductoXperiodoPRODUCTO").val())
            
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
        
/*
        app.torta = function () {
            var Datos = [
                {
                    value: 300,
                    color: "#E10517",
                    highlight: "#E10573",
                    label: "Producto A"
                },
                {
                    value: 500,
                    color: "#4305E1",
                    highlight: "#7243E9",
                    label: "Producto B"
                },
                {
                    value: 150,
                    color: "#13EB08",
                    highlight: "#5FFC57",
                    label: "Producto C"
                }
            ];
            var contexto = document.getElementById("canvas").getContext("2d");
            window.Pastel = new Chart(contexto).Pie(Datos);
        };
*/
        
        app.init();

    })(TallerAvanzada);
});