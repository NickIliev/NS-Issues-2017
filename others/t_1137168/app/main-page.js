var vmMain = require("./main-view-model").vmMain;

var Converter = require("./main-view-model").Converter;

function onNavigatingTo(args) {
    var page = args.object;

    var converter = new Converter(vmMain.citiesProvider);
    vmMain.set("converter", converter);

    page.bindingContext = vmMain;
}
exports.onNavigatingTo = onNavigatingTo;