$(function() {

    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            app.buscarTiposFactura();
            app.bindings();
        };
        
        app.bindings = function() {

            $("#agregarTipo").on('click', function(event) {   //Evento onclick boton
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Tipo");
                $("#modalTiposFactura").modal({show: true});
            });

            $("#cuerpoTablaTiposFactura").on('click', '.editar', function(event) {
                $("#id").val($(this).attr("data-id_tipo"));
                $("#tipo").val($(this).parent().parent().children().first().html());
                $("#tituloModal").html("Editando Tipo de Factura");
                $("#modalTiposFactura").modal({show: true});
            });

            $("#cuerpoTablaTiposFactura").on('click', '.eliminar', function() {
                var nombre = $(this).parent().parent().children().first().html();
                var confirmar = confirm("El tipo de factura \"" + nombre + "\" será eliminado.");
                if (confirmar)
                    app.eliminarTipoFactura($(this).attr("data-id_tipo"));
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                app.guardarTipoFactura();
                //app.validarGuardado();
            });

            $("#formFactura").bootstrapValidator({
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
            var aux = $("#miTablaTiposFactura").html();
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

        app.buscarTiposFactura = function() {

            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&formulario=TipoFactura";
            
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
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=TipoFactura";
            var datosEnviados = $("#formTiposFactura").serialize();
            
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'text',
                data: datosEnviados,
                success: function(datos) {
                    app.acciones(datos);
                    //app.guardarTipoFactura();
                    alert(datos);
                },
                error: function(datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.guardarTipoFactura = function() {
            var url;
            if ($("#id").val() == 0)
                url = "../../controlador/ruteador/Ruteador.php?accion=agregar&formulario=TipoFactura";
            else
                url = "../../controlador/ruteador/Ruteador.php?accion=modificar&formulario=TipoFactura";
            //data del formulario factura
            
            var datosEnviados = $("#formTiposFactura").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviados,
                success: function(datos) {
                    app.acciones(datos);
                    $("#modalTiposFactura").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function(datos) {
                    alert(datos.responseText);
                    console.log(datos);
                }
            });
        };
        
        app.eliminarTipoFactura = function(id) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&formulario=TipoFactura";
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
                        '<td>' + tipo.tipo_tipoFactura + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + tipo.id_tipoFactura + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + tipo.id_tipoFactura + '"><span class="glyphicon glyphicon-remove">Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });

            $("#cuerpoTablaTiposFactura").html(lineaHtml);
        };
        
        app.actualizarTabla = function(tipo, id) {
            if (id == 0) {
                var html = '<tr>' +
                        '<td>' + tipo.tipo_tipoFactura + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + tipo.id_tipoFactura + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + tipo.id_tipoFactura + '"><span class="glyphicon glyphicon-remove">Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaTiposFactura").append(html);
                
            } else {
                //Cuando se MODIFICA....
                //busco la fila
                var fila = $("#cuerpoTablaTiposFactura").find("a[data-id_tipo='" + $("#id").val() + "']").parent().parent();
                var html = '<td>' + $("#tipo").val() + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_tipo="' + $("#id").val() + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_tipo="' + $("#id").val() + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(html);
            }
        };
        
        app.borrarFila = function(id) {
            var fila = $("#cuerpoTablaTiposFactura").find("a[data-id_tipo='" + id + "']").parent().parent().remove();
        };

        app.init();

    })(TallerAvanzada);

});
