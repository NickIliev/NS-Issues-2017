"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.scrollLayout = this.sv.nativeElement;
        this.button = this.btn.nativeElement;
        this.grid = this.gr.nativeElement;
    };
    AppComponent.prototype.scrollTo = function () {
        this.scrollLayout.scrollToVerticalOffset(this.grid.getLocationRelativeTo(this.button).y, false);
    };
    __decorate([
        core_1.ViewChild("myScroller"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "sv", void 0);
    __decorate([
        core_1.ViewChild("btn"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "btn", void 0);
    __decorate([
        core_1.ViewChild("grid"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "gr", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map