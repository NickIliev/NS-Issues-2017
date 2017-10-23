
var createViewModel = require("./main-view-model").createViewModel;
var vm = createViewModel();

function onNavigatingTo(args) {

    var page = args.object;

    page.bindingContext = vm;
}
exports.onNavigatingTo = onNavigatingTo;

function toggle() {
    console.log("toggle'")
    vm.set("isItemVisible", !vm.get("isItemVisible"));
}
exports.toggle = toggle;