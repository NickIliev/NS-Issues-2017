"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var app = require("application");
var page_1 = require("ui/page");
var global_1 = require("../../../shared/global");
var guideEducationPromo_component_1 = require("../../../shared/guideEducationPromo/guideEducationPromo.component");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var drawer_service_1 = require("../../../shared/services/drawer.service");
var AboutAppComponent = (function () {
    function AboutAppComponent(drawerService, vcRef, globals, routerExtensions, page, educationPromoModal) {
        this.drawerService = drawerService;
        this.vcRef = vcRef;
        this.globals = globals;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.educationPromoModal = educationPromoModal;
        this.title = "About MyBlue App";
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.textList = ["Terms & Conditions", "Privacy Policy", "Feature Guides"];
        this.title = "About MyBlue App";
        this.pageStartTime = new Date().getTime();
    }
    AboutAppComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.versionNumber = this.globals.versionNumber;
        this.buildValue = this.globals.buildValue;
    };
    AboutAppComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    AboutAppComponent.prototype.goToTermsPage = function () {
        this.routerExtensions.navigate(["/aboutapp/terms_app"], {
            animated: false
        });
    };
    AboutAppComponent.prototype.goToPrivacyPage = function () {
        this.routerExtensions.navigate(["/aboutapp/policy_app"], {
            animated: false
        });
    };
    AboutAppComponent.prototype.onItemTap = function (args) {
        if (args.index === 0) {
            this.goToTermsPage();
        }
        else if (args.index === 1) {
            this.goToPrivacyPage();
        }
        else if (args.index === 2) {
            this.drawerService.enableGesture(false);
            var options = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            this.educationPromoModal.showModal(guideEducationPromo_component_1.GuideEducationPromoComponent, options).then(function (res) {
            });
        }
    };
    AboutAppComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return AboutAppComponent;
}());
AboutAppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./aboutapp.component.html",
        styleUrls: ["../about.css"]
    }),
    __metadata("design:paramtypes", [drawer_service_1.DrawerService, core_1.ViewContainerRef, global_1.Globals, router_1.RouterExtensions, page_1.Page, dialogs_1.ModalDialogService])
], AboutAppComponent);
exports.AboutAppComponent = AboutAppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXRhcHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXRhcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHNEQUErRDtBQUkvRCxpQ0FBbUM7QUFHbkMsZ0NBQStCO0FBQy9CLGlEQUFpRDtBQUVqRCxtSEFBaUg7QUFDakgsbUVBQTZFO0FBQzdFLDBFQUF3RTtBQVN4RSxJQUFhLGlCQUFpQjtJQVcxQiwyQkFBb0IsYUFBNEIsRUFBVSxLQUF1QixFQUFTLE9BQWdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLG1CQUF1QztRQUF2TSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQVRwTixVQUFLLEdBQVcsa0JBQWtCLENBQUM7UUFLMUMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNwRSxDQUFDO0lBRU8seUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNwRCxRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ08sMkNBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUNyRCxRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ00scUNBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLE9BQU8sR0FBRztnQkFDVixPQUFPLEVBQUUsRUFBRTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDL0IsQ0FBQztZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsNERBQTRCLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNsRixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ08sa0NBQU0sR0FBZDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBOURELElBOERDO0FBOURZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQzlCLENBQUM7cUNBYXFDLDhCQUFhLEVBQWlCLHVCQUFnQixFQUFrQixnQkFBTyxFQUE0Qix5QkFBZ0IsRUFBZ0IsV0FBSSxFQUErQiw0QkFBa0I7R0FYbE4saUJBQWlCLENBOEQ3QjtBQTlEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBrbm93bkZvbGRlcnMsIEZpbGUsIEZvbGRlciB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvZ2xvYmFsXCI7XHJcblxyXG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9ndWlkZUVkdWNhdGlvblByb21vL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Fib3V0YXBwLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4uL2Fib3V0LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFib3V0QXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyB0ZXh0TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gXCJBYm91dCBNeUJsdWUgQXBwXCI7XHJcbiAgICBwdWJsaWMgYnVpbGRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHZlcnNpb25OdW1iZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1VzZXJMb2dnZWRJbjogQm9vbGVhbjtcclxuXHJcbiAgICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlVGltZURpZmZlcmVuY2U6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkcmF3ZXJTZXJ2aWNlOiBEcmF3ZXJTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgZ2xvYmFsczogR2xvYmFscywgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZWR1Y2F0aW9uUHJvbW9Nb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0TGlzdCA9IFtcIlRlcm1zICYgQ29uZGl0aW9uc1wiLCBcIlByaXZhY3kgUG9saWN5XCIsIFwiRmVhdHVyZSBHdWlkZXNcIl07XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiQWJvdXQgTXlCbHVlIEFwcFwiO1xyXG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaXNVc2VyTG9nZ2VkSW4gPSB0aGlzLmdsb2JhbHMuaXNMb2dnZWRJbjtcclxuICAgICAgICBpZiAoYXBwLmlvcykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY3NzID0gXCJQYWdlIHtiYWNrZ3JvdW5kLWltYWdlIDogbm9uZTsgbWFyZ2luLXRvcDogMH0gXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnNpb25OdW1iZXIgPSB0aGlzLmdsb2JhbHMudmVyc2lvbk51bWJlcjtcclxuICAgICAgICB0aGlzLmJ1aWxkVmFsdWUgPSB0aGlzLmdsb2JhbHMuYnVpbGRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdvVG9UZXJtc1BhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9hYm91dGFwcC90ZXJtc19hcHBcIl0sIHtcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdvVG9Qcml2YWN5UGFnZSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2Fib3V0YXBwL3BvbGljeV9hcHBcIl0sIHtcclxuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5pbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdvVG9UZXJtc1BhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5pbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmdvVG9Qcml2YWN5UGFnZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5pbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdlclNlcnZpY2UuZW5hYmxlR2VzdHVyZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmVkdWNhdGlvblByb21vTW9kYWwuc2hvd01vZGFsKEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=