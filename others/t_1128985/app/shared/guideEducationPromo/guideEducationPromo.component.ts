import { Component, OnInit } from "@angular/core";
import { Button } from "ui/button";
import * as platformModule from "tns-core-modules/platform";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";
import * as platform from "platform";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as appSettings from "application-settings";
import { DrawerService } from "../../shared/services/drawer.service";

@Component({
    moduleId: module.id,
    templateUrl: "./guideEducationPromo.component.html",
    styleUrls: ["./guideEducationPromo.css"]
})

export class GuideEducationPromoComponent implements OnInit {

    screenWidth: number = platformModule.screen.mainScreen.widthPixels;
    screenHeight: number = platformModule.screen.mainScreen.heightPixels;
    screenScale: number = platformModule.screen.mainScreen.scale;

    scrHeight: number = (this.screenHeight / this.screenScale);
    scrWidth: number = (this.screenWidth / this.screenScale);

    guideImages: Object[] = new Array;

    constructor(private page: Page,
        private params: ModalDialogParams,
        private drawer: DrawerService) {
        this.guideImages = [
            "~/dummyData/1.png",
            "~/dummyData/2.png",
            "~/dummyData/3.png",
            "~/dummyData/4.png",
            "~/dummyData/5.png",
            "~/dummyData/6.png"
        ];
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }

    skipPopUp() {
        this.params.closeCallback();
        appSettings.setBoolean("isFirstInstallPopup", false);
        this.drawer.enableGesture(true);
    }
}