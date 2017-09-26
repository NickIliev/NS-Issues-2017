var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var RequestAppConfirmarionViewModel = require("./requestappointmentconfirmation-view-model");
//var clipboard = require("nativescript-clipboard");

var view = new View();
view.viewModel = new RequestAppConfirmarionViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

   
    that.navigationContext = that.page.navigationContext;
    that.viewModel.set("referenceid", that.navigationContext.referenceid);
};

view.showAccessUH = function (args) {
    /*view.viewModel.set("selectedScreen", 0);*/
    navigation.goToAccessUH();
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};


//view.tpcopyReferenceNumber = function (args) {
//    var that = view;
//    clipboard.setText("Something relevant to put on the clipboard.").then(function() {
//      console.log("OK, copied to the clipboard");
//  })

//};



module.exports = view;