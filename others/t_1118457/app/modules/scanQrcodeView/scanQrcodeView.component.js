"use strict";
var core_1 = require("@angular/core");
/// component additional imports
var common = require("./shared");
var ScanQrcodeViewComponent = (function () {
    /// component additional properties
    function ScanQrcodeViewComponent(
        /// component constructor dependencies
        _service) {
        this._service = _service;
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
    ScanQrcodeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-scanQrcodeView",
            templateUrl: "scanQrcodeView.component.html"
        }), 
        __metadata('design:paramtypes', [common.ScanQrcodeViewService])
    ], ScanQrcodeViewComponent);
    return ScanQrcodeViewComponent;
}());
exports.ScanQrcodeViewComponent = ScanQrcodeViewComponent;
