import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../../shared/global";
import { Button } from "ui/button";
import { HomeService } from "../home.service";
import { Article, } from "../home.model";
import * as appSettings from "application-settings";
import * as app from "tns-core-modules/application";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { GuideEducationPromoComponent } from "../../../shared/guideEducationPromo/guideEducationPromo.component";
import { DrawerService } from "../../../shared/services/drawer.service";
import { Page } from "ui/page";

@Component({
  moduleId: module.id,
  templateUrl: "./anonymousHome.component.html",
  styleUrls: ["../home.css"]

})
export class AnonymousHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  messageCount: string;
  isLoggedIn: boolean = false;
  isUnauthenticated: boolean = false;
  isUnauthenticatedClose: boolean = false;
  isanonymous: boolean = true;
  isAuthenticationSuccess: boolean = false;
  public isBusy = false;
  showlogo: boolean = true;
  pageStartTime: number = 0;
  pageEndTime: number = 0;
  pageTimeDifference: number = 0;

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
    "date": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    "category": "living",
    "orderNum": 0,
    "imageURL": "~/images/Healthy_banner.png"
  };

  isTurnOff: boolean = false;

  constructor(private _router: Router,
    private _routerExtensions: RouterExtensions,
    public _globals: Globals,
    public _homeService: HomeService,
    private _changeDetectionRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private drawerService: DrawerService,
    private modalParams: ModalDialogService,
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
    // console.log('Anonymous Home Page : Start Time ',new Date().getTime());
    if (app.ios) {
      this.page.css = "Page {background-image : none; margin-top: 0} ";
    }
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

  articleDetail() {
    this._routerExtensions.navigate(["/home/articleDetail"], {
      animated: false
    });
  }

  loginUser() {
    this._routerExtensions.navigate(["/login"], {
      animated: false
    });
  }

  registerUser() {
    this._routerExtensions.navigate(["/create"], {
      animated: false
    });
  }

  contactUs() {
    this._routerExtensions.navigate(["/contactUs"], {
      animated: false
    });
  }

  public authenticateMe() {
    this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
      animated: false
    });
  }

  ngOnDestroy() {
    this._globals.isAuthenticationSuccess = false; // resetting to default state
  }
}
