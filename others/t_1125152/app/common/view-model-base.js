"use strict";
var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var utility = require("~/common/utility");
var ViewModel = (function (_super) {

    __extends(ViewModel, _super);

    function ViewModel(data) {
        var that = this;
        
        _super.apply(that, arguments);
        
        for(var attrname in data) {
            Object.defineProperty(ViewModel.prototype, attrname, {
                get: function () {
                    return this["_" + attrname];
                },
                set: function (value) {
                    this["_" + attrname] = value;
                    this.notifyPropertyChange(attrname, value);
                },
                enumerable: true,
                configurable: true
            });
            
            that.set(attrname, data[attrname]);
        }
    }

    Object.defineProperty(ViewModel.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        set: function (value) {
            this._messages = value;
        },
        enumerable: true,
        configurable: true
    });

    ViewModel.prototype.showError = function (error, title) {
        console.log(error);
        console.log(typeof title);
        var context = {
            title: typeof title === "undefined" ? "Error" : title,
            message: error
        }
        utility.launchPopup("acknowledge", function(data) {
            // callback
        }, null, context);
    };

    ViewModel.prototype.showPageLoading = function () {
        this.set("isLoading", true);
    }

    ViewModel.prototype.hidePageLoading = function () {
        this.set("isLoading", false);
    }

    return ViewModel;

})(observableModule.Observable);

module.exports = ViewModel;