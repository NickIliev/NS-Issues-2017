var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var frame = require("ui/frame");
var http = require("http");
var token = require("~/common/token");

var View = require("~/common/view-base");

var ReferralRequestAppointmentViewModel = require("./referral-request-appointment-view-model");

var view = new View();
view.viewModel = new ReferralRequestAppointmentViewModel();

var apptInfo;

view.loaded = function(page) {    
    var that = view;
    that.page = page;

    apptInfo = that.page.navigationContext;
    console.log("request appointment", JSON.stringify(apptInfo));

    view.viewModel.load(apptInfo);
    token.updateToken(apptInfo.token);
};

view.confirm = function () {
    var that = view;
    that.viewModel.set("isLoading", true);

    //console.log("request appointment",JSON.stringify(apptInfo));
    token.updateToken(apptInfo.token);
    topmost.navigate({
        moduleName: "views/referral-request-confirmation/main/",
        //backstackVisible: false,
        //clearHistory: true,
        context: {
            AthenaPatientId: apptInfo.AthenaPatientId,
            fullName: apptInfo.fullName,
            email: apptInfo.email,
            patientMRN: apptInfo.patientMRN,
            AppointmentId: apptInfo.AppointmentId,
            AppointmentDate: apptInfo.AppointmentDate,
            AppointmentTime: apptInfo.AppointmentTime,
            AppointmentTypeId: apptInfo.AppointmentTypeId,
            DepartmentId: apptInfo.DepartmentId,
            LocationId: apptInfo.LocationId,
            DisplayTime: apptInfo.DisplayTime,
            PractitionerID: apptInfo.PractitionerID,
            ProviderId: apptInfo.ProviderId,
            AthenaPatientId: apptInfo.AthenaPatientId,
            reqID: apptInfo.reqID,
            referral: apptInfo.referral,
            token: apptInfo.token,
            searchTerm: apptInfo.searchTerm,
            practitionerName: apptInfo.practitionerName,
            orderingProvider: apptInfo.orderingProvider,
            orderReason: apptInfo.orderReason,
            date: apptInfo.date,
            address: apptInfo.address,
            cityStateZip: apptInfo.cityStateZip,
            phone: apptInfo.phone,
            distance: apptInfo.distance,
            dob: apptInfo.dob,
            zipCode: apptInfo.zipCode
        }
    });
};


view.goBack = function (args) {
    token.updateToken(apptInfo.token);
    topmost.goBack();
    //topmost.navigate({
    //    moduleName: "views/referral-providers/main/",
    //    backstackVisible: false,
    //    clearHistory: true,
    //    context: apptInfo,
    //    transition: {
    //        name: "slideRight"
    //    }
    //});
};

module.exports = view;
