var frameModule = require("ui/frame");
var navigation = require("~/components/navigation");
var utility = require("~/common/utility");
var topmost = frameModule.topmost();
var constants = require("~/common/constants");
var app = require("application");
var firebase = require("nativescript-plugin-firebase");

var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

var ViewModel = require("~/common/view-model-base")
var refCode = null;
var barcodescanner = new BarcodeScanner();

if(app.ios){
    var nativescript_scanndit_1 = require("nativescript-scanndit");
    var view = { scanner: null };    
}


function ScannerViewModel() {
    var data = {
        pageTitle: "Scanner Test",
        isLoading: false,
        scanCode: null
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function (args) {
        var that = this;
        that.isLoading = false;
        if (app.ios) {
            that.scanCode = "";
        }
        if(app.android){
            barcodescanner.available().then(
                function(avail) {
                    //console.log("Available? " + avail);
                }
            );
            
            barcodescanner.hasCameraPermission().then(
                function(result) {
                    barcodescanner.requestCameraPermission().then(
                        function() {
                            //console.log("Camera permission requested");
                        }
                    );
                    //console.log("Has Camera Permission? " + result);
                }
            );

        }
    };

    viewModel.scan = function () {
        var that = this;
        if(app.ios){
            if (view.scanner == null) {
                view.scanner = new nativescript_scanndit_1.Scandit('fMOOZeAeJ8z/lKH2jeoNYBDuxcJc5WSzg+I9vpfZzcM', ["EAN13",
                    "EAN8",
                    "PDF417",
                    "QR"]);
            }
            view.scanner.scan().then(function (data) {
                if (data.userCancelled) {
                    console.log("user cancelled scan");
                    dialogs.alert("user cancelled scan");
                }
                else {
                    refCode = data.codeValue;
                    console.log("scanned code: " + data.codeValue);
                    viewModel.parseScan(refCode);
                }
            }, function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Scanning failed");
                }
            });
            firebase.analytics.logEvent({
                key: "SMNReferral",
                parameters: [
                {
                    key: "SMNScan",
                    value: "iOS Scan"
                }]
            });
        }else if(app.android){
            barcodescanner.scan({
                // iOS only, default 'Close'
                formats:"PDF_417,CODE_39",
                cancelLabel: "Cancel Scan",
                // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                message: "Scan your referral barcode using the camera",
                // Start with the front cam, if available. Android only, default false
                preferFrontCamera: false,
                // Render a button to switch between front and back cam. Android only, default false (on iOS it's always available)
                showFlipCameraButton: false
            }).then(
                function (result) {
                    that.set("isLoading", true);
                    refCode = result.text;
                    //actual scan results
                    //add or remove comment to set textfield
                    viewModel.parseScan(refCode);
                    console.log("Scan format: " + result.format);
                    console.log("Scan text:   " + result.text);
                },
                function(error) {
                    console.log("No scan: " + error);
                }
            )
            firebase.analytics.logEvent({
                key: "SMNReferral",
                parameters: [
                {
                    key: "SMNScan",
                    value: "Android Scan"
                }]
            });
        }
    };

    viewModel.parseScan = function(refCode){
        if (refCode.length > 8) {
            var codeLength = refCode.length;
            codeLength = codeLength - 8;
            var newCode = "";
            for (var i = codeLength; i < refCode.length; i++) {
                newCode += refCode[i];
            }
            viewModel.verify(newCode);
        } else {
            viewModel.verify(result.text);
        }

    }

    viewModel.verify = function (scanCode) {
        var that = this;
        console.log("scanCode", scanCode);
        that.set("scanCode", scanCode);
        that.set("isLoading", true);

        var requestOptions = {
            url: constants.referralEaseUrl + "Authenticate/ValidateRequisition?RequisitionId=" + scanCode,
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        //console.log("url", requestOptions.url);
        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("verify response", JSON.stringify(response));
                var response = response.content.toJSON();
                //console.log(JSON.stringify(response));
                if (response.Data.IsRequisitionValid == true && response.Data.IsRequisitionSupported == true) {
                    //console.log("true true");
                    that.isLoading = true;
                    that.scanCode = "";
                    frameModule.topmost().navigate({
                        moduleName: "views/verify/verify-user/",
                        clearHistory: true,
                        context: {
                            reqID: scanCode,
                            AEMROrderId: response.Data.AEMROrderId,
                            FullName: viewModel.changeCase(response.Data.FullName),
                            PatientMRN: response.Data.PatientMRN,
                            DateOfBirth: response.Data.DateOfBirth,
                            OrderNumberExt: response.Data.OrderNumberExt
                        }
                    });
                } else if(response.Data.AEMROrderId == null){
                    //console.log("order id not found");
                    that.isLoading = false;
                    var context = {
                        title: "Referral code not found",
                        message: "We were unable to find referral code " + scanCode + ". Please try again.",
                        okButtonText: "Try Again",
                        cancelButtonText: "Contact UH"
                    }
                    utility.launchPopup("acknowledge", function (data) {
                        // callback
                    }, null, context);
                } else if (response.Data.IsRequisitionValid == false && response.Data.IsRequisitionSupported == false) {
                    //console.log("false false");
                    that.isLoading = false;
                    var context = {
                        title: "Referral Type Unsupported",
                        message: "UH currently doesn't schedule for this referral type. Please seek direction from your referring provider or contact University Hospitals at 1-866-UH4-CARE for further assistance.",
                        okButtonText: "Try Again",
                        cancelButtonText: "Contact UH"
                    }
                    utility.launchPopup("acknowledge", function (data) {
                        // callback
                    }, null, context);
                } else if (response.Data.IsRequisitionValid == true && response.Data.IsRequisitionSupported == false && response.Data.AEMROrderId != null) {
                    that.isLoading = false;
                    var context = {
                        title: "Referral Type Unsupported",
                        message: "To schedule this referral type please call 1-866-UH4-CARE.",
                        okButtonText: "Try Again",
                        cancelButtonText: "Contact UH"
                    }
                    utility.launchPopup("acknowledge", function (data) {
                        // callback
                    }, null, context);
                }
            },
            function () { // error callback
                that.set("isLoading", false);
            }
        );
    }

    viewModel.changeCase = function (str) {
        words = str.toLowerCase().split(' ');

        for (var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
        }
        return words.join(' ');
    }

    return viewModel;
}

module.exports = ScannerViewModel;