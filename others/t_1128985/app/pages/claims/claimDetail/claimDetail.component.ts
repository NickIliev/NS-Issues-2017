import { Component, OnInit, AfterViewInit } from "@angular/core";

import { ClaimService } from "../claims.service";
import { ClaimModel } from "../claims.model";
import { Globals } from "../../../shared/global";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";


@Component({
    moduleId: module.id,
    templateUrl: "./claimDetail.component.html",
    styleUrls: ["claimDetail.css"]
})
export class ClaimDetailComponent implements OnInit, AfterViewInit {

    public title = "Claim Details";
    public selectedClaim: ClaimModel;
    public claimHelpInfoHtml: string = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\" /><style> body{background-color: #fff;font-family: Arial;}</style></head><body><div><span style='color:#000000;font-weight:bold;'>What is a Denied Claim?</span></br>Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat leifend tincidunt, purus tortor aliquet felis.</div>";
    public isHelpInfoVisible: Boolean = false;
    public isUserLoggedIn: Boolean;
    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

    public constructor(public globals: Globals, public _claimService: ClaimService,
        private _routerExtensions: RouterExtensions,
        private page: Page) {
        this.pageStartTime = new Date().getTime();
    }

    ngOnInit() {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        this.selectedClaim = this._claimService.selectedClaim;
    }

      ngAfterViewInit() {
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
      }

    goBack() {
        this._routerExtensions.back();
    }
    public showOrHideContextualHelp() {
        this.isHelpInfoVisible = !this.isHelpInfoVisible;
    }




}