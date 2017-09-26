var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function ReferralRequestAppointmentViewModel() {
    var data = {
        pageTitle: "Referral Request Appointment",
        isLoading: true,
        showBackButton: false,
        orderingProvider: "",
        referral: "",
        referralType: "",
        orderReason: "",
        orderingProvider: "",
        date: "",
        address: "",
        cityStateZip: "",
        phone: "",
        distance: "",
        appointmentDate: "",
        displayTime: "",
        appointmentTime: "",
        practitionerName: "",
        specialty: ""
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function (apptInfo) {
        var that = this;
        var displayDateTime = new Date(apptInfo.AppointmentDate).toUTCString();
        displayDateTime = displayDateTime.toString().split(" ");
        displayDateTime = displayDateTime[0].replace(",","") + ' ' + displayDateTime[2] + ' ' + displayDateTime[1] + ', ' + displayDateTime[3] + ' at ' + apptInfo.DisplayTime;
        //console.log(apptInfo.orderingProvider);
        that.set("referral", "Requisition: " + apptInfo.reqID);
        that.set("referralType", "Type: " + apptInfo.searchTerm);
        that.set("orderReason", "Problem: " + apptInfo.orderReason);
        that.set("orderingProvider", "Ordering Provider: " + apptInfo.orderingProvider);
        that.set("date", "Order Date: " + apptInfo.date);
        that.set("address", apptInfo.address);
        that.set("cityStateZip", apptInfo.cityStateZip);
        that.set("phone", apptInfo.phone);
        that.set("distance", apptInfo.distance);
        that.set("appointmentDate", displayDateTime);
        that.set("displayTime", apptInfo.DisplayTime);
        that.set("practitionerName", apptInfo.practitionerName);
        that.set("specialty", "Specialty: " + apptInfo.specialty);
        that.set("isLoading", false);
    };

    return viewModel;
}

module.exports = ReferralRequestAppointmentViewModel;