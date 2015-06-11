$(function() {

    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            app.buscarTiposCliente();
            app.bindings();
        };
        
        app.bindings = function() {

            $("#agregarTipo").on('click', function(event) {   //Evento onclick boton
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Tipo");
                $("#modalTiposCliente").modal({show: true});
            });

            $("#cuerpoTablaTiposCliente").on('click', '.editar', function(event) {
                $("#id").val($(this).attr("data-id_tipo"));
                $("#tipo").val($(this).parent().parent().children().first().html());
                $("#tituloModal").html("Editando Tipo de Cliente");
                $("#modalTiposCliente").modal({show: true});
            });

            $("#cuerpoTablaTiposCliente").on('click', '.eliminar', function() {
                var nombre = $(this).parent().parent().children().first().html();
                var confirmar = confirm("El tipo de cliente \"" + nombre + "\" será eliminado.");
                if (confirmar)
                    app.eliminarTipoCliente($(this).attr("data-id_tipo"));
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                app.guardarTipoCliente();
                //app.validarGuardado();
            });

            $("#formCliente").bootstrapValidator({
                excluded: [],
            });
            
            $("#imprimir").on('click', function(event) {   //Evento onclick boton
                app.imprimir();
            });
        };
        
        app.acciones = function (datos) {
            if (datos == 1) {
                window.location = "../../";
            }
        };
        
        app.imprimir = function (){
            var aux = $("#miTablaTiposCliente").html();
            aux = aux.replace("<th>Acciones</th>", "");
            var inicio = aux.indexOf("<td><a class", 0);
            while (inicio > 0) {
                var fin = aux.indexOf("</td>", inicio) + 5;
                var strBorrar = aux.substring(inicio, fin);
                aux = aux.replace(strBorrar, "");
                inicio = aux.indexOf("<td><a class", 0);
            }
            $("#html").val('<table border="1">' + aux + '</table>');
            $("#imprimirTipo").submit();
        };

        app.buscarTiposCliente = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=TipoCliente";
            
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    app.acciones(datos);
                    app.rellenarTabla(datos);
                },
                error: function(datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }

            });
        };
        
        app.validarGuardado = function(){
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=TipoCliente";
            var datosEnviados = $("#formTiposCliente").serialize();
            
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'text',
                data: datosEnviados,
                success: function(datos) {
                    app.acciones(datos);
                    //app.guardarTipoCliente();
                    alert(datos);
                },
                error: function(datos) {
                   alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.guardarTipoCliente = function() {
            var url;
            if ($("#id").val() == 0)
                url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=TipoCliente";
            else
                url = "../../controlador/ruteador/Ruteador.php?accion=modificar&formulario=TipoCliente";
            //data del formulario cliente
            
            var datosEnviados = $("#formTiposCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviados,
                success: function(datos) {
                    app.acciones(datos);
                    $("#modalTiposCliente").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function(datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.eliminarTipoCliente = function(id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&formulario=TipoCliente";
            var datosEnviar = {id: id};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function(datos) {
                    app.acciones(datos);
                    app.borrarFila(id);
                },
                error: function(datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.rellenarTabla = function(data) {

            var lineaHtml = "";

            $.each(data, function(clave, tipo) {
                lineaHtml+= '<tr>' +
                        '<td>' + tipo.tipo_tipoCliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + tipo.id_tipoCliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + tipo.id_tipoCliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });

            $("#cuerpoTablaTiposCliente").html(lineaHtml);
        };
        
        app.actualizarTabla = function(tipo, id) {
            if (id == 0) {
                var html = '<tr>' +
                        '<td>' + tipo.tipo_tipoCliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + tipo.id_tipoCliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + tipo.id_tipoCliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaTiposCliente").append(html);
                
            } else {
                //Cuando se MODIFICA....
                //busco la fila
                var fila = $("#cuerpoTablaTiposCliente").find("a[data-id_tipo='" + $("#id").val() + "']").parent().parent();
                var html = '<td>' + $("#tipo").val() + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + $("#id").val() + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + $("#id").val() + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(html);
            }
        };
        
        app.borrarFila = function(id) {
            var fila = $("#cuerpoTablaTiposCliente").find("a[data-id_tipo='" + id + "']").parent().parent().remove();
        };

        app.init();

    })(TallerAvanzada);

});
