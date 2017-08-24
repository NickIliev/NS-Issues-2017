var frame = require("ui/frame");

function onNavigatingTo(args) {

    console.log("sub page");

    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;

function goBack() {

    frame.goBack();
}
exports.goBack = goBack;