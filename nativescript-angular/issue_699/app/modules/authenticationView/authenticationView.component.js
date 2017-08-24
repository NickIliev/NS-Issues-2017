"use strict";
var core_1 = require("@angular/core");
var shared = require("../../shared");
var AuthenticationViewComponent = (function () {
    /// component additional properties
    function AuthenticationViewComponent(_notificationService, _navigationService, 
        /// component constructor dependencies
        _service) {
        this._notificationService = _notificationService;
        this._navigationService = _navigationService;
        this._service = _service;
        this.showSignUp = false;
        this.isSignedInOption = false;
        // auto sign in
        this.isSingedInAutoOption = true;
        this.user = {
            username: "",
            password: ""
        };
        /// component constructor method
    }
    Object.defineProperty(AuthenticationViewComponent.prototype, "title", {
        get: function () {
            var result = "Authentication";
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.currentUser().subscribe(function (data) {
            if (!data) {
                //alert(JSON.stringify(data));
                // auto sign in
                if (_this._service.hasCredentials()) {
                    var user = {
                        username: _this._service.getCredentials().username,
                        password: _this._service.getCredentials().password
                    };
                    _this.onSignIn({
                        user: user,
                        autoSignIn: false
                    });
                }
                return;
            }
            ;
            _this.isSignedInOption = true;
        });
    };
    AuthenticationViewComponent.prototype.onNavigate = function () {
        this.showSignUp = !this.showSignUp;
    };
    AuthenticationViewComponent.prototype.onSignIn = function (args) {
        var _this = this;
        this._service.signIn(args.user)
            .subscribe(function (data) {
            // auto sign in
            if (args.autoSignedIn) {
                _this._service.setCredentials(args.user);
            }
            else {
                _this._service.clearCredentials();
            }
            _this._service.currentUser().subscribe(function (data) {
                _this.isSignedInOption = true;
            });
        }, function (error) {
            _this._notificationService.error("We could not find your account.");
        });
    };
    AuthenticationViewComponent.prototype.onSignUp = function (args) {
        var _this = this;
        this._service.signUp(args.user)
            .subscribe(function (data) {
            _this.onNavigate();
        }, function (error) {
            _this._notificationService.error("We were unable to create your account.");
        });
    };
    AuthenticationViewComponent.prototype.onSignOut = function () {
        var _this = this;
        this._service.signOut()
            .subscribe(function (data) {
            // auto sign in
            _this._service.clearCredentials();
            _this.user = {
                username: "",
                password: ""
            };
            _this.isSignedInOption = false;
        }, function (error) {
            _this._notificationService.error("We were unable to signed out.");
        });
    };
    AuthenticationViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-authenticationView",
            templateUrl: "authenticationView.component.html"
        }), 
        __metadata('design:paramtypes', [shared.NotificationService, shared.NavigationService, shared.AuthenticationService])
    ], AuthenticationViewComponent);
    return AuthenticationViewComponent;
}());
exports.AuthenticationViewComponent = AuthenticationViewComponent;
//# sourceMappingURL=authenticationView.component.js.map