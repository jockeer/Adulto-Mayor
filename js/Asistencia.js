$(document).ready(function () {

let ip = '172.27.9.9'
//para obtener la fecha y hora del sistema
let fecha
let hora
let syshora = ()=>{
$.ajax({
    url: `http://${ip}:3001/api/ObtenerFechaDelSistema`,
    contentType: 'application/json',
    success: function(response) {
            response.data.map((x)=>{
                fecha = x.fecha
                fecha = fecha.substring(0,10)
                hora = x.hora 
                hora = hora.substring(0,5)
            })
           
            
    }   
}).fail( function( jqXHR, textStatus, errorThrown ) {
    alert( 'Error!! Problemas con el servidor o con la conexion');
})
}
syshora()
//----------aqui termina  

//-----------------------------------------------------
    let ingreso = (idper)=>{
        syshora()
        let data = {}
        data.fecha = fecha,
        data.horaing = hora,
        data.horasal = hora,
        data.idper = idper
        let json = JSON.stringify(data)
       
        $.ajax({
            url: `http://${ip}:3001/api/InsertIngreso`,
            method: 'POST',
            contentType: 'application/json',
            data: json,
            success: function(response) {
                console.log(response);
              
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas al ingresar hora');
        })
    }
//-------------------------------------------------------------------------------
let ingresoAdulto = (idper,tipo)=>{
    syshora()
    let data = {}
    data.fecha = fecha,
    data.idtipoasi = tipo,
    data.idper = idper
    let json = JSON.stringify(data)
    
    $.ajax({
        url: `http://${ip}:3001/api/InsertIngresoAdulto`,
        method: 'POST',
        contentType: 'application/json',
        data: json,
        success: function(response) {
            console.log(response)
          
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!! Problemas con el servidor o con la conexion');
    })
}
//--------------------------------------------------------------------------------
    let actualizar = (idper)=>{
        syshora()
        let data = {}
        data.horasal = hora
        let json = JSON.stringify(data)
        $.ajax({
            
            url: `http://${ip}:3001/api/updateSalida/${fecha}/${idper}`,
            method: 'PUT',
            contentType: 'application/json',
            data: json,
            success: function(response) {
                console.log(response)
               
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion')
        })
    }

//-----------------------------------------------------------------------------------
let actualizarHoras = (idper,horaing,horasal)=>{
    syshora()
    let data = {}
    data.horaing = horaing
    data.horasal = horasal
    let json = JSON.stringify(data)
    $.ajax({
        
        url: `http://${ip}:3001/api/updateHorasVoluntarios/${idper}/${fecha}`,
        method: 'PUT',
        contentType: 'application/json',
        data: json,
        success: function(response) {
            console.log(response)
           
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!! Problemas con el servidor o con la conexion')
    })
}
//----------------------------------------------------------------------------------------

    $('#Facilitadores').on('click','.ingreso', function () {
        let rowEl = $(this).closest('div')
        let id = rowEl.find('#idp').text()
        let tipo = rowEl.find('#tipo').text()
        let confirm = alertify.confirm('Asistencia', 'Quiere Marcar la Asistencia?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
        //callbak al pulsar botón positivo
        confirm.set('onok', function () {
            if(tipo !== 'Adulto'){
                ingreso(id)
            }
           
            alertify.success('Asistencia Marcada')
            $('#Capcitador' +  id).toggleClass('fondoasis')
            $('#btnI' + id).toggleClass('disabled')
            $('#btnS' + id).toggleClass('disabled')
            $('#ingreso'+ id).val(hora)
            $('#ingreso'+ id).prop('disabled', false)
        })
        //callbak al pulsar botón negativo
        confirm.set('oncancel', function () {
            alertify.error('Asistencia no marcada')
        
        })
    })

    $('#Facilitadores').on('click','.salida', function () {
        let rowEl = $(this).closest('div');
        let id = rowEl.find('#idp').text();
        let tipo = rowEl.find('#tipo').text();
        
        let confirm = alertify.confirm('Asistencia', 'Desea Marcar la Salida?', null, null).set('', { ok: 'ok', cancel: 'Cancel' });
        //callbak al pulsar botón positivo
        confirm.set('onok', function () {
            if(tipo !== 'Adulto'){
                actualizar(id)
            }
          
            alertify.success('Salida Marcada')
            $('#Capcitador' + id).toggleClass('fondoasis')
            // $('#btnI' + id).toggleClass('disabled')
            $('#btnS' + id).toggleClass('disabled')
            $('#salida' + id).val(hora)
            $('#salida'+ id).prop('disabled', false)
        })
        //callbak al pulsar botón negativo
        confirm.set('oncancel', function () {
            alertify.error('Salida no marcada')
           
        })
    })


    $('#voluntario').on('click','.ingreso', function () {
       
        let rowEl = $(this).closest('div')
        let id = rowEl.find('#idp').text()
        let tipo = rowEl.find('#tipo').text()
        let confirm = alertify.confirm('Asistencia', 'Desea Marcar la Asistencia?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
        //callbak al pulsar botón positivo
        confirm.set('onok', function () {
            if(tipo !== 'Adulto'){
                ingreso(id)
            }
            
            alertify.success('Asistencia Marcada')
            $('#Capcitador' + id).toggleClass('fondoasis')
            $('#btnI' + id).toggleClass('disabled')
            $('#btnS' + id).toggleClass('disabled')
            $('#ingreso'+ id).val(hora)
            $('#ingreso'+ id).prop('disabled', false)
        })
        //callbak al pulsar botón negativo
        confirm.set('oncancel', function () {
            alertify.error('Asistencia no marcada')
        })
    })


    $('#voluntario').on('click','.salida', function () {
        let rowEl = $(this).closest('div')
        let id = rowEl.find('#idp').text()
        let tipo = rowEl.find('#tipo').text()
        
        let confirm = alertify.confirm('Asistencia', 'Desea Marcar la Salida?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
        //callbak al pulsar botón positivo
        confirm.set('onok', function () {
            if(tipo !== 'Adulto'){
                actualizar(id)
            }
            alertify.success('Salida Marcada')
            $('#Capcitador' + id).toggleClass('fondoasis')
            // $('#btnI' + id).toggleClass('disabled')
            $('#btnS' + id).toggleClass('disabled')
            $('#salida' + id).val(hora)
            $('#salida'+ id).prop('disabled', false)
        })
        //callbak al pulsar botón negativo
        confirm.set('oncancel', function () {
            alertify.error('Salida no marcada')
        })
    })

//------------------------------------------------------------------------------
$('#voluntario').on('click','.asistencia', function () {
    let rowEl = $(this).closest('div')
    let id = rowEl.find('#idp').text()
    let tipo = rowEl.find('#tipo').text()
    let asistencia = 1
    let confirm = alertify.confirm('Asistencia', 'Desea Marcar la Asistencia?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
    // //callbak al pulsar botón positivo
     confirm.set('onok', function () {
         if(tipo === 'Adulto'){
             ingresoAdulto(id,asistencia)
         }
        
         alertify.success('Asistencia Marcada')
         $('#btnA' + id).toggleClass('disabled')
         $('#btnIn' + id).toggleClass('disabled')
         $('#btnP' + id).toggleClass('disabled')
         $('#tipo'+ id).text('Asistio')
     })
     //callbak al pulsar botón negativo
     confirm.set('oncancel', function () {
         alertify.error('Asistencia no marcada')
     })
})
//-------------------------------------------------------------------------------
$('#voluntario').on('click','.permisos', function () {
    let rowEl = $(this).closest('div')
    let id = rowEl.find('#idp').text()
    let tipo = rowEl.find('#tipo').text()
    let asistencia = 2
    let confirm = alertify.confirm('Permisos', 'Desea Marcar El Permiso?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
    // //callbak al pulsar botón positivo
     confirm.set('onok', function () {
         if(tipo === 'Adulto'){
             ingresoAdulto(id,asistencia)
         }
        
         alertify.success('Permiso Marcada')
        // $('#Capcitador' + id).toggleClass('fondoasis')
         $('#btnA' + id).toggleClass('disabled')
         $('#btnIn' + id).toggleClass('disabled')
         $('#btnP' + id).toggleClass('disabled')
         $('#tipo'+ id).text('Permiso')
     })
     //callbak al pulsar botón negativo
     confirm.set('oncancel', function () {
         alertify.error('Permisos no marcada')
     })
})

//-----------------------------------------------------------------
$('#voluntario').on('click','.inasistencia', function () {
    let rowEl = $(this).closest('div')
    let id = rowEl.find('#idp').text()
    let tipo = rowEl.find('#tipo').text()
    let asistencia = 3
    let confirm = alertify.confirm('Inasistencia', 'Desea Marcar la Inasistencia?', null, null).set('', { ok: 'ok', cancel: 'Cancel' })
    // //callbak al pulsar botón positivo
     confirm.set('onok', function () {
         if(tipo === 'Adulto'){
             ingresoAdulto(id,asistencia)
         }
        
         alertify.success('Inasistencia Marcada')
        // $('#Capcitador' + id).toggleClass('fondoasis')
         $('#btnA' + id).toggleClass('disabled')
         $('#btnIn' + id).toggleClass('disabled')
         $('#btnP' + id).toggleClass('disabled')
         $('#tipo'+ id).text('Inasistencia')
     })
     //callbak al pulsar botón negativo
     confirm.set('oncancel', function () {
         alertify.error('Inasistencia no marcada')
     })
})
//-----------------------------------------------------------------

$('#md').on('click','.Actualizar', function () {
     let rowEl = $(this).closest('div')
     let id = rowEl.find('#idp').text()
     let ingreso = $('#ingreso'+ id).val()
     let salida = $('#salida'+ id).val()
     if(ingreso === '00:00' && salida === '00:00'){
       alert('No esta habilitada la actualizacion')
     }
     else if(ingreso !== '00:00' && salida === '00:00'){
            // alert('habilitado Para la actualizacion de entrada')
            actualizarHoras(id,ingreso,ingreso)
            alert('Exito')
     }
     else if(ingreso !== '00:00' && salida !== '00:00'){
        // alert('habilitado Para la actualizacion de entrada y salida')
            actualizarHoras(id,ingreso,salida)
            alert('Exito')
     }

})

})