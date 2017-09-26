var Observable = require("data/observable").Observable;
var imageSource = require("image-source");

var View = require("~/common/view-base");
var tabViewUtil = require("~/components/tabview-util");

var accessUHUtil = require("~/components/access-uh/access-uh-util");

var WelcomeViewModel = require("./welcome-view-model");

var view = new View();
view.viewModel = new WelcomeViewModel();

view.loaded = function(page) {    
    var that = view;
    that.page = page;

    // check if explore health parameter
    that.navigationContext = that.page.navigationContext;
    if (that.navigationContext && that.navigationContext.explore) {
        tabViewUtil.selectTab(that.viewModel, that.page, 1);
    }
    else {
        tabViewUtil.selectTab(that.viewModel, that.page, 0);
    }
};

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};
  
view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);
   
};

module.exports = view;
