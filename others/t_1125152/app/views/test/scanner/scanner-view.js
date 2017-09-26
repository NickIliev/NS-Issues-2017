var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");

var View = require("~/common/view-base")

var ScannerViewModel = require("./scanner-view-model");

var view = new View();
view.viewModel = new ScannerViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "ScannerTest"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
    
    that.viewModel.load();
    
};

view.scan = function (args) {
    var that = view;
    
    that.viewModel.scan();
};

module.exports = view;