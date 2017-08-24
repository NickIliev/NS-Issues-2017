"use strict";
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// START_CUSTOM_CODE_assetViewModelComponentImports
var router_1 = require('@angular/router');
var observable_array_1 = require("data/observable-array");
// END_CUSTOM_CODE_assetViewModelComponentImports
/// component additional imports
var common = require("./shared");
var shared = require("../../shared");
var AssetViewComponent = (function () {
    // END_CUSTOM_CODE_assetViewModelComponentProperties
    /// component additional properties
    function AssetViewComponent(
        // START_CUSTOM_CODE_assetViewModelComponentConstructorDependencies
        route, 
        // END_CUSTOM_CODE_assetViewModelComponentConstructorDependencies
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
        // START_CUSTOM_CODE_assetViewModelComponentConstructorMethod
        this._numberOfAddedItems = 0;
        // END_CUSTOM_CODE_assetViewModelComponentConstructorMethod
        /// component constructor method
    }
    Object.defineProperty(AssetViewComponent.prototype, "title", {
        get: function () {
            var result = "Assets";
            if (this._mode === shared.Modes.ADD) {
                result = "Create";
            }
            else if (this._mode === shared.Modes.EDIT) {
                result = "Edit";
            }
            else if (this._mode === shared.Modes.DETAIL) {
                var current = this._currentItem$.getValue();
                result = current.data.Name + "\0";
            }
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetViewComponent.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetViewComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetViewComponent.prototype, "items$", {
        get: function () {
            return this._items$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetViewComponent.prototype, "currentItem$", {
        get: function () {
            return this._currentItem$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AssetViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onLoad();
        // START_CUSTOM_CODE_assetViewModelComponentOnInit
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
        // END_CUSTOM_CODE_assetViewModelComponentOnInit
    };
    AssetViewComponent.prototype.onLoad = function () {
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
            // START_CUSTOM_CODE_assetViewModelComponentCustomLoad
            _this._numberOfAddedItems = _this.items$.length;
            // END_CUSTOM_CODE_assetViewModelComponentCustomLoad
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    AssetViewComponent.prototype.onSelect = function (args) {
        this._currentItem$.next(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    };
    AssetViewComponent.prototype.onUpdate = function (args) {
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
    AssetViewComponent.prototype.onNavigateBack = function () {
        this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    };
    AssetViewComponent.prototype.onNavigate = function (mode) {
        this._mode = mode;
    };
    // START_CUSTOM_CODE_assetViewModelComponentAdditionalMethods
    AssetViewComponent.prototype.onLoadMoreItemsRequested = function (args) {
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
    AssetViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-assetView",
            templateUrl: "assetView.component.html"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common.AssetViewService])
    ], AssetViewComponent);
    return AssetViewComponent;
}());
exports.AssetViewComponent = AssetViewComponent;
//# sourceMappingURL=assetView.component.js.map