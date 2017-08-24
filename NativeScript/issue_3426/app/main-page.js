"use strict";
var observable_1 = require("data/observable");
var vm = new observable_1.Observable();
function navigatingTo(args) {
    var page = args.object;
    vm.set("myItems", [{ color: "red", id: 1 }, { color: "blue", id: 2 }, { color: "green", id: 3 }]);
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    var item = args.view.bindingContext;
    console.log('item.id', item.id);
}
exports.onTap = onTap;
;
//# sourceMappingURL=main-page.js.map