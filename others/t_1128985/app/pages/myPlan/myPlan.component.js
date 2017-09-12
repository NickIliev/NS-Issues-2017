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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlQbGFuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15UGxhbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUc7QUFDakcsc0RBQStEO0FBQy9ELGtGQUFnRjtBQUNoRixzQ0FBaUQ7QUFDakQsbUVBQTZFO0FBTzdFLElBQWEsZUFBZTtJQVN4Qix5QkFBMkIsaUJBQW1DLEVBQzFELFVBQXNCLEVBQUUsUUFBa0IsRUFDbEMsMEJBQThDLEVBQVUsS0FBdUI7UUFGaEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUVsRCwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQW9CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFScEYsa0JBQWEsR0FBUSxJQUFJLE1BQU0sQ0FBQztRQUNoQyxnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLGtCQUFhLEdBQVksQ0FBQyxDQUFDO1FBQzNCLGdCQUFXLEdBQVksQ0FBQyxDQUFDO1FBQ3pCLHVCQUFrQixHQUFZLENBQUMsQ0FBQztRQUs1QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNqQixZQUFZLEVBQUUsV0FBVztZQUN6QixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGdCQUFnQixFQUFFLFlBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNYLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFB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aEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsa0RBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztRQUNyRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFuRVksZUFBZTtJQUwzQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQzVCLENBQUM7cUNBVWdELHlCQUFnQjtRQUM5QyxpQkFBVSxFQUFZLGVBQVE7UUFDTiw0QkFBa0IsRUFBaUIsdUJBQWdCO0dBWGxGLGVBQWUsQ0FtRTNCO0FBbkVZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgUmVuZGVyZXIsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTXlQbGFuSGVscEluZm9Db21wb25lbnQgfSBmcm9tIFwiLi9teXBsYW5oZWxwL215cGxhbmhlbHBpbmZvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9teVBsYW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIm15UGxhbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTXlQbGFuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIHB1YmxpYyB0aXRsZTogU3RyaW5nO1xuICAgIHB1YmxpYyBhY2NvcmRpb25MaXN0OiBhbnkgPSBuZXcgT2JqZWN0O1xuICAgIHB1YmxpYyB0b2dnbGVQYW5lbDogbnVtYmVyID0gLTE7XG4gICAgcGFnZVN0YXJ0VGltZSA6IG51bWJlciA9IDA7XG4gICAgcGFnZUVuZFRpbWUgOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZSA6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICBwcml2YXRlIGhlbHBJbmZvTW9kYWxEaWFsb2dTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiTXkgUGxhblwiO1xuICAgICAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5hY2NvcmRpb25MaXN0ID0ge1xuICAgICAgICAgICAgc3Vic2NyaWJlcklkOiBcIjk4MzU3NTAxNFwiLFxuICAgICAgICAgICAgc3Vic2NyaWJlcklkU3VmZml4OiBcIjAwXCIsXG4gICAgICAgICAgICBncm91cE51bWJlcjogXCIwMDQwMjYxMjRcIixcbiAgICAgICAgICAgIGJlbmVmaXRTdGFydERhdGU6IFwiMDEvMDEvMjAxN1wiLFxuICAgICAgICAgICAgcHJvdmlzaW9uTGlzdDogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiV2hvJ3MgQ292ZXJlZFwiLCBwcm92aXNpb25IZWFkZXI6IFt7IHRleHQ6IFwiR3JldGNoZW4gU29yZW5zZW5cIiwgdHlwZTogXCJzdWJzY3JpYmVyXCIgfSwgeyB0ZXh0OiBcIkl2YW4gU29yZW5zZW5cIiwgdHlwZTogXCJzcG91c2VcIiB9LCB7IHRleHQ6IFwiR3JldGEgU29yZW5zZW5cIiwgdHlwZTogXCJkZXBlbmRlbnRcIiB9XX0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJDby1QYXlzXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJPZmZpY2UgVmlzaXRcIiwgYW1vdW50OiBcIjI1LzM1XCIgfSwgeyB0ZXh0OiBcIkJlaGF2aW9yYWwgSGVhbHRoXCIsIGFtb3VudDogXCIyNVwiIH0sIHsgdGV4dDogXCJFbWVyZ2VuY3kgUm9vbVwiLCBhbW91bnQ6IFwiMTUwXCIgfSwgeyB0ZXh0OiBcIlByZXZlbnRpdGl2ZVwiLCBhbW91bnQ6IFwiMFwiIH1dLCBwcm92aXNpb25Cb2R5OiBbXCIkMCBmb3IgRW5oYW5jZWQgQmVuZWZpdHMgVGllclwiLCBcIiQyNTAgcGVyIG1lbWJlclwiLCBcIiQxNTAwIHBlciBmYW1pbHkgcGVyIHBsYWIgeWVhclwiXSwgcHJvdmlzaW9uRm9vdGVyOiBcIkZvciBTdGFuZGFyZCBCZW5lZml0cyBUaWVyIGhvc3BpdGFsIHNlcnZpY2Ugb25seS4gKGNvdW50cyB0b3dhcmQgQmFzaWMgQmVuZWZpdHMgVGllciBkZWR1Y3RpYmxlKVwiIH0sXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJEZWR1Y3RpYmxlXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJPZmZpY2UgVmlzaXRcIiwgYW1vdW50OiBcIjI1LzM1XCIgfSwgeyB0ZXh0OiBcIkJlaGF2aW9yYWwgSGVhbHRoXCIsIGFtb3VudDogXCIyNVwiIH0sIHsgdGV4dDogXCJFbWVyZ2VuY3kgUm9vbVwiLCBhbW91bnQ6IFwiMTUwXCIgfSwgeyB0ZXh0OiBcIlByZXZlbnRpdGl2ZVwiLCBhbW91bnQ6IFwiMFwiIH1dLCBwcm92aXNpb25Cb2R5OiBbXCIkMTUwMCBwZXIgZmFtaWx5IHBlciBwbGFiIHllYXJcIl0sIHByb3Zpc2lvbkZvb3RlcjogXCJcIiB9LFxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiT3V0LW9mLVBvY2tldCBNYXhpbXVtXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJFbWVyZ2VuY3kgUm9vbVwiLCBhbW91bnQ6IFwiMTUwXCIgfSwgeyB0ZXh0OiBcIlByZXZlbnRpdGl2ZVwiLCBhbW91bnQ6IFwiMFwiIH1dLCBwcm92aXNpb25Cb2R5OiBbXCIkMTUwMCBwZXIgZmFtaWx5IHBlciBwbGFiIHllYXJcIl0sIHByb3Zpc2lvbkZvb3RlcjogXCJGb3IgU3RhbmRhcmQgQmVuZWZpdHMgVGllciBob3NwaXRhbCBzZXJ2aWNlIG9ubHkuXCIgfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIk92ZXJhbGwgQmVuZWZpdCBNYXhpbXVtXCIsIHByb3Zpc2lvbkhlYWRlcjogW3sgdGV4dDogXCJFbWVyZ2VuY3kgUm9vbVwiLCBhbW91bnQ6IFwiMTUwXCIgfSwgeyB0ZXh0OiBcIlByZXZlbnRpdGl2ZVwiLCBhbW91bnQ6IFwiMFwiIH1dLCBwcm92aXNpb25Cb2R5OiBbXCIkMTUwMCBwZXIgZmFtaWx5IHBlciBwbGFiIHllYXJcIl0sIHByb3Zpc2lvbkZvb3RlcjogXCJGb3IgU3RhbmRhcmQgQmVuZWZpdHMgVGllciBob3NwaXRhbCBzZXJ2aWNlIG9ubHkuXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0YWJDbGljayhpbmRleCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsID0gdGhpcy50b2dnbGVQYW5lbCA9PT0gaW5kZXggPyAtMSA6IGluZGV4O1xuICAgIH1cblxuICAgIGNhcmRzKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYXJkc1wiXSwge1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUGFuZWwgPSAtMTtcbiAgICAgICAgfSwgNTAwKVxuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxuIG5nT25Jbml0KCkge1xuXG4gICAgLy8gIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuIH1cblxuICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhZ2VFbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcbiAgICAgIH1cblxuXG4gICAgcHVibGljIHNob3dIZWxwSW5mb01vZGFsKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oZWxwSW5mb01vZGFsRGlhbG9nU2VydmljZS5zaG93TW9kYWwoTXlQbGFuSGVscEluZm9Db21wb25lbnQsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXX0=