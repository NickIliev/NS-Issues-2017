var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var utils = require("utils/utils");
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var validator = require("email-validator");
var frame = require("ui/frame");
var http = require("http");
var firebase = require("nativescript-plugin-firebase");
var token = require("~/common/token");
var appSettings = require("application-settings");
var Calendar = require("nativescript-calendar");
var app = require('application');

var View = require("~/common/view-base");

var ReferralRequestConfirmationViewModel = require("./referral-request-confirmation-view-model");

var view = new View();
view.viewModel = new ReferralRequestConfirmationViewModel();
var page;
var emailAddress;
var apptInfo;
var orderCount = appSettings.getNumber("orderCount");

view.loaded = function (page) {
    if (app.ios) {
        var controller = topmost.ios.controller;
        controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
    }
    appSettings.setBoolean("hideActionBar", true);
    var that = view;
    that.page = page;

    var emailContainer = that.page.getViewById("emailContainer");
    emailAddress = that.page.getViewById("emailAddress");
    emailContainer.animate({
        translate: { x: 0, y: 1000 },
        opacity: 0
    });

    //if (app.android) {
    //    app.android.on(app.AndroidApplication.activityBackPressedEvent, view.backEvent());
    //}

    //console.log("orderCount", orderCount);
    //that.viewModel.set("Email", apptInfo.email);
    that.viewModel.set("orderCount", orderCount);
    that.viewModel.set("isLoading", true);

    apptInfo = that.page.navigationContext;
    //console.log("email", apptInfo.email);
    //console.log("zipCode", apptInfo.zipCode);
    that.viewModel.set("Email", apptInfo.email);

    token.updateToken(apptInfo.token);
    var AppointmentStartDate = apptInfo.AppointmentDate;
    var date = AppointmentStartDate.split("T");

    var content = JSON.stringify({
        ReferralType: apptInfo.searchTerm,
        AppointmentStartDate: date[0],
        StartTime: apptInfo.AppointmentTime,
        AppointmentId: apptInfo.AppointmentId,
        AthenaPatientId: apptInfo.AthenaPatientId,
        ProviderId: apptInfo.ProviderId,
        DepartmentId: apptInfo.DepartmentId,
        LocationId: apptInfo.LocationId,
        PractitionerId: apptInfo.PractitionerID,
        RequisitionId: apptInfo.reqID
    });
    console.log("confirmation request", content);
    http.request({
        url: constants.referralEaseUrl + "Referral/BookAppointment",
        method: "POST",
        headers: { "Content-Type": "application/json", "token": apptInfo.token },
        content
    }).then(function (response) {
        var response = response.content.toJSON();
        console.log("response", JSON.stringify(response));
        console.log("response type", response.ResponseType);
        token.updateToken(apptInfo.token);
        if (response.ResponseType == 1) {
            if (response.Data.error == null || response.Data.error == '') {
                view.viewModel.set("isSuccess", true);
                view.viewModel.set("confirmationNumber", response.Data.AppointmentId);
                view.viewModel.load(apptInfo);
                console.log("appointment created");
            } else {
                view.viewModel.load(apptInfo);
                view.viewModel.set("isSuccess", false);
                view.viewModel.set("errorMessage", "There was a problem scheduling this appointment. Please contact University Hospitals at 1-866-UH4-CARE for further assistance.");
                console.log("appointment fail");
            }
        } else if (response.ResponseType == 6) {
            view.viewModel.load(apptInfo);
            view.viewModel.set("isSuccess", false);
            view.viewModel.set("errorMessage", "There was a problem scheduling this appointment. Please contact University Hospitals at 1-866-UH4-CARE for further assistance.");
            console.log("appointment fail");
        }
        that.viewModel.set("isLoading", false);
        appSettings.setBoolean("hideActionBar", false);
    }, function (error) {
        console.error(JSON.stringify(error));
        view.viewModel.set("isLoading", false);
        view.viewModel.set("isSuccess", false);
    });
};

view.emailShow = function () {
    var that = view;
    var emailContainer = that.page.getViewById("emailContainer");
    emailContainer.animate({
        translate: { x: 0, y: 0 },
        opacity: 1
    });
    if(apptInfo.email){
        emailAddress.text = apptInfo.email;
    }
}

view.emailHide = function () {
    var that = view;
    var emailContainer = that.page.getViewById("emailContainer");
    emailContainer.animate({
        translate: { x: 0, y: 1000 },
        opacity: 0
    });
    emailAddress.text = "";
}

view.clearEmail = function () {
    var that = view;
    that.viewModel.set("Email", null);
}

