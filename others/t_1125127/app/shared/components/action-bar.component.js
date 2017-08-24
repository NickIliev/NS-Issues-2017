"use strict";
var core_1 = require("@angular/core");
var enums_1 = require("../enums");
var services_1 = require("../services");
var ActionBarComponent = (function () {
    function ActionBarComponent(_navigationService) {
        this._navigationService = _navigationService;
        this.back = new core_1.EventEmitter();
        this._modes = enums_1.NavigationModes;
        this._mode = _navigationService.mode;
        if (this._mode === this._modes.DRAWER) {
            this.showDrawer = true;
            this.showIndex = false;
        }
        else if (this._mode === this._modes.LISTMENU) {
            this.showDrawer = false;
            this.showIndex = true;
        }
        else {
            this.showDrawer = false;
            this.showIndex = false;
        }
    }
    ActionBarComponent.prototype.onIndex = function () {
        this._navigationService.navigateIndex();
    };
    ActionBarComponent.prototype.onDrawer = function () {
        this._navigationService.toggleDrawer();
    };
    ActionBarComponent.prototype.onBack = function () {
        this.back.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ActionBarComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "showBack", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "showDrawer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "showIndex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionBarComponent.prototype, "back", void 0);
    ActionBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-action-bar",
            templateUrl: "action-bar.component.html"
        }), 
        __metadata('design:paramtypes', [services_1.NavigationService])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=action-bar.component.js.map