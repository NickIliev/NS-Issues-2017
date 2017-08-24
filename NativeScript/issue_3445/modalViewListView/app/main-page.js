"use strict";
var frameModule = require("ui/frame");
var selected = -1;
function onLoaded(args) {
    console.log(">>> main-page.onLoaded");
    //console.trace();
}
exports.onLoaded = onLoaded;
function goToPageTwo() {
    frameModule.topmost().navigate({
        moduleName: "second-page",
        clearHistory: true
    });
}
exports.goToPageTwo = goToPageTwo;
//# sourceMappingURL=main-page.js.map