view.backToOrders = function () {
    var that = view;
    token.updateToken(apptInfo.token);
    topmost.navigate({
        moduleName: "views/orders/orders/",
        backstackVisible: false,
        clearHistory: true,
        transition: {
            name: "slideRight"
        },
        context: {
            reqID: apptInfo.reqID,
            patientMRN: apptInfo.patientMRN,
            Agreement: false,
            token: apptInfo.token,
            dob: apptInfo.dob,
            fullName: apptInfo.fullName,
            zipCode: apptInfo.zipCode,
            AthenaPatientId: apptInfo.AthenaPatientId,
            Skip: 0,
            Take: 5
        }
    });
    console.log("back to orders", JSON.stringify(topmost.navigate));
};

view.callOffice = function (args) {
    console.log("cllcked");
    //    utils.openUrl("tel://" + args.object.phone);
}

view.isValidEmail = function () {
    if (validator.validate(emailAddress.text)) {
        view.submit();
    } else {
        var context = {
            title: "Invalid Email",
            message: "Please check the email address.",
            okButtonText: "Try Again",
            cancelButtonText: "Contact UH"
        }
        utility.launchPopup("action", function (data) {
            // callback
        }, null, context);
    }
    console.log("email address", emailAddress.text);
    return validator.validate(emailAddress.text);
    console.log("validate", validator.validate(emailAddress.text));
};

view.submit = function () {
    var that = view;
    var content = JSON.stringify({
        ContactEmailAddress: emailAddress.text,
        RequisitionNumber: apptInfo.reqID
        //ConfirmationNumber: that.viewModel.confirmationNumber,
        //PractitionerName: apptInfo.practitionerName,
        //PatientName: apptInfo.fullName,
        //ReferringPractitionerName: apptInfo.orderingProvider,
        //AppointmentDate: that.viewModel.appointmentDate,
        //AppointmentTime: apptInfo.DisplayTime,
        //AppointmentAddress: apptInfo.address + ', ' + apptInfo.cityStateZip,
        //OfficePhone: apptInfo.phone,
        //ReferralType: apptInfo.searchTerm
    });
    console.log("email content", content);
    http.request({
        url: constants.referralEaseUrl + "ReferralEaseEmail/AppointmentConfirmationEmail",
        method: "POST",
        headers: { "Content-Type": "application/json", "token": apptInfo.token },
        content: JSON.stringify({
            ContactEmailAddress: emailAddress.text,
            RequisitionNumber: apptInfo.reqID
            //ConfirmationNumber: that.viewModel.confirmationNumber,
            //PatientName: apptInfo.fullName,
            //ReferringPractitionerName: apptInfo.orderingProvider,
            //PractitionerName: apptInfo.practitionerName,
            //AppointmentDate: that.viewModel.appointmentDate,
            //AppointmentTime: apptInfo.DisplayTime,
            //AppointmentAddress: apptInfo.address + ', ' + apptInfo.cityStateZip,
            //OfficePhone: apptInfo.phone,
            //ReferralType: apptInfo.searchTerm
        })
    }).then(function (response) {
        var response = response.content.toJSON();
        console.log("email response", JSON.stringify(response));
        token.updateToken(apptInfo.token);
        if (response.ResponseType == 1) {
            console.log("success");
            var context = {
                title: "Success!",
                message: "Your appointment details were emailed to " + emailAddress.text + "."
            }
            utility.launchPopup("action", function (data) {
                token.updateToken(that.viewModel.token);
                view.emailHide();
            }, null, context);
        } else {
            var context = {
                title: "There was problem sending your email",
                message: "We encountered a problem sending your email. Please try again."
            }
            utility.launchPopup("action", function (data) {
                token.updateToken(that.viewModel.token);
                // callback
            }, null, context);
        }
        that.viewModel.set("isLoading", false);
    }, function (error) {
        console.error(JSON.stringify(error));
        view.viewModel.set("isLoading", false);
    });
    firebase.analytics.logEvent({
        key: "SMNEmailApptDetails"
    });

}


view.addToCalendar = function () {
    Calendar.requestPermission().then(
        function () {
            Calendar.hasPermission().then(
                function (result) {
                    view.createCalItem();
                }
            );
            console.log("Calendar permission requested");
        }
    );
    firebase.analytics.logEvent({
        key: "SMNAddToCalendarApptDetails"
    });
}

