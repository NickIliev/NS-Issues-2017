function onNavigatingTo(args) {

    console.log("#######################hello");

    var page = args.object;

    // setTimeout(function() {
    //     global.__collect();
    // }, 300);
}
exports.onNavigatingTo = onNavigatingTo;

var frame = require("ui/frame");

function onTap() {

    frame.topmost().navigate("sub-page");
}
exports.onTap = onTap;