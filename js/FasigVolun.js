$(document).ready(()=>{
    //-----------------------------
    //-array json
        let ip = '172.27.9.9'
        let rowEl = []
        let control = 0
        let datos = {}
        datos.array = new Array()
        let idAdulto
        let fAdulto
        let nAdulto
        let idVoluntario
        let fVoluntario
        let nVoluntario
        let filas
        let filas2
        let filas3
        let filas4
        
    //--------
    //esto es para obtener todos mis laboratorio ----
    let lab
    $.ajax({
        url: `http://${ip}:3001/api/ObtenerLab`,
        contentType: 'application/json',
        success: function(response) {
                lab = response.data.map((x)=>{
                    return `<option value='${x.idlab}'>${x.nombre}</option>`
                })
                $('#Aula').append(lab)
        }   
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!! Problemas con el servidor o con la conexion');
    })
     //aqui termina -------------------------------------------------------

    //funcion para llenar los datos de la tabla DataTable
    let tabla = () => {
     
        return $('#example1').DataTable({
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            "destroy": true,
            "searching": true,

            "processing": true,
            "serverSide": false,
            "ajax": {
                "url": `http://${ip}:3001/api/ObtenerAdulto/F/${ $('#Aula').val()}/T`,
                "type": "GET"

            },
            "columns": [{
                    "data": "foto",
                    "mRender": function(data, type, full) {
                        return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                    }
                }, {
                    "mRender": function(data, type, full) {
                        return '<button type="button" class="btn btn-default"  data-toggle="modal" data-target="#compromisos"  style="width:70px; height:25px">Voluntario';
                    }
                    
                }, {
                    "data": "nombre"
                   
                }, {
                    "data": "idper",
                    "targets": [3],
                    "visible": false,
                    'createdCell': function(td, cellData, rowData, row, col) {
                        $(td).attr('id', 'otherID');
                        $(td).attr('style', 'display:none');
                    }

                },
                {
                    "data": "ci"
                }

            ]
        }).columns.adjust().responsive.recalc();
       
    }

    //aqui termina -------------------------------------------------------
    //----al dar click en buscar
    $('#BuscarA').click(()=>{
       tabla()
	control = 0
       mdl()
    })
    //aqui termina ---------------------
    //para abrir el modal-------------
    
    let mdl = ()=>{
      
        $("#compromisos").on('shown.bs.modal',  ()=> {
       if(control ===0){
        // var data1= [{"number": "1","count": "12","percent": "13",}];
       $("#compromiso_ejecutivo").DataTable({
           
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "destroy": true,
        "searching": true,

        "processing": true,
        "serverSide": false,
        "ajax": {
            "url": `http://${ip}:3001/api/ObtenerVoluntario/F/${ $('#Aula').val()}/T`,
            "type": "GET"

        },
        "columns": [{
                "data": "foto",
                "mRender": function(data, type, full) {
                    return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                }
            }, {
                "mRender": function(data, type, full) {
                    return '<button type="button" class="btn btn-default" id="cerrar" style="width:70px; height:25px">Seleccionar';
                }
               
            }, {
                "data": "nombre"
               
            }, {
                "data": "idper",
                "targets": [3],
                "visible": false,
                'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('id', 'otherID');
                    $(td).attr('style', 'display:none');
                }

            },
            {
                "data": "ci"
            }

        ]
                       
       }).columns.adjust().responsive.recalc();
        $("#compromiso_ejecutivo").css("visibility","visible")
        control++
    }
   })
}
    //-------------------------------
    // para recuperar id por clase odd

    $('#example1').on('click', '.odd' ,function(e) {
        //rowEl.push($(this).closest('tr'))
        filas = $(this).closest('tr')
        console.log(filas)
        // filas3 = $(this).closest('td.child')
        // console.log(filas3)
        let arr = $('#example1').dataTable().fnGetData($(this))
        console.log(arr)
         idAdulto = arr.idper
         fAdulto = arr.foto
         nAdulto = arr.nombre
         mdl()
        
    })
//----------------------------------------

    // para recuperar id por clase even

    $('#example1').on('click', '.even' ,function(e) {
        // rowEl.push($(this).closest('tr'))
         filas = $(this).closest('tr')
        console.log(filas)
        filas3 = $(this).closest('tr')
        let arr = $('#example1').dataTable().fnGetData($(this));
         idAdulto = arr.idper
         fAdulto = arr.foto
         nAdulto = arr.nombre
         mdl()
        
    })
//----------------------------------------

    //----------------------------
    $('#compromiso_ejecutivo').on('click', '.odd', function(e) {
        // rowEl.push($(this).closest('tr'))
         filas2 = $(this).closest('tr')
        console.log(filas2)
        filas4 = $(this).closest('tr.child')
        let arr2 = $('#compromiso_ejecutivo').dataTable().fnGetData($(this))
        // console.log(arr2)
        idVoluntario = arr2.idper
        fVoluntario = arr2.foto
        nVoluntario = arr2.nombre 
        // console.log(`${idVoluntario} ${nVoluntario} ${fVoluntario}`)
       
    })
    //----------------------------
    $('#compromiso_ejecutivo').on('click', '.even', function(e) {
        // rowEl.push($(this).closest('tr'))

         filas2 = $(this).closest('tr')
        console.log(filas2)
        filas4 = $(this).closest('tr.child')
        let arr2 = $('#compromiso_ejecutivo').dataTable().fnGetData($(this))
        // console.log(arr2)
        idVoluntario = arr2.idper
        fVoluntario = arr2.foto
        nVoluntario = arr2.nombre 
        // console.log(`${idVoluntario} ${nVoluntario} ${fVoluntario}`)
        
    })

    // $('.odd').on('click', '.child', function(e) {
    //     // rowEl.push($(this).closest('tr'))
    //     filas3 = $(this).closest('tr')
    //     console.log($(this).closest('tr'))
     
    // })
    // $('#example1').on('click', '.child', function(e) {
    //     // rowEl.push($(this).closest('tr'))
    //     filas4 = $(this).closest('tr')
    //     console.log($(this).closest('tr'))
     
    // })

    //----------------------------

   
    $('#compromiso_ejecutivo').on('dblclick', '#cerrar', function(e) {
        if(filas3 != undefined){
            rowEl.push(filas3)
        }
        if(filas4 != undefined){
            rowEl.push(filas4)
        }

        rowEl.push(filas)
        rowEl.push(filas2)
        // rowEl.push(filas3)
        rowEl.forEach((x)=>{
            x.css("display", "none")
        })
             datos.array.push({
                "idperA": idAdulto,
                "nombreA": nAdulto,
                "fotoA": fAdulto,
                "idperV": idVoluntario,
                "nombreV": nVoluntario,
                "fotoV": fVoluntario
             })
         console.log(datos.array)
        $("#compromisos").modal("hide")
        $("#agrupamiento").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            
                "destroy": true,
                "Processing": true,
                "aaData":  datos.array ,
                "aoColumns": [
                            { "mDataProp": "fotoA",
                            "mRender": function(data, type, full) {
                                return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                            }
                            },
                            { "mDataProp": "nombreA" },
                            { "mDataProp": "fotoV",
                            "mRender": function(data, type, full) {
                                return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                            }
                             },
                            { "mDataProp": "nombreV" }
                        ]
        }).columns.adjust().responsive.recalc();
         $('#agrupamiento_wrapper').css('visibility','visible')
         $('#agrupamiento').css('visibility','visible')
         $('#GuardarAg').css('visibility','visible')
    
    
    })
//----------------------------------------
    $('#GuardarAg').click(()=>{
        datos.array.forEach(function(item){
            asig(item.idperV,item.idperA)
        })
        control = 0
        alert('Exito Guardado Correctamente')
        datos.array.splice(0, datos.array.length);
        // console.log(data.array.length)
        $('#agrupamiento_wrapper').css('visibility','hidden')
        $('#agrupamiento').css('visibility','hidden')
        $('#GuardarAg').css('visibility','hidden')
       
    })
//-------------------------------------------
//--metodo para guardar la asignacionAdulto
    let asig = (voluntario,adulto)=>{
        // estado,idperv,idpera
        let data = {}
        data.estado = 'T',
        data.idperv = voluntario,
        data.idpera = adulto
        let json = JSON.stringify(data)
        $.ajax({
            url: `http://${ip}:3001/api/InsertAgrupamineto`,
            method: 'POST',
            contentType: 'application/json',
            data: json,
            success: (response)=>{
                console.log('exito guardado correctamente')
                alert(exito)
            }
        }).fail(function(jqXHR,textStatus,errorThrown){
            alert('error al insertar la asignacion')
        })
    }
//-------------------------------------------


})