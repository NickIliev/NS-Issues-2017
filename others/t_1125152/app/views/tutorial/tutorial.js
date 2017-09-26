var firebase = require("nativescript-plugin-firebase");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var applicationSettings = require("application-settings");
var View = require("~/common/view-base")
var TutorialViewModel = require("./tutorial-view-model");

var view = new View();
view.viewModel = new TutorialViewModel();

view.loaded = function (args) {
    var that = view;

    var options = {
        pageName: "FindPHR"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");

    applicationSettings.setNumber("tutorial", 1);
};

view.next = function (args) {
    console.log('Next slide');
    slideContainer.nextSlide();
}

view.prev = function (args) {
    console.log('Previous slide');
    slideContainer.previousSlide();
}

view.skipTutorial = navigation.launchReferralEase;

module.exports = view;

