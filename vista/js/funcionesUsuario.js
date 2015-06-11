$(function () {
    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {
            app.listarUsuarios();
            app.bindings();
        };

        app.bindings = function () {
            $("#agregarUsuario").on('click', function (event) {  //Evento para el Click del boton agregarUsuario
                app.limpiarModal();
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Usuario");
                $("#modalUsuario").modal({show: true});
            });

            $("#buscarUsuario").on('click', function (event) {  //Evento para el Click del boton agregarUsuario
                $("#tituloModalBuscar").html("Buscar Usuario");
                $("#modalBuscar").modal({show: true});
            });

            $("#imprimir").on('click', function (event) {  //Evento para el Click del boton agregarUsuario
                app.imprimir();
            });

            $("#cuerpoTablaUsuario").on('click', '.editar', function (event) {
                app.limpiarModal();
                $("#id").val($(this).attr("data-id_usuario"));
                $("#nombre").val($(this).parent().parent().children().first().html());
                //$("#lblClave").hide();
                $("#clave").prop('disabled', true);
                $("#nvlAcceso").val($(this).parent().parent().children().first().next().html());
                $("#tituloModal").html("Editar Usuario");
                $("#modalUsuario").modal({show: true});
            });

            $("#cuerpoTablaUsuario").on('click', '.eliminar', function () {
                app.eliminarUsuario($(this).attr("data-id_usuario"));
            });

            $("#cuerpoTablaUsuario").on('click', '.reset', function () {
                app.resetClaveUsuario($(this).attr("data-id_usuario"));
            });

            $("#guardar").on("click", function (event) {
                event.preventDefault();
                if ($("#id").val() == 0) {//Si el id es cero entonces se guarda una nueva usuario
                    app.guardarUsuario();
                } else {//Si el id es distinto de cero entonces se modifica una usuario
                    app.modificarUsuario();
                }
            });

            $("#btnBuscar").on("click", function (event) {
                event.preventDefault();
                app.buscar();
            });

            $("#formUsuario").bootstrapValidator({
                excluded: [],
            });
        };

        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = "../../";
            }
        };

        app.buscar = function () {
            //alert("entre en buscar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&formulario=Usuario";
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
                }
            });
        };

        app.imprimir = function () {
            var aux = $("#tablaUsuario").html();
            aux = aux.replace("<th>acciones</th>", "");
            var inicio = aux.indexOf("<td><a class", 0);
            while (inicio > 0) {
                var fin = aux.indexOf("</td>", inicio) + 5;
                var strBorrar = aux.substring(inicio, fin);
                aux = aux.replace(strBorrar, "");
                inicio = aux.indexOf("<td><a class", 0);
            }
            $("#html").val('<table border="1">' + aux + '</table>');
            $("#imprimirUsuario").submit();
        };

        app.guardarUsuario = function () {
            //alert("entre en agregar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=Usuario";
            var datosEnviar = $("#formUsuario").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    $("#modalUsuario").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function (datos) {
                   alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.modificarUsuario = function () {
            //alert("entre en modificar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=modificar&formulario=Usuario";
            var datosEnviar = $("#formUsuario").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    $("#modalUsuario").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.listarUsuarios = function () {
            //alert("Entre en buscarPersonas");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=Usuario";
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

        app.eliminarUsuario = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&formulario=Usuario";
            var datosEnviar = {id: id};
            $.ajax({
                url: url,
                method: "POST",
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

        app.resetClaveUsuario = function (id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=reset&formulario=Usuario";
            var datosEnviar = {id: id};
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function (datos) {
                    app.acciones(datos);
                    alert("La Clave ha sido reiniciada\nSu nueva clave es: 12345678");
                },
                error: function (datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };

        app.rellenarTabla = function (data) {
            //alert("Entre en rellenar tabla");
            var html = "";
            $.each(data, function (clave, usuario) {
                html += '<tr>' +
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.nivelAcceso_usuario + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-left eliminar" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '<a class="pull-left reset" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-refresh"></span>Reset Clave</a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaUsuario").html(html);
        };

        app.actualizarTabla = function (usuario, id) {
            if (id == 0) { //ES guardar una usuario nueva
                var html = '<tr>' +
                        '<td>' + usuario.nombre_usuario + '</td>' +
                        '<td>' + usuario.nivelAcceso_usuario + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-left eliminar" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '<a class="pull-left reset" data-id_usuario="' + usuario.id_usuario + '"><span class="glyphicon glyphicon-refresh"></span>Reset Clave</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaUsuario").append(html);

            } else {    //Es Modificar una usuario existente
                //busco la fila
                var fila = $("#cuerpoTablaUsuario").find("a[data-id_usuario='" + id + "']").parent().parent();
                var html = '<td>' + $("#nombre").val() + '</td>' +
                        '<td>' + $("#nvlAcceso").val() + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_usuario="' + id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-left eliminar" data-id_usuario="' + id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '<a class="pull-left reset" data-id_usuario="' + id + '"><span class="glyphicon glyphicon-refresh"></span>Reset Clave</a>' +
                        '</td>';
                fila.html(html);
            }
        };

        app.borrarFila = function (id) {
            var fila = $("#cuerpoTablaUsuario").find("a[data-id_usuario='" + id + "']").parent().parent().remove();
        };

        app.limpiarModal = function () {
            //validator.reset();
            //$("#id").val(0);
            //$("#nombre").val('');
            //$("#lblClave").show();
            //$("#clave").show();
            //$("#clave").val('');
            //$("#nvlAcceso").val('');
        };

        app.init();

    })(TallerAvanzada);


});
