let ip = '172.27.9.9'
$(document).ready(() => {
   
    //----------funcion para los reles
    let rol = () => {
            let users
            let url = `http://${ip}:3001/api/ObtenerRol`
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.onload = () => {
                users = JSON.parse(xhr.responseText);
                let datos = users.data.map((x) => {
                    if (x.idrol != 1 && x.idrol != 2)
                        return `<option value="${x.idrol}">${x.tipo}</option>`
                });

                $('#tipo').append(datos)
                if (xhr.readyState == 4 && xhr.status == "200") {


                } else {
                    console.error(users)

                }
            }

            xhr.send(null)

        }
        //ejecutamos la funcion rol
    rol()
    //--------------obtener persona por tipo y fecha
    let persona = () => {

            return $('#example').DataTable({
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
                    "url": `http://${ip}:3001/api/ObtenerPersonaPorTipo/${$("#tipo").val()}/${$("#fecha").val()}/T`,
                    "type": "GET"

                },
                "columns": [{
                        "data": "foto",
                        "mRender": function(data, type, full) {
                            return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                        }
                    }, {
                       
                        "mRender": function(data, type, full) {
                            return ' <select name="lab" id="Lab" class="tp">' +
                                ' <option value="" default selected>Seleccione el tipo</option>' +
                                '  ' + labs + ' ' +
                                ' </select>';
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
            });


        }
        //-------------------------------------------
    $("#Buscar").click(() => {

        datos.array.splice(0, datos.array.length)
        r.splice(0, r.length)

        console.log(persona())

    });
    //---------------------------------------------
    let datos = {}
    datos.array = new Array()
    let rowEl
    let r = []

    $('table').on('change', '.odd', function() {
        let a = 0
        r.push($(this).closest('tr'))
        rowEl = $(this).closest('tr')
        console.log(rowEl)
        let tipo = rowEl.find('#Lab').val()
        var arr = $('#example').dataTable().fnGetData($(this))

        // var Id = arr[3].text; //returns first td value 
        let id = arr.idper
        if (datos.array.length > 0) {
            datos.array.forEach(function(item) {
                if (item.idper == id) {
                    item.idlab = tipo
                    a++
                }
            });
            if (a == 0) {
                datos.array.push({
                    "idper": id,
                    "idlab": tipo,

                });
            }

        } else {
            datos.array.push({
                "idper": id,
                "idlab": tipo,

            });
        }
        console.log(datos)
    });
    //------------------------------segunda clase
    $('table').on('change', '.even', function() {
        let b = 0
        r.push($(this).closest('tr'))
        rowEl = $(this).closest('tr')
        console.log(rowEl)
        let tipo = rowEl.find('#Lab').val()
        var arr = $('#example').dataTable().fnGetData($(this))

        // var Id = arr[3].text; //returns first td value 
        let id = arr.idper
        if (datos.array.length > 0) {
            datos.array.forEach(function(item) {
                if (item.idper == id) {
                    item.idlab = tipo
                    b++
                }
            });
            if (b == 0) {
                datos.array.push({
                    "idper": id,
                    "idlab": tipo,

                });
            }

        } else {
            datos.array.push({
                "idper": id,
                "idlab": tipo,

            });
        }
        console.log(datos)
    });
    //--------------------------------------------
    $('table').on('click', '.child', function() {
        r.push($(this).closest('tr'))
        rowEl = $('#example').dataTable().fnGetData($(this))
        console.log(rowEl)
      
    })
    
    //-------------------------------------------
    //--------------btn guardar
    $('#Guardar').click(() => {
        
        let f = $("#fecha1").val()
        if (datos.array.length > 0) {
            for (let x = 0; x < datos.array.length; x++) {
                let d = datos.array[x]
                let idp = d.idper
                let idl = d.idlab
                inAsignacion(idl, idp, f)
            }
            alert("guardado correctamente")
            for (let y = 0; y < r.length; y++) {
                let z = r[y]
                z.remove()
            }

            datos.array.splice(0, datos.array.length);
            r.splice(0, r.length)
	  
        } else {
            alert("Porfavor Seleccione el aula")
        }
    })
    //-----------------------
    //---insertar asignacion
    let inAsignacion = (idlab, idper, fechafin) => {
            let url = `http://${ip}:3001/api/InsertAsignacion`
            let data = {}
            let instancia = new Date()
            let fec = instancia.getDate() + "-" + (instancia.getMonth() + 1) + "-" + instancia.getFullYear()
            // estado,fecini,fecfin,idlab,idper
            data.estado = "T"
            data.fecini = fec
            data.fecfin = fechafin
            data.idlab = idlab
            data.idper = idper
            let json = JSON.stringify(data)
            
            let xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.onload = function() {
                let users = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(users)
                   
                } else {
                    console.error(users)
                }
            }
            xhr.send(json)
        }
        //----------------------

      


});
let labs;
//-----obtener todos los laboratorios
let lab = () => {
    let url = `http://${ip}:3001/api/ObtenerLab`;
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function() {
        let users = JSON.parse(xhr.responseText);
        labs = users.data.map((x) => {
            return `<option value="${x.idlab}">${x.nombre}</option>`
        });

        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users)
        } else {
            console.error(users)
        }
    }
    xhr.send(null)

}
lab()
