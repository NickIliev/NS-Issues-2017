"use strict";
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// START_CUSTOM_CODE_spaceViewModelComponentImports
var router_1 = require('@angular/router');
var observable_array_1 = require("data/observable-array");
// END_CUSTOM_CODE_spaceViewModelComponentImports
/// component additional imports
var common = require("./shared");
var shared = require("../../shared");
var SpaceViewComponent = (function () {
    // END_CUSTOM_CODE_spaceViewModelComponentProperties
    /// component additional properties
    function SpaceViewComponent(
        // START_CUSTOM_CODE_spaceViewModelComponentConstructorDependencies
        route, 
        // END_CUSTOM_CODE_spaceViewModelComponentConstructorDependencies
        /// component constructor dependencies
        _service) {
        this.route = route;
        this._service = _service;
        this.modes = shared.Modes;
        this._mode = shared.Modes.LIST;
        this._items$ = new observable_array_1.ObservableArray();
        this._currentItem$ = new BehaviorSubject_1.BehaviorSubject({
            id: "",
            data: {}
        });
        // START_CUSTOM_CODE_spaceViewModelComponentConstructorMethod
        this._numberOfAddedItems = 0;
        // END_CUSTOM_CODE_spaceViewModelComponentConstructorMethod
        /// component constructor method
    }
    Object.defineProperty(SpaceViewComponent.prototype, "title", {
        get: function () {
            var result = "Spaces";
            if (this._mode === shared.Modes.ADD) {
                result = "Create";
            }
            else if (this._mode === shared.Modes.EDIT) {
                result = "Edit";
            }
            else if (this._mode === shared.Modes.DETAIL) {
                var current = this._currentItem$.getValue();
                result = current.data.CodeName + "\0";
            }
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpaceViewComponent.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpaceViewComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpaceViewComponent.prototype, "items$", {
        get: function () {
            return this._items$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpaceViewComponent.prototype, "currentItem$", {
        get: function () {
            return this._currentItem$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    SpaceViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onLoad();
        // START_CUSTOM_CODE_spaceViewModelComponentOnInit
        this.sub = this.route.params.subscribe(function (params) {
            if (params.id) {
                //this.id = +params['id']; // (+) converts string 'id' to a number
                _this._service.getById(params['id'])
                    .subscribe(function (data) {
                    _this.onSelect({
                        "item": {
                            "id": data.Id,
                            "data": data
                        }
                    });
                });
            }
        });
        // END_CUSTOM_CODE_spaceViewModelComponentOnInit
    };
    SpaceViewComponent.prototype.onLoad = function () {
        var _this = this;
        this._items$ = new observable_array_1.ObservableArray();
        this._service.get()
            .subscribe(function (data) {
            data.forEach(function (item) {
                var newItem = {
                    "id": item.Id,
                    "data": item
                };
                _this.items$.push(newItem);
            });
            // START_CUSTOM_CODE_spaceViewModelComponentCustomLoad
            _this._numberOfAddedItems = _this.items$.length;
            // END_CUSTOM_CODE_spaceViewModelComponentCustomLoad
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SpaceViewComponent.prototype.onSelect = function (args) {
        this._currentItem$.next(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    };
    SpaceViewComponent.prototype.onUpdate = function (args) {
        var _this = this;
        this._service.put(args.item.data)
            .subscribe(function (data) {
            var arr = _this._items$;
            arr.forEach(function (itm, idx) {
                if (itm.id === args.item.id) {
                    arr[idx] = args.item;
                }
            });
            _this._currentItem$.next(args.item);
            _this.onNavigate(shared.Modes.DETAIL);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SpaceViewComponent.prototype.onNavigateBack = function () {
        this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    };
    SpaceViewComponent.prototype.onNavigate = function (mode) {
        this._mode = mode;
    };
    // START_CUSTOM_CODE_spaceViewModelComponentAdditionalMethods
    SpaceViewComponent.prototype.onLoadMoreItemsRequested = function (args) {
        var that = new WeakRef(this);
        var numberOfAddedItems = that.get()._numberOfAddedItems;
        that.get()._service.getNextX(numberOfAddedItems)
            .subscribe(function (data) {
            data.forEach(function (item) {
                var newItem = {
                    "id": item.Id,
                    "data": item
                };
                that.get().items$.push(newItem);
                that.get()._numberOfAddedItems++;
            });
            var listView = args.object;
            listView.notifyLoadOnDemandFinished();
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SpaceViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-spaceView",
            templateUrl: "spaceView.component.html"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common.SpaceViewService])
    ], SpaceViewComponent);
    return SpaceViewComponent;
}());
exports.SpaceViewComponent = SpaceViewComponent;
//# sourceMappingURL=spaceView.component.js.map