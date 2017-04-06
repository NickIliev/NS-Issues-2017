'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./seleccion-view-model');
/*Mis vars*/
var frameModule = require("ui/frame");
var enums = require("ui/enums");
var common = require('~/common.js');
/* */
// additional functions
var page;
function pageLoaded(args) {
    page = args.object;

    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }

    // helpers.platformInit(page);

    page.bindingContext = viewModel;
    // additional pageLoaded

    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    } else {
        frameModule.topmost().android.navBarVisibility = "never";
    }

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}
exports.pageLoaded = pageLoaded;



exports.goToProductos = function (args) {
    var tipo = args.object;
    helpers.navigate({
        moduleName: "components/productos/productos",
        context: tipo.tipo
    });
}

exports.goToPlanes = function (args) {
    helpers.navigate({
        moduleName: "components/planes/planes",
        animated: true,
        transition: {
            name: "slide"
        },
    });
}