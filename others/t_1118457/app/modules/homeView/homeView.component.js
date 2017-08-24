"use strict";
var core_1 = require("@angular/core");
/// component additional imports
var common = require("./shared");
var HomeViewComponent = (function () {
    /// component additional properties
    function HomeViewComponent(
        /// component constructor dependencies
        _service) {
        this._service = _service;
        /// component constructor method
    }
    Object.defineProperty(HomeViewComponent.prototype, "title", {
        get: function () {
            var result = "Home View";
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    HomeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-homeView",
            templateUrl: "homeView.component.html"
        }), 
        __metadata('design:paramtypes', [common.HomeViewService])
    ], HomeViewComponent);
    return HomeViewComponent;
}());
exports.HomeViewComponent = HomeViewComponent;
