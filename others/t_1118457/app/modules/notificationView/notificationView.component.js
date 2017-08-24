"use strict";
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// START_CUSTOM_CODE_notificationViewModelComponentImports
// END_CUSTOM_CODE_notificationViewModelComponentImports
/// component additional imports
var common = require("./shared");
var shared = require("../../shared");
var NotificationViewComponent = (function () {
    // START_CUSTOM_CODE_notificationViewModelComponentProperties
    // END_CUSTOM_CODE_notificationViewModelComponentProperties
    /// component additional properties
    function NotificationViewComponent(
        // START_CUSTOM_CODE_notificationViewModelComponentConstructorDependencies
        // END_CUSTOM_CODE_notificationViewModelComponentConstructorDependencies
        /// component constructor dependencies
        _service) {
        this._service = _service;
        this.modes = shared.Modes;
        this._mode = shared.Modes.LIST;
        this._items$ = new BehaviorSubject_1.BehaviorSubject([]);
        this._currentItem$ = new BehaviorSubject_1.BehaviorSubject({
            id: "",
            data: {}
        });
        // START_CUSTOM_CODE_notificationViewModelComponentConstructorMethod
        // END_CUSTOM_CODE_notificationViewModelComponentConstructorMethod
        /// component constructor method
    }
    Object.defineProperty(NotificationViewComponent.prototype, "title", {
        get: function () {
            var result = "Notifications";
            if (this._mode === shared.Modes.ADD) {
                result = "Create";
            }
            else if (this._mode === shared.Modes.EDIT) {
                result = "Edit";
            }
            else if (this._mode === shared.Modes.DETAIL) {
                result = "Detail";
            }
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationViewComponent.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationViewComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationViewComponent.prototype, "items$", {
        get: function () {
            return this._items$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationViewComponent.prototype, "currentItem$", {
        get: function () {
            return this._currentItem$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NotificationViewComponent.prototype.ngOnInit = function () {
        this.onLoad();
        // START_CUSTOM_CODE_notificationViewModelComponentOnInit
        // END_CUSTOM_CODE_notificationViewModelComponentOnInit
    };
    NotificationViewComponent.prototype.onLoad = function () {
        var _this = this;
        this._service.get()
            .subscribe(function (data) {
            var arr = [];
            data.forEach(function (item) {
                var newItem = {
                    "id": item.Id,
                    "data": item
                };
                arr.push(newItem);
            });
            _this._items$.next(arr.slice());
            // START_CUSTOM_CODE_notificationViewModelComponentCustomLoad
            // END_CUSTOM_CODE_notificationViewModelComponentCustomLoad
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    NotificationViewComponent.prototype.onSelect = function (args) {
        this._currentItem$.next(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    };
    NotificationViewComponent.prototype.onNavigateBack = function () {
        this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    };
    NotificationViewComponent.prototype.onNavigate = function (mode) {
        this._mode = mode;
    };
    NotificationViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-notificationView",
            templateUrl: "notificationView.component.html"
        }), 
        __metadata('design:paramtypes', [common.NotificationViewService])
    ], NotificationViewComponent);
    return NotificationViewComponent;
}());
exports.NotificationViewComponent = NotificationViewComponent;
