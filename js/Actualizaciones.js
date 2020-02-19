$(document).ready(()=>{
    //esto es par la dirreccion url
    let ip = '172.27.9.9' 
    let endpoint
    let id
    let nombre 
    let apat
    let amat
    let ci
    let tel
    let email
    let registro
    let fechanaci
    
    //------
    //para obtner mis roles
    let rl = ()=>{
        endpoint = 'ObtenerRol'
    $.ajax({
        url: `http://${ip}:3001/api/${endpoint}`,
        contentType: 'application/json',
        success: (response)=>{
            rl = response.data.map((x)=>{
                return `<option value='${x.idrol}'>${x.tipo}</option>`
            })
           $('#Rol').append(rl)
        }

    }).fail(function(){
        alert('error Con e servidor')
    })
    }

    rl()
  //-----------------------------

  $('select').on('change', function() {
    $('#nombre').val('')
    $('#apat').val('')
    $('#amat').val('')
    $('#ci').val('')
    $('#tel').val('')
    $('#email').val('')
    $('#registro').val('')
    $('#fechanaci').val('')
    $('#img').attr("src",'')
    foto = ''
    id = null
     let valor = parseInt(this.value)
     if(valor === 6){
        $('#ex2').css("display","none ")
         tipoAdulto()
         $('#f').css("display","block")
         $('#r').css("display","none")
         $('#ex').css("display","none")
         $('#ex2').css("display","block ")
     }else{ 
        $('#ex').css("display","none ")
        tipo()
        $('#f').css("display","none")
        $('#r').css("display","block")
        $('#ex2').css("display","none")
        $('#ex').css("display","block ")
     }
  })

  let tipo = () => {

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
            "url": `http://${ip}:3001/api/ObtenerPersonaPorRol/` + $('#Rol').val(),
            "type": "GET"

        },
        "columns": [{
                "data": "foto",
                "mRender": function(data, type, full) {
                    return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                }
            }, {
               
                "data": "nombre"
                }, 
                
            {
                "data": "apat" 
            },
            {
                "data": "amat" 
            },
            {
                "data": "ci" 
            },
            {
                "data": "tel" 
            },
            {
                "data": "email" 
            },
             {
                 "data": "registro" 
             },
              {
                 "data": "idper",
                "targets": [8],
                 "visible": false,
                 'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('id', 'otherID');
                     $(td).attr('style', 'display:none');
                 }

             },
        ]
    }).columns.adjust().responsive.recalc()

}

//-------------------------------------------------------
let tipoAdulto = () => {

    return $('#example2').DataTable({
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
            "url": `http://${ip}:3001/api/ObtenerPersonaPorAdulto`,
            "type": "GET"

        },
        "columns": [{
                "data": "foto",
                "mRender": function(data, type, full) {
                    return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                }
            }, {
               
                "data": "nombre"
                }, 
                
            {
                "data": "apat" 
            },
            {
                "data": "amat" 
            },
            {
                "data": "ci" 
            },
            {
                "data": "tel" 
            },
            {
                "data": "email" 
            },
             {
                 "data": "fechanaci" ,
                 "mRender": function(data, type, full) {
                    return data
                }
             },
              {
                 "data": "idper",
                "targets": [8],
                 "visible": false,
                 'createdCell': function(td, cellData, rowData, row, col) {
                    $(td).attr('id', 'otherID');
                     $(td).attr('style', 'display:none');
                 }

             },
        ]
    }).columns.adjust().responsive.recalc()

}
        
