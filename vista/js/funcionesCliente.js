$(function () {

    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {
            app.buscarClientes();
            app.bindings();
        };

        app.bindings = function () {

            $("#agregarCliente").on('click', function (event) {   //Evento onclick boton
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                app.selectProvincia();
                app.selectTipo();
            });

            $("#cuerpoTablaCliente").on('click', '.editar', function (event) {

                $("#id").val($(this).attr("data-id_cliente"));
                $("#cuilCliente").val($(this).parent().parent().children().first().html());
                $("#nombreCliente").val($(this).parent().parent().children().first().next().html());
                $("#telefono").val($(this).parent().parent().children().first().next().next().html());
                $("#direccion").val($(this).parent().parent().children().first().next().next().next().html());
                var provincia = $(this).parent().parent().children().first().next().next().next().next().html();
                var tipo = $(this).parent().parent().children().first().next().next().next().next().next().html();
                app.selectProvincia(provincia);
                app.selectTipo(tipo);

                $("#tituloModal").html("Editando Cliente");
                $("#modalCliente").modal({show: true});
            });

            $("#cuerpoTablaCliente").on('click', '.eliminar', function () {
                var nombre = $(this).parent().parent().children().first().next().html();
                var confirmar = confirm("El cliente " + nombre + " será eliminado.");
                if (confirmar)
                    app.eliminarCliente($(this).attr("data-id_cliente"));
            });

            $("#btnBuscar").on("click", function (event) {
                event.preventDefault();
                app.buscarCliente()();
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                app.guardarCliente();
            });

            $("#formCliente").bootstrapValidator({
                excluded: [],
            });

            $("#imprimir").on('click', function (event) {   //Evento onclick boton
                app.imprimir();
            });
        };

        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = "../../";
            }
        };

        app.buscarCliente = function () {
            //alert("Entre en buscar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&formulario=Cliente";
            var datosEnviar = {criterio: $("#criterioBusqueda").val(), valor: $("#valorBusqueda").val()};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.rellenarTabla(datos);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                    app.buscarClientes();
                }

            });
        };

        app.selectTipo = function (tipoCargado) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=TipoCliente";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    $('#tipos').empty();
                    $.each(datos, function (clave, tipo) {
                        if (clave == 0)
                            $('#tipos').append('<option value=' + clave + ' >Selecciona un tipo</option>');
                        clave++;
                        if (tipo.tipo_tipoCliente == tipoCargado)
                            $('#tipos').append('<option selected value=' + clave + ' >' + tipo.tipo_tipoCliente + '</option>');
                        else
                            $('#tipos').append('<option value=' + clave + ' >' + tipo.tipo_tipoCliente + '</option>');
                    });
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.imprimir = function () {
            var aux = $("#miTablaCliente").html();
            aux = aux.replace("<th>Acciones</th>", "");
            var inicio = aux.indexOf("<td><a class", 0);
            while (inicio > 0) {
                var fin = aux.indexOf("</td>", inicio) + 5;
                var strBorrar = aux.substring(inicio, fin);
                aux = aux.replace(strBorrar, "");
                inicio = aux.indexOf("<td><a class", 0);
            }
            $("#html").val('<table border="1">' + aux + '</table>');
            $("#imprimirCliente").submit();
        };

        app.buscarClientes = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Cliente";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    app.rellenarTabla(datos);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.guardarCliente = function () {
            var url;
            if ($("#id").val() == 0)
                url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=Cliente";
            else
                url = "../../controlador/ruteador/Ruteador.php?accion=modificar&formulario=Cliente";
            var datosEnviados = $("#formCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviados,
                success: function (datos) {
                    app.acciones(datos);
                    $("#modalCliente").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.eliminarCliente = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&formulario=Cliente";
            var datosEnviar = {id: id};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    app.borrarFila(id);
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.rellenarTabla = function (data) {

            var lineaHtml = "";

            $.each(data, function (clave, cliente) {
                lineaHtml += '<tr>' +
                        '<td>' + cliente.cuil_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.telefono_cliente + '</td>' +
                        '<td>' + cliente.direccion_cliente + '</td>' +
                        '<td>' + cliente.nombre_provincia + '</td>' +
                        '<td>' + cliente.tipo_tipoCliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });

            $("#cuerpoTablaCliente").html(lineaHtml);
        };

        app.actualizarTabla = function (cliente, id) {
            if (id == 0) {
                var html = '<tr>' +
                        '<td>' + cliente.cuil_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.telefono_cliente + '</td>' +
                        '<td>' + cliente.direccion_cliente + '</td>' +
                        '<td>' + cliente.nombre_provincia + '</td>' +
                        '<td>' + cliente.tipo_tipoCliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaCliente").append(html);

            } else {
                //CUando se MODIFICA....
                //busco la fila
                var fila = $("#cuerpoTablaCliente").find("a[data-id_cliente='" + $("#id").val() + "']").parent().parent();
                var html = '<td>' + $("#cuilCliente").val() + '</td>' +
                        '<td>' + $("#nombreCliente").val() + '</td>' +
                        '<td>' + $("#telefono").val() + '</td>' +
                        '<td>' + $("#direccion").val() + '</td>' +
                        '<td>' + $("#provincias").find(":selected").text() + '</td>' +
                        '<td>' + $("#tipos").find(":selected").text() + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + $("#id").val() + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + $("#id").val() + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(html);
            }
        };

        app.borrarFila = function (id) {
            var fila = $("#cuerpoTablaCliente").find("a[data-id_cliente='" + id + "']").parent().parent().remove();
        };

        app.selectProvincia = function (provinciaCargada) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Lugares";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    $('#provincias').empty();
                    $.each(datos, function (clave, provincia) {
                        if (clave == 0)
                            $('#provincias').append('<option value=' + clave + ' >Selecciona una provincia</option>');
                        clave++;
                        if (provinciaCargada == provincia.nombre_provincia)
                            $('#provincias').append('<option selected value=' + clave + ' >' + provincia.nombre_provincia + '</option>');
                        else
                            $('#provincias').append('<option value=' + clave + ' >' + provincia.nombre_provincia + '</option>');
                    });
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.selectDepartamento = function (provincia) {
            //alert("entre en departamento");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Lugares&lugar=departamento&provincia=" + provincia;

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    $('#departamentos').empty();
                    //console.log(JSON.stringify(data));
                    $.each(datos, function (clave, departamento) {
                        if (clave == 0)
                            $('#departamentos').append('<option value=' + clave + ' >Selecciona un departamento</option>');
                        clave++;
                        $('#departamentos').append('<option value=' + departamento.id_departamento + ' >' + departamento.nombre_departamento + '</option>');
                        //alert(provincia.nombre_provincia);
                    });
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };

        app.selectLocalidad = function (departamento, localidadCargada) {
            //alert("entre en localidade");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Lugares&lugar=localidad&departamento=" + departamento;

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datos) {
                    app.acciones(datos);
                    $('#localidades').empty();
                    //console.log(JSON.stringify(data));
                    $.each(datos, function (clave, localidad) {
                        if (clave == 0)
                            $('#localidades').append('<option value=' + clave + ' >Selecciona una localidad</option>');
                        if (localidad.nombre_localidad == localidadCargada)
                            $('#localidades').append('<option selected value=' + localidad.id_localidad + ' >' + localidad.nombre_localidad + '</option>');
                        else
                            $('#localidades').append('<option value=' + localidad.id_localidad + ' >' + localidad.nombre_localidad + '</option>');
                        //alert(localidad.nombre_localidad);
                    });
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
