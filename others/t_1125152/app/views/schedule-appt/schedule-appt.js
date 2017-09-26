var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var View = require("~/common/view-base")
var ScheduleApptViewModel = require("./schedule-appt-view-model");
var tabViewUtil = require("~/components/tabview-util");
var firebase = require("nativescript-plugin-firebase");
var utility = require("~/common/utility");
var utils = require("utils/utils");

var view = new View();
view.viewModel = new ScheduleApptViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

};


view.launchReferralEase = function(args) {
    navigation.launchReferralEase(args);
    firebase.analytics.logEvent({
        key: "TapTileSMN",
        parameters: [
        {
            key: "Name",
            value: "Schedule Specialist"
        }]
    });

}

view.callToSchedule = function(args) {
    navigation.callToSchedule(args);
    firebase.analytics.logEvent({
        key: "TapTileSMN",
        parameters: [
        {
            key: "Name",
            value: "Schedule By Phone"
        }]
    });
}

view.goToRequestedAppointment = function(args) {
    navigation.goToRequestedAppointment(args);
    firebase.analytics.logEvent({
        key: "TapTileSMN",
        parameters: [
        {
            key: "Name",
            value: "Request Online"
        }]
    });
}

//Adding Tap Functionality for Tiles Pediatrician and Schedule Primary Care

view.SchedulePrimaryCare = function (args) {
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "TapTileSMN",
            parameters: [
            {
                key: "LinkClick",
                value: "Schedule PrimaryCare"
            }]
        });
        
        utils.openUrl("https://www.zocdoc.com/hospitals/uhcampaign");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        
    });
};



view.SchedulePediatrician = function (args) {
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "TapTileSMN",
            parameters: [
            {
                key: "LinkClick",
                value: "Schedule Pediatrician"
            }]
        });
        
        utils.openUrl("https://www.zocdoc.com/hospitals/uhpediatrics");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        
    });
};

view.showAccessUH = function (args) {
    //view.viewModel.set("selectedScreen", 0);
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




module.exports = view;