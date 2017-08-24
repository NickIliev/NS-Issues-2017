"use strict";
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var shared = require("../../../../shared");
var AuthenticationViewSignInComponent = (function () {
    function AuthenticationViewSignInComponent(_notificationService, _service) {
        this._notificationService = _notificationService;
        this._service = _service;
        this.signin = new core_1.EventEmitter();
        this.signout = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
        // displayName: string = "";
        this.displayName = new BehaviorSubject_1.BehaviorSubject("");
    }
    Object.defineProperty(AuthenticationViewSignInComponent.prototype, "user", {
        set: function (value) {
            this.selectedUser = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationViewSignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.currentUser().subscribe(function (data) {
            // this.displayName = data.DisplayName
            _this.displayName.next(data.DisplayName);
        });
        this.autoSignedIn = this.signedInAutoOption;
    };
    AuthenticationViewSignInComponent.prototype.onSignIn = function () {
        var _this = this;
        if (!this.selectedUser.username || !this.selectedUser.password) {
            this._notificationService.error("Missing credentials.");
            return;
        }
        this.signin.emit({
            user: this.selectedUser,
            autoSignedIn: this.autoSignedIn
        });
        this._service.currentUser().subscribe(function (data) {
            //this.displayName = data.DisplayName
            _this.displayName.next(data.DisplayName);
        });
    };
    AuthenticationViewSignInComponent.prototype.onSignOut = function () {
        this.signout.emit();
    };
    AuthenticationViewSignInComponent.prototype.onNavigate = function () {
        this.navigate.emit();
    };
    Object.defineProperty(AuthenticationViewSignInComponent.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
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
        __metadata('design:paramtypes', [shared.NotificationService, shared.AuthenticationService])
    ], AuthenticationViewSignInComponent);
    return AuthenticationViewSignInComponent;
}());
exports.AuthenticationViewSignInComponent = AuthenticationViewSignInComponent;
//# sourceMappingURL=authenticationView-sign-in.component.js.map