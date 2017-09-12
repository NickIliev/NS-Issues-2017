import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../../shared/global";
import { Button } from "ui/button";
import { HomeService } from "../home.service";
import { HomeModel, PcpDoctors, User, Claims, Financial, Article, ChartValues, ChartPlotVlaues } from "../home.model";
import { ClaimService } from "../../claims/claims.service";
import { ClaimModel } from "../../claims/claims.model";
import * as appSettings from "application-settings";
import * as app from "tns-core-modules/application";
import { SlidesComponent } from "../../../shared/slider/slides/slides.component";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { GuideEducationPromoComponent } from "../../../shared/guideEducationPromo/guideEducationPromo.component";
import { DrawerService } from "../../../shared/services/drawer.service";
import { Page } from "ui/page";
// import { AnalyticsService } from '../../../analytics.service';
// import { AdobeAnalytics } from 'nativescript-adobe-analytics';

@Component({
  moduleId: module.id,
  templateUrl: "./signedHome.component.html",
  styleUrls: ["../home.css"]

})
export class SignedHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  messageCount: string;
  isLoggedIn: boolean = false;
  isUnauthenticated: boolean = false;
  isUnauthenticatedClose: boolean = false;
  isanonymous: boolean = true;
  isAuthenticationSuccess: boolean = false;
  username: string;
  left: string = "left";
  public isBusy = false;
  showlogo: boolean = true;
  public authInfo = [];
  pageStartTime: number = 0;
  pageEndTime: number = 0;
  pageTimeDifference: number = 0;

  @ViewChild(SlidesComponent) sliderComponent: SlidesComponent;
  doctorList = {
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
  medicationList = {
    "LastVisit": "07/18/2017",
    "medicationName": "Hydrochlorothiazide HCL",
    "form": "Tablet",
    "dosage": "100mg",
    "frequency": "3x/Day"
  };
  healthyAricles: Article[] = [{
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
  heathyMainArticle = {
    "title": "How to design an exercise program",
    "date": "March 31, 2017",
    "category": "living",
    "orderNum": 0,
    "imageURL": "~/images/Healthy_banner.png"
  };
  // heathyMainArticle = new Article();
  //financial = new Financial();
  financial = {
    "alertsCount": 7,
    "reimbursementsCount": 2
  }
  claimsList = {
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
  loopChart = [{
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

  chartItems: ChartPlotVlaues[] = [];
  isTurnOff: boolean = false;

  constructor(private _router: Router,
    private _routerExtensions: RouterExtensions,
    public _globals: Globals,
    public _homeService: HomeService,
    private _changeDetectionRef: ChangeDetectorRef,
    private _claimService: ClaimService,
    private vcRef: ViewContainerRef,
    private drawerService: DrawerService,
    private modalParams: ModalDialogService,
    // private _analytics : AnalyticsService,
    public page: Page) {
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

  ngOnInit() {

    if (app.ios) {
      this.page.css = "Page {background-image : none; margin-top: 0} ";
    }
    this.loopChart.forEach((key: ChartValues) => {
      let available = Math.floor((key.available / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
      let invested = Math.floor((key.invested / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
      let ytd = Math.floor((key.ytd / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
      let leftOver = Math.floor((key.leftOver / (key.available + key.invested + key.ytd + key.leftOver)) * 100);
      let object = {
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
      this.chartItems.push(object);
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

  }


  loadEducationContentAfterAuthenticationSuccess() {

    if (appSettings.getNumber("isFirstTimeOpened") === 0) {
      if (appSettings.getBoolean("isAuthenticated") && this.isLoggedIn) {
        this.showEducationContent();
        appSettings.setBoolean("isAuthenticated", false);
      }
      if (this.isLoggedIn) {
        appSettings.setNumber("isFirstTimeOpened", 1);
      }
    }
  }

  showEducationContent() {
    this.drawerService.enableGesture(false);
    let modalOptions = {
      context: {},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.modalParams.showModal(GuideEducationPromoComponent, modalOptions).then(res => {
    });
  }

  ngAfterViewInit() {
    this._changeDetectionRef.detectChanges();
      setTimeout(() => {
              this._globals.hideLoader();
        }, 1000);  
    this.loadEducationContentAfterAuthenticationSuccess();
    if (appSettings.getBoolean("isFirstInstallPopup") === false) {
      // do nothing
    } else {
      appSettings.getBoolean("isFirstInstallPopup", true);
      this.showEducationContent();
    }

    this.pageEndTime = new Date().getTime();

    this.pageTimeDifference = this.pageEndTime - this.pageStartTime;

  }

  successAuthenticate() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/happy"], {
      animated: false
    });
  }

  successCardClose() {
    this.isUnauthenticatedClose = false;
  }
  successAuthenticationClose() {
    this.isAuthenticationSuccess = false;
    this._globals.isAuthenticationSuccess = false;
  }

  articleDetail() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/home/articleDetail"], {
      animated: false
    });
      // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  happyNavigate() {
    this._routerExtensions.navigate(["/happy"], {
      animated: false
    });
    //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  contactUs() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/contactUs"], {
      animated: false
    });
      // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  public loadClaimDetail() {

    let claimData = {
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
    this._globals.showLoader();
    this._routerExtensions.navigate(["/claimSummary/ClaimDetail"], {
      animated: false
    });
  }

  public authenticateMe() {
    if (this._globals.is_auth_cancelled) {
      let info = this._homeService.getNewUserAuthInfo();
      this.authInfo = info;
    }
    else {
      let info = this._homeService.getAuthInfo();
      this.authInfo = info;
    }

    this.authInfo.map((item) => {
      this._globals.user_state = item.userState;
      if (item.firstName === "" || item.firstName === undefined) {
        this._globals.showLoader();
        this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
          animated: false
        });
      }
      else if (item.memberId === "" || item.memberId === undefined) {
        this._globals.showLoader();
        this._routerExtensions.navigate(["/personal_info/member_info"], {
          animated: false
        });
      }
      else if (item.ssn === "" || item.ssn === undefined) {
        this._globals.showLoader();
        this._routerExtensions.navigate(["/personal_info/verify_identity"], {
          animated: false
        });
      }
    });
  }

  public myDoctors() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/mydoctors"], {
      animated: false
    });
      // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  public claimsnav() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/claimSummary"], {
      animated: false
    });
      // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  public medicationNav() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/medication"], {
      animated: false
    });
    //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }
  cards() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/cards"], {
      animated: false
    });
      // this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }
  accounts() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/accounts/home"], {
      animated: false
    });
  }
  myPlan() {
    this._globals.showLoader();
    this._routerExtensions.navigate(["/myPlan"], {
      animated: false
    });
    //  this._analytics.plugin.trackAction('Signed Home', { sampleData: 'Mohammad Testing' });
  }

  showmap(address1, city, state, zipcode) {
    this._globals.locateAddress(address1, city, state, zipcode);
  }

  callPhone(mobile) {
    this._globals.callPhone(mobile);
  }

  ngOnDestroy() {
    this._globals.isAuthenticationSuccess = false; // resetting to default state
  }
}
