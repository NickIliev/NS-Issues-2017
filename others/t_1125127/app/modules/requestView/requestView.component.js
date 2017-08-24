"use strict";
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var observable_array_1 = require("data/observable-array");
// END_CUSTOM_CODE_requestViewModelComponentImports
/// component additional imports
var common = require("./shared");
var shared = require("../../shared");
var RequestViewComponent = (function () {
    // END_CUSTOM_CODE_requestViewModelComponentProperties
    /// component additional properties
    function RequestViewComponent(
        // START_CUSTOM_CODE_requestViewModelComponentConstructorDependencies
        // END_CUSTOM_CODE_requestViewModelComponentConstructorDependencies
        /// component constructor dependencies
        _service) {
        this._service = _service;
        this.modes = shared.Modes;
        this._mode = shared.Modes.LIST;
        this._items$ = new observable_array_1.ObservableArray();
        this._currentItem$ = new BehaviorSubject_1.BehaviorSubject({
            id: "",
            data: {}
        });
        // START_CUSTOM_CODE_requestViewModelComponentConstructorMethod
        this.spaceID = null;
        this._numberOfAddedItems = 0;
        this._requestedByFilter = shared.RequestedByFilter.All;
        // END_CUSTOM_CODE_requestViewModelComponentConstructorMethod
        /// component constructor method
    }
    Object.defineProperty(RequestViewComponent.prototype, "title", {
        get: function () {
            var result = "Requests";
            if (this._mode === shared.Modes.ADD) {
                result = "New Request";
            }
            else if (this._mode === shared.Modes.EDIT) {
                var current = this._currentItem$.getValue();
                result = current.data.Description + "\0";
            }
            else if (this._mode === shared.Modes.DETAIL) {
                var current = this._currentItem$.getValue();
                if (current.data.oBuilding) {
                    result = current.data.oBuilding.Name + "\0";
                }
            }
            /// component custom title
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewComponent.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewComponent.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewComponent.prototype, "items$", {
        get: function () {
            return this._items$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewComponent.prototype, "currentItem$", {
        get: function () {
            return this._currentItem$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RequestViewComponent.prototype.ngOnInit = function () {
        this.onLoad();
        // START_CUSTOM_CODE_requestViewModelComponentOnInit
        // END_CUSTOM_CODE_requestViewModelComponentOnInit
    };
    RequestViewComponent.prototype.onLoad = function () {
        var _this = this;
        this._items$ = new observable_array_1.ObservableArray();
        this._service.requestedByFilter = this._requestedByFilter;
        this._service.spaceIDFilter = this.spaceID;
        this._service.get()
            .subscribe(function (data) {
            data.forEach(function (item) {
                var newItem = {
                    "id": item.Id,
                    "data": item
                };
                _this.items$.push(newItem);
            });
            // START_CUSTOM_CODE_requestViewModelComponentCustomLoad
            _this._numberOfAddedItems = _this.items$.length;
            // END_CUSTOM_CODE_requestViewModelComponentCustomLoad
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    RequestViewComponent.prototype.onSelect = function (args) {
        this._currentItem$.next(args.item);
        this.onNavigate(shared.Modes.DETAIL);
    };
    RequestViewComponent.prototype.onAdd = function (args) {
        var _this = this;
        this._service.post(args.item.data)
            .subscribe(function (data) {
            var arr = _this._items$;
            if (!data.Id) {
                return;
            }
            args.item.id = data.Id;
            arr.push(args.item);
            _this._currentItem$.next({
                id: "",
                data: {}
            });
            _this.onNavigate(shared.Modes.LIST);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    RequestViewComponent.prototype.onUpdate = function (args) {
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
    RequestViewComponent.prototype.onDelete = function (args) {
        var _this = this;
        this._service.delete(args.item.data)
            .subscribe(function (data) {
            var arr = _this._items$;
            arr.forEach(function (itm, idx) {
                if (itm.id === args.item.id) {
                    arr.splice(idx, 1);
                }
            });
            _this._currentItem$.next({
                id: "",
                data: {}
            });
            _this.onNavigate(shared.Modes.LIST);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    RequestViewComponent.prototype.onNavigateBack = function () {
        this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);
    };
    RequestViewComponent.prototype.onNavigate = function (mode) {
        if (mode === shared.Modes.ADD) {
            this._currentItem$.next({
                id: "",
                data: {}
            });
        }
        this._mode = mode;
    };
    // START_CUSTOM_CODE_requestViewModelComponentAdditionalMethods
    RequestViewComponent.prototype.onLoadMoreItemsRequested = function (args) {
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
    RequestViewComponent.prototype.onListFilterChanged = function (args) {
        var that = new WeakRef(this);
        var tabView = args.object;
        var newIndex = tabView.selectedIndex;
        if (that.get()._requestedByFilter != newIndex) {
            //alert("Switching filters");
            that.get()._requestedByFilter = newIndex;
            that.get()._service.requestedByFilter = that.get()._requestedByFilter;
            that.get().onLoad();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RequestViewComponent.prototype, "embedded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RequestViewComponent.prototype, "spaceID", void 0);
    RequestViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-requestView",
            templateUrl: "requestView.component.html"
        }), 
        __metadata('design:paramtypes', [common.RequestViewService])
    ], RequestViewComponent);
    return RequestViewComponent;
}());
exports.RequestViewComponent = RequestViewComponent;
//# sourceMappingURL=requestView.component.js.map