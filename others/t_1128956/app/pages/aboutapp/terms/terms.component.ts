import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationStart } from "@angular/router";
import { AboutAppService } from "../aboutapp.service";
import { Globals } from "../../../shared/global";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./terms.component.html",
    styleUrls: ["../about.css"]
})

export class TermsComponent implements OnInit {

    @ViewChild("termsGrid") termsGrid: ElementRef;
    public title: string;
    public termsHtmlString: string;
    public isUserLoggedIn: Boolean;
    constructor(public globals: Globals, private _routerExtensions: RouterExtensions,
        private aboutAppService: AboutAppService,
        private page: Page) {
        this.title = "Terms & Conditions";
    }
    ngOnInit(): void {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
            this.termsGrid.nativeElement.height = "560";
        } 
        this.termsHtmlString = this.aboutAppService.getTerms().html1;
    }

    public goBack() {
        this._routerExtensions.back();
    }

}

