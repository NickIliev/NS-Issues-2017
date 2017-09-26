var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");

var View = require("~/common/view-base")

var VideoViewModel = require("./video-view-model");

var view = new View();
view.viewModel = new VideoViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "VideoTest"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
    
    that.viewModel.load();
    
};

module.exports = view;