"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("@angular/router");
var global_1 = require("../../../../shared/global");
var router_2 = require("nativescript-angular/router");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var core_2 = require("@angular/core");
var app = require("tns-core-modules/application");
var radio_option_1 = require("./radio-option");
var SecurityQuestionOneComponent = (function () {
    function SecurityQuestionOneComponent(params, page, _routerExtensions, securityQuestionModal, route, vcRef, _globals) {
        this.params = params;
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.securityQuestionModal = securityQuestionModal;
        this.route = route;
        this.vcRef = vcRef;
        this._globals = _globals;
        this.questionNo = "question1";
        this.isGroup1Selected = false;
        this.isGroup2Selected = false;
        this.isGroup3Selected = false;
        this.option1Selected = true;
        this.option2Selected = true;
        this.option3Selected = true;
        this.questionNo = "question1";
    }
    SecurityQuestionOneComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.radioOptions = [
            new radio_option_1.RadioOption("14 Zaxxon Circle"),
            new radio_option_1.RadioOption("123 Galaga way"),
            new radio_option_1.RadioOption("43 Yoshi street"),
            new radio_option_1.RadioOption("None of the Above")
        ];
        this.radioOptions2 = [
            new radio_option_1.RadioOption("14 Zaxxon Circle"),
            new radio_option_1.RadioOption("123 Galaga way2"),
            new radio_option_1.RadioOption("43 Yoshi street"),
            new radio_option_1.RadioOption("None of the Above")
        ];
        this.radioOptions3 = [
            new radio_option_1.RadioOption("14 Zaxxon Circle"),
            new radio_option_1.RadioOption("123 Galaga way3"),
            new radio_option_1.RadioOption("43 Yoshi street"),
            new radio_option_1.RadioOption("None of the Above")
        ];
    };
    SecurityQuestionOneComponent.prototype.changeCheckedRadio = function (radioOption) {
        var _this = this;
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions.forEach(function (option) {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
        this.radioOptions.forEach(function (option) {
            if (option.selected) {
                _this.isGroup1Selected = true;
            }
        });
    };
    SecurityQuestionOneComponent.prototype.changeCheckedRadio2 = function (radioOption2) {
        var _this = this;
        radioOption2.selected = !radioOption2.selected;
        if (!radioOption2.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions2.forEach(function (option2) {
            if (option2.text !== radioOption2.text) {
                option2.selected = false;
            }
        });
        this.radioOptions2.forEach(function (option) {
            if (option.selected) {
                _this.isGroup2Selected = true;
            }
        });
    };
    SecurityQuestionOneComponent.prototype.changeCheckedRadio3 = function (radioOption3) {
        var _this = this;
        radioOption3.selected = !radioOption3.selected;
        if (!radioOption3.selected) {
            return;
        }
        // uncheck all other options
        this.radioOptions3.forEach(function (option3) {
            if (option3.text !== radioOption3.text) {
                option3.selected = false;
            }
        });
        this.radioOptions3.forEach(function (option3) {
            if (option3.selected) {
                _this.isGroup3Selected = true;
            }
        });
    };
    // To close the modal-window
    SecurityQuestionOneComponent.prototype.close = function () {
        this._routerExtensions.navigate(["/personal_info/verify_identity"], {
            animated: false
        });
        this.params.closeCallback();
    };
    SecurityQuestionOneComponent.prototype.goToNextQuestion = function (index) {
        if (index === "two") {
            if (this.isGroup1Selected) {
                this.questionNo = "question2";
                this.changeCheckedRadio2;
            }
            else {
                this.option1Selected = false;
            }
        }
        else if (index === "three") {
            if (this.isGroup2Selected) {
                this.questionNo = "question3";
                this.changeCheckedRadio3;
            }
            else {
                this.option2Selected = false;
            }
        }
        else if (index === "submit") {
            if (this.isGroup3Selected) {
                this.params.closeCallback("true");
            }
            else {
                this.option3Selected = false;
            }
        }
    };
    SecurityQuestionOneComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return SecurityQuestionOneComponent;
}());
SecurityQuestionOneComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./securityQuestionOne.component.html",
        styleUrls: ["../../authentication.css"]
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        page_1.Page,
        router_2.RouterExtensions,
        dialogs_2.ModalDialogService,
        router_1.ActivatedRoute, core_2.ViewContainerRef,
        global_1.Globals])
], SecurityQuestionOneComponent);
exports.SecurityQuestionOneComponent = SecurityQuestionOneComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWN1cml0eVF1ZXN0aW9uT25lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRjtBQUNuRixtRUFBNEU7QUFDNUUsMENBQWlEO0FBRWpELG9EQUFvRDtBQUNwRCxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLGdDQUErQjtBQUMvQixzQ0FBaUQ7QUFDakQsa0RBQW9EO0FBQ3BELCtDQUE2QztBQVM3QyxJQUFhLDRCQUE0QjtJQVlyQyxzQ0FBMkIsTUFBeUIsRUFDeEMsSUFBVSxFQUNWLGlCQUFtQyxFQUNuQyxxQkFBeUMsRUFDekMsS0FBcUIsRUFBVSxLQUF1QixFQUN2RCxRQUFpQjtRQUxELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFDekMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2RCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBZnJCLGVBQVUsR0FBVyxXQUFXLENBQUM7UUFDakMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFVbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFHbEMsQ0FBQztJQUNELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENB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aWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NoYXJlZC9nbG9iYWxcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCIuL3JhZGlvLW9wdGlvblwiO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi4vLi4vYXV0aGVudGljYXRpb24uY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlRdWVzdGlvbk9uZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25Obzogc3RyaW5nID0gXCJxdWVzdGlvbjFcIjtcbiAgICBwdWJsaWMgaXNHcm91cDFTZWxlY3RlZDogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc0dyb3VwMlNlbGVjdGVkOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzR3JvdXAzU2VsZWN0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgb3B0aW9uMVNlbGVjdGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgb3B0aW9uMlNlbGVjdGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgb3B0aW9uM1NlbGVjdGVkOiBCb29sZWFuID0gdHJ1ZTtcbiAgICByYWRpb09wdGlvbnM/OiBBcnJheTxSYWRpb09wdGlvbj47XG4gICAgcmFkaW9PcHRpb25zMj86IEFycmF5PFJhZGlvT3B0aW9uPjtcbiAgICByYWRpb09wdGlvbnMzPzogQXJyYXk8UmFkaW9PcHRpb24+O1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBzZWN1cml0eVF1ZXN0aW9uTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscykge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uTm8gPSBcInF1ZXN0aW9uMVwiO1xuXG5cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCIxNCBaYXh4b24gQ2lyY2xlXCIpLFxuICAgICAgICAgICAgbmV3IFJhZGlvT3B0aW9uKFwiMTIzIEdhbGFnYSB3YXlcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCI0MyBZb3NoaSBzdHJlZXRcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJOb25lIG9mIHRoZSBBYm92ZVwiKVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMucmFkaW9PcHRpb25zMiA9IFtcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjE0IFpheHhvbiBDaXJjbGVcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCIxMjMgR2FsYWdhIHdheTJcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCI0MyBZb3NoaSBzdHJlZXRcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJOb25lIG9mIHRoZSBBYm92ZVwiKVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMucmFkaW9PcHRpb25zMyA9IFtcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjE0IFpheHhvbiBDaXJjbGVcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCIxMjMgR2FsYWdhIHdheTNcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCI0MyBZb3NoaSBzdHJlZXRcIiksXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJOb25lIG9mIHRoZSBBYm92ZVwiKVxuICAgICAgICBdO1xuXG4gICAgfVxuICAgIGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcbiAgICAgICAgcmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xuICAgICAgICB0aGlzLnJhZGlvT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnRleHQgIT09IHJhZGlvT3B0aW9uLnRleHQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmFkaW9PcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzR3JvdXAxU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VDaGVja2VkUmFkaW8yKHJhZGlvT3B0aW9uMjogUmFkaW9PcHRpb24pOiB2b2lkIHtcbiAgICAgICAgcmFkaW9PcHRpb24yLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uMi5zZWxlY3RlZDtcblxuICAgICAgICBpZiAoIXJhZGlvT3B0aW9uMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xuICAgICAgICB0aGlzLnJhZGlvT3B0aW9uczIuZm9yRWFjaChvcHRpb24yID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24yLnRleHQgIT09IHJhZGlvT3B0aW9uMi50ZXh0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uMi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMyLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzR3JvdXAyU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VDaGVja2VkUmFkaW8zKHJhZGlvT3B0aW9uMzogUmFkaW9PcHRpb24pOiB2b2lkIHtcbiAgICAgICAgcmFkaW9PcHRpb24zLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uMy5zZWxlY3RlZDtcblxuICAgICAgICBpZiAoIXJhZGlvT3B0aW9uMy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xuICAgICAgICB0aGlzLnJhZGlvT3B0aW9uczMuZm9yRWFjaChvcHRpb24zID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24zLnRleHQgIT09IHJhZGlvT3B0aW9uMy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uMy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMzLmZvckVhY2gob3B0aW9uMyA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uMy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNHcm91cDNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gVG8gY2xvc2UgdGhlIG1vZGFsLXdpbmRvd1xuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcbiAgICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgcHVibGljIGdvVG9OZXh0UXVlc3Rpb24oaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBcInR3b1wiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0dyb3VwMVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbk5vID0gXCJxdWVzdGlvbjJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUNoZWNrZWRSYWRpbzI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbjFTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IFwidGhyZWVcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cDJTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25ObyA9IFwicXVlc3Rpb24zXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDaGVja2VkUmFkaW8zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb24yU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gXCJzdWJtaXRcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cDNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb24zU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=