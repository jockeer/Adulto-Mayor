
$(document).ready(()=>{
//para obtener la fecha y hora del sistema
let ip = '172.27.9.9'
let fecha
$.ajax({
    url: `http://${ip}:3001/api/ObtenerFechaDelSistema`,
    contentType: 'application/json',
    success: function(response) {
            response.data.map((x)=>fecha = x.fecha)
            fecha = fecha.substring(0,10)
    }   
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!! Problemas con el servidor o con la conexion');
})
//----------aqui termina   
// Para obtener la posicion----
let posicion
let p =()=>{
    $.ajax({
        url: `http://${ip}:3001/api/ObtenerUltimaPosicion`,
        contentType: 'application/json',
        success: function(response) {
                response.data.map((x)=>posicion = x.idper) 
                console.log(posicion)       
        }   
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!! Problemas con el servidor o con la conexion')
    }) 
}
p()


//-----------------------------
//esto es para obtener todos mis roles-----------
$.ajax({
    url: `http://${ip}:3001/api/ObtenerRol`,
    contentType: 'application/json',
    success: function(response) {
            let agrol = response.data.map((x)=>{
                return `<option value="${x.idrol}">${x.tipo}</option>` 
            })
            $('#rol').append(agrol)
    }
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!! Problemas con el servidor o con la conexion ' + errorThrown)
})

//aqui termina-------------------------------------------
//esto es para obtener todos mis TiposDeVoluntario-----------
$.ajax({
    url: `http://${ip}:3001/api/ObteneTipoVoluntario`,
    contentType: 'application/json',
    success: function(response) {
            let AgVoluntario = response.data.map((x)=>{
                return `<option value="${x.idtipo}">${x.tnombre}</option>` 
            })
            $('#Voluntario').append(AgVoluntario)
          
    }
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!! Problemas con el servidor o con la conexion');
})

//aqui termina-------------------------------------------
//aqui el metodo ajax para guardar los datos--------------

let AgPer = ()=>{
    p()
    let data = {}
    data.nombre = $('#nombre').val().toUpperCase()
    data.apat = $('#paterno').val().toUpperCase()
    data.amat = $("#materno").val().toUpperCase()
    data.ci = $("#ci").val()
    data.tel = $("#telefono").val()
    data.email = $("#email").val()
    data.estado = "T"
    data.fecha = fecha
    data.idrol = $("#rol").val()
    data.foto = foto
    let json = JSON.stringify(data); 
    $.ajax({
    url: `http://${ip}:3001/api/InsertPersona`,
    method: 'POST',
    contentType: 'application/json',
    data: json,
    success: function(response) {  
     $('#nombre').val('')
     $('#paterno').val('')
     $('#materno').val('')
     $('#ci').val('')
     $('#telefono').val('')
     $('#email').val('')
     $('#rol').val('')
     $('#img').attr('src', '')
    if (tipo == 1) {
     setTimeout(() => {
        AgVol();
     }, 250)
     } else {
    setTimeout(() => {
        AgAdul()
        }, 250)
    }
     
    }
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error Problemas Al insertar Persona');
})
}

//-----aqui termina
//---------para insertar adulto

let AgAdul = ()=>{
    let data = {}
    data.fechanaci = $('#nacimientoA').val()
    data.aga = 'T'
    data.idper = posicion + 1
    let json = JSON.stringify(data)
    console.log(json)
    $.ajax({
    url: `http://${ip}:3001/api/InsertAdulto`,
    method: 'POST',
    contentType: 'application/json',
    data: json,
    success: function(response) {  
        alert('exito Adulto ingresado')
         $('#nacimientoA').val('1920-01-01')
    }
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error Problemas Al insertar Adulto');
})
}
//-------aqui termina-------------------------------------
//metodo para agregar voluntarios
let AgVol = ()=>{
     let data = {}
     data.registro = $('#registroV').val()
     data.idtipo = $('#Voluntario').val()
     data.agv = 'T'
     data.idper = posicion + 1;
     var json = JSON.stringify(data);
     console.log(json)
    $.ajax({
    url: `http://${ip}:3001/api/InsertVoluntario`,
    method: 'POST',
    contentType: 'application/json',
    data: json,
    success: function(response) {  
        alert('exito Voluntario ingresado')
        $('#registroV').val('')
        $('#Voluntario').val('')
    }
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error Problemas Al insertar Voluntario');
})
}

$('#GuardarP').click((e)=>{
    e.preventDefault()
    AgPer()
   

})
//aqui termina--------------------------------------------
//aqui para validar si es Adulto o es Voluntario
$("#tipo").change(() => {
    tipo = $("#tipo").val();

    if (tipo == 1){
        $("#registro").css("display", "block")
        $("#Voluntario1").css("display", "block")
        
    }  
    else{
        $("#registro").css("display", "none")
        $("#Voluntario1").css("display", "none")
    }
    if (tipo == 2)
        $("#nacimiento").css("display", "block")
    else
        $("#nacimiento").css("display", "none")
    

});
//aqui termina
//-------------------------------------
})

//esto es para la foto----------------------------
let foto
function readFile() {
    if (this.files && this.files[0]) {

        let FR = new FileReader()

        FR.addEventListener("load", function(e) {
            document.getElementById("img").src = e.target.result
            foto = e.target.result
        })

        FR.readAsDataURL(this.files[0]);
    }

    document.getElementById("inp").addEventListener("change", readFile)
}
//------------------------------------------------