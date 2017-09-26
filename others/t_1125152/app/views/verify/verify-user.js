var View = require("~/common/view-base")
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var utility = require("~/common/utility");
var constants = require("~/common/constants");
var http = require("http");
var applicationSettings = require("application-settings");
var view = new View();
var token = require("~/common/token");
var VerifyUserViewModel = require("./verify-user-view-model");

view.viewModel = new VerifyUserViewModel();

var page;
var refCode;
var dob;
var ssn;
var addr;

view.loaded = function (args) {
    page = args.object;
    var that = view;
    var options = {
        pageName: "VerifyUser"
    };
    applicationSettings.setNumber("searchSeed", 0);

    verify = page.navigationContext;
    
    that.initialize(args, options);
    console.log("verify", JSON.stringify(verify));
    that.mainContentElement = that.page.getViewById("main-content");

    that.viewModel.set("showOne", false);
    that.viewModel.set("showTwo", false);

    //empty value
    that.viewModel.set("reqID", null);
    that.viewModel.set("fullName", null);
    that.viewModel.set("dob", null);

    //set values
    that.viewModel.set("reqID", verify.reqID);
    that.viewModel.set("fullName", verify.FullName);
    that.viewModel.set("dob", verify.DateOfBirth);
    //that.viewModel.set("ssn", "000000000");
};

view.show = function (args) {
    var that = view;
    console.log(args.object.acc);
    if (args.object.acc == "accordionOne") {
        var ssnInput = page.getViewById("ssn");
        ssnInput.focus();
        //utilsModule.ad.showSoftInput(ssn);
        page.getViewById("accordionOne").className = "accordion active";
        page.getViewById("accordionTwo").className = "accordion inactive";
        view.viewModel.set("showOne", true);
        view.viewModel.set("showTwo", false);
    } else {
        page.getViewById("accordionOne").className = "accordion inactive";
        page.getViewById("accordionTwo").className = "accordion active";
        view.viewModel.set("showOne", false);
        view.viewModel.set("showTwo", true);
    }
}

view.authenticate = function () {
    var that = view;
    that.viewModel.set("isLoading", true);
    var ssn = that.viewModel.get("ssn");
    if (ssn.length === 11) {
        ssn = ssn.split("-");
        ssn = ssn[0] + ssn[1] + ssn[2];
        console.log("ssn", ssn);
        that.viewModel.set("ssn", ssn);
    }
    var content = JSON.stringify({ RequisitionID: verify.reqID, PatientMRN: verify.PatientMRN, SSN: that.viewModel.get("ssn"), "Secret": constants.secret, Agreement: view.viewModel.get("agreement") });
    console.log("verify content",content);

    http.request({
        url: constants.referralEaseUrl + "Authenticate/AuthenticateUser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: content
    }).then(function (response) {
        var responseType = response.content.toJSON();
        var access = response.content.toJSON().Data;
        console.log("response", JSON.stringify(response));
        view.viewModel.set("isLoading", false);
        if (responseType.ResponseType == 1) {
            //console.log("that ssn", that.ssn);
            var access = response.content.toJSON().Data;
            applicationSettings.setString("token", access.Token);
            if (access.AccessGranted == true) {
                applicationSettings.setBoolean("activeSession", true);
                console.log("order active session", applicationSettings.getBoolean("activeSession"));
                token.updateToken(access.Token);
                topmost.navigate({
                    moduleName: "views/orders/orders",
                    context: {
                        Agreement: view.viewModel.get("agreement"),
                        AthenaPatientId: access.AthenaPatientId,
                        fullName: verify.FullName,
                        dob: that.viewModel.dob,
                        reqID: verify.reqID,
                        patientMRN: access.PatientMRN,
                        zipCode: access.Zipcode,
                        ssn: that.viewModel.ssn,
                        token: access.Token
                    }
                });
            } else if (access.AccessGranted == false) {
                var context = {
                    title: "Verification Error",
                    message: "We were unable to verify your identity. Please contact University Hospitals at 1-866-UH4-CARE to schedule your appointment.",
                    okButtonText: "Try Again",
                    cancelButtonText: "Contact UH"
                }
                utility.launchPopup("action", function (data) {
                    // callback
                }, null, context);
            }
        } else {
            var context = {
                title: "Validation Error",
                message: "Please make sure all your verification information is correct and properly formatted before submitting.",
                okButtonText: "Try Again",
                cancelButtonText: "Contact UH"
            }
            utility.launchPopup("action", function (data) {
                // callback
            }, null, context);
        }
    }, function (error) {
        console.error(JSON.stringify(error));
        view.viewModel.set("isLoading", false);
    });
};

view.setSSN = function (args) {
    var that = view;
    var text = args.object.text;
    that.viewModel.set("agreement", false);
    if (text.length == 11) {
        that.viewModel.set("isEnabled", true);
        //text = text.replace("-", "");
        //text = text.replace("-", "");
        //that.page.getViewById("agreementCheck").src = "~/images/common/unchecked.png";
        //that.viewModel.set("agreement", false);
        //that.viewModel.set("ssn", text);
        //console.log("ssn get", view.viewModel.get("ssn", text));
        //ssn = text;
        that.viewModel.set("ssn", text);
    } else {
        that.viewModel.set("isEnabled", false);
    }
}

view.onTapAgreementItem = function (args) {
    var that = view;
    if (!that.viewModel.get("agreement")) {
        that.page.getViewById("agreementCheck").src = "~/images/common/checked.png";
        that.viewModel.set("agreement", true);
        that.viewModel.set("isEnabled", true);
    }
    else {
        that.page.getViewById("agreementCheck").src = "~/images/common/unchecked.png";
        that.viewModel.set("agreement", false);
        that.viewModel.set("isEnabled", false);
    }
};

view.maxChar = function (args) {
    var that = view;
    var ssn = args.object.id;
    var char = page.getViewById(ssn).text;
    if (ssn == "ssn3") {
        console.log("value",page.getViewById(ssn).text);
        console.log("length", char.length);
        if (char.length > 2) {
            var text = page.getViewById(ssn).text;
            console.log("text", text);
            text = "";
            page.getViewById("ssn2").focus(true);
            that.viewModel.set("ssn3","***");
        }
    } else if (ssn == "ssn2") {
        console.log("value", page.getViewById(ssn).text);
        console.log("length", char.length);
        if (char.length == 2) {
            page.getViewById("ssn4").focus(true);
        }
    }
}

view.goBack = function () {
    topmost.goBack();
};

view.goBack = function () {
    var that = view;
    //console.log("orderCount", orderCount);
    topmost.navigate({
        moduleName: "views/referral-ease/referral-ease/",
        transition: {
            name: "slideRight"
        }
    });
};

module.exports = view;