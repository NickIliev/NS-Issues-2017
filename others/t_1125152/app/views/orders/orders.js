var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var token = require("~/common/token");
var utils = require("utils/utils");
var View = require("~/common/view-base")

var OrderViewModel = require("./order-view-model");
var view = new View();
view.viewModel = new OrderViewModel();
var page;
var lat = null;
var lon = null;
var searchTerm;
var apptInfo;

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "ReferralOrders"
    };
    that.initialize(args, options);

    apptInfo = args.object.navigationContext;
    console.log("orders", JSON.stringify(apptInfo));

    //empty values
    that.viewModel.set("patientMRN", null);
    that.viewModel.set("athenaID", null);
    that.viewModel.set("reqID", null);
    that.viewModel.set("dob", null);
    that.viewModel.set("zipCode", null);
    that.viewModel.set("fullName", null);
    that.viewModel.set("email", null);

    //set values
    that.viewModel.set("token", apptInfo.token);
    that.viewModel.set("patientMRN", apptInfo.patientMRN);
    that.viewModel.set("athenaID", apptInfo.AthenaPatientId);
    that.viewModel.set("reqID", apptInfo.reqID);
    that.viewModel.set("agreement", apptInfo.Agreement);
    that.viewModel.set("dob", apptInfo.dob);
    that.viewModel.set("zipCode", apptInfo.zipCode);
    that.viewModel.set("fullName", apptInfo.fullName);
    that.viewModel.set("email", apptInfo.email);
    that.mainContentElement = that.page.getViewById("main-content");
    that.viewModel.load();
};

view.schedule = function (index) {
    var that = view;
    var orderInfo = view.viewModel.searchResults.Data.getItem(index);
    var date = orderInfo.ToBeDoneDate.split(" ");
    //console.log("orderInfo", JSON.stringify(orderInfo));
    date = date[0];
    that.viewModel.set("date", date);
    that.viewModel.set("reqID", orderInfo.RequisitionID);
    that.viewModel.set("searchTerm", orderInfo.SearchTerm);
    that.viewModel.set("problem", orderInfo.Problem);
    that.viewModel.set("referral", orderInfo.OrderExtNumber);
    that.viewModel.set("orderID", orderInfo.OrderId);
    that.viewModel.set("orderReason", orderInfo.DisplayProblem);
    that.viewModel.set("orderingProvider", orderInfo.OrderingProviderFirstName + ' ' + orderInfo.OrderingProviderLastName);
    that.viewModel.set("preferredPhysicianNPI", orderInfo.PreferredPhysicianNPI);
    view.viewModel.referralTypeAllowed();
};

view.listSchedule = function (args) {
    console.log(args.itemIndex);
    view.schedule(args.itemIndex);
};

view.btnSchedule = function (args) {
    var btnIndex = args.object.index;
    var index = btnIndex.split("item");
    index = index[1];
    view.schedule(index);
};

view.onTap = function (args) {
    var index = args.index;
};

view.reScan = function () {
    console.log("goBack");
    token.deleteToken(apptInfo.token);
    token.stopAppStateTimer();
    topmost.navigate({
        moduleName: "views/referral-ease/referral-ease/",
        transition: {
            name: "slideRight"
        }
    });
};

view.goBack = function () {
    console.log("goBack");
    view.viewModel.set("isError", false);
    topmost.navigate({
        moduleName: "views/verify/verify-user/",
        context: {
            reqID: apptInfo.reqID,
            FullName: apptInfo.fullName,
            DateOfBirth: apptInfo.dob
        },
        transition: {
            name: "slideRight"
        }

    });
};

view.contact = function (args) {

    //console.log(args.object.phone);

    //analytics.trackEvent('LinkClick.CallUH');
    utils.openUrl("tel://" + args.object.phone);
}

module.exports = view;
