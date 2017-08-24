"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.tabTitles = ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
        this.counter = 16;
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tabView = this.tab.nativeElement;
        this.tabView.on("selectedIndexChanged", function (args) {
            _this.tabTitle = _this.tabTitles[args.newIndex];
        });
        // if (this.tabView.ios){
        //     var uiTabBarController = this.tabView.ios;
        //     uiTabBarController.moreNavigationController.navigationBarHidden = true;
        // }
    };
    AppComponent.prototype.onTap = function () {
        this.counter--;
    };
    __decorate([
        core_1.ViewChild("tabview"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "tab", void 0);
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