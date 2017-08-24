"use strict";
var core_1 = require("@angular/core");
/// component additional imports
var common = require("./shared");
var AboutViewComponent = (function () {
    /// component additional properties
    function AboutViewComponent(
        /// component constructor dependencies
        _service) {
        this._service = _service;
        /// component constructor method
    }
    Object.defineProperty(AboutViewComponent.prototype, "title", {
        get: function () {
            var result = "About";
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    AboutViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-aboutView",
            templateUrl: "aboutView.component.html"
        }), 
        __metadata('design:paramtypes', [common.AboutViewService])
    ], AboutViewComponent);
    return AboutViewComponent;
}());
exports.AboutViewComponent = AboutViewComponent;
