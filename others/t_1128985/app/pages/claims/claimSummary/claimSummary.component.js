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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1TdW1tYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYWltU3VtbWFyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEU7QUFDNUUsc0NBQWlEO0FBQ2pELG1FQUE2RTtBQUU3RSxvREFBaUQ7QUFFakQsc0RBQStEO0FBQy9ELGdDQUErQjtBQUMvQixrREFBb0Q7QUFPcEQsSUFBYSxxQkFBcUI7SUF3QzlCLCtCQUEyQixhQUEyQixFQUMxQyxVQUE4QixFQUM5QixLQUF1QixFQUN2QixpQkFBbUMsRUFDbkMsSUFBVTtRQUpLLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzFDLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFpQixFQUFFLENBQUM7UUFNN0IscUJBQWdCLEdBQVcsS0FBSyxDQUFDLENBQUMsZUFBZTtRQUV4RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFeEIsZUFBVSxHQUFHO1lBQ2hCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixVQUFVLEVBQUUsV0FBVztnQkFDdkIsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLFlBQVksRUFBRSxJQUFJO2FBQ3JCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsWUFBWSxFQUFFLEtBQUs7YUFDdEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFD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Q2IscUJBQXFCLENBc0lqQztBQXRJWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgQ2xhaW1Nb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9jbGFpbU1vZGFsL2NsYWltTW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDbGFpbVNlcnZpY2UgfSBmcm9tIFwiLi4vY2xhaW1zLnNlcnZpY2VcIjtcbmltcG9ydCB7IENsYWltTW9kZWwgfSBmcm9tIFwiLi4vY2xhaW1zLm1vZGVsXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NsYWltU3VtbWFyeS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiY2xhaW1TdW1tYXJ5LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBDbGFpbVN1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHVibGljIGlzQnVzeSA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNsYWltTGlzdDogQ2xhaW1Nb2RlbFtdID0gW107XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIHNlbGVjdGVkTWVtYmVyO1xuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcldpbmRvdycpIGZpbHRlcldpbmRvdztcbiAgICBcblxuICAgIHB1YmxpYyBpc1NlYXJjaEV4cGFuZGVkOmJvb2xlYW4gPSBmYWxzZTsgLy9TZWFyY2gtRmlsdGVyXG5cbiAgICBwYWdlU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VFbmRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBtZW1iZXJMaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBcImlkXCI6IDQyMzEsXG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBcIlN0ZXZlXCIsXG4gICAgICAgICAgICBcImxhc3ROYW1lXCI6IFwiQXBwbGVzZWVkXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJTdWJzY3JpYmVyXCIsXG4gICAgICAgICAgICBcImlzU2VsZWN0ZWRcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImlkXCI6IDEyMzQsXG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiOiBcIk1hcmtcIixcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiLFxuICAgICAgICAgICAgXCJpc1NlbGVjdGVkXCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiaWRcIjogNjc4OSxcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiU3RldmVcIixcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBcHBsZXNlZWRcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkRlcGVuZGVudFwiLFxuICAgICAgICAgICAgXCJpc1NlbGVjdGVkXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NsYWltU2VydmljZTogQ2xhaW1TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNsYWltTW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJNeSBDbGFpbXNcIjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW1iZXIgPSB0aGlzLm1lbWJlckxpc3RbMF07XG5cbiAgICAgICAgLy8gR0VUIEFMTCBDTEFJTVNcbiAgICAgICAgbGV0IGNsYWltc0RhdGEgPSB0aGlzLl9jbGFpbVNlcnZpY2UuZ2V0QWxsQ2xhaW1zKCk7XG4gICAgICAgIHRoaXMuY2xhaW1MaXN0ID0gY2xhaW1zRGF0YS5ST1dTO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnBhZ2VUaW1lRGlmZmVyZW5jZSA9IHRoaXMucGFnZUVuZFRpbWUgLSB0aGlzLnBhZ2VTdGFydFRpbWU7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VsZWN0TWVtYmVyKG1lbWJlcikge1xuICAgICAgICB0aGlzLm1lbWJlckxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQgPSBmYWxzZSk7XG4gICAgICAgIG1lbWJlci5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbWJlciA9IG1lbWJlcjtcblxuICAgICAgICB0aGlzLmNsYWltTGlzdCA9IFtdO1xuXG4gICAgICAgIC8vIEdFVCBBTEwgQ0xBSU1TXG4gICAgICAgIGxldCBjbGFpbXNEYXRhID0gdGhpcy5fY2xhaW1TZXJ2aWNlLmdldEFsbENsYWltcygpO1xuICAgICAgICB0aGlzLmNsYWltTGlzdCA9IGNsYWltc0RhdGEuUk9XUztcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCA0MDApO1xuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcldpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVXaW5kb3codGhpcy5maWx0ZXJXaW5kb3csIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93V2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dEZWZhdWx0U2VhcmNoVmlldygpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3dXaW5kb3coY3VzdG9tV2luZG93LCBkdXJhdGlvbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGN1c3RvbVdpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZVdpbmRvdyhjdXN0b21XaW5kb3csIGR1cmF0aW9uKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VzdG9tV2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVBbGxPdmVybGF5V2luZG93KCkgeyBcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZE1vcmVDbGFpbXMoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZENsYWltRGV0YWlsKGFyZ3MsIHR5cGUpIHtcbiAgICAgICAgICAgIC8vTE9BRElORyBDTEFJTSBERVRBSUxcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENsYWltID0gdGhpcy5jbGFpbUxpc3RbYXJncy5pbmRleF07XG4gICAgICAgICAgICB0aGlzLl9jbGFpbVNlcnZpY2Uuc2V0U2VsZWN0ZWRDbGFpbShzZWxlY3RlZENsYWltKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUFsbE92ZXJsYXlXaW5kb3coKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NsYWltU3VtbWFyeS9DbGFpbURldGFpbFwiXSwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dFeHBhbmRlZFNlYXJjaFZpZXcoKSB7IC8vIFNlYXJjaC1GaWx0ZXJcbiAgICAgICAgdGhpcy5oaWRlV2luZG93KHRoaXMuZmlsdGVyV2luZG93LCAwKTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaEV4cGFuZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIHNob3dEZWZhdWx0U2VhcmNoVmlldygpIHsgLy8gU2VhcmNoLUZpbHRlclxuICAgICAgICB0aGlzLmlzU2VhcmNoRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ29CYWNrKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbn0iXX0=