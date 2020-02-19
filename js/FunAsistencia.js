$(document).ready(()=>{
     let ip = '172.27.9.9'
     let fecha
     let personas = []
     let cont = 0
     let cont1 = 0
     //esto es para obtener todos mis laboratorio ----
	// $('.joaco').click(function(){
	// 	console.log('ss')
	// })
    $('#buscar').click(()=>{
        $('#contenido').css('display','none')
        personas.splice(0,personas.length)
        $('#Facilitadores').empty()
        $('#voluntario').empty()
        $('#md').empty()
        div()
        $('#nombreLab').empty()
        $('#TituloLab').empty()
        let l = $('select[name="lab"] option:selected').text()
        let t = `<h3 class="TitleAula mt-3">Aula ${l}</h3>`
        let add = `<a href="#tab1" class="nav-link active" data-toggle="tab">${l}</a>`
        $('#nombreLab').append(add)
        $('#TituloLab').append(t) 
        //  Cf()
         F()
        //  v()
        //  a()
         console.log(personas)
         $('#hr1').css("visibility","visibility")
         $("#cargando").show()
        //  setTimeout(()=>
        //  {
        //     control()
        //     controlA() 
        //  }, 2000)
        
        //style="visibility: hidden" id="hr1"
    })
//---------para obtner lo laboratorio disponibles
     let lab
     $.ajax({
         url: `http://${ip}:3001/api/ObtenerLab`,
         contentType: 'application/json',
         success: (response)=> {
                 lab = response.data.map((x)=>{
                     return `<option value='${x.idlab}'>${x.nombre}</option>`
                 })
                 $('#lab').append(lab)
         }   
     }).fail( function( jqXHR, textStatus, errorThrown ) {
         alert( 'Error!! Problemas con el servidor o con la conexion');
     })

//---------------aqui termina
//---------para obtener la fecha del sistema
    
    $.ajax({
        url: `http://${ip}:3001/api/ObtenerFechaDelSistema`,
        contentType: 'application/json',
        success: (response)=> {
                response.data.map((x)=>fecha = x.fecha)
                    fecha = fecha.substring(0,10)
                      
        }   
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!! Problemas con el servidor o con la conexion');
    })
//------------------------------------------
//---- aqui esta para generar dinamicamente el facilitador
     let F = ()=>{
         let facilitador
         let modal3
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerFacilitador/T/${$('#lab').val()}`,
            contentType: 'application/json',
            success: (response)=> {
                     facilitador = response.data.map((x)=>{
                        personas.push(x.idper)
                        return `<div class="col-sm-4">
                        <div class="card">
                            <div class="card-header">
                            ${x.tipo}
                            </div>
                            <img src="${x.foto}" class="card-img-top img-fluid" alt="">
                            <div id="Capcitador${x.idper}" class="card-body">
                                <h3 class="card-title">${x.nombre}</h3>
                                <p class="card-text"></p>
                                <div class="row">
                                    <div class="col-6">
                                        <a id="btnI${x.idper}" class="ingreso btn btn-primary btn-lg btn-block entrada">Entrada</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    <div class="col-6">
                                        <a id="btnS${x.idper}" class="salida btn btn-primary btn-lg btn-block salida disabled">Salida</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                </div>
                                <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>

                            </div>
                        </div>
                    </div> `
                    })
                    modal3 = response.data.map((x)=>{
                         return `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                         <div class="modal-dialog modal-lg">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <h5 class="modal-title" id="">Detalles</h5>
                                 </div>
                                 <div class="modal-body">
                                     <div class="container-fluid">
                                         <div class="row">
                                             <div class="col-12 col-sm-6 fondomodal">
                                                 <img src="${x.foto}" class="imgModal" alt="">
                                             </div>
                                             <div class="col-12 col-sm-6">
                                                 <ul>
                                                     <li>
                                                         <strong>Ingreso:</strong>
                                                     </li>
                                                         <li>
                                                         <input type="text" id="ingreso${x.idper}" value="00:00" disabled>
                                                         </li>
                                                         <li>
                                                             <strong>Salida:</strong>
                                                         </li>
                                                         <li><input type="text" id="salida${x.idper}" value="00:00" disabled></li>
                                                     <li>
                                                         <strong>Nombres:</strong>
                                                     </li>
                                                     <li>${x.nombre}</li>
                                                     <li>
                                                         <strong>Apellido Paterno:</strong>
                                                     </li>
                                                     <li>${x.apat}</li>
                                                     <li>
                                                         <strong>Apellido Materno:</strong>
                                                     </li>
                                                     <li>${x.amat}</li>
                                                     <li>
                                                         <strong>Carnet de Identidad:</strong>
                                                     </li>
                                                     <li>${x.ci}</li>
                                                   
                                                     
                                                 </ul>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
             
                                 <div class="modal-footer">
                                      <button class="Actualizar btn btn-default">Actualizar</button>
                                      <p id="idp" style="display: none;">${x.idper}</p>
                                     <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                                 </div>
                             </div>
                         </div>
                     </div>`
                    })
                     $('#Facilitadores').append(facilitador)
                     $('#md').append(modal3)
                     Cf()
                   
            }   
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion');
        })
     }

     //-----------------------------aqui termina 

     //-----aqui esta para generar dinamicamente los cofacilitadores 
     let Cf = ()=>{
        let Cofacilitador
        let modal2
       $.ajax({
           url: `http://${ip}:3001/api/ObtenerCoFacilitador/T/${$('#lab').val()}`,
           contentType: 'application/json',
           success: (response)=> {
                    Cofacilitador = response.data.map((x)=>{
                        personas.push(x.idper)
                       return `<div class="col-sm-4">
                       <div class="card">
                           <div class="card-header">
                           ${x.tipo}
                           </div>
                           <img src="${x.foto}" class="card-img-top img-fluid" alt="">
                           <div id="Capcitador${x.idper}" class="card-body">
                               <h3 class="card-title">${x.nombre}</h3>
                               <p class="card-text"></p>
                               <div class="row">
                                   <div class="col-6">
                                       <a id="btnI${x.idper}" class="ingreso btn btn-primary btn-lg btn-block entrada">Entrada</a>
                                       <p id="idp" style="display: none;">${x.idper}</p>
                                       <p id="tipo" style="display: none;">${x.tipo}</p>
                                   </div>
                                   <div class="col-6">
                                       <a id="btnS${x.idper}" class="salida btn btn-primary btn-lg btn-block salida disabled">Salida</a>
                                       <p id="idp" style="display: none;">${x.idper}</p>
                                       <p id="tipo" style="display: none;">${x.tipo}</p>
                                   </div>
                               </div>
                               <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>

                           </div>
                       </div>
                   </div>`
                   })

                   modal2 = response.data.map((x)=>{
                    return `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">Detalles</h5>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 fondomodal">
                                            <img src="${x.foto}" class="imgModal" alt="">
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <ul>
                                                <li>
                                                    <strong>Ingreso:</strong>
                                                </li>
                                                    <li><input type="text" id="ingreso${x.idper}" value="00:00" disabled></li>
                                                
                                                    <li>
                                                        <strong>Salida:</strong>
                                                    </li>
                                                    <li><input type="text" id="salida${x.idper}" value="00:00" disabled></li>
                                                <li>
                                                    <strong>Nombres:</strong>
                                                </li>
                                                <li>${x.nombre}</li>
                                                <li>
                                                    <strong>Apellido Paterno:</strong>
                                                </li>
                                                <li>${x.apat}</li>
                                                <li>
                                                    <strong>Apellido Materno:</strong>
                                                </li>
                                                <li>${x.amat}</li>
                                                <li>
                                                    <strong>Carnet de Identidad:</strong>
                                                </li>
                                                <li>${x.ci}</li>
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="modal-footer">
                               <button class="Actualizar btn btn-default">Actualizar</button>
                               <p id="idp" style="display: none;">${x.idper}</p>
                                <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`
                
               })   
                $('#Facilitadores').append(Cofacilitador)
                $('#md').append(modal2)
                v()
           }   
       }).fail( function( jqXHR, textStatus, errorThrown ) {
           alert( 'Error!! Problemas con el servidor o con la conexion');
       })
    }
     //------------------------------------------------------------- 

     let a = ()=>{
        cont = 0
        let Adulto
        let modal
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerA/T/${$('#lab').val()}`,
            contentType: 'application/json',
            success: (response)=> {
                     response.data.forEach(function(x){              
                        personas.push(x.idper)
                        Adulto = `<div class="col-6 col-sm-6">
                        <div class="card">
                            <div class="card-header">
                                ${x.tipo}
                            </div>
                            <img src="${x.foto}" class="card-img-top img-fluid fotoabajo" alt="">
                            <div id="Capcitador${x.idper}" class="card-body">
                                <h3 class="card-title"> ${x.nombre}</h3>
                                <div class="row">
                                    <div class="col col-4 asistio">
                                        <a id="btnA${x.idper}" class="asistencia btn btn-danger ">Asistencia</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
				    <div class="col col-4 permiso">
                                        <a id="btnIn${x.idper}" class="inasistencia btn btn-danger ">Inasistencia</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                       <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    <div class="col col-12 novino">
                                        <a id="btnP${x.idper}" class="permisos btn btn-danger">Permiso</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    
                                </div>
                                <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>
                            </div>
                        </div>
                    </div>`
                    document.getElementById("Fila" + cont).innerHTML += Adulto
                    cont++
                    
                })
                
                response.data.forEach(function(x){
                    modal = `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">Detalles</h5>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 fondomodal">
                                            <img src="${x.foto}" class="imgModal" alt="">
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <ul>
                                                <li>
                                                    <strong>Tipo de Asistencia:</strong>
                                                </li>
                                                    <li id="tipo${x.idper}">No Marcado</li>
                                        
                                                <li>
                                                    <strong>Nombres:</strong>
                                                </li>
                                                <li>${x.nombre}</li>
                                                <li>
                                                    <strong>Apellido Paterno:</strong>
                                                </li>
                                                <li>${x.apat}</li>
                                                <li>
                                                    <strong>Apellido Materno:</strong>
                                                </li>
                                                <li>${x.amat}</li>
                                                <li>
                                                    <strong>Carnet de Identidad:</strong>
                                                </li>
                                                <li>${x.ci}</li>
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="modal-footer">
        
                                <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`
                document.getElementById("md").innerHTML += modal
            })
            AdultoSinAsignar()
            }   
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion');
        })   
     }

     //-------------------------------------------------------------------------------------------------

     let v = ()=>{
        let Voluntario
        cont1 = 0
        let modal1
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerV/T/${$('#lab').val()}`,
            contentType: 'application/json',
            success: (response)=> {
                response.data.forEach(function(x) {
                    personas.push(x.idper)
                   Voluntario = `<div class="col-6 col-sm-6">
                            <div class="card">
                                <div class="card-header">
                                    ${x.tipo}
                                </div>
                                <img src="${x.foto}" class="card-img-top img-fluid" alt="">
                                <div id="Capcitador${x.idper}" class="card-body">
                                    <h3 class="card-title"> ${x.nombre}</h3>
                                    <div class="row">
                                        <div class="col-4 col-lg-6 btnpeque btnasis">
                                            <a id="btnI${x.idper}" class="ingreso btn btn-primary btn-lg btn-block entrada prueba">Entrada</a>
                                            <p id="idp" style="display: none;">${x.idper}</p>
                                            <p id="tipo" style="display: none;">${x.tipo}</p>
                                        </div>
                                        <div class="col-4 col-lg-6 btnpeque">
                                            <a id="btnS${x.idper}" class="salida btn btn-primary btn-lg btn-block salida disabled prueba">Salida</a>
                                            <p id="idp" style="display: none;">${x.idper}</p>
                                            <p id="tipo" style="display: none;">${x.tipo}</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>
                                </div>
                            </div>
                        </div>`
                        document.getElementById("Fila" + cont1).innerHTML += Voluntario
                        cont1++
                        
                })
                
                response.data.forEach(function(x){
                    modal1 = `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">Detalles</h5>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 fondomodal">
                                            <img src="${x.foto}" class="imgModal" alt="">
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <ul>
                                                <li>
                                                    <strong>Ingreso:</strong>
                                                </li>
                                                    <li><input type="text" id="ingreso${x.idper}" value="00:00" disabled></li>
                                                
                                                    <li>
                                                        <strong>Salida:</strong>
                                                    </li>
                                                    <li><input type="text" id="salida${x.idper}" value="00:00" disabled></li>
                                                <li>
                                                    <strong>Nombres:</strong>
                                                </li>
                                                <li>${x.nombre}</li>
                                                <li>
                                                    <strong>Apellido Paterno:</strong>
                                                </li>
                                                <li>${x.apat}</li>
                                                <li>
                                                    <strong>Apellido Materno:</strong>
                                                </li>
                                                <li>${x.amat}</li>
                                                <li>
                                                    <strong>Carnet de Identidad:</strong>
                                                </li>
                                                <li>${x.ci}</li>
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="modal-footer">
                                 <button class="Actualizar btn btn-default">Actualizar</button>
                                 <p id="idp" style="display: none;">${x.idper}</p>
                                <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`
                document.getElementById("md").innerHTML += modal1
               
            })
            a()
            }
              
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion');
        })   
     }

     //------------------------------------------------------------------aqui termina
     //-----------------------aqui comienza los adultos no asignados
     let AdultoSinAsignar = ()=>{
        let posicion2 = 0
        let Adulto
        let modal
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerAdultoSinAsignacion/${$('#lab').val()}`,
            contentType: 'application/json',
            success: (response)=> {
                     response.data.forEach(function(x){                
                        personas.push(x.idper)
                        Adulto = `<div class="col-6 col-sm-6">
                        <div class="card">
                            <div class="card-header sinAsignar">
                                ${x.tipo}<span> sin asignar</span>
                            </div>
                            <img src="${x.foto}" class="card-img-top img-fluid fotoabajo" alt="">
                            <div id="Capcitador${x.idper}" class="card-body">
                                <h3 class="card-title"> ${x.nombre}</h3>
                                <div class="row">
                                    <div class="col col-4 asistio">
                                        <a id="btnA${x.idper}" class="asistencia btn btn-danger ">Asistencia</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                       <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    <div class="col col-4 permiso">
                                        <a id="btnP${x.idper}" class="permisos btn btn-danger">Permiso</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    <div class="col col-12 novino">
                                        <a id="btnIn${x.idper}" class="inasistencia btn btn-danger ">Inasistencia</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                       <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                </div>
                                <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>
                            </div>
                        </div>
                    </div>`
                    if(posicion2 === 2){
                        posicion2 = 1
                        cont++
                        console.log(cont)
                      
                        }
                        else{
                        posicion2 = posicion2 + 1
                        console.log(cont)
                        
                        }
                     document.getElementById("Fila" + cont).innerHTML += Adulto    
                })
                
                response.data.forEach(function(x){
                    modal = `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">Detalles</h5>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 fondomodal">
                                            <img src="${x.foto}" class="imgModal" alt="">
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <ul>
                                                <li>
                                                    <strong>Tipo de Asistencia:</strong>
                                                </li>
                                                    <li id="tipo${x.idper}">No Marcado</li>
                                        
                                                <li>
                                                    <strong>Nombres:</strong>
                                                </li>
                                                <li>${x.nombre}</li>
                                                <li>
                                                    <strong>Apellido Paterno:</strong>
                                                </li>
                                                <li>${x.apat}</li>
                                                <li>
                                                    <strong>Apellido Materno:</strong>
                                                </li>
                                                <li>${x.amat}</li>
                                                <li>
                                                    <strong>Carnet de Identidad:</strong>
                                                </li>
                                                <li>${x.ci}</li>
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="modal-footer">
        
                                <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`
                document.getElementById("md").innerHTML += modal
               
            })
            VoluntarioSinAsignar()
            }   
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion');
        })   
     }
 
     //------------------------------------------------------------------------------

     //------------------------aqui comienzan par los voluntario no asignados -----
     
     let VoluntarioSinAsignar = ()=>{
        cont++
        let posicion2 = 0
        let v
        let modal
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerVoluntarioSinAsignacion/${$('#lab').val()}`,
            contentType: 'application/json',
            success: (response)=> {
                     response.data.forEach(function(x){              
                        personas.push(x.idper)
                        v = `<div class="col-6 col-sm-6">
                        <div class="card">
                            <div class="card-header sinAsignar">
                                ${x.tipo}<span> sin asignar</span>
                            </div>
                            <img src="${x.foto}" class="card-img-top img-fluid" alt="">
                            <div id="Capcitador${x.idper}" class="card-body">
                                <h3 class="card-title"> ${x.nombre}</h3>
                                <div class="row">
                                    <div class="col-4 col-lg-6 btnpeque btnasis">
                                        <a id="btnI${x.idper}" class="ingreso btn btn-primary btn-lg btn-block entrada prueba">Asistencia</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                    <div class="col-4 col-lg-6 btnpeque">
                                        <a id="btnS${x.idper}" class="salida btn btn-primary btn-lg btn-block salida disabled prueba">Salida</a>
                                        <p id="idp" style="display: none;">${x.idper}</p>
                                        <p id="tipo" style="display: none;">${x.tipo}</p>
                                    </div>
                                </div>
                                <button class="btn btn-success btn-sm btn-block mt-2" data-toggle="modal" data-target="#Detalle${x.idper}">Detalles </button>
                            </div>
                        </div>
                    </div>`
                    if(posicion2 === 2){
                        posicion2 = 1
                        cont++
                        console.log(cont)
                        }
                        else{
                        posicion2 = posicion2 + 1
                        console.log(cont)
                        
                        }
                    document.getElementById("Fila" + cont).innerHTML += v
                    
                  
                })
                
                response.data.forEach(function(x){
                    modal =  `<div class="modal fade" id="Detalle${x.idper}" tabindex="-1" role="dialog" aria-labelledby="Detalle" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">Detalles</h5>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 fondomodal">
                                            <img src="${x.foto}" class="imgModal" alt="">
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <ul>
                                                <li>
                                                    <strong>Ingreso:</strong>
                                                </li>
                                                    <li><input type="text" id="ingreso${x.idper}" value="00:00" disabled></li>
                                                
                                                    <li>
                                                        <strong>Salida:</strong>
                                                    </li>
                                                    <li><input type="text" id="salida${x.idper}" value="00:00" disabled></li>
                                                <li>
                                                    <strong>Nombres:</strong>
                                                </li>
                                                <li>${x.nombre}</li>
                                                <li>
                                                    <strong>Apellido Paterno:</strong>
                                                </li>
                                                <li>${x.apat}</li>
                                                <li>
                                                    <strong>Apellido Materno:</strong>
                                                </li>
                                                <li>${x.amat}</li>
                                                <li>
                                                    <strong>Carnet de Identidad:</strong>
                                                </li>
                                                <li>${x.ci}</li>
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="modal-footer">
                                <button class="Actualizar btn btn-default">Actualizar</button>
                                <p id="idp" style="display: none;">${x.idper}</p>
                                <button class="btn btn-default" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`
                document.getElementById("md").innerHTML += modal
               
            })
            control()
            controlA()
            $('#cargando').css('display','none')
            $('#contenido').css('display','block')
            }   
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert( 'Error!! Problemas con el servidor o con la conexion');
        })   
     }
     //------------------------------------------------------------------------------
     //--------------para generar los div y se puedan visualizar los adultos y voluntarios

     let div = ()=>{
        
         for(let i = 0; i<40; i++){
            document.getElementById("voluntario").innerHTML += `<div class="col col-12 col-md-6">
                    <div class="row"  id="Fila${i}">
                    </div>
                    </div>`
         }
         
     }
    div()
    //----------------------aqui termina
    //--para controlar la asistencia
    let control = ()=>{
    $.ajax({
        url: `http://${ip}:3001/api/ObtenerAsistencia/${fecha}`,
        contentType: 'application/json',
        success : (response)=>{
                    response.data.forEach((x)=>{
                       for(let i = 0; i  <personas.length; i++){
                             if(personas[i]  === x.idper){
                                 $('#btnI' + x.idper).toggleClass('disabled')
                                 $('#ingreso'+ x.idper).val(x.horaing.substring(0,5))
                                 $('#ingreso'+ x.idper).prop('disabled', false);
                                 $('#Capcitador' + x.idper).toggleClass('fondoasis')
                                 console.log(x.horaing  +  ' ' + x.horasal)
                                 if(x.horaing == x.horasal) {
                                  $('#btnS' + x.idper).toggleClass('disabled')
                                    //
                                 }else{
                                    $('#Capcitador' + x.idper).toggleClass('fondoasis') 
                                    $('#salida' + x.idper).val(x.horasal.substring(0,5))
                                    $('#salida'+ x.idper).prop('disabled', false)
                                 }
                             }

                        }
                    })
        }

    }).fail(function(jqXHR,textStatus,errorThrown){
        alert('error con la conexion ')
    })
    }

    //----------------------------------------------------------------
    //---para controlar la asistencia adulto
    let controlA = ()=>{
        $.ajax({
            url: `http://${ip}:3001/api/ObtenerAsistenciaAdulto/${fecha}`,
            contentType: 'application/json',
            success : (response)=>{
                        response.data.forEach((x)=>{
                           for(let i = 0; i  <personas.length; i++){
                                 if(personas[i]  === x.idper){
                                    $('#btnA' + x.idper).toggleClass('disabled')
                                    $('#btnIn' + x.idper).toggleClass('disabled')
                                    $('#btnP' + x.idper).toggleClass('disabled')
                                    switch (x.idtipoasi) {
                                        case 1: $('#tipo'+ x.idper).text('Asistio')
                                            break
                                        case 2 :  $('#tipo'+ x.idper).text('Permiso')
                                            break
                                        case 3:  $('#tipo'+ x.idper).text('Inasistencia')
                                            break        
                                    
                                        default:
                                            break
                                    }
                                 }
    
                            }
                        })
            }
    
        }).fail(function(jqXHR,textStatus,errorThrown){
            alert('error con la conexion ')
        })
        }
    
   
})