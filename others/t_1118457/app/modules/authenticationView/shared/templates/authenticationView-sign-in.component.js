"use strict";
var core_1 = require("@angular/core");
var shared = require("../../../../shared");
var AuthenticationViewSignInComponent = (function () {
    function AuthenticationViewSignInComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.signin = new core_1.EventEmitter();
        this.signout = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(AuthenticationViewSignInComponent.prototype, "user", {
        set: function (value) {
            this.selectedUser = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationViewSignInComponent.prototype.onSignIn = function () {
        if (!this.selectedUser.username || !this.selectedUser.password) {
            this._notificationService.error("Missing credentials.");
            return;
        }
        this.signin.emit({
            user: this.selectedUser,
            autoSignedIn: this.autoSignedIn
        });
    };
    AuthenticationViewSignInComponent.prototype.onSignOut = function () {
        this.signout.emit();
    };
    AuthenticationViewSignInComponent.prototype.onNavigate = function () {
        this.navigate.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AuthenticationViewSignInComponent.prototype, "user", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AuthenticationViewSignInComponent.prototype, "signedInOption", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AuthenticationViewSignInComponent.prototype, "signedInAutoOption", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AuthenticationViewSignInComponent.prototype, "signin", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AuthenticationViewSignInComponent.prototype, "signout", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AuthenticationViewSignInComponent.prototype, "navigate", void 0);
    AuthenticationViewSignInComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-authenticationView-sign-in",
            templateUrl: "authenticationView-sign-in.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [shared.NotificationService])
    ], AuthenticationViewSignInComponent);
    return AuthenticationViewSignInComponent;
}());
exports.AuthenticationViewSignInComponent = AuthenticationViewSignInComponent;
