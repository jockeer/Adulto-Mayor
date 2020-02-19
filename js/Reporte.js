$(document).ready(()=>{
    let ip= '172.27.9.9'

    $('#ReporteS').on('change',()=>{
        let t = parseInt( $('#ReporteS').val())
        if(t === 1){
            alert('voluntario')
            Rvoluntario()
        }
        else{
            alert('adulto')
        }
    })


   let Rvoluntario = ()=>{ $("#table").DataTable({ 
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
        "lengthMenu": [[10, 20,30], [10, 20,30]],
        "processing": true,
        "serverSide": false,
        "responsive": false,
        "ajax": {
            "url": `http://${ip}:3000/api/Reporte/${$('#fecha1').val()}/${$('#fecha2').val()}`,
            "type": "GET"

        },
        "columns": [{
                "data": "foto",
                "mRender": function(data, type, full) {
                    return ' <img src="' + data + '" style="width: 50px; height: 50px;" class="imgRedonda">';
                }
            }, {
               "data": "nombre"
                
               
            }, {
                "data": "registro"
            }, {
                "data": "Hservicios"

            },
           

        ]
                       
       }).columns.adjust().responsive.recalc();

    }
})


function generate() {
    var doc = new jsPDF('p', 'pt');
    doc.text(240,20,"Reporte De Voluntarios");
    var elem = document.getElementById('table');
    var imgElements = document.querySelectorAll('#table tbody img');
    var data = doc.autoTableHtmlToJson(elem);
    var images = [];
    var i = 0;
    doc.autoTable(data.columns, data.rows, {
      bodyStyles: {rowHeight: 30},
      drawCell: function(cell, opts) {
        if (opts.column.dataKey === 0) {
          images.push({
            url: imgElements[i].src,
            x: cell.textPos.x,
            y: cell.textPos.y
          });
          i++;
        }
      },
      addPageContent: function() {
        for (var i = 0; i < images.length; i++) {
          doc.addImage(images[i].url, images[i].x, images[i].y, 20, 20);
        }
      }
    });

    doc.save("Reporte.pdf");
  }	   