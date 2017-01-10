"use strict";
var observable_array_1 = require("data/observable-array");
var frame = require("ui/frame");
var closeCallback;
var array;
function onPageLoaded(args) {
    var page = args.object;
    array = new observable_array_1.ObservableArray();
    array.push({ title: "Title1", style: 'notselected' });
    array.push({ title: "Title2", style: 'notselected' });
    page.bindingContext = { myItems: array };
}
exports.onPageLoaded = onPageLoaded;
function onShowingModally(args) {
    console.log(">>> login-page.onShowingModally");
}
exports.onShowingModally = onShowingModally;
function onShownModally(args) {
    console.log(">>> login-page.onShownModally, context: " + args.context);
    var selected = args.context;
    // console.log(selected);
    if (selected > -1) {
        console.log("here");
        console.log(selected);
        array.getItem(selected).style = "selected";
    }
    closeCallback = args.closeCallback;
    var modalPage = args.object;
    if (frame.topmost().currentPage.modal !== args.object) {
        throw new Error("Error");
    }
}
exports.onShownModally = onShownModally;
function listViewItemTap(args) {
    console.log("list view item select");
    console.log(args.index);
    closeCallback(args.index);
}
exports.listViewItemTap = listViewItemTap;
//# sourceMappingURL=modalView.js.map