var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function UHVirtualVisitViewModel() {
    var data = {
        pageTitle: "UH Virtual Visit",
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

    return viewModel;
}

module.exports = UHVirtualVisitViewModel;