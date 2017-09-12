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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmVkSG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWduZWRIb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0SDtBQUM1SCwwQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELGlEQUFpRDtBQUVqRCxnREFBOEM7QUFFOUMsOERBQTJEO0FBRTNELGtEQUFvRDtBQUNwRCxrREFBb0Q7QUFDcEQsbUZBQWlGO0FBQ2pGLG1FQUE2RTtBQUM3RSxtSEFBaUg7QUFDakgsMEVBQXdFO0FBQ3hFLGdDQUErQjtBQUMvQixpRUFBaUU7QUFDakUsaUVBQWlFO0FBUWpFLElBQWEsbUJBQW1CO0lBbUk5Qiw2QkFBb0IsT0FBZSxFQUN6QixpQkFBbUMsRUFDcEMsUUFBaUIsRUFDakIsWUFBeUIsRUFDeEIsbUJBQXNDLEVBQ3RDLGFBQTJCLEVBQzNCLEtBQXVCLEVBQ3ZCLGFBQTRCLEVBQzVCLFdBQStCO1FBQ3ZDLHlDQUF5QztRQUNsQyxJQUFVO1FBVkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFFaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTFJbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1FBQ3hDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQUV6QyxTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDckIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLGVBQVUsR0FBRztZQUNYLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFlBQVksRUFBRSxzQkFBc0I7WUFDcEMsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7UUFDRixtQkFBYyxHQUFHO1lBQ2YsV0FBVyxFQUFFLFlBQVk7WUFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO1lBQzNDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxRQUFRO1NBQ3RCLENBQUM7UUFDRixtQkFBYyxHQUFjLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxnQkFBZ0I7Z0JBQ3pCLFVBQVUsRUFBRSxpQkFBaUI7Z0JBQzdCLGFBQWEsRUFBRSxtR0FBbUc7Z0JBQ2xILFVBQVUsRUFBRSxRQUFRO2dCQUNwQixVQUFVLEVBQUUsNkNBQTZDO2dCQUN6RCxlQUFlLEVBQUUsc0NBQXNDO2dCQUN2RCxRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLGFBQWEsRUFBRSxtR0FBbUc7Z0JBQ2xILFVBQVUsRUFBRSxRQUFRO2dCQUNuQixVQUFVLEVBQUUsdUNBQXVDO2dCQUNwRCxlQUFlLEVBQUUsK0JBQStCO2dCQUNoRCxRQUFRLEVBQUUsQ0FBQzthQUNaO1NBQ0EsQ0FBQztRQUNGLHNCQUFpQixHQUFHO1lBQ2xCLE9BQU8sRUFBRSxtQ0FBbUM7WUFDNUMsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixVQUFVLEVBQUUsUUFBUTtZQUNwQixVQUFVLEVBQUUsQ0FBQztZQUNiLFVBQVUsRUFBRSw2QkFBNkI7U0FDMUMsQ0FBQztRQUNGLHFDQUFxQztRQUNyQyw4QkFBOEI7UUFDOUIsY0FBUyxHQUFHO1lBQ1YsYUFBYSxFQUFFLENBQUM7WUFDaEIscUJBQXFCLEVBQUUsQ0FBQztTQUN6QixDQUFBO1FBQ0QsZUFBVSxHQUFHO1lBQ1gsV0FBVyxFQUFFLENBQUM7WUFDZCxRQUFRLEVBQUUsQ0FBQztvQkFDVCxRQUFRLEVBQUUsR0FBRztvQkFDYixTQUFTLEVBQUUsZUFBZTtvQkFDMUIsYUFBYSxFQUFFLFlBQVk7b0JBQzNCLEtBQUssRUFBRSxZQUFZO29CQUNuQixTQUFTLEVBQUUsY0FBYztvQkFDekIsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsUUFBUSxFQUFFLENBQUM7b0JBQ1gsV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFlBQVksRUFBRSxDQUFDO29CQUNmLFdBQVcsRUFBRSxRQUFRO29CQUNyQixTQUFTLEVBQUUsR0FBRztvQkFDZCxTQUFTLEVBQUUsR0FBRztvQkFDZCxTQUFTLEVBQUUsR0FBRztvQkFDZCxTQUFTLEVBQUUsU0FBUztvQkFDcEIsY0FBYyxFQUFFLE9BQU87b0JBQ3ZCLGFBQWEsRUFBRSxFQUFFO29CQUNqQixTQUFTLEVBQUUsK0RBQStEO29CQUMxRSxLQUFLLEVBQUUsT0FBTztvQkFDZCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsU0FBUyxFQUFFLGtDQUFrQztvQkFDN0MsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsY0FBYyxFQUFFLEdBQUc7aUJBQ3BCO2FBQ0E7U0FDRixDQUFDO1FBQ0YsY0FBUyxHQUFHLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLHdCQUF3QjtnQkFDbkMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNEO2dCQUNFLFNBQVMsRUFBRSwyQkFBMkI7Z0JBQ3RDLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRDtnQkFDRSxTQUFTLEVBQUUsMkJBQTJCO2dCQUN0QyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztRQUVILGVBQVUsR0FBc0IsRUFBRSxDQUFDO1FBQ25DLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFhekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7SUFDdkUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkErRUM7UUE3RUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFnQjtZQUN0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzVHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDMUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNoRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzFHLElBQUksTUFBTSxHQUFHO2dCQUNYLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTztnQkFDdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLFNBQVM7Z0JBQzFCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2dCQUNkLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDeEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNsQixlQUFlLEVBQUUsU0FBUztnQkFDMUIsY0FBYyxFQUFFLFFBQVE7Z0JBQ3hCLFNBQVMsRUFBRSxHQUFHO2dCQUNkLGNBQWMsRUFBRSxRQUFRO2FBQ3pCLENBQUM7WUFDRixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QiwwREFBMEQ7WUFDMUQsdUJBQXVCO1lBQ3ZCLHFEQUFxRDtZQUNyRCw4QkFBOEI7WUFDOUIsYUFBYTtZQUNiLElBQUk7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNILHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLDZCQUE2QjtRQUM3QixxREFBcUQ7UUFDckQsMkNBQTJDO1FBQzNDLHlDQUF5QztRQUN6Qyx1Q0FBdUM7UUFDdkMsd0NBQXdDO1FBQ3hDLGlEQUFpRDtRQUNqRCx5REFBeUQ7UUFDekQscUdBQXFHO1FBQ3JHLDZHQUE2RztRQUM3RywyQkFBMkI7UUFDM0Isa0RBQWtEO1FBQ2xELDBDQUEwQztRQUMxQyx5REFBeUQ7UUFDekQsbURBQW1EO1FBQ25ELGVBQWU7UUFDZiwwQ0FBMEM7UUFDMUMsb0VBQW9FO1FBQ3BFLGlDQUFpQztRQUNqQywrREFBK0Q7UUFDL0QscUNBQXFDO1FBQ3JDLHVDQUF1QztRQUN2QyxjQUFjO1FBQ2QsY0FBYztRQUNkLGlCQUFpQjtRQUNqQixnQ0FBZ0M7UUFDaEMsVUFBVTtRQUNWLFNBQVM7UUFDVCxpQkFBaUI7UUFDakIsNkJBQTZCO1FBQzdCLDRCQUE0QjtRQUM1QixVQUFVO1FBQ1YsS0FBSztRQUNMLFFBQVE7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJO1FBQ0osdUNBQXVDO1FBQ3ZDLDJCQUEyQjtRQUMzQiwrQ0FBK0M7UUFDL0Msa0RBQWtEO1FBQ2xELE9BQU87UUFDUCxlQUFlO1FBQ2YseUJBQXlCO1FBQ3pCLFFBQVE7SUFFVixDQUFDO0lBR0QsNEVBQThDLEdBQTlDO1FBRUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsa0RBQW9CLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFZLEdBQUc7WUFDakIsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztTQUM3QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsNERBQTRCLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztRQUMvRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVELGFBQWE7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUVsRSxDQUFDO0lBRUQsaURBQW1CLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFDRCx3REFBMEIsR0FBMUI7UUFDRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0lBQ2hELENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDdkQsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBQ0QseUZBQXlGO0lBQzdGLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUNILDBGQUEwRjtJQUM1RixDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5QyxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFDRCx5RkFBeUY7SUFDN0YsQ0FBQztJQUVNLDZDQUFlLEdBQXRCO1FBRUUsSUFBSSxTQUFTLEdBQUc7WUFDZCxRQUFRLEVBQUUsR0FBRztZQUNiLFNBQVMsRUFBRSxlQUFlO1lBQzFCLGFBQWEsRUFBRSxZQUFZO1lBQzNCLEtBQUssRUFBRSxZQUFZO1lBQ25CLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEdBQUc7WUFDZixRQUFRLEVBQUUsQ0FBQztZQUNYLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFFBQVE7WUFDckIsU0FBUyxFQUFFLEdBQUc7WUFDZCxTQUFTLEVBQUUsR0FBRztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsU0FBUyxFQUFFLFNBQVM7WUFDcEIsY0FBYyxFQUFFLE9BQU87WUFDdkIsYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLCtEQUErRDtZQUMxRSxLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFNBQVMsRUFBRSxrQ0FBa0M7WUFDN0MsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixjQUFjLEVBQUUsR0FBRztTQUNwQixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsMkJBQTJCLENBQUMsRUFBRTtZQUM3RCxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sNENBQWMsR0FBckI7UUFBQSxpQkE0QkM7UUEzQkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QixFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUgsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsNEJBQTRCLENBQUMsRUFBRTtvQkFDOUQsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtvQkFDbEUsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx1Q0FBUyxHQUFoQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5QyxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7UUFDRCx5RkFBeUY7SUFDN0YsQ0FBQztJQUVNLHVDQUFTLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2pELFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUNELHlGQUF5RjtJQUM3RixDQUFDO0lBRU0sMkNBQWEsR0FBcEI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDL0MsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsMEZBQTBGO0lBQzVGLENBQUM7SUFDRCxtQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUNELHlGQUF5RjtJQUM3RixDQUFDO0lBQ0Qsc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2xELFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxvQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUNILDBGQUEwRjtJQUM1RixDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU87UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELHVDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDLDZCQUE2QjtJQUM5RSxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBN2FELElBNmFDO0FBNVo2QjtJQUEzQixnQkFBUyxDQUFDLGtDQUFlLENBQUM7OEJBQWtCLGtDQUFlOzREQUFDO0FBakJsRCxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUUzQixDQUFDO3FDQW9JNkIsZUFBTTtRQUNOLHlCQUFnQjtRQUMxQixnQkFBTztRQUNILDBCQUFXO1FBQ0gsd0JBQWlCO1FBQ3ZCLDZCQUFZO1FBQ3BCLHVCQUFnQjtRQUNSLDhCQUFhO1FBQ2YsNEJBQWtCO1FBRTFCLFdBQUk7R0E3SVIsbUJBQW1CLENBNmEvQjtBQTdhWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdsb2JhbHMgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0IHsgSG9tZVNlcnZpY2UgfSBmcm9tIFwiLi4vaG9tZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBIb21lTW9kZWwsIFBjcERvY3RvcnMsIFVzZXIsIENsYWltcywgRmluYW5jaWFsLCBBcnRpY2xlLCBDaGFydFZhbHVlcywgQ2hhcnRQbG90VmxhdWVzIH0gZnJvbSBcIi4uL2hvbWUubW9kZWxcIjtcbmltcG9ydCB7IENsYWltU2VydmljZSB9IGZyb20gXCIuLi8uLi9jbGFpbXMvY2xhaW1zLnNlcnZpY2VcIjtcbmltcG9ydCB7IENsYWltTW9kZWwgfSBmcm9tIFwiLi4vLi4vY2xhaW1zL2NsYWltcy5tb2RlbFwiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFNsaWRlc0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvc2xpZGVyL3NsaWRlcy9zbGlkZXMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBHdWlkZUVkdWNhdGlvblByb21vQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9ndWlkZUVkdWNhdGlvblByb21vL2d1aWRlRWR1Y2F0aW9uUHJvbW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG4vLyBpbXBvcnQgeyBBbmFseXRpY3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vYW5hbHl0aWNzLnNlcnZpY2UnO1xuLy8gaW1wb3J0IHsgQWRvYmVBbmFseXRpY3MgfSBmcm9tICduYXRpdmVzY3JpcHQtYWRvYmUtYW5hbHl0aWNzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2lnbmVkSG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4uL2hvbWUuY3NzXCJdXG5cbn0pXG5leHBvcnQgY2xhc3MgU2lnbmVkSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBtZXNzYWdlQ291bnQ6IHN0cmluZztcbiAgaXNMb2dnZWRJbjogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1VuYXV0aGVudGljYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1VuYXV0aGVudGljYXRlZENsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIGlzYW5vbnltb3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNBdXRoZW50aWNhdGlvblN1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgbGVmdDogc3RyaW5nID0gXCJsZWZ0XCI7XG4gIHB1YmxpYyBpc0J1c3kgPSBmYWxzZTtcbiAgc2hvd2xvZ286IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgYXV0aEluZm8gPSBbXTtcbiAgcGFnZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgcGFnZUVuZFRpbWU6IG51bWJlciA9IDA7XG4gIHBhZ2VUaW1lRGlmZmVyZW5jZTogbnVtYmVyID0gMDtcblxuICBAVmlld0NoaWxkKFNsaWRlc0NvbXBvbmVudCkgc2xpZGVyQ29tcG9uZW50OiBTbGlkZXNDb21wb25lbnQ7XG4gIGRvY3Rvckxpc3QgPSB7XG4gICAgXCJMYXN0VmlzaXRcIjogXCIwNy8xOC8yMDE3XCIsXG4gICAgXCJuYW1lXCI6IFwiRnJhbmtlbiBTdGVpblwiLFxuICAgIFwic3BlY2lhbGlzdFwiOiBcIk1EIEludGVybmFsIE1lZGljaW5lXCIsXG4gICAgXCJhZGRyZXNzMVwiOiBcIjEyNyBFbGtpbnMgQ2lyY2xlXCIsXG4gICAgXCJjaXR5XCI6IFwiRm9sc29tXCIsXG4gICAgXCJzdGF0ZVwiOiBcIkNBXCIsXG4gICAgXCJ6aXBjb2RlXCI6IDk1NjMwLFxuICAgIFwibW9iaWxlXCI6IFwiKzE4NTczNzM5NTE1XCIsXG4gICAgXCJJZFwiOiBcIjcwMDFKWDI5NDNcIlxuICB9O1xuICBtZWRpY2F0aW9uTGlzdCA9IHtcbiAgICBcIkxhc3RWaXNpdFwiOiBcIjA3LzE4LzIwMTdcIixcbiAgICBcIm1lZGljYXRpb25OYW1lXCI6IFwiSHlkcm9jaGxvcm90aGlhemlkZSBIQ0xcIixcbiAgICBcImZvcm1cIjogXCJUYWJsZXRcIixcbiAgICBcImRvc2FnZVwiOiBcIjEwMG1nXCIsXG4gICAgXCJmcmVxdWVuY3lcIjogXCIzeC9EYXlcIlxuICB9O1xuICBoZWFsdGh5QXJpY2xlczogQXJ0aWNsZVtdID0gW3tcbiAgICBcInRpdGxlXCI6IFwiSGVhbHRoeSBMaXZpbmdcIixcbiAgICBcInN1YnRpdGxlXCI6IFwiVGFubmluZ3MgYWxsdXJlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkl0IGlzIGEgbG9uZyBlc3RhYmxpc2hlZCBmYWN0IHRoYXQgYSByZWFkZXIgd2lsbCBiZSBkaXN0cmFjdGVkIGJ5IHRoZSByZWFkYWJsZSBjb250ZW50IG9mIGEgcGFnZS5cIixcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXG4gICAgXCJpbWFnZVVSTFwiOiBcIn4vaW1hZ2VzL3JlZGVzaWduL2FydGljbGVfaGVhbHRoeUxpdmluZy5wbmdcIixcbiAgICBcInRpdGxlSW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9oZWFsdGh5X2xpdmluZy5wbmdcIixcbiAgICBcInJvd051bVwiOiAwXG4gIH0sXG4gIHtcbiAgICBcInRpdGxlXCI6IFwiRml0bmVzc1wiLFxuICAgIFwic3VidGl0bGVcIjogXCJFeGVyY2lzZSBwcm9ncmFtXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkl0IGlzIGEgbG9uZyBlc3RhYmxpc2hlZCBmYWN0IHRoYXQgYSByZWFkZXIgd2lsbCBiZSBkaXN0cmFjdGVkIGJ5IHRoZSByZWFkYWJsZSBjb250ZW50IG9mIGEgcGFnZS5cIixcbiAgICBcImNhdGVnb3J5XCI6IFwibGl2aW5nXCIsXG4gICAgIFwiaW1hZ2VVUkxcIjogXCJ+L2ltYWdlcy9yZWRlc2lnbi9hcnRpY2xlX2ZpdG5lc3MucG5nXCIsXG4gICAgXCJ0aXRsZUltYWdlVVJMXCI6IFwifi9pbWFnZXMvcmVkZXNpZ24vZml0bmVzcy5wbmdcIixcbiAgICBcInJvd051bVwiOiAxXG4gIH1cbiAgXTtcbiAgaGVhdGh5TWFpbkFydGljbGUgPSB7XG4gICAgXCJ0aXRsZVwiOiBcIkhvdyB0byBkZXNpZ24gYW4gZXhlcmNpc2UgcHJvZ3JhbVwiLFxuICAgIFwiZGF0ZVwiOiBcIk1hcmNoIDMxLCAyMDE3XCIsXG4gICAgXCJjYXRlZ29yeVwiOiBcImxpdmluZ1wiLFxuICAgIFwib3JkZXJOdW1cIjogMCxcbiAgICBcImltYWdlVVJMXCI6IFwifi9pbWFnZXMvSGVhbHRoeV9iYW5uZXIucG5nXCJcbiAgfTtcbiAgLy8gaGVhdGh5TWFpbkFydGljbGUgPSBuZXcgQXJ0aWNsZSgpO1xuICAvL2ZpbmFuY2lhbCA9IG5ldyBGaW5hbmNpYWwoKTtcbiAgZmluYW5jaWFsID0ge1xuICAgIFwiYWxlcnRzQ291bnRcIjogNyxcbiAgICBcInJlaW1idXJzZW1lbnRzQ291bnRcIjogMlxuICB9XG4gIGNsYWltc0xpc3QgPSB7XG4gICAgXCJuZXdDbGFpbXNcIjogNCxcbiAgICBcInJlY2VudFwiOiBbe1xuICAgICAgXCJSb3dOdW1cIjogXCI1XCIsXG4gICAgICBcIlBhdE5hbWVcIjogXCJBbXkgV2luZWhvdXNlXCIsXG4gICAgICBcIlBhdFJlbGF0aW9uXCI6IFwiU3Vic2NyaWJlclwiLFxuICAgICAgXCJET1NcIjogXCIwMS8xNy8yMDE3XCIsXG4gICAgICBcIlBydk5hbWVcIjogXCJDVlMgUGhhcm1hY3lcIixcbiAgICAgIFwiU3RhdHVzRHRcIjogXCIwMS8yMC8xNFwiLFxuICAgICAgXCJSZWNEdFwiOiBcIjAxLzE4LzE0XCIsXG4gICAgICBcIlByb0FtdFwiOiA2NzcuOTQsXG4gICAgICBcIkNvaW5zQW10XCI6IFwiMFwiLFxuICAgICAgXCJDb3BheUFtdFwiOiBcIjBcIixcbiAgICAgIFwiRGVkQW10XCI6IDAsXG4gICAgICBcIk5vdENvdkFtdFwiOiBcIjBcIixcbiAgICAgIFwiTWVtT3dlZEFtdFwiOiAwLFxuICAgICAgXCJQcnZTdWJBbXRcIjogMTAyMzAuNTYsXG4gICAgICBcIkFsbGRBbXRcIjogNDIzLFxuICAgICAgXCJDbG1UeXBlXCI6IFwiTVwiLFxuICAgICAgXCJDbG1TdGF0XCI6IFwiRFwiLFxuICAgICAgXCJTdmNUeXBlXCI6IFwiU3VyZ2VyeVwiLFxuICAgICAgXCJNc2dTcGVjaWZpZWRcIjogXCJmYWxzZVwiLFxuICAgICAgXCJMaW5lTXNnQ29kZVwiOiBcIlwiLFxuICAgICAgXCJMaW5lTXNnXCI6IFwiQ2xhaW0gaXMgZGVuaWVkIGJlY2F1c2UgdGhlIGJpbGxzIGFyZSBub3Qgc3VibWl0dGVkIHByb3Blcmx5LlwiLFxuICAgICAgXCJJQ05cIjogMTUzNDM0MyxcbiAgICAgIFwiQ2xtU3RhdHVzXCI6IFwiUGFpZFwiLFxuICAgICAgXCJhZGRyZXNzXCI6IFwiMjIxQiwgQmFrZXIgU3RyZWV0LCBBbnl3aGVyZSwgTUFcIixcbiAgICAgIFwicGhvbmVcIjogXCIoMDAwKSAwMDAtMDAwMFwiLFxuICAgICAgXCJ0b3RCaWxsZWRBbXRcIjogNjU0XG4gICAgfVxuICAgIF1cbiAgfTtcbiAgbG9vcENoYXJ0ID0gW3tcbiAgICBcImFjY291bnRcIjogXCJIZWFsdGggU2F2aW5ncyBBY2NvdW50XCIsXG4gICAgXCJ5ZWFyXCI6IFwiMjAxN1wiLFxuICAgIFwiYXZhaWxhYmxlXCI6IDI1MDAsXG4gICAgXCJpbnZlc3RlZFwiOiAyOTUwLFxuICAgIFwieXRkXCI6IDQ1MDAsXG4gICAgXCJsZWZ0T3ZlclwiOiAxODAwLFxuICAgIFwieXJNYXhcIjogNjAwMFxuICB9LFxuICB7XG4gICAgXCJhY2NvdW50XCI6IFwiRmluYW5jaWFsIFNhdmluZ3MgQWNjb3VudFwiLFxuICAgIFwieWVhclwiOiBcIjIwMTRcIixcbiAgICBcImF2YWlsYWJsZVwiOiA0NTAwLFxuICAgIFwiaW52ZXN0ZWRcIjogMjk1MCxcbiAgICBcInl0ZFwiOiAyNTAwLFxuICAgIFwibGVmdE92ZXJcIjogMTgwMCxcbiAgICBcInlyTWF4XCI6IDgwMDBcbiAgfSxcbiAge1xuICAgIFwiYWNjb3VudFwiOiBcImxvcmVuc3B1bSBTYXZpbmdzIEFjY291bnRcIixcbiAgICBcInllYXJcIjogXCIyMDEzXCIsXG4gICAgXCJhdmFpbGFibGVcIjogMjUwMCxcbiAgICBcImludmVzdGVkXCI6IDQ1MDAsXG4gICAgXCJ5dGRcIjogMjk1MCxcbiAgICBcImxlZnRPdmVyXCI6IDE4MDAsXG4gICAgXCJ5ck1heFwiOiA5MDAwXG4gIH1dO1xuXG4gIGNoYXJ0SXRlbXM6IENoYXJ0UGxvdFZsYXVlc1tdID0gW107XG4gIGlzVHVybk9mZjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHVibGljIF9nbG9iYWxzOiBHbG9iYWxzLFxuICAgIHB1YmxpYyBfaG9tZVNlcnZpY2U6IEhvbWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfY2xhaW1TZXJ2aWNlOiBDbGFpbVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGRyYXdlclNlcnZpY2U6IERyYXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RhbFBhcmFtczogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgIC8vIHByaXZhdGUgX2FuYWx5dGljcyA6IEFuYWx5dGljc1NlcnZpY2UsXG4gICAgcHVibGljIHBhZ2U6IFBhZ2UpIHtcbiAgICB0aGlzLnBhZ2VTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSB0aGlzLl9nbG9iYWxzLmlzTG9nZ2VkSW47XG4gICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZCA9IHRoaXMuX2dsb2JhbHMuaXNVbmF1dGhlbnRpY2F0ZWQ7XG4gICAgaWYgKHRoaXMuaXNVbmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgIHRoaXMuaXNVbmF1dGhlbnRpY2F0ZWRDbG9zZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xuICAgICAgdGhpcy5pc1R1cm5PZmYgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmlzYW5vbnltb3VzID0gdGhpcy5fZ2xvYmFscy5pc2Fub255bW91cztcbiAgICB0aGlzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gdGhpcy5fZ2xvYmFscy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKGFwcC5pb3MpIHtcbiAgICAgIHRoaXMucGFnZS5jc3MgPSBcIlBhZ2Uge2JhY2tncm91bmQtaW1hZ2UgOiBub25lOyBtYXJnaW4tdG9wOiAwfSBcIjtcbiAgICB9XG4gICAgdGhpcy5sb29wQ2hhcnQuZm9yRWFjaCgoa2V5OiBDaGFydFZhbHVlcykgPT4ge1xuICAgICAgbGV0IGF2YWlsYWJsZSA9IE1hdGguZmxvb3IoKGtleS5hdmFpbGFibGUgLyAoa2V5LmF2YWlsYWJsZSArIGtleS5pbnZlc3RlZCArIGtleS55dGQgKyBrZXkubGVmdE92ZXIpKSAqIDEwMCk7XG4gICAgICBsZXQgaW52ZXN0ZWQgPSBNYXRoLmZsb29yKChrZXkuaW52ZXN0ZWQgLyAoa2V5LmF2YWlsYWJsZSArIGtleS5pbnZlc3RlZCArIGtleS55dGQgKyBrZXkubGVmdE92ZXIpKSAqIDEwMCk7XG4gICAgICBsZXQgeXRkID0gTWF0aC5mbG9vcigoa2V5Lnl0ZCAvIChrZXkuYXZhaWxhYmxlICsga2V5LmludmVzdGVkICsga2V5Lnl0ZCArIGtleS5sZWZ0T3ZlcikpICogMTAwKTtcbiAgICAgIGxldCBsZWZ0T3ZlciA9IE1hdGguZmxvb3IoKGtleS5sZWZ0T3ZlciAvIChrZXkuYXZhaWxhYmxlICsga2V5LmludmVzdGVkICsga2V5Lnl0ZCArIGtleS5sZWZ0T3ZlcikpICogMTAwKTtcbiAgICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIFwiYWNjb3VudFwiOiBrZXkuYWNjb3VudCxcbiAgICAgICAgXCJ5ZWFyXCI6IGtleS55ZWFyLFxuICAgICAgICBcImF2YWlsYWJsZVwiOiBrZXkuYXZhaWxhYmxlLFxuICAgICAgICBcImludmVzdGVkXCI6IGtleS5pbnZlc3RlZCxcbiAgICAgICAgXCJ5dGRcIjoga2V5Lnl0ZCxcbiAgICAgICAgXCJsZWZ0T3ZlclwiOiBrZXkubGVmdE92ZXIsXG4gICAgICAgIFwieXJNYXhcIjoga2V5LnlyTWF4LFxuICAgICAgICBcImF2YWlsYWJsZVBsb3RcIjogYXZhaWxhYmxlLFxuICAgICAgICBcImludmVzdGVkUGxvdFwiOiBpbnZlc3RlZCxcbiAgICAgICAgXCJ5dGRQbG90XCI6IHl0ZCxcbiAgICAgICAgXCJsZWZ0T3ZlclBsb3RcIjogbGVmdE92ZXIsXG4gICAgICB9O1xuICAgICAgdGhpcy5jaGFydEl0ZW1zLnB1c2gob2JqZWN0KTtcbiAgICAgIC8vIGlmICh0aGlzLmxvb3BDaGFydC5sZW5ndGggPT09IHRoaXMuY2hhcnRJdGVtcy5sZW5ndGgpIHtcbiAgICAgIC8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyAgICAgdGhpcy5zbGlkZXJDb21wb25lbnQuc2V0U2xpZGVyQ29uZmlndXJhdGlvbigpO1xuICAgICAgLy8gICAgIC8vIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAvLyAgIH0sIDEwMCk7XG4gICAgICAvLyB9XG4gICAgfSk7XG4gICAgLy8gaWYgKHRoaXMuaXNMb2dnZWRJbikge1xuICAgIC8vICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuICAgIC8vICAgdGhpcy5faG9tZVNlcnZpY2UuZ2V0T25sb2FkRGF0YSgpXG4gICAgLy8gICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAvLyAgICAgICB0aGlzLnRpdGxlID0gXCJIZWxsbyBcIiArIGRhdGEudXNlci5maXJzdE5hbWU7XG4gICAgLy8gICAgICAgdGhpcy5wY3BEb2N0b3JzID0gZGF0YS5wY3BEb2N0b3JzO1xuICAgIC8vICAgICAgIHRoaXMuZmluYW5jaWFsID0gZGF0YS5GaW5hbmNpYWw7XG4gICAgLy8gICAgICAgdGhpcy5jbGFpbXNMaXN0ID0gZGF0YS5jbGFpbXM7XG4gICAgLy8gICAgICAgaWYgKCF0aGlzLl9nbG9iYWxzLmlzVHVybk9mZikge1xuICAgIC8vICAgICAgICAgdGhpcy5sb29wQ2hhcnQgPSBkYXRhLkZpbmFuY2lhbC5jaGFydDtcbiAgICAvLyAgICAgICAgIHRoaXMubG9vcENoYXJ0LmZvckVhY2goKGtleTogQ2hhcnRWYWx1ZXMpID0+IHtcbiAgICAvLyAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IE1hdGguZmxvb3IoKGtleS5hdmFpbGFibGUgLyAoa2V5LkNvbnRyaWJ1dGlvbnMgKyBrZXkuYXZhaWxhYmxlKSkgKiAxMDApO1xuICAgIC8vICAgICAgICAgICBsZXQgQ29udHJpYnV0aW9ucyA9IE1hdGguZmxvb3IoKGtleS5Db250cmlidXRpb25zIC8gKGtleS5Db250cmlidXRpb25zICsga2V5LmF2YWlsYWJsZSkpICogMTAwKTtcbiAgICAvLyAgICAgICAgICAgbGV0IG9iamVjdCA9IHtcbiAgICAvLyAgICAgICAgICAgICBcIkNvbnRyaWJ1dGlvbnNcIjoga2V5LkNvbnRyaWJ1dGlvbnMsXG4gICAgLy8gICAgICAgICAgICAgXCJhdmFpbGFibGVcIjoga2V5LmF2YWlsYWJsZSxcbiAgICAvLyAgICAgICAgICAgICBcInRvdGFsQ29udHJpYnV0aW9uc1BlcmNlbnRhZ2VcIjogYXZhaWxhYmxlLFxuICAgIC8vICAgICAgICAgICAgIFwiYXZhaWxhYmxlUGVyY2VudGFnZVwiOiBDb250cmlidXRpb25zXG4gICAgLy8gICAgICAgICAgIH07XG4gICAgLy8gICAgICAgICAgIHRoaXMuY2hhcnRJdGVtcy5wdXNoKG9iamVjdCk7XG4gICAgLy8gICAgICAgICAgIGlmICh0aGlzLmxvb3BDaGFydC5sZW5ndGggPT09IHRoaXMuY2hhcnRJdGVtcy5sZW5ndGgpIHtcbiAgICAvLyAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyQ29tcG9uZW50LnNldFNsaWRlckNvbmZpZ3VyYXRpb24oKTtcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgLy8gICAgICAgICAgICAgfSwgMTAwKTsgICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yID0+IHtcbiAgICAvLyAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgIC8vICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSBcbiAgICAvL2Vsc2Uge1xuICAgIHRoaXMudXNlcm5hbWUgPSBcIkdyZXRjaGVuXCI7XG4gICAgLy8gfVxuICAgIC8vIHRoaXMuX2hvbWVTZXJ2aWNlLmdldEhlYWx0aHlMaXZpbmcoKVxuICAgIC8vICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgIC8vICAgICB0aGlzLmhlYWx0aHlBcmljbGVzID0gZGF0YS5zdWJfYXJ0aWNsZXM7XG4gICAgLy8gICAgIHRoaXMuaGVhdGh5TWFpbkFydGljbGUgPSBkYXRhLm1haW5fYXJ0aWNsZTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBlcnJvciA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKGVycm9yKVxuICAgIC8vICAgfSk7XG5cbiAgfVxuXG5cbiAgbG9hZEVkdWNhdGlvbkNvbnRlbnRBZnRlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpIHtcblxuICAgIGlmIChhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJpc0ZpcnN0VGltZU9wZW5lZFwiKSA9PT0gMCkge1xuICAgICAgaWYgKGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJpc0F1dGhlbnRpY2F0ZWRcIikgJiYgdGhpcy5pc0xvZ2dlZEluKSB7XG4gICAgICAgIHRoaXMuc2hvd0VkdWNhdGlvbkNvbnRlbnQoKTtcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0Qm9vbGVhbihcImlzQXV0aGVudGljYXRlZFwiLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc0xvZ2dlZEluKSB7XG4gICAgICAgIGFwcFNldHRpbmdzLnNldE51bWJlcihcImlzRmlyc3RUaW1lT3BlbmVkXCIsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNob3dFZHVjYXRpb25Db250ZW50KCkge1xuICAgIHRoaXMuZHJhd2VyU2VydmljZS5lbmFibGVHZXN0dXJlKGZhbHNlKTtcbiAgICBsZXQgbW9kYWxPcHRpb25zID0ge1xuICAgICAgY29udGV4dDoge30sXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgIH07XG4gICAgdGhpcy5tb2RhbFBhcmFtcy5zaG93TW9kYWwoR3VpZGVFZHVjYXRpb25Qcm9tb0NvbXBvbmVudCwgbW9kYWxPcHRpb25zKS50aGVuKHJlcyA9PiB7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIHRoaXMubG9hZEVkdWNhdGlvbkNvbnRlbnRBZnRlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpO1xuICAgIGlmIChhcHBTZXR0aW5ncy5nZXRCb29sZWFuKFwiaXNGaXJzdEluc3RhbGxQb3B1cFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImlzRmlyc3RJbnN0YWxsUG9wdXBcIiwgdHJ1ZSk7XG4gICAgICB0aGlzLnNob3dFZHVjYXRpb25Db250ZW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5wYWdlRW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgdGhpcy5wYWdlVGltZURpZmZlcmVuY2UgPSB0aGlzLnBhZ2VFbmRUaW1lIC0gdGhpcy5wYWdlU3RhcnRUaW1lO1xuXG4gIH1cblxuICBzdWNjZXNzQXV0aGVudGljYXRlKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHN1Y2Nlc3NDYXJkQ2xvc2UoKSB7XG4gICAgdGhpcy5pc1VuYXV0aGVudGljYXRlZENsb3NlID0gZmFsc2U7XG4gIH1cbiAgc3VjY2Vzc0F1dGhlbnRpY2F0aW9uQ2xvc2UoKSB7XG4gICAgdGhpcy5pc0F1dGhlbnRpY2F0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuX2dsb2JhbHMuaXNBdXRoZW50aWNhdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgfVxuXG4gIGFydGljbGVEZXRhaWwoKSB7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9hcnRpY2xlRGV0YWlsXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XG4gIH1cblxuICBoYXBweU5hdmlnYXRlKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hhcHB5XCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgICAvLyAgdGhpcy5fYW5hbHl0aWNzLnBsdWdpbi50cmFja0FjdGlvbignU2lnbmVkIEhvbWUnLCB7IHNhbXBsZURhdGE6ICdNb2hhbW1hZCBUZXN0aW5nJyB9KTtcbiAgfVxuXG4gIGNvbnRhY3RVcygpIHtcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jb250YWN0VXNcIl0sIHtcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIH0pO1xuICAgICAgLy8gdGhpcy5fYW5hbHl0aWNzLnBsdWdpbi50cmFja0FjdGlvbignU2lnbmVkIEhvbWUnLCB7IHNhbXBsZURhdGE6ICdNb2hhbW1hZCBUZXN0aW5nJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2xhaW1EZXRhaWwoKSB7XG5cbiAgICBsZXQgY2xhaW1EYXRhID0ge1xuICAgICAgXCJSb3dOdW1cIjogXCI1XCIsXG4gICAgICBcIlBhdE5hbWVcIjogXCJBbXkgV2luZWhvdXNlXCIsXG4gICAgICBcIlBhdFJlbGF0aW9uXCI6IFwiU3Vic2NyaWJlclwiLFxuICAgICAgXCJET1NcIjogXCIwMS8xNy8yMDE3XCIsXG4gICAgICBcIlBydk5hbWVcIjogXCJDVlMgUGhhcm1hY3lcIixcbiAgICAgIFwiU3RhdHVzRHRcIjogXCIwMS8yMC8xNFwiLFxuICAgICAgXCJSZWNEdFwiOiBcIjAxLzE4LzE0XCIsXG4gICAgICBcIlByb0FtdFwiOiA2NzcuOTQsXG4gICAgICBcIkNvaW5zQW10XCI6IFwiMFwiLFxuICAgICAgXCJDb3BheUFtdFwiOiBcIjBcIixcbiAgICAgIFwiRGVkQW10XCI6IDAsXG4gICAgICBcIk5vdENvdkFtdFwiOiBcIjBcIixcbiAgICAgIFwiTWVtT3dlZEFtdFwiOiAwLFxuICAgICAgXCJQcnZTdWJBbXRcIjogMTAyMzAuNTYsXG4gICAgICBcIkFsbGRBbXRcIjogNDIzLFxuICAgICAgXCJDbG1UeXBlXCI6IFwiTVwiLFxuICAgICAgXCJDbG1TdGF0XCI6IFwiRFwiLFxuICAgICAgXCJTdmNUeXBlXCI6IFwiU3VyZ2VyeVwiLFxuICAgICAgXCJNc2dTcGVjaWZpZWRcIjogXCJmYWxzZVwiLFxuICAgICAgXCJMaW5lTXNnQ29kZVwiOiBcIlwiLFxuICAgICAgXCJMaW5lTXNnXCI6IFwiQ2xhaW0gaXMgZGVuaWVkIGJlY2F1c2UgdGhlIGJpbGxzIGFyZSBub3Qgc3VibWl0dGVkIHByb3Blcmx5LlwiLFxuICAgICAgXCJJQ05cIjogMTUzNDM0MyxcbiAgICAgIFwiQ2xtU3RhdHVzXCI6IFwiUGFpZFwiLFxuICAgICAgXCJhZGRyZXNzXCI6IFwiMjIxQiwgQmFrZXIgU3RyZWV0LCBBbnl3aGVyZSwgTUFcIixcbiAgICAgIFwicGhvbmVcIjogXCIoMDAwKSAwMDAtMDAwMFwiLFxuICAgICAgXCJ0b3RCaWxsZWRBbXRcIjogNjU0XG4gICAgfTtcblxuICAgIHRoaXMuX2NsYWltU2VydmljZS5zZXRTZWxlY3RlZENsYWltKGNsYWltRGF0YSk7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2xhaW1TdW1tYXJ5L0NsYWltRGV0YWlsXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhdXRoZW50aWNhdGVNZSgpIHtcbiAgICBpZiAodGhpcy5fZ2xvYmFscy5pc19hdXRoX2NhbmNlbGxlZCkge1xuICAgICAgbGV0IGluZm8gPSB0aGlzLl9ob21lU2VydmljZS5nZXROZXdVc2VyQXV0aEluZm8oKTtcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBpbmZvID0gdGhpcy5faG9tZVNlcnZpY2UuZ2V0QXV0aEluZm8oKTtcbiAgICAgIHRoaXMuYXV0aEluZm8gPSBpbmZvO1xuICAgIH1cblxuICAgIHRoaXMuYXV0aEluZm8ubWFwKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9nbG9iYWxzLnVzZXJfc3RhdGUgPSBpdGVtLnVzZXJTdGF0ZTtcbiAgICAgIGlmIChpdGVtLmZpcnN0TmFtZSA9PT0gXCJcIiB8fCBpdGVtLmZpcnN0TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3BlcnNvbmFsX2luZm8vcGVyc29uYWxfaW5mb1wiLCB0aGlzLl9nbG9iYWxzLnJlZ2lzdHJhdGlvbl9tb2RlLCB0aGlzLl9nbG9iYWxzLnVzZXJfaWRlbnRpdHldLCB7XG4gICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS5tZW1iZXJJZCA9PT0gXCJcIiB8fCBpdGVtLm1lbWJlcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby9tZW1iZXJfaW5mb1wiXSwge1xuICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZW0uc3NuID09PSBcIlwiIHx8IGl0ZW0uc3NuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcGVyc29uYWxfaW5mby92ZXJpZnlfaWRlbnRpdHlcIl0sIHtcbiAgICAgICAgICBhbmltYXRlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbXlEb2N0b3JzKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL215ZG9jdG9yc1wiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gICAgICAvLyB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrQWN0aW9uKCdTaWduZWQgSG9tZScsIHsgc2FtcGxlRGF0YTogJ01vaGFtbWFkIFRlc3RpbmcnIH0pO1xuICB9XG5cbiAgcHVibGljIGNsYWltc25hdigpIHtcbiAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jbGFpbVN1bW1hcnlcIl0sIHtcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIH0pO1xuICAgICAgLy8gdGhpcy5fYW5hbHl0aWNzLnBsdWdpbi50cmFja0FjdGlvbignU2lnbmVkIEhvbWUnLCB7IHNhbXBsZURhdGE6ICdNb2hhbW1hZCBUZXN0aW5nJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtZWRpY2F0aW9uTmF2KCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL21lZGljYXRpb25cIl0sIHtcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgIH0pO1xuICAgIC8vICB0aGlzLl9hbmFseXRpY3MucGx1Z2luLnRyYWNrQWN0aW9uKCdTaWduZWQgSG9tZScsIHsgc2FtcGxlRGF0YTogJ01vaGFtbWFkIFRlc3RpbmcnIH0pO1xuICB9XG4gIGNhcmRzKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcmRzXCJdLCB7XG4gICAgICBhbmltYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgICAgIC8vIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XG4gIH1cbiAgYWNjb3VudHMoKSB7XG4gICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvYWNjb3VudHMvaG9tZVwiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgbXlQbGFuKCkge1xuICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL215UGxhblwiXSwge1xuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gIHRoaXMuX2FuYWx5dGljcy5wbHVnaW4udHJhY2tBY3Rpb24oJ1NpZ25lZCBIb21lJywgeyBzYW1wbGVEYXRhOiAnTW9oYW1tYWQgVGVzdGluZycgfSk7XG4gIH1cblxuICBzaG93bWFwKGFkZHJlc3MxLCBjaXR5LCBzdGF0ZSwgemlwY29kZSkge1xuICAgIHRoaXMuX2dsb2JhbHMubG9jYXRlQWRkcmVzcyhhZGRyZXNzMSwgY2l0eSwgc3RhdGUsIHppcGNvZGUpO1xuICB9XG5cbiAgY2FsbFBob25lKG1vYmlsZSkge1xuICAgIHRoaXMuX2dsb2JhbHMuY2FsbFBob25lKG1vYmlsZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9nbG9iYWxzLmlzQXV0aGVudGljYXRpb25TdWNjZXNzID0gZmFsc2U7IC8vIHJlc2V0dGluZyB0byBkZWZhdWx0IHN0YXRlXG4gIH1cbn1cbiJdfQ==