import { Component, OnInit, ViewChild, ElementRef ,AfterViewInit} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationStart } from "@angular/router";
import { AboutAppService } from "../aboutapp.service";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";
import { Globals } from "../../../shared/global";

@Component({
    moduleId: module.id,
    templateUrl: "./policy.component.html",
    styleUrls: ["../about.css"]
})

export class PolicyComponent implements OnInit,AfterViewInit {

    @ViewChild("privacyGrid") privacyGrid: ElementRef;
    public title: string;
    public privacyHtmlString: string;
    public isUserLoggedIn: Boolean;
    constructor(public globals: Globals, private _routerExtensions: RouterExtensions,
        private aboutAppService: AboutAppService,
        private page: Page) {
        this.title = "Privacy Policy";
    }
    ngOnInit() {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
            this.privacyGrid.nativeElement.height = "560";
        }
       

        this.privacyHtmlString = this.aboutAppService.getPrivacyPolicy().html1;
    }
     ngAfterViewInit() {
        setTimeout(() => {
              this.globals.hideLoader();
        }, 1000); 
     }
    public goBack() {
        this._routerExtensions.back();
    }

}