view.createCalItem = function () {
    var that = view;
    var date = apptInfo.AppointmentDate;
    date = date.replace("00:00:00", apptInfo.AppointmentTime + ":00");
    console.log("raw date", date);
    date = new Date(date).toUTCString();
    date = date.split(" ");
    var day = date[0].replace(",", "");
    date = day + " " + date[2] + " " + date[1] + " " + date[3] + " " + date[4];
    console.log("test date", new Date());
    console.log("UTC date", date);
    console.log("start date", new Date(date));
    console.log("end date", new Date(new Date(date).getTime() + (60 * 60 * 1000)));
   var options = {
        title: 'Referral Appointment with ' + apptInfo.practitionerName,
        // Make sure these are valid JavaScript Date objects.
        // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
        startDate: new Date(date),
        endDate: new Date(new Date(date).getTime() + (60 * 60 * 1000))
    };

    options.location = apptInfo.address + ', ' + apptInfo.cityStateZip;
    options.notes = 'Confirmation No.: ' + that.viewModel.confirmationNumber + '\n' + 'Practioner Name: ' + apptInfo.practitionerName + '\nDate/Time: ' +options.startDate + '\nAddress: ' + apptInfo.address + ', ' + apptInfo.cityStateZip + '\nOffice Phone: ' + apptInfo.phone;

    // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field.
    //options.url = 'http://my.shoppinglist.com';

    // You can also override the default reminder(s) of the Calendar (in minutes):
    options.reminders = {
        first: 30,
        second: 10
    };

    // You can make this Event recurring (this one repeats every other day for 10 days):
    //options.recurrence = {
    //    frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY
    //    interval: 2, // once in every 2 days
    //    endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days
    //};

    // Want to use a custom calendar for your app? Pass in the 'name'.
    // If the name doesn't yet exist the plugin will create it for you.
    //options.calendar = {
    //    name: "NativeScript Cal",
    //    // the color, in this case red
    //    color: "#FF0000",
    //    // Can be used on Android to group the calendars. Examples: Your app name, or an emailaddress
    //accountName: "My App Name"
    //};
    var context = {
        title: "Add to Calendar",
        message: "Add appointment with " + apptInfo.practitionerName + " to your calendar?",
        okButtonText: "Close"
    };
    utility.launchPopup("confirm", function (data) {
        Calendar.createEvent(options).then(
            function (createdId) {
                var context = {
                    title: "Add to Calendar",
                    message: "Add appointment with " + apptInfo.practitionerName + " to your calendar?",
                    okButtonText: "Close"
                };
                utility.launchPopup("action", function (data) {
                    // callback
                    view.addedToCal();
                }, null, context);
                console.log("Event created with ")
            },
            function (error) {
                var context = {
                    title: "Error",
                    message: "An error occured adding appointment to calendar: " + error,
                    okButtonText: "Close"
                };
                utility.launchPopup("action", function (data) {
                    // callback
                }, null, context);
                console.log("doCreateEvent error: " + error);
            }
        );
    }, null, context);
}

view.goBack = function () {
    console.log("confirm go back");
    //topmost.navigate({
    //    moduleName: "views/referral-request-appointment/main/",
    //    backstackVisible: false,
    //    clearHistory: true,
    //    context: apptInfo,
    //    transition: {
    //        name: "slideRight"
    //    }
    //});
    topmost.goBack();
};

view.backToMain = function () {
    token.deleteToken(apptInfo.token);
    topmost.navigate({
        moduleName: "views/welcome/main/",
        backstackVisible: false,
        clearHistory: true,
        transition: {
            name: "slideRight"
        }
    });
};

if (app.android) {
    var activity = app.android.startActivity || app.android.foregroundActivity || frameModule.topmost().android.currentActivity || frameModule.topmost().android.activity;
    activity.onBackPressed = function () {
        if (view.viewModel.isLoading == false && view.viewModel.isSuccess == true) {
            console.log("back press");
            view.confirmBackToMain();
        } else {
            view.goBack();
        }
    }
}

view.confirmBackToMain = function () {
    if (view.viewModel.get("isLoading") == false) {
        var context = {
            title: "Back to Main Screen",
            message: "Navigating back to main screen. Hit cancel to abort.",
            okButtonText: "Close"
        };
        utility.launchPopup("confirm", function (data) {
            token.deleteToken(apptInfo.token);
            frameModule.topmost().navigate({
                moduleName: "views/welcome/main/",
                clearHistory: true,
                transition: {
                    name: "slideRight"
                }
            });
        }, null, context);
    }
}

view.launchMap = function (args) {
    var that = view;
    var location = apptInfo.address + ", " + apptInfo.cityStateZip;

    utility.leavingapp(function (data) {
        //firebase.analytics.logEvent({
        //    key: "LocationGetDirections",
        //    parameters: [
        //    {
        //        key: "LocationID",
        //        value: location != null && location.LocationID != null ? location.LocationID.toString() : null
        //    }]
        //});
        console.log("launching map for " + location);

        //var formattedAddress = "";
        //if (location.Address1) {
        //    // using street address
        //    formattedAddress += location.Address1;

        //    if (location.Address2) {
        //        formattedAddress += " " + location.Address2;
        //    }
        //    if (location.City && location.State) {
        //        formattedAddress += " " + location.City + ", " + location.State;
        //    }
        //    if (location.PostalCode) {
        //        formattedAddress += " " + location.PostalCode;
        //    }
        //}
        //else if (location.Coordinates &&
        //        location.Coordinates.Latitude &&
        //        location.Coordinates.Longitude) {
        //    // using geocordinates
        //    utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);
        //}
        //else {
        //    that.showError("Error mapping location. Could not find address or geocordinates for selected location.");
        //}
        console.log("map address: ", "https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(location));
        utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(location));
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

module.exports = view;