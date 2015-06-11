$(function () {
    var TallerAvanzada = {};

    (function (app) {
        var productos;
        var productosAll;

        app.init = function () {
            app.cargarFormulario();
            app.bindings();

        };

        app.bindings = function () {

            $("#agregarProd").on('click', function (event) {   //Evento onclick boton
                app.agregarProducto();
            });

            $("#guardarFactura").on('click', function (event) {   //Evento onclick boton
                app.guardarFactura();
            });

            $("#formFactura").bootstrapValidator({
                excluded: [],
            });
        };

        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = "../../";
            }
        };

        app.guardarFactura = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=Factura";
            var cant = $(".cantidad");
            var cod = $(".codigo");
            var detalles = new Array();
            for (var i = 0, max = cant.length; i < max; i++) {
                detalles.push({cantidad: cant[i].value, codigo: cod[i].innerHTML});
            }
            var cuil = $('#clientes').val().split(" - ", 1)[0];
            var tipoFactura = $("#combo_tipoF").val();
            var factura = {usuario: sessionStorage["usuario"], cuil: cuil, tipo: tipoFactura};
            var datosEnviados = {factura: factura, detalles: detalles};
            console.log(datosEnviados);
            var valido = app.validaciones(datosEnviados);
            if (valido) {
                $.ajax({
                    url: url,
                    method: 'POST',
                    dataType: 'json',
                    data: datosEnviados,
                    success: function (datos) {
                        app.acciones(datos);
                        alert("Factura Emitida");
                        app.limpiarFormulario();
                    },
                    error: function (datos) {
                        alert(datos.responseText);
                        console.log(datos);
                    }
                });
            } else {
                alert("Los Datos no son correctos");
            }
        };
        
        app.limpiarFormulario = function () {
            $("#clientes").val("");
            $("#cuerpoTablaDetalle").html("");
            $(".total").first().html(0);
        };

        app.validaciones = function (datos) {
            var valido = true;
            var cuil = datos["factura"]["cuil"].trim();
            if (cuil == "" || isNaN(cuil) || cuil < 0) {
                console.log("cuil: "+cuil);
                valido = false;
            }
            var tipo = datos["factura"]["tipo"].trim();
            if (tipo == "" || isNaN(tipo) || tipo < 0) {
                console.log("tipo: "+tipo);
                valido = false;
            }
            var usuario = datos["factura"]["usuario"].trim();
            if (usuario == "" || isNaN(usuario) || usuario != sessionStorage["usuario"]) {
                console.log("usuario: "+usuario);
                valido = false;
            }
            if (datos["detalles"].length > 0) {
                for (var i = 0, max = datos["detalles"].length; i < max; i++) {
                    var cant = datos["detalles"][i]["cantidad"].trim();
                    if (cant == "" || isNaN(cant) || cant < 1) {
                        console.log("cant: "+cant);
                        valido = false;
                    }
                    var cod = datos["detalles"][i]["codigo"].trim();
                    if (cod == "" || isNaN(cod) || cod < 0) {
                        console.log("cod: "+cod);
                        valido = false;
                    }
                }
            } else {
                console.log("detalles: "+datos["detalles"]);
                valido = false;
            }

            return valido;
        };

        app.cargarFormulario = function (datos) {
            app.comboTiposFacturas();
            app.autocompletarCliente();
            //ñlapp.comboTiposCliente();
            //app.autocompletarProducto();
            app.listarProductos();
        };

        app.autocompletarCliente = function () {
            var base = new Array();
            $.ajax({
                url: "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Cliente",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, cliente) {
                        base.push(cliente.cuil_cliente + " - " + cliente.nombre_cliente);
                    });
                }
            });
            $("#clientes").autocomplete({
                source: base,
                autoFocus: true,
                minLength: 3,
                select: function (event, ui) {
                    $("#clientes").val(ui.item.value);
                    //alert($("#clientes").val());
                }
            });
        };

        app.listarProductos = function () {
            productos = new Array();
            $.ajax({
                url: "../../controlador/ruteador/Ruteador.php?accion=listarD&formulario=Producto",
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (clave, producto) {
                        productos.push({cod: producto.cod_producto, label: producto.cod_producto + " - " + producto.nombre_producto, value: producto.nombre_producto, precio: producto.precio_producto, stock: producto.stock_producto});
                    });
                    console.log(productos);
                }
            });
        };

        app.autocompletarProducto = function () {
            $(".autocompletar").autocomplete({
                source: productos,
                autoFocus: true,
                minLength: 3,
                select: function (event, ui) {
                    $(this).val(ui.item.nom);
                    $(this).parent().parent().children().first().next().html(ui.item.cod);
                    $(this).parent().parent().children().first().next().next().next().html(ui.item.precio);
                    app.recalcularSubtotal($(this).parent().parent());
                }
            });
        };

        app.recalcularSubtotal = function (tr) {
            var cantidad = parseInt(tr.children().first().children().first()[0].value);
            var precio = parseFloat(tr.children().first().next().next().next().html());
            tr.children().first().next().next().next().next().html(cantidad * precio);
            app.recalcularTotal();
        };

        app.recalcularTotal = function () {
            var total = 0;
            var subtotales = $(".subtotal");
            for (var i = 0, max = subtotales.length; i < max; i++) {
                total += parseFloat(subtotales[i].innerHTML);
            }
            $(".total").first().html(total);
        };

        app.onchanged = function () {
            $(".cantidad").on('change', function (event) {   //Evento onclick boton
                app.recalcularSubtotal($(this).parent().parent());
            });
        };

        app.onclick = function () {
            $(".eliminar").on('click', function (event) {   //Evento onclick boton
                app.borrarFila($(this).parent().parent());
            });
        };

        app.borrarFila = function (tr) {
            var fila = tr.remove();
            app.recalcularTotal();
        };

        app.agregarProducto = function () {
            var html = '<tr>' +
                    '<td><input type="number" class="cantidad" value="0" style="width:50px"></td>' +
                    '<td class="codigo"></td>' +
                    '<td><input type="text" class="autocompletar"></td>' +
                    '<td></td>' +
                    '<td class="subtotal"></td>' +
                    '<td><a align="center" class="eliminar" ><span class="glyphicon glyphicon-remove"></a></td>' +
                    '</tr>';
            $("#cuerpoTablaDetalle").append(html);
            app.autocompletarProducto();
            app.onchanged();
            app.onclick();
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
            $("#imprimirFactura").submit();
        };

        app.comboTiposFacturas = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=TipoFactura";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    var html = "";
                    $("#tipoF").html(html);
                    html += '<select class="list-group-item" id="combo_tipoF" name="combo_tipoF">';
                    $.each(datos, function (clave, tiposFactura) {
                        html += '<option value="' + tiposFactura.id_tipoFactura + '">' + tiposFactura.tipo_tipoFactura + '</option>';
                    });
                    html += '</select>';
                    $("#tipoF").html(html);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        app.comboTiposCliente = function () {
            //alert("buscar tipos clientes");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=TipoCliente";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    var html = "";
                    $("#tipoC").html(html);
                    html += '<select class="list-group-item" id="combo_tipoC" name="combo_tipoC">';
                    $.each(datos, function (clave, tiposCliente) {
                        html += '<option value="' + tiposCliente.id_tipoCliente + '">' + tiposCliente.tipo_tipoCliente + '</option>';
                    });
                    html += '</select>';
                    $("#tipoC").html(html);
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
