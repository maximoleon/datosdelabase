$(function () {
    var TallerAvanzada = {};

    (function (app) {
        var oTable;
        app.init = function () {
            app.buscarProductos();
            app.bindings();
        };

        app.bindings = function () {
            $("#agregarProducto").on('click', function (event) {  //Evento para el Click del boton agregarProducto
                $("#id").val(0);
                app.limpiarModal();
                $("#tituloModal").html("Nuevo Producto");
                $("#modalProducto").modal({show: true});
            });

            $("#buscarProducto").on('click', function (event) {  //Evento para el Click del boton agregarProducto
                $("#tituloModalBuscar").html("Buscar Producto");
                $("#modalBuscar").modal({show: true});
                app.autoC();
            });

            $("#imprimir").on('click', function (event) {  //Evento para el Click del boton agregarProducto
                app.imprimir();
            });

            $("#cuerpoTablaProducto").on('click', '.eliminar', function () {
                app.eliminarProducto($(this).attr("data-id_producto"));
            });

            //EDITAR PRODUCTO
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
            //FIN EDITAR PRODUCTO

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                if ($("#id").val() == 0) {//Si el id es cero entonces se guarda una nueva producto
                    app.guardarProducto();
                } else {//Si el id es distinto de cero entonces se modifica una producto
                    app.modificarProducto();
                }
            });

            $("#eliminar").on("click", function (event) {
                event.preventDefault();
                var datosEnviar = $("#id").val();
                app.eliminarProducto(datosEnviar);
            });

            $("#btnBuscar").on("click", function (event) {
                event.preventDefault();
                app.buscar();
            });

            $("#formProducto").bootstrapValidator({
                excluded: []
            });
        };

        app.buscar = function () {
            alert("entre en buscar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&formulario=Producto";
            var datosEnviar = {criterio: $("#criterio").val(), buscar: $("#txtBusqueda").val()};
            alert("criterio: " + datosEnviar.criterio + " valor buscado:" + datosEnviar.buscar);
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datosRecibidos) {
                    alert("busque con exito");
                    alert(datosRecibidos);
                    $("#modalBuscar").modal('hide');
                    app.rellenarTabla(datosRecibidos);
                },
                error: function (datosRecibidos) {
                    alert("Error al buscar");
                    alert(datosRecibidos);
                    $("#modalBuscar").modal('hide');
                }
            });
        };
//DESDE ACA
        app.autoC = function () {
            var base = new Array();
            $.ajax({
                url: "../../controlador/ruteador/Ruteador.php?accion=encontrar&formulario=Producto",
                dataType: 'json',
                success: function (data) {
                    var i = 0;
                    $.each(data, function () {
                        $.each(this, function (name, value) {
                            base[i] = value;
                            i++;
                        });
                    });

                }
            });
            $("#department_name").autocomplete({
                source: base,
                autoFocus: true,
                minLength: 2,
                select: function (event, ui) {
                    alert(ui.item ?
                            "Selecciono: " + ui.item.value :
                            "Nada seleccionado " + this.value);
                }
            });
        };
//HASTA ACA

        app.imprimir = function () {
            var aux = $("#tablaProducto").html();
            aux = aux.replace("<th>acciones</th>", "");
            var inicio = aux.indexOf("<td><a class", 0);
            while (inicio > 0) {
                var fin = aux.indexOf("</td>", inicio) + 5;
                var strBorrar = aux.substring(inicio, fin);
                aux = aux.replace(strBorrar, "");
                inicio = aux.indexOf("<td><a class", 0);
            }
            $("#html").val('<table border="1">' + aux + '</table>');
            $("#imprimirProducto").submit();
        };

        app.guardarProducto = function () {
            //alert("entre en agregar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=Producto";
            var datosEnviar = $("#formProducto").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datosRecibidos) {
                    $("#modalProducto").modal('hide');
                    app.actualizarTabla(datosRecibidos, $("#id").val());
                },
                error: function (datosRecibidos) {
                    //alert("Error en guardar producto");
                    alert(datosRecibidos);
                }
            });
        };

        app.modificarProducto = function () {
            //alert("entre en modificar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=modificar&formulario=Producto";
            var datosEnviar = $("#formProducto").serialize();
            console.log(datosEnviar);
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                success: function (datosRecibidos) {
                    $("#modalProducto").modal('hide');
                    app.actualizarTabla(datosRecibidos, $("#id").val());
                    app.limpiarModal();
                },
                error: function (datosRecibidos) {
                    alert("Error en guardar producto");
                    alert(datosRecibidos);
                }
            });
        };

        app.buscarProductos = function () {
            //alert("Entre en buscarProductos");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Producto";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datosRecibidos) {
                    app.rellenarTabla(datosRecibidos);
                },
                error: function () {
                    alert('error buscar producto');
                }
            });
        };

        app.eliminarProducto = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&formulario=Producto";
            //alert(id);
            var datosEnviar = {id: id};
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function (datosRecibidos) {
                    app.borrarFila(id);
                },
                error: function (datosRecibidos) {
                    alert('error al eliminar');
                }
            });
        };

        app.rellenarTabla = function (data) {
            $(document).ready(function () {
                oTable = $('#tablaProducto').dataTable({
                    data: data,
                    "columns": [
                        {"data": "id_producto"},
                        {"data": "cod_producto"},
                        {"data": "nombre_producto"},
                        {"data": "precio_producto"},
                        {"data": "stock_producto"},
                        {"data": "disponible_producto"}
                    ],
                    "columnDefs": [
                        {
                            "targets": [0],
                            "visible": false,
                            "searchable": false
                        }
                    ]
                }).api();
            });
        };

        app.actualizarTabla = function (producto, id) {
            if (id == 0) { //ES guardar una producto nueva
                $('#tablaProducto').DataTable().row.add({
                    "id_producto": producto.id_producto,
                    "cod_producto": producto.cod_producto,
                    "nombre_producto": producto.nombre_producto,
                    "precio_producto": producto.precio_producto,
                    "stock_producto": producto.stock_producto,
                    "disponible_producto": producto.disponible_producto
                }).draw();

            } else {    //Es Modificar una producto existente
                //busco la fila
                if ($("#disponible").prop('checked')) {
                    $("#disponible").val('si');
                } else {
                    $("#disponible").val('no');
                }
                oTable.row($("#idTabla").val()).data({
                    "id_producto": id,
                    "cod_producto": $("#codigo").val(),
                    "nombre_producto": $("#nombre").val(),
                    "precio_producto": $("#precio").val(),
                    "stock_producto": $("#stock").val(),
                    "disponible_producto": $("#disponible").val()
                }).draw();
            }
        };

        app.borrarFila = function (id) {
            var fila = $("#cuerpoTablaProducto").find("a[data-id_producto='" + id + "']").parent().parent().remove();
        };

        app.limpiarModal = function () {
            $("#id").val('');
            $("#idTabla").val('');
            $("#codigo").val('');
            $("#nombre").val('');
            $("#precio").val('');
            $("#stock").val('');
            $("#disponible").val('');
        };
        app.init();
    })(TallerAvanzada);


});
