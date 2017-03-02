var dependencyObservable = require("ui/core/dependency-observable");
var observable_array_1 = require("data/observable-array");
var proxy_1 = require("ui/core/proxy");
var bindable_1 = require("ui/core/bindable");
var observable_1 = require("data/observable");
var weakEvents = require("ui/core/weak-event-listener");
var Palette = (function (_super) {
    __extends(Palette, _super);
    function Palette() {
        _super.call(this);
        this.entries = new observable_array_1.ObservableArray();
    }
    Palette.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "entries") {
            this.entries = new observable_array_1.ObservableArray(value);
            for (var i = 0; i < this.entries.length; i++) {
                this.entries.getItem(i).ownerPalette = this;
            }
        }
    };
    Palette.onEntriesPropertyChanged = function (data) {
        var palette = data.object;
        palette.onEntriesChanged(data);
    };
    Palette.prototype.onEntriesChanged = function (data) {
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.entriesCollectionChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            var collection = data.newValue;
            if (collection.length >= 0) {
                for (var i = 0; i < collection.length; i++) {
                    this.entries.getItem(i).ownerPalette = this;
                }
                this.updateOwner();
            }
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.entriesCollectionChangedInternal, this);
        }
    };
    Palette.prototype.entriesCollectionChangedInternal = function (data) {
        if (data.eventName && data.eventName.toLowerCase() === "change") {
            if (data.action && data.action.toLowerCase() === "add") {
                for (var i = 0; i < data.addedCount; i++) {
                    this.entries.getItem(data.index).ownerPalette = this;
                }
            }
        }
        this.updateOwner();
    };
    Palette.seriesNamePropertyChanged = function (data) {
        var palette = data.object;
        palette.onSeriesNamePropertyChanged(data);
    };
    Palette.prototype.onSeriesNamePropertyChanged = function (data) {
        this.updateOwner();
    };
    Palette.seriesStatePropertyChanged = function (data) {
        var palette = data.object;
        palette.onSeriesStatePropertyChanged(data);
    };
    Palette.prototype.onSeriesStatePropertyChanged = function (data) {
        this.updateOwner();
    };
    Palette.prototype.updateOwner = function () {
        if (this.owner && this.owner.reloadPalettes) {
            this.owner.reloadPalettes();
        }
    };
    Object.defineProperty(Palette.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "entries", {
        get: function () {
            return this._getValue(Palette.entriesProperty);
        },
        set: function (value) {
            this._setValue(Palette.entriesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "seriesName", {
        get: function () {
            return this._getValue(Palette.seriesNameProperty);
        },
        set: function (value) {
            this._setValue(Palette.seriesNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Palette.prototype, "seriesState", {
        get: function () {
            return this._getValue(Palette.seriesStateProperty);
        },
        set: function (value) {
            this._setValue(Palette.seriesStateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Palette.entriesProperty = new dependencyObservable.Property("entries", "Palette", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, Palette.onEntriesPropertyChanged));
    Palette.seriesNameProperty = new dependencyObservable.Property("seriesName", "Palette", new proxy_1.PropertyMetadata(undefined, undefined, Palette.seriesNamePropertyChanged));
    Palette.seriesStateProperty = new dependencyObservable.Property("seriesState", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, Palette.seriesStatePropertyChanged));
    return Palette;
}(bindable_1.Bindable));
exports.Palette = Palette;
var PaletteEntry = (function (_super) {
    __extends(PaletteEntry, _super);
    function PaletteEntry() {
        _super.apply(this, arguments);
    }
    PaletteEntry.fillColorPropertyChanged = function (data) {
        var paletteEntry = data.object;
        paletteEntry.onFillColorChanged(data);
    };
    PaletteEntry.strokeWidthPropertyChanged = function (data) {
        var paletteEntry = data.object;
        paletteEntry.onStrokeWidthChanged(data);
    };
    PaletteEntry.strokeColorPropertyChanged = function (data) {
        var paletteEntry = data.object;
        paletteEntry.onStrokeColorChanged(data);
    };
    PaletteEntry.prototype.onFillColorChanged = function (data) {
        this.updateOwner();
    };
    PaletteEntry.prototype.onStrokeWidthChanged = function (data) {
        this.updateOwner();
    };
    PaletteEntry.prototype.onStrokeColorChanged = function (data) {
        this.updateOwner();
    };
    PaletteEntry.prototype.updateOwner = function () {
        if (this.ownerPalette && this.ownerPalette.owner && this.ownerPalette.owner.reloadPalettes) {
            this.ownerPalette.owner.reloadPalettes();
        }
    };
    Object.defineProperty(PaletteEntry.prototype, "fillColor", {
        get: function () {
            return this._getValue(PaletteEntry.fillColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeColor", {
        get: function () {
            return this._getValue(PaletteEntry.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(PaletteEntry.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(PaletteEntry.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaletteEntry.prototype, "ownerPalette", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    PaletteEntry.fillColorProperty = new dependencyObservable.Property("fillColor", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, PaletteEntry.fillColorPropertyChanged));
    PaletteEntry.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, PaletteEntry.strokeWidthPropertyChanged));
    PaletteEntry.strokeColorProperty = new dependencyObservable.Property("strokeColor", "PaletteEntry", new proxy_1.PropertyMetadata(undefined, undefined, PaletteEntry.strokeColorPropertyChanged));
    return PaletteEntry;
}(bindable_1.Bindable));
exports.PaletteEntry = PaletteEntry;
//# sourceMappingURL=chart-palette-common.js.map