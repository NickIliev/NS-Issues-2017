"use strict";
var core_1 = require("@angular/core");
/// component additional imports
var nativescript_barcodescanner_1 = require('nativescript-barcodescanner');
var common = require("./shared");
var shared = require("../../shared");
var ScanQrcodeViewComponent = (function () {
    /// component additional properties
    function ScanQrcodeViewComponent(
        /// component constructor dependencies
        _service, barcodescanner, _navigationService) {
        this._service = _service;
        this.barcodescanner = barcodescanner;
        this._navigationService = _navigationService;
        /// component constructor method
    }
    Object.defineProperty(ScanQrcodeViewComponent.prototype, "title", {
        get: function () {
            var result = "Scan QR";
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /// component additional methods
    ScanQrcodeViewComponent.prototype.ngOnInit = function () {
        this.onScanTap();
    };
    ScanQrcodeViewComponent.prototype.resolveQRCode = function (that, result) {
        setTimeout(function () {
            //alert(result);
            that._navigationService.navigate(result);
        }, 100);
    };
    ScanQrcodeViewComponent.prototype.onScanTap = function () {
        // this.barcodescanner.available().then(
        // 	function (avail) {
        // 		alert("Available? " + avail);
        // 	}
        // );
        var that = this;
        // let that = new WeakRef(this);
        // alert(that.title);
        this.barcodescanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            cancelLabelBackgroundColor: "#333333",
            message: "Use the volume buttons for extra light",
            preferFrontCamera: false,
            showFlipCameraButton: false,
            showTorchButton: false,
            torchOn: false,
            resultDisplayDuration: 500,
            beepOnScan: true,
            openSettingsIfPermissionWasPreviouslyDenied: true,
            closeCallback: function () {
                console.log("Scanner closed @ " + new Date().getTime());
            }
        }).then(function (result) {
            console.log("--- scanned: " + result.text);
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            that.resolveQRCode(that, result.text);
        }, function (errorMessage) {
            alert("No scan. " + errorMessage);
        });
    };
    ScanQrcodeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-scanQrcodeView",
            templateUrl: "scanQrcodeView.component.html"
        }), 
        __metadata('design:paramtypes', [common.ScanQrcodeViewService, nativescript_barcodescanner_1.BarcodeScanner, shared.NavigationService])
    ], ScanQrcodeViewComponent);
    return ScanQrcodeViewComponent;
}());
exports.ScanQrcodeViewComponent = ScanQrcodeViewComponent;
//# sourceMappingURL=scanQrcodeView.component.js.map