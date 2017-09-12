"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var myplanhelpinfo_component_1 = require("./myplanhelp/myplanhelpinfo.component");
var core_2 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var MyPlanComponent = (function () {
    function MyPlanComponent(_routerExtensions, elementRef, renderer, helpInfoModalDialogService, vcRef) {
        this._routerExtensions = _routerExtensions;
        this.helpInfoModalDialogService = helpInfoModalDialogService;
        this.vcRef = vcRef;
        this.accordionList = new Object;
        this.togglePanel = -1;
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.title = "My Plan";
        this.pageStartTime = new Date().getTime();
        this.accordionList = {
            subscriberId: "983575014",
            subscriberIdSuffix: "00",
            groupNumber: "004026124",
            benefitStartDate: "01/01/2017",
            provisionList: [
                { title: "Who's Covered", provisionHeader: [{ text: "Gretchen Sorensen", type: "subscriber" }, { text: "Ivan Sorensen", type: "spouse" }, { text: "Greta Sorensen", type: "dependent" }] },
                { title: "Co-Pays", provisionHeader: [{ text: "Office Visit", amount: "25/35" }, { text: "Behavioral Health", amount: "25" }, { text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$0 for Enhanced Benefits Tier", "$250 per member", "$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only. (counts toward Basic Benefits Tier deductible)" },
                { title: "Deductible", provisionHeader: [{ text: "Office Visit", amount: "25/35" }, { text: "Behavioral Health", amount: "25" }, { text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "" },
                { title: "Out-of-Pocket Maximum", provisionHeader: [{ text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only." },
                { title: "Overall Benefit Maximum", provisionHeader: [{ text: "Emergency Room", amount: "150" }, { text: "Preventitive", amount: "0" }], provisionBody: ["$1500 per family per plab year"], provisionFooter: "For Standard Benefits Tier hospital service only." }
            ]
        };
    }
    MyPlanComponent.prototype.tabClick = function (index) {
        this.togglePanel = this.togglePanel === index ? -1 : index;
    };
    MyPlanComponent.prototype.cards = function () {
        var _this = this;
        this._routerExtensions.navigate(["/cards"], {
            animated: false
        });
        setTimeout(function () {
            _this.togglePanel = -1;
        }, 500);
    };
    MyPlanComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    MyPlanComponent.prototype.ngOnInit = function () {
        //  this.pageStartTime = new Date().getTime();
    };
    MyPlanComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    MyPlanComponent.prototype.showHelpInfoModal = function () {
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.helpInfoModalDialogService.showModal(myplanhelpinfo_component_1.MyPlanHelpInfoComponent, options).then(function (res) {
        });
    };
    return MyPlanComponent;
}());
MyPlanComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./myPlan.component.html",
        styleUrls: ["myPlan.css"]
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions,
        core_1.ElementRef, core_1.Renderer,
        dialogs_1.ModalDialogService, core_2.ViewContainerRef])
], MyPlanComponent);
exports.MyPlanComponent = MyPlanComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlQbGFuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15UGxhbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUc7QUFDakcsc0RBQStEO0FBQy9ELGtGQUFnRjtBQUNoRixzQ0FBaUQ7QUFDakQsbUVBQTZFO0FBTzdFLElBQWEsZUFBZTtJQVN4Qix5QkFBMkIsaUJBQW1DLEVBQzFELFVBQXNCLEVBQUUsUUFBa0IsRUFDbEMsMEJBQThDLEVBQVUsS0FBdUI7UUFGaEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUVsRCwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQW9CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFScEYsa0JBQWEsR0FBUSxJQUFJLE1BQU0sQ0FBQztRQUNoQyxnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLGtCQUFhLEdBQVksQ0FBQyxDQUFDO1FBQzNCLGdCQUFXLEdBQVksQ0FBQyxDQUFDO1FBQ3pCLHVCQUFrQixHQUFZLENBQUMsQ0FBQztRQUs1QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNqQixZQUFZLEVBQUUsV0FBVztZQUN6QixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGdCQUFnQixFQUFFLFlBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNYLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFB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aEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsa0RBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztRQUNyRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFuRVksZUFBZTtJQUwzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQzVCLENBQUM7cUNBVWdELHlCQUFnQjtRQUM5QyxpQkFBVSxFQUFZLGVBQVE7UUFDTiw0QkFBa0IsRUFBaUIsdUJBQWdCO0dBWGxGLGVBQWUsQ0FtRTNCO0FBbkVZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgUmVuZGVyZXIsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE15UGxhbkhlbHBJbmZvQ29tcG9uZW50IH0gZnJvbSBcIi4vbXlwbGFuaGVscC9teXBsYW5oZWxwaW5mby5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXlQbGFuLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIm15UGxhbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE15UGxhbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgcHVibGljIHRpdGxlOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgYWNjb3JkaW9uTGlzdDogYW55ID0gbmV3IE9iamVjdDtcclxuICAgIHB1YmxpYyB0b2dnbGVQYW5lbDogbnVtYmVyID0gLTE7XHJcbiAgICBwYWdlU3RhcnRUaW1lIDogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VFbmRUaW1lIDogbnVtYmVyID0gMDtcclxuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyLFxyXG4gICAgICAgIHByaXZhdGUgaGVscEluZm9Nb2RhbERpYWxvZ1NlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIk15IFBsYW5cIjtcclxuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmFjY29yZGlvbkxpc3QgPSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZXJJZDogXCI5ODM1NzUwMTRcIixcclxuICAgICAgICAgICAgc3Vic2NyaWJlcklkU3VmZml4OiBcIjAwXCIsXHJcbiAgICAgICAgICAgIGdyb3VwTnVtYmVyOiBcIjAwNDAyNjEyNFwiLFxyXG4gICAgICAgICAgICBiZW5lZml0U3RhcnREYXRlOiBcIjAxLzAxLzIwMTdcIixcclxuICAgICAgICAgICAgcHJvdmlzaW9uTGlzdDogW1xyXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJXaG8ncyBDb3ZlcmVkXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJHcmV0Y2hlbiBTb3JlbnNlblwiLCB0eXBlOiBcInN1YnNjcmliZXJcIiB9LCB7IHRleHQ6IFwiSXZhbiBTb3JlbnNlblwiLCB0eXBlOiBcInNwb3VzZVwiIH0sIHsgdGV4dDogXCJHcmV0YSBTb3JlbnNlblwiLCB0eXBlOiBcImRlcGVuZGVudFwiIH1dfSxcclxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiQ28tUGF5c1wiLCBwcm92aXNpb25IZWFkZXI6IFt7IHRleHQ6IFwiT2ZmaWNlIFZpc2l0XCIsIGFtb3VudDogXCIyNS8zNVwiIH0sIHsgdGV4dDogXCJCZWhhdmlvcmFsIEhlYWx0aFwiLCBhbW91bnQ6IFwiMjVcIiB9LCB7IHRleHQ6IFwiRW1lcmdlbmN5IFJvb21cIiwgYW1vdW50OiBcIjE1MFwiIH0sIHsgdGV4dDogXCJQcmV2ZW50aXRpdmVcIiwgYW1vdW50OiBcIjBcIiB9XSwgcHJvdmlzaW9uQm9keTogW1wiJDAgZm9yIEVuaGFuY2VkIEJlbmVmaXRzIFRpZXJcIiwgXCIkMjUwIHBlciBtZW1iZXJcIiwgXCIkMTUwMCBwZXIgZmFtaWx5IHBlciBwbGFiIHllYXJcIl0sIHByb3Zpc2lvbkZvb3RlcjogXCJGb3IgU3RhbmRhcmQgQmVuZWZpdHMgVGllciBob3NwaXRhbCBzZXJ2aWNlIG9ubHkuIChjb3VudHMgdG93YXJkIEJhc2ljIEJlbmVmaXRzIFRpZXIgZGVkdWN0aWJsZSlcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJEZWR1Y3RpYmxlXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJPZmZpY2UgVmlzaXRcIiwgYW1vdW50OiBcIjI1LzM1XCIgfSwgeyB0ZXh0OiBcIkJlaGF2aW9yYWwgSGVhbHRoXCIsIGFtb3VudDogXCIyNVwiIH0sIHsgdGV4dDogXCJFbWVyZ2VuY3kgUm9vbVwiLCBhbW91bnQ6IFwiMTUwXCIgfSwgeyB0ZXh0OiBcIlByZXZlbnRpdGl2ZVwiLCBhbW91bnQ6IFwiMFwiIH1dLCBwcm92aXNpb25Cb2R5OiBbXCIkMTUwMCBwZXIgZmFtaWx5IHBlciBwbGFiIHllYXJcIl0sIHByb3Zpc2lvbkZvb3RlcjogXCJcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJPdXQtb2YtUG9ja2V0IE1heGltdW1cIiwgcHJvdmlzaW9uSGVhZGVyOiBbeyB0ZXh0OiBcIkVtZXJnZW5jeSBSb29tXCIsIGFtb3VudDogXCIxNTBcIiB9LCB7IHRleHQ6IFwiUHJldmVudGl0aXZlXCIsIGFtb3VudDogXCIwXCIgfV0sIHByb3Zpc2lvbkJvZHk6IFtcIiQxNTAwIHBlciBmYW1pbHkgcGVyIHBsYWIgeWVhclwiXSwgcHJvdmlzaW9uRm9vdGVyOiBcIkZvciBTdGFuZGFyZCBCZW5lZml0cyBUaWVyIGhvc3BpdGFsIHNlcnZpY2Ugb25seS5cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJPdmVyYWxsIEJlbmVmaXQgTWF4aW11bVwiLCBwcm92aXNpb25IZWFkZXI6IFt7IHRleHQ6IFwiRW1lcmdlbmN5IFJvb21cIiwgYW1vdW50OiBcIjE1MFwiIH0sIHsgdGV4dDogXCJQcmV2ZW50aXRpdmVcIiwgYW1vdW50OiBcIjBcIiB9XSwgcHJvdmlzaW9uQm9keTogW1wiJDE1MDAgcGVyIGZhbWlseSBwZXIgcGxhYiB5ZWFyXCJdLCBwcm92aXNpb25Gb290ZXI6IFwiRm9yIFN0YW5kYXJkIEJlbmVmaXRzIFRpZXIgaG9zcGl0YWwgc2VydmljZSBvbmx5LlwiIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRhYkNsaWNrKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVQYW5lbCA9IHRoaXMudG9nZ2xlUGFuZWwgPT09IGluZGV4ID8gLTEgOiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBjYXJkcygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYXJkc1wiXSwge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVQYW5lbCA9IC0xO1xyXG4gICAgICAgIH0sIDUwMClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuIG5nT25Jbml0KCkge1xyXG5cclxuICAgIC8vICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuIH1cclxuXHJcbiAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzaG93SGVscEluZm9Nb2RhbCgpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGVscEluZm9Nb2RhbERpYWxvZ1NlcnZpY2Uuc2hvd01vZGFsKE15UGxhbkhlbHBJbmZvQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=