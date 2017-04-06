'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./homeView-view-model');
/*Mis vars*/
var frameModule = require("ui/frame");
/* */

// additional functions
function pageLoaded(args) {
    var page = args.object;

    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }

    // helpers.platformInit(page);

    page.bindingContext = viewModel;
    // additional pageLoaded

    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }

    if (isInit) {
        isInit = false;

        // additional pageInit  
    }
}
exports.pageLoaded = pageLoaded;

exports.tapPage = function (args) {
    helpers.navigate({
        moduleName: "components/seleccion/seleccion"
    });
}
