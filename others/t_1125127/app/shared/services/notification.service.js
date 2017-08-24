"use strict";
var core_1 = require("@angular/core");
var dialogsModule = require("ui/dialogs");
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.error = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Error",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService.prototype.warning = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Warning",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService.prototype.success = function (message) {
        if (message === void 0) { message = "Message"; }
        return dialogsModule.alert({
            title: "Success",
            okButtonText: "OK",
            message: message
        });
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map