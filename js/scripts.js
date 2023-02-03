/*!
* Start Bootstrap - Small Business v5.0.5 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/

import { actividades } from "./model.js";

$(function () {
    // Grab the template script
    var theTemplateScript = $("#example-template").html();
  
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    var actividadesPasadas = []
    var actividadesFuturas = []
    var now = new Date();

    actividades.forEach(act => {
        if(act.fecha > now)
            actividadesPasadas.push(act)
        else
            actividadesFuturas.push(act)
    });

    actividadesPasadas.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    actividadesPasadas.sort();

    actividadesFuturas.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    actividadesFuturas.sort();

  
    // This is the default context, which is passed to the template
    var context = {
        actividadesPasadas: actividadesPasadas,
        actividadesFuturas: actividadesFuturas
    };
  
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
  
    // Add the compiled html to the page
    $(document.body).append(theCompiledHtml);
  });

