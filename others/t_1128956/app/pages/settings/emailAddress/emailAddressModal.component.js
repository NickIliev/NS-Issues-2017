"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var global_1 = require("../../../shared/global");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var EmailAddressModalComponent = (function () {
    function EmailAddressModalComponent(params, _routerExtensions, vcRef, page, _globals) {
        this.params = params;
        this._routerExtensions = _routerExtensions;
        this.vcRef = vcRef;
        this.page = page;
        this._globals = _globals;
        this.temp = null;
    }
    EmailAddressModalComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-color : transparent; margin-top: 0;}";
        }
    };
    EmailAddressModalComponent.prototype.goBack = function () {
        this.params.closeCallback();
    };
    return EmailAddressModalComponent;
}());
EmailAddressModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./emailAddressModal.component.html",
        styleUrls: ["../settings.css"]
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        router_1.RouterExtensions,
        core_1.ViewContainerRef,
        page_1.Page,
        global_1.Globals])
], EmailAddressModalComponent);
exports.EmailAddressModalComponent = EmailAddressModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxBZGRyZXNzTW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW1haWxBZGRyZXNzTW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHNEQUErRDtBQUMvRCxtRUFBNEU7QUFDNUUsaURBQWlEO0FBQ2pELGdDQUErQjtBQUMvQixrREFBb0Q7QUFRcEQsSUFBYSwwQkFBMEI7SUFFbkMsb0NBQW9CLE1BQXlCLEVBQ2pDLGlCQUFtQyxFQUNuQyxLQUF1QixFQUN2QixJQUFVLEVBQ1gsUUFBaUI7UUFKUixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUNqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQU07UUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBTHJCLFNBQUksR0FBRyxJQUFJLENBQUM7SUFNbkIsQ0FBQztJQUVELDZDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLHVEQUF1RCxDQUFDO1FBQzVFLENBQUM7SUFDTCxDQUFDO0lBRUQsMkNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNMLGlDQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSwwQkFBMEI7SUFOdEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQ2pDLENBQUM7cUNBSThCLDJCQUFpQjtRQUNkLHlCQUFnQjtRQUM1Qix1QkFBZ0I7UUFDakIsV0FBSTtRQUNELGdCQUFPO0dBTm5CLDBCQUEwQixDQWtCdEM7QUFsQlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lbWFpbEFkZHJlc3NNb2RhbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuLi9zZXR0aW5ncy5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEFkZHJlc3NNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgdGVtcCA9IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICBwdWJsaWMgX2dsb2JhbHM6IEdsb2JhbHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWNvbG9yIDogdHJhbnNwYXJlbnQ7IG1hcmdpbi10b3A6IDA7fVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG59Il19