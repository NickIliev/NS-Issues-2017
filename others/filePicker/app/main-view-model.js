"use strict";
var observable_1 = require("data/observable");
var filePicker = require("nativescript-file-picker");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.filePicker = new filePicker.FilePicker();
        return _this;
    }
    HelloWorldModel.prototype.showFilePicker = function () {
        this.filePicker.singleClick = true;
        this.filePicker.mode = filePicker.Modes.MODE_FILE;
        this.filePicker.show().then(function (result) {
            if (result.length == 1) {
                console.log(result);
            }
            else
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                }
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map