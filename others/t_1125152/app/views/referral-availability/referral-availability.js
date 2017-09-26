var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var utility = require("~/common/utility");
var token = require("~/common/token");
var utils = require("utils/utils");
var firebase = require("nativescript-plugin-firebase");
var View = require("~/common/view-base");
var ReferralAvailabilityViewModel = require("./referral-availability-view-model");
var view = new View();

view.viewModel = new ReferralAvailabilityViewModel();
var page = null;
var apptInfo = null;

//var orderList = new OrderViewModel([]);
//var pageData = new Observable({
//    orderList: orderList,
//    order: ""
//});


view.loaded = function (args) {
    var that = view;

    //that.initialize(args, options);

    page = args.object;

    apptInfo = args.navigationContext;
    //console.log("availability", JSON.stringify(apptInfo));

    that.viewModel.set("referralProvider", apptInfo.referralProvider);
    that.viewModel.set("date", "Date: " + apptInfo.date);
    that.viewModel.set("orderingProvider", "Ordering Provider: " + apptInfo.orderingProvider);

    that.viewModel.load(apptInfo);
};

view.showTimes = function (args) {
    var that = view;
    var rowID = args.object.rowID;
    var locationID = args.object.locationID;

    //console.log(rowID);

    if (args.object.id != "calendardate") {
        var rowID = args.object.rowID;
        var locationID = args.object.locationID;
        locationID = locationID.split("LocationIndex");
        locationID = locationID[1];

        var locationArray = [];
        that.viewModel.providerLocations.Data.forEach(function (item) {
            locationArray.push(item);
        })
        for (var i = 0; i < locationArray[locationID].NewDates.length; i++) {
            page.getViewById(locationArray[locationID].NewDates[i].RowID).visibility = "collapsed";
            page.getViewById(locationArray[locationID].NewDates[i].RowID + 'date').className = "days";
            page.getViewById(locationArray[locationID].NewDates[i].RowID).className = "hide";
        }
        page.getViewById(rowID).visibility = "visible";
        page.getViewById(rowID).className = "show";
        console.log(page.getViewById(rowID).className);
        page.getViewById(rowID + 'date').className = "daysSelected";
        if (locationArray[locationID].NewDates.length == 5) {
            page.getViewById("calendardate").className = "moreTimes";
        }
        //console.log(locationArray[locationID].NewDates.length);
        if (locationArray.length > 0) {
            while (locationArray.length) {
                locationArray.pop();
            }
        }
        //console.log(page.getViewById(rowID).visibility);
    } else {
        view.showCalendar();
    }
};

var buttonID = [];

view.selectAppt = function (args) {
    var that = view;
    console.log("insurance", args.object.insurance);

    if (args.object.id != 'btnMoreTimes') {
        if (buttonID.length > 1) {
            buttonID.shift();
        }

        //uncomment to use for apptGrid
        args.object.className = "daysSelected";
        buttonID.push(args.object);
        if (buttonID.length > 1) {
            buttonID[0].className = "days";
            buttonID[1].className = "daysSelected";
        }
        //console.log("locationIndex", args.object.locationIndex);
        //console.log("locationID js", args.object.locationID);
        var itemIndex = args.object.locationIndex.split("LocationIndex");
        itemIndex = parseInt(itemIndex[1]);
        //console.log("itemIndex", itemIndex);
        var location = view.viewModel.providerLocations.Data.getItem(itemIndex);

        //console.log(JSON.stringify(location));
        
        var apptTime = args.object.apptTime;
        apptTime = apptTime.split(":");
        apptTime = apptTime[0] + ":" + apptTime[1];
        var restrictedMessage = location.RestrictedMessage;
        console.log("restrictedMessage", restrictedMessage);
        var context = {
            title: "Insurance Restriction",
            message: restrictedMessage,
            okButtonText: "CONTINUE",
            cancelButtonText: "CANCEL"
        };
        var moduleName = "views/referral-request-appointment/main/";
        var content = {
            AthenaPatientId: apptInfo.AthenaPatientId,
            AppointmentDate: args.object.apptDate,
            AppointmentTime: apptTime,
            AppointmentTypeId: args.object.apptTypeID,
            AppointmentId: args.object.apptID,
            DepartmentId: args.object.deptID,
            DisplayTime: args.object.displayTime,
            LocationId: args.object.locationID,
            PractitionerID: apptInfo.practitionerID,
            ProviderId: args.object.provID,
            referral: apptInfo.referral,
            reqID: apptInfo.reqID,
            fullName: apptInfo.fullName,
            email: apptInfo.email,
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
            distance: location.Location.Distance,
            dob: apptInfo.dob,
            zipCode: apptInfo.zipCode
        };
        frameModule.topmost().navigate({ moduleName, context: content });
        //if (args.object.insurance == true) {
        //    utility.launchPopup("confirm", function (data) {
        //        frameModule.topmost().navigate({ moduleName, context: content });
        //    }, function (data) {
        //        args.object.className = "days";
        //    }, context);
        //} else {
        //    frameModule.topmost().navigate({ moduleName, context: content });
        //}
    } else {
        view.showCalendar(args)
    }

};

view.showCalendar = function (args) {
    var index = args.object.locationIndex.split("LocationIndex");
    index = index[1];
    var location = view.viewModel.providerLocations.Data.getItem(index);
    var address = location.Location.Address1 + ', ' + location.Location.City + ', ' + location.Location.State + ' ' + location.Location.PostalCode;
    frameModule.topmost().navigate({
        moduleName: "components/calendar/calendar/",
        context: {
            token: apptInfo.token,
            location: location,
            apptInfo: apptInfo
        },
        animated: false
    });

    //var context = {
    //    token: apptInfo.token,
    //    location: location,
    //    apptInfo: apptInfo
    //}
    //token.showCalendar("action", function (data) {
    //    // callback
    //}, null, context);
    firebase.analytics.logEvent({
        key: "SMNShowApptCalendar",
        parameters: [
        {
            key: "Location",
            value: address
        }]
    });
}


view.contact = function (args) {

    //console.log(args.object.phone);

    //analytics.trackEvent('LinkClick.CallUH');
    utils.openUrl("tel://" + args.object.phone);
}

view.goBack = function () {
    console.log("go back");
    topmost.goBack();
};

view.viewProfile = function () {
    var that = view;
    that.viewModel.viewProfile();
}

module.exports = view;
