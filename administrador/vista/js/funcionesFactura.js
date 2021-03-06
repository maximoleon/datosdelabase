$(function () {
    var TallerAvanzada = {};
    var locacion = "http://" + window.location.host + "/DBF01/";
    (function (app) {
        var facturas;
        var oTable;
        app.init = function () {
            app.listarFacturas();
            app.bindings();
        };
        app.bindings = function () {

            $("#imprimir").on('click', function (event) {  //Evento para el Click del boton agregarFactura
                app.imprimir();
            });
            $("#imprimirFactura").on('click', function (event) {  //Evento para el Click del boton agregarFactura
                app.imprimirFactura();
            });
            
            $('#cuerpoTablaFactura').on('click', 'tr', function () {
                var data = oTable.row(this).data();
                console.log(data.nro_factura);
                $('#lblNroFactura').html(data.nro_factura);
                $('#idTabla').html(oTable.row(this).index());
                $("#lblFecha").html(data.fecha_factura);
                $("#lblcliente").html(data.clienteCuil+ " / " + data.clienteNombre);
                $("#lblTipoFactura").html(data.tipoFDesc);
                var total = 0;
                var html = "";
                $.each(data.detalles, function (clave, detalle) {
                    var subtotal = (parseInt(detalle.cantidad_detalleFactura) * parseFloat(detalle.precio_producto));
                    html += '<tr>' +
                            '<td>' + detalle.cantidad_detalleFactura + '</td>' +
                            '<td>' + detalle.cod_producto + '</td>' +
                            '<td>' + detalle.nombre_producto + '</td>' +
                            '<td>' + detalle.precio_producto + '</td>' +
                            '<td>' + subtotal + '</td>' +
                            '</tr>';
                    total += subtotal;
                });
                $("#cuerpoTablaDetalle").html(html);
                $("#total").html(total);
                $("#modalFactura").modal({show: true});
            });
            
            
            $("#formFactura").bootstrapValidator({
                excluded: [],
            });
        };
        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = locacion;
            }
        };
        app.imprimir = function () {
            var aux = $("#tablaFactura").html();
            aux = aux.replace("<th>acciones</th>", "");
            var inicio = aux.indexOf("<td><a class", 0);
            while (inicio > 0) {
                var fin = aux.indexOf("</td>", inicio) + 5;
                var strBorrar = aux.substring(inicio, fin);
                aux = aux.replace(strBorrar, "");
                inicio = aux.indexOf("<td><a class", 0);
            }
            $("#html").val('<table border="1">' + aux + '</table>');
            $("#imprimirForm").attr("action", locacion+"controlador/ruteador/imprimir.php");
            $("#imprimirForm").submit();
        };
        app.imprimirFactura = function () {
            var aux = $("#cuerpoModal").html();
            $("#html").val(aux);
            $("#imprimirForm").attr("action", locacion+"controlador/ruteador/imprimir.php");
            $("#imprimirForm").submit();
        };
        app.listarFacturas = function () {
            var url = locacion+"controlador/ruteador/Ruteador.php?accion=listar&formulario=Factura";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    console.log(datos);
                    facturas = datos;
                    app.rellenarTabla(datos);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        app.calcularTotal = function (data) {
            var total = 0;
            $.each(data, function (clave, detalle) {
                total += (parseInt(detalle.cantidad_detalleFactura) * parseFloat(detalle.precio_producto));
            });
            return total;
        };
        app.rellenarTabla = function (data) {
            
            oTable = $('#tablaFactura').dataTable({
                data: data,
                "columns": [
                    {"data": "nro_factura"},
                    {"data": "fecha_factura"},
                    {"data": "tipoFDesc"},
                    {"data": "clienteNombre"}
                ], "columnDefs": [{
                        "targets": 4,
                        "data": function (row, type, val, meta) {
                            var total = app.calcularTotal(row.detalles);
                            return total;
                        },
                        "defaultContent": "$"}]
            }).api();

            $('#tablaProducto tbody').on('click', 'tr', function () {
                app.limpiarModal();
                var data = oTable.row(this).data();
                $('#id').val(data.id_producto);
                $('#idTabla').val(oTable.row(this).index());
                $("#codigo").val(data.cod_producto);
                $("#nombre").val(data.nombre_producto);
                $("#precio").val(data.precio_producto);
                $("#stock").val(data.stock_producto);
                if (data.disponible_producto === 'si') {
                    $("#disponible").prop('checked', true);
                } else {
                    $("#disponible").prop('checked', false);
                }
                $("#tituloModal").html("Editar Producto");
                $("#modalProducto").modal({show: true});
            });

        };
        app.init();
    })(TallerAvanzada);
});