//-------------------------------------------------------
$('#example').on('click','.odd', function(){
    let arr = $('#example').dataTable().fnGetData($(this))
    console.log(arr)
    $('#nombre').val(arr.nombre)
    $('#apat').val(arr.apat)
    $('#amat').val(arr.amat)
    $('#ci').val(arr.ci)
    $('#tel').val(arr.tel)
    $('#email').val(arr.email)
    $('#registro').val(arr.registro)
    $('#img').attr("src",arr.foto)
    foto = arr.foto  
    id = arr.idper
    registro = arr.registro
})
//---------------------------------------------------------
$('#example').on('click','.even', function(){

    let arr = $('#example').dataTable().fnGetData($(this))
    console.log(arr)
    $('#nombre').val(arr.nombre)
    $('#apat').val(arr.apat)
    $('#amat').val(arr.amat)
    $('#ci').val(arr.ci)
    $('#tel').val(arr.tel)
    $('#email').val(arr.email)
    $('#registro').val(arr.registro)
    $('#img').attr("src",arr.foto)
    foto = arr.foto
    id = arr.idper 
    registro = arr.registro 
    
})
//---------------------------------------------------------
$('#example2').on('click','.odd', function(){
    let arr = $('#example2').dataTable().fnGetData($(this))
    console.log(arr)
    $('#nombre').val(arr.nombre)
    $('#apat').val(arr.apat)
    $('#amat').val(arr.amat)
    $('#ci').val(arr.ci)
    $('#tel').val(arr.tel)
    $('#email').val(arr.email)
    $('#fechanaci').val(arr.fechanaci.substring(0,10))
    $('#img').attr("src",arr.foto)  
    foto = arr.foto 
    id = arr.idper 
    fechanaci = arr.fechanaci.substring(0,10)
})
//----------------------------------------------------------
$('#example2').on('click','.even', function(){
    let arr = $('#example2').dataTable().fnGetData($(this))
    console.log(arr)
    $('#nombre').val(arr.nombre)
    $('#apat').val(arr.apat)
    $('#amat').val(arr.amat)
    $('#ci').val(arr.ci)
    $('#tel').val(arr.tel)
    $('#email').val(arr.email)
    $('#fechanaci').val(arr.fechanaci.substring(0,10))
    $('#img').attr("src",arr.foto) 
    foto = arr.foto   
    id = arr.idper
    fechanaci = arr.fechanaci.substring(0,10)
})

//---metodo para actualizar la persona
    let actPer = (idper)=>{
        let data = {}
        data.nombre = $('#nombre').val(),
        data.apat = $('#apat').val() ,
        data.amat =   $('#amat').val(),
        data.ci =  $('#ci').val(),
        data.tel = $('#tel').val(),
        data.email = $('#email').val(),
        data.foto = foto
        let json = JSON.stringify(data)
        // alert(json)
        $.ajax({
            url: `http://${ip}:3001/api/updatePersona/${idper}`,
            method: 'PUT',
            contentType: 'application/json',
            data: json,
            success: (response)=>{
                let val = parseInt($('#Rol').val())
                if(val !== 6 ){
                    if(registro !== $('#registro').val()){
                        alert('Actualizado correctamente')
                        actv(idper)
                    }
                    else{
                        alert('Actualizado correctamente')
                        $('#example').DataTable().ajax.reload()
                    }
                }else{
                    if(fechanaci !== $('#fechanaci').val()){
                        alert('Actualizado correctamente')
                        acta(idper)
                    }
                    else{
                        alert('Actualizado correctamente')
                        $('#example2').DataTable().ajax.reload()
                    }
                }
                
                
                // $('#example').DataTable().ajax.reload()
                // $('#example2').DataTable().ajax.reload()
                console.log(response)
            }
        }).fail(function(){
            alert('fallo al Actualizar')
        })
    }
//-------------------------------------
  let actv = (idper)=>{
    let data = {}
    data.registro = $('#registro').val()
    let json = JSON.stringify(data)
    $.ajax({
        url: `http://${ip}:3001/api/updateVoluntario/${idper}`,
        method: 'PUT',
        contentType: 'application/json',
        data: json,
        success: (response)=>{
             $('#example').DataTable().ajax.reload()
        }
    }).fail(function(){
        alert('fallo al Actualizar voluntario')
    })
  }
//-------------------------------------
let acta = (idper)=>{
    let data = {}
    data.fechanaci = $('#fechanaci').val()
    let json = JSON.stringify(data)
    
    $.ajax({
        url: `http://${ip}:3001/api/updateAdulto/${idper}`,
        method: 'PUT',
        contentType: 'application/json',
        data: json,
        success: (response)=>{
             $('#example2').DataTable().ajax.reload()
        }
    }).fail(function(){
        alert('fallo al Actualizar adulto')
    })
  }
//-------------------------------------

$('#actualizar').click(()=>{
   actPer(id)
  
})

})

let foto
function readFile() {
    if (this.files && this.files[0]) {

        let FR = new FileReader()

        FR.addEventListener("load", function(e) {
            document.getElementById("img").src = e.target.result
            foto = e.target.result
            console.log(foto)
        })

        FR.readAsDataURL(this.files[0]);
    }

    document.getElementById("inp").addEventListener("change", readFile)
}