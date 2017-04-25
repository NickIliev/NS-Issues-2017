var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;

    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

function onCreatingView(args) {
    var view = args.object;

    console.log("onCreatingView");
    console.log(view);
}
exports.onCreatingView = onCreatingView;