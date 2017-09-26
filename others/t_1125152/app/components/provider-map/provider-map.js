var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var applicationSettingsModule = require("application-settings");
var mapsModule = require("nativescript-google-maps-sdk");
var token = require("~/common/token");
var utility = require("~/common/utility");
var firebase = require("nativescript-plugin-firebase");
var navigation = require("~/components/navigation");
var utils = require("utils/utils");

var providerMapViewModel = require("~/components/provider-map/provider-map-view-model");

var userToken;
var mapView;
var locations = null;
var apptInfo = null;
var bookInfo = null;
var provInfo = null;
var pageTitle = null;
var view = new Observable();
view.viewModel = providerMapViewModel;

view.onShowingModally = function (args) {
    var that = view;
    userToken = args.context.token;
    that.page = args.object;
    that.navigationContext = args.context.data;
    pageTitle = args.context.data.pageTitle;
    if (pageTitle == "Referral Providers") {
        bookInfo = args.context.data;
        apptInfo = args.context.apptVars;
    } else {
        provInfo = args.context.data;
    }

    //console.log("providerMap info", JSON.stringify(args.context.data));

    //console.log("providerMap bookInfo", JSON.stringify(bookInfo));

    //console.log("providerMap apptInfo", JSON.stringify(apptInfo));

    that.page.bindingContext = providerMapViewModel;

    that.viewModel.load(that.navigationContext);

    that.page = args.object;

    locations = that.navigationContext;

    //applicationSettingsModule.setBoolean("isShowingModal", true);
    // if (that.page.ios && that.page.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
    //     that.page.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    // }
}

view.onShownModally = function (args) {
    var that = view;
    that.closeCallback = args.closeCallback;

    //if (frame.topmost().currentPage.modal !== args.object) {
    //throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; page.id: ${that.page.id}`);
    //}
}

view.closeMapView = function () {
    var that = view;
    that.closeCallback();
}

view.onMapReady = function (args) {
    var that = view;
    mapView = args.object;
    console.log("Map Ready");
    that.viewModel.set("isMapInitialized", true);

    if (pageTitle == "Referral Providers") {
        token.updateToken(userToken);
        locations.Locations.forEach(function (item) {
            console.log(item.Location.City + ", Lat: " + item.Location.Coordinates.Latitude + ", Lon: " + item.Location.Coordinates.Longitude);
            var marker = new mapsModule.Marker();
            var distance = parseFloat(item.Location.Distance).toFixed(2);
            marker.position = mapsModule.Position.positionFromLatLng(item.Location.Coordinates.Latitude, item.Location.Coordinates.Longitude);
            marker.title = item.Location.City;
            marker.snippet = item.Location.Address1 + (item.Location.Address2 != null ? " " + item.Location.Address2 : "") + (item.Location.Distance != null ? " (" + distance + "mi)" : "");
            mapView.addMarker(marker);
        }, this);
    } else {

        locations.Locations.forEach(function (item) {
            console.log(item.City + ", Lat: " + item.Coordinates.Latitude + ", Lon: " + item.Coordinates.Longitude);
            var marker = new mapsModule.Marker();
            var distance = parseFloat(item.Distance).toFixed(2);
            marker.position = mapsModule.Position.positionFromLatLng(item.Coordinates.Latitude, item.Coordinates.Longitude);
            item.City = item.City.split(" (");
            item.City = item.City[0];
            marker.title = item.City;
            marker.snippet = item.Address1 + (item.Address2 != null ? " " + item.Address2 : "") + (item.Distance != null ? " (" + distance + " mi)" : "");
            mapView.addMarker(marker);
        }, this);
    }

    //add markers for location search results

    //var i = -1;
};

view.onMarkerSelect = function () {
    token.updateToken(userToken);
}

view.markerInfoWindowTapped = function () {
    token.updateToken(userToken);
}

view.onCameraChanged = function () {
    token.updateToken(userToken);
}

view.selectAppt = function () {
    var that = this;
    //console.log("bookInfo", JSON.stringify(bookInfo));
    //console.log("apptInfo", JSON.stringify(apptInfo));
    view.closeMapView();
    token.updateToken(userToken);
    var startDate = bookInfo.NextAvailableDate.split("T");
    startDate = startDate[0];
    var endDate = new Date(bookInfo.NextAvailableDate);
    endDate.setDate(endDate.getDate() + 7);
    frameModule.topmost().navigate({
        moduleName: "views/referral-availability/referral-availability/",
        context: {
            AthenaPatientId: apptInfo.AthenaPatientId,
            date: apptInfo.date,
            endDate: endDate,
            image: bookInfo.Image,
            lat: that.lat,
            lon: that.lon,
            orderingProvider: apptInfo.orderingProvider,
            orderReason: apptInfo.orderReason,
            patientMRN: apptInfo.patientMRN,
            fullName: apptInfo.fullName,
            practitionerName: bookInfo.FullName,
            practitionerID: bookInfo.PractitionerID,
            preferred: bookInfo.PreferredProvider,
            searchTerm: apptInfo.searchTerm,
            referral: apptInfo.referral,
            reqID: apptInfo.reqID,
            token: apptInfo.token,
            startDate: startDate,
            rating: bookInfo.Rating,
            dob: apptInfo.dob,
            zipCode: apptInfo.zipCode,
            bestMatch: bookInfo.BestMatch
        }
    });
}

view.requestAnAppointment = function (args) {
    var that = this;
    view.closeMapView();
    console.log("item index", provInfo.Degree);
    navigation.goToRequestedAppointment({
        FullName: provInfo.FullName,
        Degree: provInfo.Degree,
        Specialties: provInfo.Specialties
    });
};

view.onTapZocDocWidget = function (args) {
    var that = view;
    var provider = args.object.bindingContext;
    console.log("item index", args.object.index);
    console.log("provider.ZocDocId :" + provider.ZocDocId)
    view.closeMapView();
    if (provider.ZocDocId != null) {

        console.log("provider.ZocDocId :" + provider.ZocDocId)

        utility.leavingapp(function (data) {

            firebase.analytics.logEvent({
                key: "ScheduleOnZocDoc",
                parameters: [
                {
                    key: "ZocDocId",
                    value: provider != null && provider.ZocDocId != null ? provider.ZocDocId.toString() : null
                },
                {
                    key: "ProviderID",
                    value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
                }]
            });
            utils.openUrl("http://www.zocdoc.com/doctor/" + provider.ZocDocId);
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    else {
        that.viewModel.showError("There was an error opening ZocDoc scheduling for this provider.");
    }
};

view.callAppointmentNumber = function (args) {
    console.log("item index", args.object.index);
    view.closeMapView();
    var provider = args.object.bindingContext;

    firebase.analytics.logEvent({
        key: "ProviderCallToSchedule",
        parameters: [
        {
            key: "ProviderID",
            value: provider != null && provider.ProviderID != null ? provider.ProviderID.toString() : null
        }]
    });
    var appointmentNumber = args.object.bindingContext.AppointmentPhone ? args.object.bindingContext.AppointmentPhone : navigation.callToSchedule();
};


view.onUnloaded = function () {
    var that = view;

    that.viewModel.reset();

    token.updateToken(userToken);
    applicationSettingsModule.setBoolean("isShowingModal", false);
}

view.close = function (confirmation) {
    var that = view;

    if (that.closeCallback) {
        that.closeCallback(confirmation);
    }
    else {
        frame.topmost().goBack();
    }
}

view.onTapContinue = function (args) {
    view.close(true);
}

view.onTapCancel = function (args) {
    view.close(false);
}

module.exports = view;