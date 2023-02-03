
var months = {
    0: "Enero",
    1: "Febrero",
    2: "Marzo",
    3: "Abril",
    4: "Mayo",
    5: "Junio",
    6: "Julio",
    7: "Agosto",
    8: "Septiembre",
    9: "Octubre",
    10: "Noviembre",
    11: "Diciembre"
}

var weekdays = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo"
}

function dateString(date) {
    return weekdays[date.getDay()] + ", " + 
        date.getDate() + " de " + 
        months[date.getMonth()] + " de " + 
        date.getFullYear()
}

function timeString(time) {
    return time.getHours() + ":" + time.getMinutes()
}

export {dateString, timeString}