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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWN1cml0eVF1ZXN0aW9uT25lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRjtBQUNuRixtRUFBNEU7QUFDNUUsMENBQWlEO0FBRWpELG9EQUFvRDtBQUNwRCxzREFBK0Q7QUFDL0QsbUVBQTZFO0FBQzdFLGdDQUErQjtBQUMvQixzQ0FBaUQ7QUFDakQsa0RBQW9EO0FBQ3BELCtDQUE2QztBQVM3QyxJQUFhLDRCQUE0QjtJQVlyQyxzQ0FBMkIsTUFBeUIsRUFDeEMsSUFBVSxFQUNWLGlCQUFtQyxFQUNuQyxxQkFBeUMsRUFDekMsS0FBcUIsRUFBVSxLQUF1QixFQUN2RCxRQUFpQjtRQUxELFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBb0I7UUFDekMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2RCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBZnJCLGVBQVUsR0FBVyxXQUFXLENBQUM7UUFDakMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFVbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFHbEMsQ0FBQztJQUNELCtDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENB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aWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIi4vcmFkaW8tb3B0aW9uXCI7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VjdXJpdHlRdWVzdGlvbk9uZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuLi8uLi9hdXRoZW50aWNhdGlvbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eVF1ZXN0aW9uT25lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgcXVlc3Rpb25Obzogc3RyaW5nID0gXCJxdWVzdGlvbjFcIjtcclxuICAgIHB1YmxpYyBpc0dyb3VwMVNlbGVjdGVkOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNHcm91cDJTZWxlY3RlZDogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzR3JvdXAzU2VsZWN0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBvcHRpb24xU2VsZWN0ZWQ6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIG9wdGlvbjJTZWxlY3RlZDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgb3B0aW9uM1NlbGVjdGVkOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHJhZGlvT3B0aW9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuICAgIHJhZGlvT3B0aW9uczI/OiBBcnJheTxSYWRpb09wdGlvbj47XHJcbiAgICByYWRpb09wdGlvbnMzPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHNlY3VyaXR5UXVlc3Rpb25Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscykge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25ObyA9IFwicXVlc3Rpb24xXCI7XHJcblxyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjE0IFpheHhvbiBDaXJjbGVcIiksXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjEyMyBHYWxhZ2Egd2F5XCIpLFxyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCI0MyBZb3NoaSBzdHJlZXRcIiksXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIk5vbmUgb2YgdGhlIEFib3ZlXCIpXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMyID0gW1xyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCIxNCBaYXh4b24gQ2lyY2xlXCIpLFxyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCIxMjMgR2FsYWdhIHdheTJcIiksXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjQzIFlvc2hpIHN0cmVldFwiKSxcclxuICAgICAgICAgICAgbmV3IFJhZGlvT3B0aW9uKFwiTm9uZSBvZiB0aGUgQWJvdmVcIilcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnJhZGlvT3B0aW9uczMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjE0IFpheHhvbiBDaXJjbGVcIiksXHJcbiAgICAgICAgICAgIG5ldyBSYWRpb09wdGlvbihcIjEyMyBHYWxhZ2Egd2F5M1wiKSxcclxuICAgICAgICAgICAgbmV3IFJhZGlvT3B0aW9uKFwiNDMgWW9zaGkgc3RyZWV0XCIpLFxyXG4gICAgICAgICAgICBuZXcgUmFkaW9PcHRpb24oXCJOb25lIG9mIHRoZSBBYm92ZVwiKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgfVxyXG4gICAgY2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG5cclxuICAgICAgICBpZiAoIXJhZGlvT3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVuY2hlY2sgYWxsIG90aGVyIG9wdGlvbnNcclxuICAgICAgICB0aGlzLnJhZGlvT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJhZGlvT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNHcm91cDFTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VDaGVja2VkUmFkaW8yKHJhZGlvT3B0aW9uMjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuICAgICAgICByYWRpb09wdGlvbjIuc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24yLnNlbGVjdGVkO1xyXG5cclxuICAgICAgICBpZiAoIXJhZGlvT3B0aW9uMi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1bmNoZWNrIGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMyLmZvckVhY2gob3B0aW9uMiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24yLnRleHQgIT09IHJhZGlvT3B0aW9uMi50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJhZGlvT3B0aW9uczIuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzR3JvdXAyU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQ2hlY2tlZFJhZGlvMyhyYWRpb09wdGlvbjM6IFJhZGlvT3B0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgcmFkaW9PcHRpb24zLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uMy5zZWxlY3RlZDtcclxuXHJcbiAgICAgICAgaWYgKCFyYWRpb09wdGlvbjMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdW5jaGVjayBhbGwgb3RoZXIgb3B0aW9uc1xyXG4gICAgICAgIHRoaXMucmFkaW9PcHRpb25zMy5mb3JFYWNoKG9wdGlvbjMgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uMy50ZXh0ICE9PSByYWRpb09wdGlvbjMudGV4dCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yYWRpb09wdGlvbnMzLmZvckVhY2gob3B0aW9uMyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24zLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzR3JvdXAzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFRvIGNsb3NlIHRoZSBtb2RhbC13aW5kb3dcclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wZXJzb25hbF9pbmZvL3ZlcmlmeV9pZGVudGl0eVwiXSwge1xyXG4gICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdvVG9OZXh0UXVlc3Rpb24oaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPT09IFwidHdvXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cDFTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbk5vID0gXCJxdWVzdGlvbjJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2hlY2tlZFJhZGlvMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uMVNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSBcInRocmVlXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cDJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbk5vID0gXCJxdWVzdGlvbjNcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2hlY2tlZFJhZGlvMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uMlNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IFwic3VibWl0XCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cDNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhcInRydWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbjNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=