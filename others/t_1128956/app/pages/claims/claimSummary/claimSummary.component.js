"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var claims_service_1 = require("../claims.service");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var app = require("tns-core-modules/application");
var ClaimSummaryComponent = (function () {
    function ClaimSummaryComponent(_claimService, claimModal, vcRef, _routerExtensions, page) {
        this._claimService = _claimService;
        this.claimModal = claimModal;
        this.vcRef = vcRef;
        this._routerExtensions = _routerExtensions;
        this.page = page;
        this.isBusy = false;
        this.claimList = [];
        this.isSearchExpanded = false; //Search-Filter
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.memberList = [
            {
                "id": 4231,
                "firstName": "Steve",
                "lastName": "Appleseed",
                "type": "Subscriber",
                "isSelected": true
            },
            {
                "id": 1234,
                "firstName": "Mark",
                "lastName": "Appleseed",
                "type": "Dependent",
                "isSelected": false
            },
            {
                "id": 6789,
                "firstName": "Steve",
                "lastName": "Appleseed",
                "type": "Dependent",
                "isSelected": false
            }
        ];
        this.pageStartTime = new Date().getTime();
        this.title = "My Claims";
    }
    ClaimSummaryComponent.prototype.ngOnInit = function () {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.selectedMember = this.memberList[0];
        // GET ALL CLAIMS
        var claimsData = this._claimService.getAllClaims();
        this.claimList = claimsData.ROWS;
    };
    ClaimSummaryComponent.prototype.ngAfterViewInit = function () {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    ClaimSummaryComponent.prototype.selectMember = function (member) {
        this.memberList.map(function (item) { return item.isSelected = false; });
        member.isSelected = true;
        this.selectedMember = member;
        this.claimList = [];
        // GET ALL CLAIMS
        var claimsData = this._claimService.getAllClaims();
        this.claimList = claimsData.ROWS;
        this.hideWindow(this.filterWindow, 400);
        this.showDefaultSearchView();
    };
    ClaimSummaryComponent.prototype.toggleFilter = function () {
        if (this.filterWindow.nativeElement.style.visibility == 'visible') {
            this.hideWindow(this.filterWindow, 0);
        }
        else {
            this.showWindow(this.filterWindow, 0);
        }
        this.showDefaultSearchView();
    };
    ClaimSummaryComponent.prototype.showWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'visible';
        }, duration);
    };
    ClaimSummaryComponent.prototype.hideWindow = function (customWindow, duration) {
        setTimeout(function () {
            customWindow.nativeElement.style.visibility = 'hidden';
        }, duration);
    };
    ClaimSummaryComponent.prototype.hideAllOverlayWindow = function () {
        this.hideWindow(this.filterWindow, 0);
    };
    ClaimSummaryComponent.prototype.loadMoreClaims = function () {
    };
    ClaimSummaryComponent.prototype.loadClaimDetail = function (args, type) {
        //LOADING CLAIM DETAIL
        var selectedClaim = this.claimList[args.index];
        this._claimService.setSelectedClaim(selectedClaim);
        this.hideAllOverlayWindow();
        this._routerExtensions.navigate(["/claimSummary/ClaimDetail"], {
            animated: false
        });
    };
    ClaimSummaryComponent.prototype.showExpandedSearchView = function () {
        this.hideWindow(this.filterWindow, 0);
        this.isSearchExpanded = true;
    };
    ClaimSummaryComponent.prototype.showDefaultSearchView = function () {
        this.isSearchExpanded = false;
    };
    ClaimSummaryComponent.prototype.goBack = function () {
        this._routerExtensions.back();
    };
    return ClaimSummaryComponent;
}());
__decorate([
    core_1.ViewChild('filterWindow'),
    __metadata("design:type", Object)
], ClaimSummaryComponent.prototype, "filterWindow", void 0);
ClaimSummaryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./claimSummary.component.html",
        styleUrls: ["claimSummary.css"]
    }),
    __metadata("design:paramtypes", [claims_service_1.ClaimService,
        dialogs_1.ModalDialogService,
        core_2.ViewContainerRef,
        router_1.RouterExtensions,
        page_1.Page])
], ClaimSummaryComponent);
exports.ClaimSummaryComponent = ClaimSummaryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1TdW1tYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYWltU3VtbWFyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEU7QUFDNUUsc0NBQWlEO0FBQ2pELG1FQUE2RTtBQUU3RSxvREFBaUQ7QUFFakQsc0RBQStEO0FBQy9ELGdDQUErQjtBQUMvQixrREFBb0Q7QUFPcEQsSUFBYSxxQkFBcUI7SUF3QzlCLCtCQUEyQixhQUEyQixFQUMxQyxVQUE4QixFQUM5QixLQUF1QixFQUN2QixpQkFBbUMsRUFDbkMsSUFBVTtRQUpLLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzFDLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFpQixFQUFFLENBQUM7UUFNN0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENBQUMsZUFBZTtRQUV4RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFeEIsZUFBVSxHQUFHO1lBQ2hCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixVQUFVLEVBQUUsV0FBVztnQkFDdkIsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLFlBQVksRUFBRSxJQUFJO2FBQ3JCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsWUFBWSxFQUFFLEtBQUs7YUFDdEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFD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Q2IscUJBQXFCLENBc0lqQztBQXRJWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgQ2xhaW1Nb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9jbGFpbU1vZGFsL2NsYWltTW9kYWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENsYWltU2VydmljZSB9IGZyb20gXCIuLi9jbGFpbXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDbGFpbU1vZGVsIH0gZnJvbSBcIi4uL2NsYWltcy5tb2RlbFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NsYWltU3VtbWFyeS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJjbGFpbVN1bW1hcnkuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGFpbVN1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIHB1YmxpYyBpc0J1c3kgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgY2xhaW1MaXN0OiBDbGFpbU1vZGVsW10gPSBbXTtcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkTWVtYmVyO1xyXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyV2luZG93JykgZmlsdGVyV2luZG93O1xyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGlzU2VhcmNoRXhwYW5kZWQ6Ym9vbGVhbiA9IGZhbHNlOyAvL1NlYXJjaC1GaWx0ZXJcclxuXHJcbiAgICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwYWdlVGltZURpZmZlcmVuY2U6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIG1lbWJlckxpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCI6IDQyMzEsXHJcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcclxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc2VlZFwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJTdWJzY3JpYmVyXCIsXHJcbiAgICAgICAgICAgIFwiaXNTZWxlY3RlZFwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogMTIzNCxcclxuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIjogXCJNYXJrXCIsXHJcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRGVwZW5kZW50XCIsXHJcbiAgICAgICAgICAgIFwiaXNTZWxlY3RlZFwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCI6IDY3ODksXHJcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcclxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFwcGxlc2VlZFwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJEZXBlbmRlbnRcIixcclxuICAgICAgICAgICAgXCJpc1NlbGVjdGVkXCI6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfY2xhaW1TZXJ2aWNlOiBDbGFpbVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjbGFpbU1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIk15IENsYWltc1wiO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSB0aGlzLm1lbWJlckxpc3RbMF07XHJcblxyXG4gICAgICAgIC8vIEdFVCBBTEwgQ0xBSU1TXHJcbiAgICAgICAgbGV0IGNsYWltc0RhdGEgPSB0aGlzLl9jbGFpbVNlcnZpY2UuZ2V0QWxsQ2xhaW1zKCk7XHJcbiAgICAgICAgdGhpcy5jbGFpbUxpc3QgPSBjbGFpbXNEYXRhLlJPV1M7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMucGFnZUVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RNZW1iZXIobWVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tZW1iZXJMaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkID0gZmFsc2UpO1xyXG4gICAgICAgIG1lbWJlci5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTWVtYmVyID0gbWVtYmVyO1xyXG5cclxuICAgICAgICB0aGlzLmNsYWltTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICAvLyBHRVQgQUxMIENMQUlNU1xyXG4gICAgICAgIGxldCBjbGFpbXNEYXRhID0gdGhpcy5fY2xhaW1TZXJ2aWNlLmdldEFsbENsYWltcygpO1xyXG4gICAgICAgIHRoaXMuY2xhaW1MaXN0ID0gY2xhaW1zRGF0YS5ST1dTO1xyXG4gICAgICAgIHRoaXMuaGlkZVdpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgNDAwKTtcclxuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1dpbmRvdyh0aGlzLmZpbHRlcldpbmRvdywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0RlZmF1bHRTZWFyY2hWaWV3KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93V2luZG93KGN1c3RvbVdpbmRvdywgZHVyYXRpb24pIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXN0b21XaW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQWxsT3ZlcmxheVdpbmRvdygpIHsgXHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZE1vcmVDbGFpbXMoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkQ2xhaW1EZXRhaWwoYXJncywgdHlwZSkge1xyXG4gICAgICAgICAgICAvL0xPQURJTkcgQ0xBSU0gREVUQUlMXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENsYWltID0gdGhpcy5jbGFpbUxpc3RbYXJncy5pbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuX2NsYWltU2VydmljZS5zZXRTZWxlY3RlZENsYWltKHNlbGVjdGVkQ2xhaW0pO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBbGxPdmVybGF5V2luZG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NsYWltU3VtbWFyeS9DbGFpbURldGFpbFwiXSwge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RXhwYW5kZWRTZWFyY2hWaWV3KCkgeyAvLyBTZWFyY2gtRmlsdGVyXHJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dEZWZhdWx0U2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxyXG4gICAgICAgIHRoaXMuaXNTZWFyY2hFeHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59Il19