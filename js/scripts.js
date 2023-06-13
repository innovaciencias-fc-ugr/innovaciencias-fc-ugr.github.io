/*!
* Start Bootstrap - Small Business v5.0.5 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/

import { actividades } from "./model.js";
import { dateString, timeString } from "./dates.js";

$(function () {
    // Grab the template script
    var theTemplateScript = $("#actividades").html();
  
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    var actividadesPasadas = []
    var actividadesFuturas = []
    var now = new Date();
    var actsIDs = 0;

    actividades.forEach(act => {
        act["id"] = actsIDs
        actsIDs += 1
        let fechaStr = act.fecha
        act["fecha"] = new Date(Date.parse(act.fecha, "yyyy-MM-dd"))
        act["hora"] = false

        if(act.horaInicio != undefined){
            act["hora"] = true
            act["fecha"] = new Date(Date.parse(fechaStr+"T"+act.horaInicio))
            //console.log(act.fecha)

            act["horaInicioCompleta"] = timeString(act["fecha"])
            act["horaFinCompleta"] = timeString(new Date(Date.parse(fechaStr+"T"+act.horaFin)))
        }

        act["fechaCompleta"] = dateString(act["fecha"])
        if (act["descripcion"] != undefined && act["descripcion"].length > 1) 
            act["descripcionCorta"] = act["descripcion"].substring(0,300)
        else
            act["descripcion"] = undefined

        if(act.fecha < now)
            actividadesPasadas.push(act)
        else
            actividadesFuturas.push(act)
    });

    actividadesPasadas.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    actividadesPasadas.sort();

    actividadesFuturas.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    actividadesFuturas.sort();

  
    // This is the default context, which is passed to the template
    var context = {
        actividadesPasadas: actividadesPasadas,
        actividadesFuturas: actividadesFuturas,
        hayActividades: actividadesFuturas.length > 0
    };
  
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
  
    // Add the compiled html to the page
    $("#tarjetasActividades").append(theCompiledHtml);

    $( 'button[id^="more-info-button"]' ).click(function () {
        let id = $(this).attr('id')
        let activityID = parseInt(id.substring(17,id.length))
        let activity = actividades.find(act => act.id === activityID)
        if(!activity["more"]) {
            activity["more"] = true
            $("#description-" + activityID).html(activity["descripcion"])
            $(this).html("Menos")
            $("#card-body-" + activityID).css("height", "100%")
            
        }
        else {
            activity["more"] = false
            $("#description-" + activityID).html(activity["descripcionCorta"])
            $(this).html("Más")
            $("#card-body-" + activityID).css("height", "15em")
        }
      });


  });



