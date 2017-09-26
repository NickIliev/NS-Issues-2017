var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var Observable = require("data/observable").Observable;
var webViewInterfaceModule = require('nativescript-webview-interface');
var utility = require("~/common/utility");
var page;
var oLangWebViewInterface;

var calendarViewModel = require("~/components/calendar/calendar-view-model");

var view = new Observable();
var location = "";
var apptInfo = "";
view.viewModel = calendarViewModel;

view.loaded = function (args) {
    var that = view;
    that.page = args.object;

    var webView = that.page.getViewById('webView');
    oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/calendar/index.html');

    console.log("webview loaded");
    console.log("page", webView);

    that.page.bindingContext = calendarViewModel.webViewInterfaceDemoVM;

    location = args.object.navigationContext.location;
    apptInfo = args.object.navigationContext.apptInfo;


    console.log(JSON.stringify(location));
    console.log(JSON.stringify(apptInfo));

    //that.viewModel.load(that.navigationContext);

    view.listenLangWebViewEvents();
}

view.onShowingModally = function (args) {
    var that = view;
    that.page = args.object;

    // if (that.page.ios && that.page.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
    //     that.page.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    // }
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;

    location = args.context.location;
    apptInfo = args.context.apptInfo;

    //console.log("location ID",JSON.stringify(location.Location.LocationID));
    //view.viewModel.set("closeCallBack", args.closeCallback);

    //if (frame.topmost().currentPage.modal !== args.object) {
    //throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; page.id: ${that.page.id}`);
    //}
}

/**
 * Adds language to webView dropdown
 */
view.addLanguage = function () {
    //console.log("addLanguage", JSON.stringify(location));
    oLangWebViewInterface.callJSFunction('addNewLanguage', location);
}

view.destroyView = function () {
    oLangWebViewInterface.callJSFunction('destroyWebView', null);
}

view.close = function () {
    var that = view;
    console.log("close");
    topmost.goBack();
    //console.log("destroy", oLangWebViewInterface.destroy());
    //view.destroyView();
    //oLangWebViewInterface.destroy();
    //if (that.closeCallback) {
    //    console.log("close");
    //    console.log("confirmation", confirmation);
    //    that.closeCallback(confirmation);
    //} else {
    //    frameModule.topmost().goBack();
    //}
}

view.onTapContinue = function (args) {
    view.close(true);
}

view.onTapLeave = function (args) {
    view.close(false);
    frameModule.topmost().navigate({
        moduleName: "views/welcome/main/",
        clearHistory: true,
        transition: {
            name: "slideRight",
            duration: 0
        }
    });
}

/**
 * Initializing webview only ater page navigation.
 */
view.navigatedTo = function (args) {
    console.log("navigated to");
    //view.setupWebViewInterface(page);
}
view.navigatedFrom = function () {
    //view.oLangWebViewInterface.destroy();
}
/**
 * Handles any event/command emitted by language webview.
 */
view.listenLangWebViewEvents = function () {
    console.log("listenWebViewEvents");
    // handles language selectionChange event.

    oLangWebViewInterface.on('onload', function () {
        view.addLanguage();
    });

    oLangWebViewInterface.on('languageSelection', function (event) {
        //var apptTime = args.object.apptTime;
        //apptTime = apptTime.split(":");
        //apptTime = apptTime[0] + ":" + apptTime[1];

        var apptTime = event.DateView.split("\n");
        console.log("appttime", apptTime[1]);
        console.log("calendar insurance location", location.IsInsuranceRestricted);
        var content = {
            AthenaPatientId: apptInfo.AthenaPatientId,
            AppointmentDate: event.AppointmentDate,
            AppointmentTime: event.AppointmentTime,
            AppointmentTypeId: event.AppointmentTypeId,
            AppointmentId: event.AppointmentId,
            DepartmentId: event.DepartmentID,
            DisplayTime: apptTime[1],
            LocationId: location.Location.LocationID,
            PractitionerID: apptInfo.practitionerID,
            ProviderId: event.ProviderID,
            referral: apptInfo.referral,
            reqID: apptInfo.reqID,
            patientMRN: apptInfo.patientMRN,
            token: apptInfo.token,
            orderReason: apptInfo.orderReason,
            orderingProvider: apptInfo.orderingProvider,
            searchTerm: apptInfo.searchTerm,
            practitionerName: apptInfo.practitionerName,
            date: apptInfo.date,
            address: location.Location.Address1,
            cityStateZip: location.Location.CityStateZip,
            phone: location.Location.AppointmentPhone,
            distance: location.Location.Distance
        }

        var moduleName = "views/referral-request-appointment/main/"
        console.log("context", JSON.stringify(content));

        if (location.IsInsuranceRestricted == true) {
            var context = {
                title: "Insurance Restriction",
                message: "SuperMed not accepted at " + location.Location.Address1 + ". Continue?",
                okButtonText: "Close"
            };
            utility.launchPopup("confirm", function (data) {
                frameModule.topmost().navigate({ moduleName, context: content
                });
                //view.close();
            }, null, context);
        } else {
            frameModule.topmost().navigate({ moduleName, context: content });
            //view.close();
        }
    });
}

module.exports = view;