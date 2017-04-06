/*Mis vars*/
var helpers = require('./utils/widgets/helper');
var enums = require("ui/enums");
/* */

exports.resetCount = function () {
    c = 0;
}
exports.startCount = function (imagen, modelo) {
    //if (!timer_is_on) {
    clearCount();
    timer_is_on = 1;
    timedCount(imagen, modelo);
    //}
}
exports.stopCount = function () {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}

var c = 0, t, timer_is_on = 0, img, model;
function timedCount(imagen, modelo) {
    if (imagen) {
        img = imagen;
        model = modelo;
    }
    carrusel(img, model);

    c++;
    t = setTimeout(function () { timedCount() }, 6000);
    if (c == 666660) {
        c = 0;
        clearCount();
        goToInicio();
    }

}
function clearCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0;
}
function goToInicio() {
    helpers.navigate({
        moduleName: 'components/homeView/homeView',
        animated: true,
        transition: {
            name: "slide"
        }
    });
}


function carrusel(imagen, modelo) {
    switch (true) {
        case (c % 3 == 0):
            imagen.src = "~/images/equipos/" + modelo + "_trasera.png";
            break;
        case (c % 2 == 0):
            imagen.src = "~/images/equipos/" + modelo + "_lateral.png";
            break;
        default:
            imagen.src = "~/images/equipos/" + modelo + "_frontal.png";
            break;
    }
    imagen.animate({
        scale: { x: 0, y: 0 },
        duration: 0,
        opacity: 0,
        curve: enums.AnimationCurve.easeIn
    }).then(function () {
        imagen.animate({
            scale: { x: 1, y: 1 },
            duration: 1000,
            opacity: 1,
            curve: enums.AnimationCurve.easeIn
        });
    });
}