import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef,AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationStart } from "@angular/router";
import * as fs from "file-system";
import { knownFolders, File, Folder } from "file-system";
import * as app from "application";
import * as imageSource from "image-source";
import * as dialogs from "ui/dialogs";
import { Page } from "ui/page";
import { Globals } from "../../../shared/global";

import { GuideEducationPromoComponent } from "../../../shared/guideEducationPromo/guideEducationPromo.component";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { DrawerService } from "../../../shared/services/drawer.service";


@Component({
    moduleId: module.id,
    templateUrl: "./aboutapp.component.html",
    styleUrls: ["../about.css"]
})

export class AboutAppComponent implements OnInit,AfterViewInit {
    public textList: Array<string>;
    public title: string = "About MyBlue App";
    public buildValue: string;
    public versionNumber: string;
    public isUserLoggedIn: Boolean;

    pageStartTime: number = 0;
    pageEndTime: number = 0;
    pageTimeDifference: number = 0;

    constructor(private drawerService: DrawerService, private vcRef: ViewContainerRef, public globals: Globals, private routerExtensions: RouterExtensions, private page: Page, private educationPromoModal: ModalDialogService) {
        this.textList = ["Terms & Conditions", "Privacy Policy", "Feature Guides"];
        this.title = "About MyBlue App";
        this.pageStartTime = new Date().getTime();

    }
    ngOnInit() {
        this.isUserLoggedIn = this.globals.isLoggedIn;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        this.versionNumber = this.globals.versionNumber;
        this.buildValue = this.globals.buildValue;
    }

    ngAfterViewInit() {
         setTimeout(() => {
              this.globals.hideLoader();
        }, 1000); 
        this.pageEndTime = new Date().getTime();
        this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
    }

    private goToTermsPage() {
          this.globals.showLoader();
        this.routerExtensions.navigate(["/aboutapp/terms_app"], {
            animated: false
        });
    }
    private goToPrivacyPage() {
         this.globals.showLoader();
        this.routerExtensions.navigate(["/aboutapp/policy_app"], {
            animated: false
        });
    }
    public onItemTap(args) {
        if (args.index === 0) {
            this.goToTermsPage();
        }
        else if (args.index === 1) {
            this.goToPrivacyPage();
        } else if (args.index === 2) {
            this.drawerService.enableGesture(false);
            let options = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            this.educationPromoModal.showModal(GuideEducationPromoComponent, options).then(res => {
            });
        }
    }
    private goBack() {
        this.routerExtensions.back();
    }
}
