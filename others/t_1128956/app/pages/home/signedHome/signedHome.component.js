"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var global_1 = require("../../../shared/global");
var home_service_1 = require("../home.service");
var claims_service_1 = require("../../claims/claims.service");
var appSettings = require("application-settings");
var app = require("tns-core-modules/application");
var slides_component_1 = require("../../../shared/slider/slides/slides.component");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var guideEducationPromo_component_1 = require("../../../shared/guideEducationPromo/guideEducationPromo.component");
var drawer_service_1 = require("../../../shared/services/drawer.service");
var page_1 = require("ui/page");
// import { AnalyticsService } from '../../../analytics.service';
// import { AdobeAnalytics } from 'nativescript-adobe-analytics';
var SignedHomeComponent = (function () {
    function SignedHomeComponent(_router, _routerExtensions, _globals, _homeService, _changeDetectionRef, _claimService, vcRef, drawerService, modalParams, 
        // private _analytics : AnalyticsService,
        page) {
        this._router = _router;
        this._routerExtensions = _routerExtensions;
        this._globals = _globals;
        this._homeService = _homeService;
        this._changeDetectionRef = _changeDetectionRef;
        this._claimService = _claimService;
        this.vcRef = vcRef;
        this.drawerService = drawerService;
        this.modalParams = modalParams;
        this.page = page;
        this.isLoggedIn = false;
        this.isUnauthenticated = false;
        this.isUnauthenticatedClose = false;
        this.isanonymous = true;
        this.isAuthenticationSuccess = false;
        this.left = "left";
        this.isBusy = false;
        this.showlogo = true;
        this.authInfo = [];
        this.pageStartTime = 0;
        this.pageEndTime = 0;
        this.pageTimeDifference = 0;
        this.doctorList = {
            "LastVisit": "07/18/2017",
            "name": "Franken Stein",
            "specialist": "MD Internal Medicine",
            "address1": "127 Elkins Circle",
            "city": "Folsom",
            "state": "CA",
            "zipcode": 95630,
            "mobile": "+18573739515",
            "Id": "7001JX2943"
        };
        this.medicationList = {
            "LastVisit": "07/18/2017",
            "medicationName": "Hydrochlorothiazide HCL",
            "form": "Tablet",
            "dosage": "100mg",
            "frequency": "3x/Day"
        };
        this.healthyAricles = [{
                "title": "Healthy Living",
                "subtitle": "Tannings allure",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_healthyLiving.png",
                "titleImageURL": "~/images/redesign/healthy_living.png",
                "rowNum": 0
            },
            {
                "title": "Fitness",
                "subtitle": "Exercise program",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
                "category": "living",
                "imageURL": "~/images/redesign/article_fitness.png",
                "titleImageURL": "~/images/redesign/fitness.png",
                "rowNum": 1
            }
        ];
        this.heathyMainArticle = {
            "title": "How to design an exercise program",
            "date": "March 31, 2017",
            "category": "living",
            "orderNum": 0,
            "imageURL": "~/images/Healthy_banner.png"
        };
        // heathyMainArticle = new Article();
        //financial = new Financial();
        this.financial = {
            "alertsCount": 7,
            "reimbursementsCount": 2
        };
        this.claimsList = {
            "newClaims": 4,
            "recent": [{
                    "RowNum": "5",
                    "PatName": "Amy Winehouse",
                    "PatRelation": "Subscriber",
                    "DOS": "01/17/2017",
                    "PrvName": "CVS Pharmacy",
                    "StatusDt": "01/20/14",
                    "RecDt": "01/18/14",
                    "ProAmt": 677.94,
                    "CoinsAmt": "0",
                    "CopayAmt": "0",
                    "DedAmt": 0,
                    "NotCovAmt": "0",
                    "MemOwedAmt": 0,
                    "PrvSubAmt": 10230.56,
                    "AlldAmt": 423,
                    "ClmType": "M",
                    "ClmStat": "D",
                    "SvcType": "Surgery",
                    "MsgSpecified": "false",
                    "LineMsgCode": "",
                    "LineMsg": "Claim is denied because the bills are not submitted properly.",
                    "ICN": 1534343,
                    "ClmStatus": "Paid",
                    "address": "221B, Baker Street, Anywhere, MA",
                    "phone": "(000) 000-0000",
                    "totBilledAmt": 654
                }
            ]
        };
        this.loopChart = [{
                "account": "Health Savings Account",
                "year": "2017",
                "available": 2500,
                "invested": 2950,
                "ytd": 4500,
                "leftOver": 1800,
                "yrMax": 6000
            },
            {
                "account": "Financial Savings Account",
                "year": "2014",
                "available": 4500,
                "invested": 2950,
                "ytd": 2500,
                "leftOver": 1800,
                "yrMax": 8000
            },
            {
                "account": "lorenspum Savings Account",
                "year": "2013",
                "available": 2500,
                "invested": 4500,
                "ytd": 2950,
                "leftOver": 1800,
                "yrMax": 9000
            }];
        this.chartItems = [];
        this.isTurnOff = false;
        this.pageStartTime = new Date().getTime();
        this.isLoggedIn = this._globals.isLoggedIn;
        this.isUnauthenticated = this._globals.isUnauthenticated;
        if (this.isUnauthenticated) {
            this.isUnauthenticatedClose = true;
        }
        if (this._globals.isTurnOff) {
            this.isTurnOff = true;
        }
        this.isanonymous = this._globals.isanonymous;
        this.isAuthenticationSuccess = this._globals.isAuthenticationSuccess;
    }
    SignedHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.loopChart.forEach(function (key) {
            var available = Math.floor((key.available / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
            var invested = Math.floor((key.invested / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
            var ytd = Math.floor((key.ytd / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
            var leftOver = Math.floor((key.leftOver / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
            var object = {
                "account": key.account,
                "year": key.year,
                "available": key.available,
                "invested": key.invested,
                "ytd": key.ytd,
                "leftOver": key.leftOver,
                "yrMax": key.yrMax,
                "availablePlot": available,
                "investedPlot": invested,
                "ytdPlot": ytd,
                "leftOverPlot": leftOver,
            };
            _this.chartItems.push(object);
            // if (this.loopChart.length === this.chartItems.length) {
            //   setTimeout(() => {
            //     this.sliderComponent.setSliderConfiguration();
            //     // this.isBusy = false;
            //   }, 100);
            // }
        });
        // if (this.isLoggedIn) {
        //   this.isBusy = true;
        //   this._homeService.getOnloadData()
        //     .subscribe((data) => {
        //       this.title = "Hello " + data.user.firstName;
        //       this.pcpDoctors = data.pcpDoctors;
        //       this.financial = data.Financial;
        //       this.claimsList = data.claims;
        //       if (!this._globals.isTurnOff) {
        //         this.loopChart = data.Financial.chart;
        //         this.loopChart.forEach((key: ChartValues) => {
        //           let available = Math.floor((key.available / (key.Contributions + key.available)) * 100);
        //           let Contributions = Math.floor((key.Contributions / (key.Contributions + key.available)) * 100);
        //           let object = {
        //             "Contributions": key.Contributions,
        //             "available": key.available,
        //             "totalContributionsPercentage": available,
        //             "availablePercentage": Contributions
        //           };
        //           this.chartItems.push(object);
        //           if (this.loopChart.length === this.chartItems.length) {
        //             setTimeout(() => {
        //               this.sliderComponent.setSliderConfiguration();
        //               this.isBusy = false;
        //             }, 100);                
        //           }
        //         });
        //       } else {
        //          this.isBusy = false;
        //       }
        //     },
        //     error => {
        //       this.isBusy = false;
        //       console.dir(error);
        //     });
        // } 
        //else {
        this.username = "Gretchen";
        // }
        // this._homeService.getHealthyLiving()
        //   .subscribe((data) => {
        //     this.healthyAricles = data.sub_articles;
        //     this.heathyMainArticle = data.main_article;
        //   },
        //   error => {
        //     console.dir(error)
        //   });
    };
    SignedHomeComponent.prototype.loadEducationContentAfterAuthenticationSuccess = function () {
        if (appSettings.getNumber("isFirstTimeOpened") === 0) {
            if (appSettings.getBoolean("isAuthenticated") && this.isLoggedIn) {
                this.showEducationContent();
                appSettings.setBoolean("isAuthenticated", false);
            }
            if (this.isLoggedIn) {
                appSettings.setNumber("isFirstTimeOpened", 1);
            }
        }
    };
    SignedHomeComponent.prototype.showEducationContent = function () {
        this.drawerService.enableGesture(false);
        var modalOptions = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modalParams.showModal(guideEducationPromo_component_1.GuideEducationPromoComponent, modalOptions).then(function (res) {
        });
    };
    SignedHomeComponent.prototype.ngAfterViewInit = function () {
        this._changeDetectionRef.detectChanges();
        this.loadEducationContentAfterAuthenticationSuccess();
        if (appSettings.getBoolean("isFirstInstallPopup") === false) {
            // do nothing
        }
        else {
            appSettings.getBoolean("isFirstInstallPopup", true);
            this.showEducationContent();
        }
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    };
    SignedHomeComponent.prototype.successAuthenticate = function () {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
    };
    SignedHomeComponent.prototype.successCardClose = function () {
        this.isUnauthenticatedClose = false;
    };
    SignedHomeComponent.prototype.successAuthenticationClose = function () {
        this.isAuthenticationSuccess = false;
        this._globals.isAuthenticationSuccess = false;
    };
    SignedHomeComponent.prototype.articleDetail = function () {
        this._routerExtensions.navigate(["/home/articleDetail"], {
            animated: false
        });
        // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.happyNavigate = function () {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
        //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.contactUs = function () {
        this._routerExtensions.navigate(["/contactUs"], {
            animated: false
        });
        // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.loadClaimDetail = function () {
        var claimData = {
            "RowNum": "5",
            "PatName": "Amy Winehouse",
            "PatRelation": "Subscriber",
            "DOS": "01/17/2017",
            "PrvName": "CVS Pharmacy",
            "StatusDt": "01/20/14",
            "RecDt": "01/18/14",
            "ProAmt": 677.94,
            "CoinsAmt": "0",
            "CopayAmt": "0",
            "DedAmt": 0,
            "NotCovAmt": "0",
            "MemOwedAmt": 0,
            "PrvSubAmt": 10230.56,
            "AlldAmt": 423,
            "ClmType": "M",
            "ClmStat": "D",
            "SvcType": "Surgery",
            "MsgSpecified": "false",
            "LineMsgCode": "",
            "LineMsg": "Claim is denied because the bills are not submitted properly.",
            "ICN": 1534343,
            "ClmStatus": "Paid",
            "address": "221B, Baker Street, Anywhere, MA",
            "phone": "(000) 000-0000",
            "totBilledAmt": 654
        };
        this._claimService.setSelectedClaim(claimData);
        this._routerExtensions.navigate(["/claimSummary/ClaimDetail"], {
            animated: false
        });
    };
    SignedHomeComponent.prototype.authenticateMe = function () {
        var _this = this;
        if (this._globals.is_auth_cancelled) {
            var info = this._homeService.getNewUserAuthInfo();
            this.authInfo = info;
        }
        else {
            var info = this._homeService.getAuthInfo();
            this.authInfo = info;
        }
        this.authInfo.map(function (item) {
            _this._globals.user_state = item.userState;
            if (item.firstName === "" || item.firstName === undefined) {
                _this._routerExtensions.navigate(["/personal_info/personal_info", _this._globals.registration_mode, _this._globals.user_identity], {
                    animated: false
                });
            }
            else if (item.memberId === "" || item.memberId === undefined) {
                _this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
            }
            else if (item.ssn === "" || item.ssn === undefined) {
                _this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                    animated: false
                });
            }
        });
    };
    SignedHomeComponent.prototype.myDoctors = function () {
        this._routerExtensions.navigate(["/mydoctors"], {
            animated: false
        });
        // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.claimsnav = function () {
        this._routerExtensions.navigate(["/claimSummary"], {
            animated: false
        });
        // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.medicationNav = function () {
        this._routerExtensions.navigate(["/medication"], {
            animated: false
        });
        //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.cards = function () {
        this._routerExtensions.navigate(["/cards"], {
            animated: false
        });
        // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.accounts = function () {
        this._routerExtensions.navigate(["/accounts/home"], {
            animated: false
        });
    };
    SignedHomeComponent.prototype.myPlan = function () {
        this._routerExtensions.navigate(["/myPlan"], {
            animated: false
        });
        //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
    };
    SignedHomeComponent.prototype.showmap = function (address1, city, state, zipcode) {
        this._globals.locateAddress(address1, city, state, zipcode);
    };
    SignedHomeComponent.prototype.callPhone = function (mobile) {
        this._globals.callPhone(mobile);
    };
    SignedHomeComponent.prototype.ngOnDestroy = function () {
        this._globals.isAuthenticationSuccess = false; // resetting to default state
    };
    return SignedHomeComponent;
}());
__decorate([
    core_1.ViewChild(slides_component_1.SlidesComponent),
    __metadata("design:type", slides_component_1.SlidesComponent)
], SignedHomeComponent.prototype, "sliderComponent", void 0);
SignedHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "./signedHome.component.html",
        styleUrls: ["../home.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.RouterExtensions,
        global_1.Globals,
        home_service_1.HomeService,
        core_1.ChangeDetectorRef,
        claims_service_1.ClaimService,
        core_1.ViewContainerRef,
        drawer_service_1.DrawerService,
        dialogs_1.ModalDialogService,
        page_1.Page])
], SignedHomeComponent);
exports.SignedHomeComponent = SignedHomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmVkSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWduZWRIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0SDtBQUM1SCwwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELGlEQUFpRDtBQUVqRCxnREFBOEM7QUFFOUMsOERBQTJEO0FBRTNELGtEQUFvRDtBQUNwRCxrREFBb0Q7QUFDcEQsbUZBQWlGO0FBQ2pGLG1FQUE2RTtBQUM3RSxtSEFBaUg7QUFDakgsMEVBQXdFO0FBQ3hFLGdDQUErQjtBQUMvQixpRUFBaUU7QUFDakUsaUVBQWlFO0FBUWpFLElBQWEsbUJBQW1CO0lBbUk5Qiw2QkFBb0IsT0FBZSxFQUN6QixpQkFBbUMsRUFDcEMsUUFBaUIsRUFDakIsWUFBeUIsRUFDeEIsbUJBQXNDLEVBQ3RDLGFBQTJCLEVBQzNCLEtBQXVCLEVBQ3ZCLGFBQTRCLEVBQzVCLFdBQStCO1FBQ3ZDLHlDQUF5QztRQUNsQyxJQUFVO1FBVkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFFaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTFJbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1FBQ3hDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQUV6QyxT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NkIsZUFBTTtRQUNOLHlCQUFnQjtRQUMxQixnQkFBTztRQUNILDBCQUFXO1FBQ0gsd0JBQWlCO1FBQ3ZCLDZCQUFZO1FBQ3BCLHVCQUFnQjtRQUNSLDhCQUFhO1FBQ2YsNEJBQWtCO1FBRTFCLFdBQUk7R0E3SVIsbUJBQW1CLENBNmEvQjtBQTdhWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FbmQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IEhvbWVTZXJ2aWNlIH0gZnJvbSBcIi4uL2hvbWUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBIb21lTW9kZWwsIFBjcERvY3RvcnMsIFVzZXIsIENsYWltcywgRmluYW5jaWFsLCBBcnRpY2xlLCBDaGFydFZhbHVlcywgQ2hhcnRQbG90VmxhdWVzIH0gZnJvbSBcIi4uL2hvbWUubW9kZWxcIjtcclxuaW1wb3J0IHsgQ2xhaW1TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NsYWltcy9jbGFpbXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDbGFpbU1vZGVsIH0gZnJvbSBcIi4uLy4uL2NsYWltcy9jbGFpbXMubW9kZWxcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBTbGlkZXNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3NsaWRlci9zbGlkZXMvc2xpZGVzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IEd1aWRlRWR1Y2F0aW9uUHJvbW9Db21wb25lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2d1aWRlRWR1Y2F0aW9uUHJvbW8vZ3VpZGVFZHVjYXRpb25Qcm9tby5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZHJhd2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbi8vIGltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9hbmFseXRpY3Muc2VydmljZSc7XHJcbi8vIGltcG9ydCB7IEFkb2JlQW5hbHl0aWNzIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFkb2JlLWFuYWx5dGljcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2lnbmVkSG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi4vaG9tZS5jc3NcIl1cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduZWRIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBtZXNzYWdlQ291bnQ6IHN0cmluZztcclxuICBpc0xvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaXNVbmF1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpc1VuYXV0aGVudGljYXRlZENsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaXNhbm9ueW1vdXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGlzQXV0aGVudGljYXRpb25TdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuICBsZWZ0OiBzdHJpbmcgPSBcImxlZnRcIjtcclxuICBwdWJsaWMgaXNCdXN5ID0gZmFsc2U7XHJcbiAgc2hvd2xvZ286IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBhdXRoSW5mbyA9IFtdO1xyXG4gIHBhZ2VTdGFydFRpbWU6IG51bWJlciA9IDA7XHJcbiAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgcGFnZVRpbWVEaWZmZXJlbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICBAVmlld0NoaWxkKFNsaWRlc0NvbXBvbmVudCkgc2xpZGVyQ29tcG9uZW50OiBTbGlkZXNDb21wb25lbnQ7XHJcbiAgZG9jdG9yTGlzdCA9IHtcclxuICAgIFwiTGFzdFZpc2l0XCI6IFwiMDcvMTgvMjAxN1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiRnJhbmtlbiBTdGVpblwiLFxyXG4gICAgXCJzcGVjaWFsaXN0XCI6IFwiTUQgSW50ZXJuYWwgTWVkaWNpbmVcIixcclxuICAgIFwiYWRkcmVzczFcIjogXCIxMjcgRWxraW5zIENpcmNsZVwiLFxyXG4gICAgXCJjaXR5XCI6IFwiRm9sc29tXCIsXHJcbiAgICBcInN0YXRlXCI6IFwiQ0FcIixcclxuICAgIFwiemlwY29kZVwiOiA5NTYzMCxcclxuICAgIFwibW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXHJcbiAgICBcIklkXCI6IFwiNzAwMUpYMjk0M1wiXHJcbiAgfTtcclxuICBtZWRpY2F0aW9uTGlzdCA9IHtcclxuICAgIFwiTGFzdFZpc2l0XCI6IFwiMDcvMTgvMjAxN1wiLFxyXG4gICAgXCJtZWRpY2F0aW9uTmFtZVwiOiBcIkh5ZHJvY2hsb3JvdGhpYXppZGUgSENMXCIsXHJcbiAgICBcImZvcm1cIjogXCJUYWJsZXRcIixcclxuICAgIFwiZG9zYWdlXCI6IFwiMTAwbWdcIixcclxuICAgIFwiZnJlcXVlbmN5XCI6IFwiM3gvRGF5XCJcclxuICB9O1xyXG4gIGhlYWx0aHlBcmljbGVzOiBBcnRpY2xlW10gPSBbe1xyXG4gICAgXCJ0aXRsZVwiOiBcIkhlYWx0aHkgTGl2aW5nXCIsXHJcbiAgICBcInN1YnRpdGxlXCI6IFwiVGFubmluZ3MgYWxsdXJlXCIsXHJcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXQgaXMgYSBsb25nIGVzdGFibGlzaGVkIGZhY3QgdGhhdCBhIHJlYWRlciB3aWxsIGJlIGRpc3RyYWN0ZWQgYnkgdGhlIHJlYWRhYmxlIGNvbnRlbnQgb2YgYSBwYWdlLlwiLFxyXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxyXG4gICAgXCJpbWFnZVVSTFwiOiBcIn4vaW1hZ2VzL3JlZGVzaWduL2FydGljbGVfaGVhbHRoeUxpdmluZy5wbmdcIixcclxuICAgIFwidGl0bGVJbWFnZVVSTFwiOiBcIn4vaW1hZ2VzL3JlZGVzaWduL2hlYWx0aHlfbGl2aW5nLnBuZ1wiLFxyXG4gICAgXCJyb3dOdW1cIjogMFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ0aXRsZVwiOiBcIkZpdG5lc3NcIixcclxuICAgIFwic3VidGl0bGVcIjogXCJFeGVyY2lzZSBwcm9ncmFtXCIsXHJcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXQgaXMgYSBsb25nIGVzdGFibGlzaGVkIGZhY3QgdGhhdCBhIHJlYWRlciB3aWxsIGJlIGRpc3RyYWN0ZWQgYnkgdGhlIHJlYWRhYmxlIGNvbnRlbnQgb2YgYSBwYWdlLlwiLFxyXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxyXG4gICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9hcnRpY2xlX2ZpdG5lc3MucG5nXCIsXHJcbiAgICBcInRpdGxlSW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9maXRuZXNzLnBuZ1wiLFxyXG4gICAgXCJyb3dOdW1cIjogMVxyXG4gIH1cclxuICBdO1xyXG4gIGhlYXRoeU1haW5BcnRpY2xlID0ge1xyXG4gICAgXCJ0aXRsZVwiOiBcIkhvdyB0byBkZXNpZ24gYW4gZXhlcmNpc2UgcHJvZ3JhbVwiLFxyXG4gICAgXCJkYXRlXCI6IFwiTWFyY2ggMzEsIDIwMTdcIixcclxuICAgIFwiY2F0ZWdvcnlcIjogXCJsaXZpbmdcIixcclxuICAgIFwib3JkZXJOdW1cIjogMCxcclxuICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9IZWFsdGh5X2Jhbm5lci5wbmdcIlxyXG4gIH07XHJcbiAgLy8gaGVhdGh5TWFpbkFydGljbGUgPSBuZXcgQXJ0aWNsZSgpO1xyXG4gIC8vZmluYW5jaWFsID0gbmV3IEZpbmFuY2lhbCgpO1xyXG4gIGZpbmFuY2lhbCA9IHtcclxuICAgIFwiYWxlcnRzQ291bnRcIjogNyxcclxuICAgIFwicmVpbWJ1cnNlbWVudHNDb3VudFwiOiAyXHJcbiAgfVxyXG4gIGNsYWltc0xpc3QgPSB7XHJcbiAgICBcIm5ld0NsYWltc1wiOiA0LFxyXG4gICAgXCJyZWNlbnRcIjogW3tcclxuICAgICAgXCJSb3dOdW1cIjogXCI1XCIsXHJcbiAgICAgIFwiUGF0TmFtZVwiOiBcIkFteSBXaW5laG91c2VcIixcclxuICAgICAgXCJQYXRSZWxhdGlvblwiOiBcIlN1YnNjcmliZXJcIixcclxuICAgICAgXCJET1NcIjogXCIwMS8xNy8yMDE3XCIsXHJcbiAgICAgIFwiUHJ2TmFtZVwiOiBcIkNWUyBQaGFybWFjeVwiLFxyXG4gICAgICBcIlN0YXR1c0R0XCI6IFwiMDEvMjAvMTRcIixcclxuICAgICAgXCJSZWNEdFwiOiBcIjAxLzE4LzE0XCIsXHJcbiAgICAgIFwiUHJvQW10XCI6IDY3Ny45NCxcclxuICAgICAgXCJDb2luc0FtdFwiOiBcIjBcIixcclxuICAgICAgXCJDb3BheUFtdFwiOiBcIjBcIixcclxuICAgICAgXCJEZWRBbXRcIjogMCxcclxuICAgICAgXCJOb3RDb3ZBbXRcIjogXCIwXCIsXHJcbiAgICAgIFwiTWVtT3dlZEFtdFwiOiAwLFxyXG4gICAgICBcIlBydlN1YkFtdFwiOiAxMDIzMC41NixcclxuICAgICAgXCJBbGxkQW10XCI6IDQyMyxcclxuICAgICAgXCJDbG1UeXBlXCI6IFwiTVwiLFxyXG4gICAgICBcIkNsbVN0YXRcIjogXCJEXCIsXHJcbiAgICAgIFwiU3ZjVHlwZVwiOiBcIlN1cmdlcnlcIixcclxuICAgICAgXCJNc2dTcGVjaWZpZWRcIjogXCJmYWxzZVwiLFxyXG4gICAgICBcIkxpbmVNc2dDb2RlXCI6IFwiXCIsXHJcbiAgICAgIFwiTGluZU1zZ1wiOiBcIkNsYWltIGlzIGRlbmllZCBiZWNhdXNlIHRoZSBiaWxscyBhcmUgbm90IHN1Ym1pdHRlZCBwcm9wZXJseS5cIixcclxuICAgICAgXCJJQ05cIjogMTUzNDM0MyxcclxuICAgICAgXCJDbG1TdGF0dXNcIjogXCJQYWlkXCIsXHJcbiAgICAgIFwiYWRkcmVzc1wiOiBcIjIyMUIsIEJha2VyIFN0cmVldCwgQW55d2hlcmUsIE1BXCIsXHJcbiAgICAgIFwicGhvbmVcIjogXCIoMDAwKSAwMDAtMDAwMFwiLFxyXG4gICAgICBcInRvdEJpbGxlZEFtdFwiOiA2NTRcclxuICAgIH1cclxuICAgIF1cclxuICB9O1xyXG4gIGxvb3BDaGFydCA9IFt7XHJcbiAgICBcImFjY291bnRcIjogXCJIZWFsdGggU2F2aW5ncyBBY2NvdW50XCIsXHJcbiAgICBcInllYXJcIjogXCIyMDE3XCIsXHJcbiAgICBcImF2YWlsYWJsZVwiOiAyNTAwLFxyXG4gICAgXCJpbnZlc3RlZFwiOiAyOTUwLFxyXG4gICAgXCJ5dGRcIjogNDUwMCxcclxuICAgIFwibGVmdE92ZXJcIjogMTgwMCxcclxuICAgIFwieXJNYXhcIjogNjAwMFxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJhY2NvdW50XCI6IFwiRmluYW5jaWFsIFNhdmluZ3MgQWNjb3VudFwiLFxyXG4gICAgXCJ5ZWFyXCI6IFwiMjAxNFwiLFxyXG4gICAgXCJhdmFpbGFibGVcIjogNDUwMCxcclxuICAgIFwiaW52ZXN0ZWRcIjogMjk1MCxcclxuICAgIFwieXRkXCI6IDI1MDAsXHJcbiAgICBcImxlZnRPdmVyXCI6IDE4MDAsXHJcbiAgICBcInlyTWF4XCI6IDgwMDBcclxuICB9LFxyXG4gIHtcclxuICAgIFwiYWNjb3VudFwiOiBcImxvcmVuc3B1bSBTYXZpbmdzIEFjY291bnRcIixcclxuICAgIFwieWVhclwiOiBcIjIwMTNcIixcclxuICAgIFwiYXZhaWxhYmxlXCI6IDI1MDAsXHJcbiAgICBcImludmVzdGVkXCI6IDQ1MDAsXHJcbiAgICBcInl0ZFwiOiAyOTUwLFxyXG4gICAgXCJsZWZ0T3ZlclwiOiAxODAwLFxyXG4gICAgXCJ5ck1heFwiOiA5MDAwXHJcbiAgfV07XHJcblxyXG4gIGNoYXJ0SXRlbXM6IENoYXJ0UGxvdFZsYXVlc1tdID0gW107XHJcbiAgaXNUdXJuT2ZmOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHB1YmxpYyBfZ2xvYmFsczogR2xvYmFscyxcclxuICAgIHB1YmxpYyBfaG9tZVNlcnZpY2U6IEhvbWVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2NsYWltU2VydmljZTogQ2xhaW1TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgZHJhd2VyU2VydmljZTogRHJhd2VyU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWxQYXJhbXM6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgIC8vIHByaXZhdGUgX2FuYWx5dGljcyA6IEFuYWx5dGljc1NlcnZpY2UsXHJcbiAgICBwdWJsaWMgcGFnZTogUGFnZSkge1xyXG4gICAgdGhpcy5wYWdlU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW47XHJcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkID0gdGhpcy5fZ2xvYmFscy5pc1VuYXV0aGVudGljYXRlZDtcclxuICAgIGlmICh0aGlzLmlzVW5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgIHRoaXMuaXNVbmF1dGhlbnRpY2F0ZWRDbG9zZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZ2xvYmFscy5pc1R1cm5PZmYpIHtcclxuICAgICAgdGhpcy5pc1R1cm5PZmYgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc2Fub255bW91cyA9IHRoaXMuX2dsb2JhbHMuaXNhbm9ueW1vdXM7XHJcbiAgICB0aGlzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gdGhpcy5fZ2xvYmFscy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIGlmIChhcHAuaW9zKSB7XHJcbiAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcclxuICAgIH1cclxuICAgIHRoaXMubG9vcENoYXJ0LmZvckVhY2goKGtleTogQ2hhcnRWYWx1ZXMpID0+IHtcclxuICAgICAgbGV0IGF2YWlsYWJsZSA9IE1hdGguZmxvb3IoKGtleS5hdmFpbGFibGUgLyAoa2V5LmF2YWlsYWJsZSArIGtleS5pbnZlc3RlZCArIGtleS55dGQgKyBrZXkubGVmdE92ZXIpKSAqIDEwMCk7XHJcbiAgICAgIGxldCBpbnZlc3RlZCA9IE1hdGguZmxvb3IoKGtleS5pbnZlc3RlZCAvIChrZXkuYXZhaWxhYmxlICsga2V5LmludmVzdGVkICsga2V5Lnl0ZCArIGtleS5sZWZ0T3ZlcikpICogMTAwKTtcclxuICAgICAgbGV0IHl0ZCA9IE1hdGguZmxvb3IoKGtleS55dGQgLyAoa2V5LmF2YWlsYWJsZSArIGtleS5pbnZlc3RlZCArIGtleS55dGQgKyBrZXkubGVmdE92ZXIpKSAqIDEwMCk7XHJcbiAgICAgIGxldCBsZWZ0T3ZlciA9IE1hdGguZmxvb3IoKGtleS5sZWZ0T3ZlciAvIChrZXkuYXZhaWxhYmxlICsga2V5LmludmVzdGVkICsga2V5Lnl0ZCArIGtleS5sZWZ0T3ZlcikpICogMTAwKTtcclxuICAgICAgbGV0IG9iamVjdCA9IHtcclxuICAgICAgICBcImFjY291bnRcIjoga2V5LmFjY291bnQsXHJcbiAgICAgICAgXCJ5ZWFyXCI6IGtleS55ZWFyLFxyXG4gICAgICAgIFwiYXZhaWxhYmxlXCI6IGtleS5hdmFpbGFibGUsXHJcbiAgICAgICAgXCJpbnZlc3RlZFwiOiBrZXkuaW52ZXN0ZWQsXHJcbiAgICAgICAgXCJ5dGRcIjoga2V5Lnl0ZCxcclxuICAgICAgICBcImxlZnRPdmVyXCI6IGtleS5sZWZ0T3ZlcixcclxuICAgICAgICBcInlyTWF4XCI6IGtleS55ck1heCxcclxuICAgICAgICBcImF2YWlsYWJsZVBsb3RcIjogYXZhaWxhYmxlLFxyXG4gICAgICAgIFwiaW52ZXN0ZWRQbG90XCI6IGludmVzdGVkLFxyXG4gICAgICAgIFwieXRkUGxvdFwiOiB5dGQsXHJcbiAgICAgICAgXCJsZWZ0T3ZlclBsb3RcIjogbGVmdE92ZXIsXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY2hhcnRJdGVtcy5wdXNoKG9iamVjdCk7XHJcbiAgICAgIC8vIGlmICh0aGlzLmxvb3BDaGFydC5sZW5ndGggPT09IHRoaXMuY2hhcnRJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgLy8gICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgLy8gICAgIHRoaXMuc2xpZGVyQ29tcG9uZW50LnNldFNsaWRlckNvbmZpZ3VyYXRpb24oKTtcclxuICAgICAgLy8gICAgIC8vIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgIC8vICAgfSwgMTAwKTtcclxuICAgICAgLy8gfVxyXG4gICAgfSk7XHJcbiAgICAvLyBpZiAodGhpcy5pc0xvZ2dlZEluKSB7XHJcbiAgICAvLyAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcclxuICAgIC8vICAgdGhpcy5faG9tZVNlcnZpY2UuZ2V0T25sb2FkRGF0YSgpXHJcbiAgICAvLyAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgLy8gICAgICAgdGhpcy50aXRsZSA9IFwiSGVsbG8gXCIgKyBkYXRhLnVzZXIuZmlyc3ROYW1lO1xyXG4gICAgLy8gICAgICAgdGhpcy5wY3BEb2N0b3JzID0gZGF0YS5wY3BEb2N0b3JzO1xyXG4gICAgLy8gICAgICAgdGhpcy5maW5hbmNpYWwgPSBkYXRhLkZpbmFuY2lhbDtcclxuICAgIC8vICAgICAgIHRoaXMuY2xhaW1zTGlzdCA9IGRhdGEuY2xhaW1zO1xyXG4gICAgLy8gICAgICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvb3BDaGFydCA9IGRhdGEuRmluYW5jaWFsLmNoYXJ0O1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvb3BDaGFydC5mb3JFYWNoKChrZXk6IENoYXJ0VmFsdWVzKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IE1hdGguZmxvb3IoKGtleS5hdmFpbGFibGUgLyAoa2V5LkNvbnRyaWJ1dGlvbnMgKyBrZXkuYXZhaWxhYmxlKSkgKiAxMDApO1xyXG4gICAgLy8gICAgICAgICAgIGxldCBDb250cmlidXRpb25zID0gTWF0aC5mbG9vcigoa2V5LkNvbnRyaWJ1dGlvbnMgLyAoa2V5LkNvbnRyaWJ1dGlvbnMgKyBrZXkuYXZhaWxhYmxlKSkgKiAxMDApO1xyXG4gICAgLy8gICAgICAgICAgIGxldCBvYmplY3QgPSB7XHJcbiAgICAvLyAgICAgICAgICAgICBcIkNvbnRyaWJ1dGlvbnNcIjoga2V5LkNvbnRyaWJ1dGlvbnMsXHJcbiAgICAvLyAgICAgICAgICAgICBcImF2YWlsYWJsZVwiOiBrZXkuYXZhaWxhYmxlLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJ0b3RhbENvbnRyaWJ1dGlvbnNQZXJjZW50YWdlXCI6IGF2YWlsYWJsZSxcclxuICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlUGVyY2VudGFnZVwiOiBDb250cmlidXRpb25zXHJcbiAgICAvLyAgICAgICAgICAgfTtcclxuICAgIC8vICAgICAgICAgICB0aGlzLmNoYXJ0SXRlbXMucHVzaChvYmplY3QpO1xyXG4gICAgLy8gICAgICAgICAgIGlmICh0aGlzLmxvb3BDaGFydC5sZW5ndGggPT09IHRoaXMuY2hhcnRJdGVtcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICB0aGlzLnNsaWRlckNvbXBvbmVudC5zZXRTbGlkZXJDb25maWd1cmF0aW9uKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCAxMDApOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBlcnJvciA9PiB7XHJcbiAgICAvLyAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSBcclxuICAgIC8vZWxzZSB7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0gXCJHcmV0Y2hlblwiO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gdGhpcy5faG9tZVNlcnZpY2UuZ2V0SGVhbHRoeUxpdmluZygpXHJcbiAgICAvLyAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgIC8vICAgICB0aGlzLmhlYWx0aHlBcmljbGVzID0gZGF0YS5zdWJfYXJ0aWNsZXM7XHJcbiAgICAvLyAgICAgdGhpcy5oZWF0aHlNYWluQXJ0aWNsZSA9IGRhdGEubWFpbl9hcnRpY2xlO1xyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gICBlcnJvciA9PiB7XHJcbiAgICAvLyAgICAgY29uc29sZS5kaXIoZXJyb3IpXHJcbiAgICAvLyAgIH0pO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBsb2FkRWR1Y2F0aW9uQ29udGVudEFmdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCkge1xyXG5cclxuICAgIGlmIChhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJpc0ZpcnN0VGltZU9wZW5lZFwiKSA9PT0gMCkge1xyXG4gICAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzQXV0aGVudGljYXRlZFwiKSAmJiB0aGlzLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICB0aGlzLnNob3dFZHVjYXRpb25Db250ZW50KCk7XHJcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzQXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuaXNMb2dnZWRJbikge1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImlzRmlyc3RUaW1lT3BlbmVkXCIsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93RWR1Y2F0aW9uQ29udGVudCgpIHtcclxuICAgIHRoaXMuZHJhd2VyU2VydmljZS5lbmFibGVHZXN0dXJlKGZhbHNlKTtcclxuICAgIGxldCBtb2RhbE9wdGlvbnMgPSB7XHJcbiAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tb2RhbFBhcmFtcy5zaG93TW9kYWwoR3VpZGVFZHVjYXRpb25Qcm9tb0NvbXBvbmVudCwgbW9kYWxPcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkRWR1Y2F0aW9uQ29udGVudEFmdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCk7XHJcbiAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsUG9wdXBcIikgPT09IGZhbHNlKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJpc0ZpcnN0SW5zdGFsbFBvcHVwXCIsIHRydWUpO1xyXG4gICAgICB0aGlzLnNob3dFZHVjYXRpb25Db250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgIHRoaXMucGFnZVRpbWVEaWZmZXJlbmNlID0gdGhpcy5wYWdlRW5kVGltZSAtIHRoaXMucGFnZVN0YXJ0VGltZTtcclxuXHJcbiAgfVxyXG5cclxuICBzdWNjZXNzQXV0aGVudGljYXRlKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGFwcHlcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1Y2Nlc3NDYXJkQ2xvc2UoKSB7XHJcbiAgICB0aGlzLmlzVW5hdXRoZW50aWNhdGVkQ2xvc2UgPSBmYWxzZTtcclxuICB9XHJcbiAgc3VjY2Vzc0F1dGhlbnRpY2F0aW9uQ2xvc2UoKSB7XHJcbiAgICB0aGlzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gZmFsc2U7XHJcbiAgICB0aGlzLl9nbG9iYWxzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhcnRpY2xlRGV0YWlsKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9hcnRpY2xlRGV0YWlsXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XHJcbiAgfVxyXG5cclxuICBoYXBweU5hdmlnYXRlKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaGFwcHlcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIC8vICB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrQWN0aW9uKCdTaWduZWQgSG9tZScsIHsgc2FtcGxlRGF0YTogJ01vaGFtbWFkIFRlc3RpbmcnIH0pO1xyXG4gIH1cclxuXHJcbiAgY29udGFjdFVzKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY29udGFjdFVzXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZENsYWltRGV0YWlsKCkge1xyXG5cclxuICAgIGxldCBjbGFpbURhdGEgPSB7XHJcbiAgICAgIFwiUm93TnVtXCI6IFwiNVwiLFxyXG4gICAgICBcIlBhdE5hbWVcIjogXCJBbXkgV2luZWhvdXNlXCIsXHJcbiAgICAgIFwiUGF0UmVsYXRpb25cIjogXCJTdWJzY3JpYmVyXCIsXHJcbiAgICAgIFwiRE9TXCI6IFwiMDEvMTcvMjAxN1wiLFxyXG4gICAgICBcIlBydk5hbWVcIjogXCJDVlMgUGhhcm1hY3lcIixcclxuICAgICAgXCJTdGF0dXNEdFwiOiBcIjAxLzIwLzE0XCIsXHJcbiAgICAgIFwiUmVjRHRcIjogXCIwMS8xOC8xNFwiLFxyXG4gICAgICBcIlByb0FtdFwiOiA2NzcuOTQsXHJcbiAgICAgIFwiQ29pbnNBbXRcIjogXCIwXCIsXHJcbiAgICAgIFwiQ29wYXlBbXRcIjogXCIwXCIsXHJcbiAgICAgIFwiRGVkQW10XCI6IDAsXHJcbiAgICAgIFwiTm90Q292QW10XCI6IFwiMFwiLFxyXG4gICAgICBcIk1lbU93ZWRBbXRcIjogMCxcclxuICAgICAgXCJQcnZTdWJBbXRcIjogMTAyMzAuNTYsXHJcbiAgICAgIFwiQWxsZEFtdFwiOiA0MjMsXHJcbiAgICAgIFwiQ2xtVHlwZVwiOiBcIk1cIixcclxuICAgICAgXCJDbG1TdGF0XCI6IFwiRFwiLFxyXG4gICAgICBcIlN2Y1R5cGVcIjogXCJTdXJnZXJ5XCIsXHJcbiAgICAgIFwiTXNnU3BlY2lmaWVkXCI6IFwiZmFsc2VcIixcclxuICAgICAgXCJMaW5lTXNnQ29kZVwiOiBcIlwiLFxyXG4gICAgICBcIkxpbmVNc2dcIjogXCJDbGFpbSBpcyBkZW5pZWQgYmVjYXVzZSB0aGUgYmlsbHMgYXJlIG5vdCBzdWJtaXR0ZWQgcHJvcGVybHkuXCIsXHJcbiAgICAgIFwiSUNOXCI6IDE1MzQzNDMsXHJcbiAgICAgIFwiQ2xtU3RhdHVzXCI6IFwiUGFpZFwiLFxyXG4gICAgICBcImFkZHJlc3NcIjogXCIyMjFCLCBCYWtlciBTdHJlZXQsIEFueXdoZXJlLCBNQVwiLFxyXG4gICAgICBcInBob25lXCI6IFwiKDAwMCkgMDAwLTAwMDBcIixcclxuICAgICAgXCJ0b3RCaWxsZWRBbXRcIjogNjU0XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2NsYWltU2VydmljZS5zZXRTZWxlY3RlZENsYWltKGNsYWltRGF0YSk7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jbGFpbVN1bW1hcnkvQ2xhaW1EZXRhaWxcIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGVNZSgpIHtcclxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzX2F1dGhfY2FuY2VsbGVkKSB7XHJcbiAgICAgIGxldCBpbmZvID0gdGhpcy5faG9tZVNlcnZpY2UuZ2V0TmV3VXNlckF1dGhJbmZvKCk7XHJcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBpbmZvID0gdGhpcy5faG9tZVNlcnZpY2UuZ2V0QXV0aEluZm8oKTtcclxuICAgICAgdGhpcy5hdXRoSW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRoSW5mby5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5fZ2xvYmFscy51c2VyX3N0YXRlID0gaXRlbS51c2VyU3RhdGU7XHJcbiAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9wZXJzb25hbF9pbmZvXCIsIHRoaXMuX2dsb2JhbHMucmVnaXN0cmF0aW9uX21vZGUsIHRoaXMuX2dsb2JhbHMudXNlcl9pZGVudGl0eV0sIHtcclxuICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGl0ZW0ubWVtYmVySWQgPT09IFwiXCIgfHwgaXRlbS5tZW1iZXJJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xyXG4gICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaXRlbS5zc24gPT09IFwiXCIgfHwgaXRlbS5zc24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vdmVyaWZ5X2lkZW50aXR5XCJdLCB7XHJcbiAgICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbXlEb2N0b3JzKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbXlkb2N0b3JzXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xhaW1zbmF2KCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2xhaW1TdW1tYXJ5XCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbWVkaWNhdGlvbk5hdigpIHtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL21lZGljYXRpb25cIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIC8vICB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrQWN0aW9uKCdTaWduZWQgSG9tZScsIHsgc2FtcGxlRGF0YTogJ01vaGFtbWFkIFRlc3RpbmcnIH0pO1xyXG4gIH1cclxuICBjYXJkcygpIHtcclxuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcmRzXCJdLCB7XHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XHJcbiAgfVxyXG4gIGFjY291bnRzKCkge1xyXG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvYWNjb3VudHMvaG9tZVwiXSwge1xyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuICBteVBsYW4oKSB7XHJcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9teVBsYW5cIl0sIHtcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIC8vICB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrQWN0aW9uKCdTaWduZWQgSG9tZScsIHsgc2FtcGxlRGF0YTogJ01vaGFtbWFkIFRlc3RpbmcnIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd21hcChhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpIHtcclxuICAgIHRoaXMuX2dsb2JhbHMubG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpO1xyXG4gIH1cclxuXHJcbiAgY2FsbFBob25lKG1vYmlsZSkge1xyXG4gICAgdGhpcy5fZ2xvYmFscy5jYWxsUGhvbmUobW9iaWxlKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZ2xvYmFscy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcyA9IGZhbHNlOyAvLyByZXNldHRpbmcgdG8gZGVmYXVsdCBzdGF0ZVxyXG4gIH1cclxufVxyXG4iXX0=