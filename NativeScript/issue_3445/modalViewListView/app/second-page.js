"use strict";
var selected = -1;
function onLoaded(args) {
    console.log(">>> second-page.onLoaded");
}
exports.onLoaded = onLoaded;
function onTap(args) {
    var page = args.object.page;
    showModal(page, selected, false);
}
exports.onTap = onTap;
function showModal(page, _selected, fullscreen) {
    page.showModal("./modalView", _selected, function (selectedItem) {
        console.log("selected " + selectedItem);
        selected = selectedItem;
    }, fullscreen);
}
//# sourceMappingURL=second-page.js.map