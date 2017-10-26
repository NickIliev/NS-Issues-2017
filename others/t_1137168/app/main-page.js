var vmMain = require("./main-view-model").vmMain;

function onNavigatingTo(args) {
    var page = args.object;

    page.bindingContext = vmMain;
}
exports.onNavigatingTo = onNavigatingTo;