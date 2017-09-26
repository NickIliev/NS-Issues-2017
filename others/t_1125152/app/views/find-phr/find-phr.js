var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var disclaimerUtil = require("~/components/disclaimer-util");
var tabViewUtil = require("~/components/tabview-util");

var FindPHRViewModel = require("./find-phr-view-model");
var navigation = require("~/components/navigation");

var view = new View();
view.viewModel = new FindPHRViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");
    that.viewModel.set("isLoading", false);
    tabViewUtil.selectTab(that.viewModel, that.page, 0);

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

view.tilePHRTap = function (args) {
    var that = view;
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "UH PHR"
            }]
        });
        utils.openUrl("https://uhhospitals.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/Options");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });

};

view.tileAthenaPHR = function (args) {
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "Athena PHR"
            }]
        });
        utils.openUrl("https://1926-1.portal.athenahealth.com/");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });

};


view.tileElyriaPHR = function (args) {
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "Elyria PHR"
            }]
        });
        
        utils.openUrl("https://emh-healthcare.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/Index");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        
    });
};

view.tileParmaPHR = function (args) {
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "Parma PHR"
            }]
        });
        utils.openUrl("https://myuhcareparma.org/Phm-PhmPage.HomePage.WR.mthr?application=phm&hcis=PCG.LIVEF");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.tilePortagePHR = function (args) {
    console.log("tilePortagePHR");
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "Portage PHR"
            }]
        });
        utils.openUrl("https://portal.robinsonmemorial.org/SPP/Anonymous/Login.aspx");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.tileStJohnPHR = function (args) {
    console.log("tileStJohnPHR");
    utility.leavingapp(function (data) {
        firebase.analytics.logEvent({
            key: "FindPHR",
            parameters: [
            {
                key: "LinkClick",
                value: "John PHR"
            }]
        });
        utils.openUrl("http://www.uhhospitals.org/myuhcare/my-personal-health-record/uh-st-john-personal-health-record");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

module.exports = view;
