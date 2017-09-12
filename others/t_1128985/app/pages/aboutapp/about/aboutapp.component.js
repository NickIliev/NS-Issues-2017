"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var app = require("application");
var page_1 = require("ui/page");
var global_1 = require("../../../shared/global");
var releaseJson = require("../../../config/release.json");
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
        this.versionNumber = releaseJson.versionnumber;
        this.buildValue = releaseJson.buildnumber;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXRhcHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXRhcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHNEQUErRDtBQUkvRCxpQ0FBbUM7QUFHbkMsZ0NBQStCO0FBQy9CLGlEQUFpRDtBQUNqRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMxRCxtSEFBaUg7QUFDakgsbUVBQTZFO0FBQzdFLDBFQUF3RTtBQVl4RSxJQUFhLGlCQUFpQjtJQVcxQiwyQkFBb0IsYUFBNEIsRUFBVSxLQUF1QixFQUFTLE9BQWdCLEVBQVUsZ0JBQWtDLEVBQVUsSUFBVSxFQUFVLG1CQUF1QztRQUF2TSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQVRwTixVQUFLLEdBQVcsa0JBQWtCLENBQUM7UUFLMUMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1FBQ3JFLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQzlDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDcEQsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNPLDJDQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDckQsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLHFDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO2FBQy9CLENBQUM7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLDREQUE0QixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUNPLGtDQUFNLEdBQWQ7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztLQUM5QixDQUFDO3FDQWFxQyw4QkFBYSxFQUFpQix1QkFBZ0IsRUFBa0IsZ0JBQU8sRUFBNEIseUJBQWdCLEVBQWdCLFdBQUksRUFBK0IsNEJBQWtCO0dBWGxOLGlCQUFpQixDQThEN0I7QUE5RFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IGtub3duRm9sZGVycywgRmlsZSwgRm9sZGVyIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xubGV0IHJlbGVhc2VKc29uID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbmZpZy9yZWxlYXNlLmpzb25cIik7XG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9ndWlkZUVkdWNhdGlvblByb21vL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hYm91dGFwcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi4vYWJvdXQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgQWJvdXRBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyB0ZXh0TGlzdDogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9IFwiQWJvdXQgTXlCbHVlIEFwcFwiO1xuICAgIHB1YmxpYyBidWlsZFZhbHVlOiBzdHJpbmc7XG4gICAgcHVibGljIHZlcnNpb25OdW1iZXI6IHN0cmluZztcbiAgICBwdWJsaWMgaXNVc2VyTG9nZ2VkSW46IEJvb2xlYW47XG5cbiAgICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VFbmRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJhd2VyU2VydmljZTogRHJhd2VyU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHVibGljIGdsb2JhbHM6IEdsb2JhbHMsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGVkdWNhdGlvblByb21vTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSkge1xuICAgICAgICB0aGlzLnRleHRMaXN0ID0gW1wiVGVybXMgJiBDb25kaXRpb25zXCIsIFwiUHJpdmFjeSBQb2xpY3lcIiwgXCJGZWF0dXJlIEd1aWRlc1wiXTtcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiQWJvdXQgTXlCbHVlIEFwcFwiO1xuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1VzZXJMb2dnZWRJbiA9IHRoaXMuZ2xvYmFscy5pc0xvZ2dlZEluO1xuICAgICAgICBpZiAoYXBwLmlvcykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLmNzcyA9IFwiUGFnZSB7YmFja2dyb3VuZC1pbWFnZSA6IG5vbmU7IG1hcmdpbi10b3A6IDB9IFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52ZXJzaW9uTnVtYmVyID0gcmVsZWFzZUpzb24udmVyc2lvbm51bWJlcjtcbiAgICAgICAgdGhpcy5idWlsZFZhbHVlID0gcmVsZWFzZUpzb24uYnVpbGRudW1iZXI7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdvVG9UZXJtc1BhZ2UoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvYWJvdXRhcHAvdGVybXNfYXBwXCJdLCB7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgZ29Ub1ByaXZhY3lQYWdlKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2Fib3V0YXBwL3BvbGljeV9hcHBcIl0sIHtcbiAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9UZXJtc1BhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Qcml2YWN5UGFnZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2VyU2VydmljZS5lbmFibGVHZXN0dXJlKGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZWR1Y2F0aW9uUHJvbW9Nb2RhbC5zaG93TW9kYWwoR3VpZGVFZHVjYXRpb25Qcm9tb0NvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxufVxuIl19