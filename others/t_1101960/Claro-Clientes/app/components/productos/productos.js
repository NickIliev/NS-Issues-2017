'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property');

var viewModel = require("./productos-view-model");
var viewModel = new viewModel.vmEquipos();
var timer = require("timer");

/*Mis vars*/
var common = require('~/common.js');
/* */

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/categorias/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

var page, vista;
function pageLoaded(args) {
    timer.setTimeout(function () {
        page = args.object;
        page.bindingContext = viewModel;
        if (isInit) {
            isInit = false;
        }
    }, 1);
}
exports.pageLoaded = pageLoaded;

exports.loadOnDemand = function (args) {
    var application = require('application');
    if (application.android) {
        timer.setTimeout(function () {
            viewModel.addItem();
            var listView = args.object;
            listView.notifyLoadOnDemandFinished();
        }, 1);
        args.returnValue = true;
    }
}

exports.buttonBackTap = function () {
    // common.stopCount();
    helpers.back();
}

exports.showAcordeon = function (args) {
    var tipo = args.object;
    viewModel.set("chip", false);
    viewModel.set("precios", false);
    viewModel.set("marcas", false);
    viewModel.set("categorias", false);
    viewModel.set("loquieroen", false);
    viewModel.set("planes", false);

    switch (tipo.text) {
        case "Chip":
            viewModel.set("chip", !viewModel.get("chip"));
            viewModel.set("modal", true);
            animar();
            break;
        case "Precio":
            viewModel.set("precios", !viewModel.get("precios"));
            viewModel.set("modal", true);
            animar();
            break;
        case "Marcas":
            viewModel.set("marcas", !viewModel.get("marcas"));
            viewModel.set("modal", true);
            animar();
            break;
        case "Planes":
            viewModel.set("planes", !viewModel.get("planes"));
            viewModel.set("modal", true);
            animar();
            break
        default:
            // if (!viewModel.get("modal")) {
            //     var item = args.object;
            //     var itemData = viewModel.get('listItems')[item.index];
            //     viewModel.set("current", itemData);
            //     viewModel.set("producto", !viewModel.get("producto"));
            //     viewModel.set("modal", true);
            //     animar('spring');
            // } else {
            //     viewModel.set("modal", false);
            // }
            break;
    }

}

function animar(tipo) {
    var modal = page.getViewById("modal");

    switch (tipo) {
        case 1:
            viewModel.set("modal", false);
            modal.animate({
                scale: { x: 0, y: 0 },
                opacity: 0,
                duration: 200
            }).then(function () {
                viewModel.set("modal", false);
                // viewModel.set('isLoading', false);
                console.log("modal: " + modal);
                modal.visibility = "collapsed";
            });
            break;
        default:
            modal.animate({
                opacity: 0.5,
                scale: { x: 0, y: 0 },
                duration: 0,
            }).then(function () {
                return modal.animate({
                    scale: { x: 1.2, y: 1.2 },
                    opacity: 0.7,
                    duration: 200
                });
            }).then(function () {
                return modal.animate({
                    scale: { x: 1, y: 1 },
                    opacity: 1,
                    duration: 200
                });
            });
            break;
    }

}

exports.selectFiltro = function (args) {
    animar(1);
    var tipo = args.object;
    var repeater = page.getViewById("repeater");
    var items = viewModel.get("listItems");
    switch (tipo.tipo) {
        case 0:
            // sorting(items, 'precionormal', 'desc');
            // for (var i = 0; i < items.length; i++) {
            //     items[i].visibleprecio = true;
            // }
            // viewModel.set("preciosfiltro", tipo.text);
            // viewModel.set("listItems", items);
            // repeater.refresh();
            viewModel.sort();
            repeater.refresh();
            break;
        case 1:
            // sorting(items, 'precionormal', 'asc');
            // for (var i = 0; i < items.length; i++) {
            //     items[i].visibleprecio = true;
            // }
            // viewModel.set("preciosfiltro", tipo.text);
            // viewModel.set("listItems", items);
            // repeater.refresh();
            viewModel.sort("desc");
            repeater.refresh();
            break;
        case "marcas":
            // for (var i = 0; i < items.length; i++) {
            //     if (tipo.text == "Ver todos") {
            //         items[i].visiblemarcas = true;
            //     } else {
            //         items[i].details.marcaExpand == tipo.text ? items[i].visiblemarcas = true : items[i].visiblemarcas = false;
            //     }
            // }
            // viewModel.set("listItems", items);
            // if (tipo.text == "Ver todos") {
            //     viewModel.set("marcasfiltro", "");
            // } else {
            //     viewModel.set("marcasfiltro", tipo.text);
            // }
            viewModel.filtroMarcas(tipo.text);
            repeater.refresh();
            break;
        case "planes":
            viewModel.filtroPlanes(tipo.text);
            repeater.refresh();
            break;
        case 'n':
            for (var i = 0; i < items.length; i++) {
                items[i].visible = true;
            }
            viewModel.set("listItems", items);
            repeater.refresh();
            break;
        default:

            break;
    }
    common.resetCount();
}

exports.deleteFiltro = function (args) {
    var tipo = args.object;
    var repeater = page.getViewById("repeater");
    var items = viewModel.get("listItems");
    switch (tipo.tipo) {
        case "precios":
            sorting(items, 'precionormal', 'desc');
            for (var i = 0; i < items.length; i++) {
                items[i].visibleprecios = true;
            }
            viewModel.set("precios", false);
            viewModel.set("listItems", items);
            viewModel.set("preciosfiltro", "");

            repeater.refresh();
            break;
        case "marcas":
            for (var i = 0; i < items.length; i++) {
                items[i].visiblemarcas = true;
            }
            viewModel.set("marcas", false);
            viewModel.set("listItems", items);
            viewModel.set("marcasfiltro", "");

            repeater.refresh();
            break;
        case "planes":
            for (var i = 0; i < items.length; i++) {
                items[i].visibleplanes = true;
            }
            viewModel.set("planes", false);
            viewModel.set("listItems", items);
            viewModel.set("planesfiltro", "");

            repeater.refresh();
            break;
        case 'n':
            for (var i = 0; i < items.length; i++) {
                items[i].visible = true;
            }
            viewModel.set("listItems", items);
            repeater.refresh();
            break;
        default:

            break;
    }
    common.resetCount();
}

exports.hideModal = function (args) {
    animar(1);
}