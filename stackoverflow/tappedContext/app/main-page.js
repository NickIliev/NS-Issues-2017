var RegisterViewModel = require("./main-view-model").RegisterViewModel;
var frameModule = require('ui/frame');

var viewModel = new RegisterViewModel();

exports.getInfo = function (args) {
    
    var info = args.view.bindingContext;
    console.log(info["name"]); // e.g. info["name"] === "Reg4"
    // info is Object of type { name: "Reg4" }

    var navigationEntry = {
        moduleName: "RegisterDetails",
        context: { name: info["name"] }
    }
    frameModule.topmost().navigate(navigationEntry);
}

exports.loaded = function (args) {
    args.object.bindingContext = viewModel;
}


