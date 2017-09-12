import { Component, OnInit ,AfterViewInit} from "@angular/core";
import { Button } from "ui/button";
import * as platformModule from "tns-core-modules/platform";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";
import * as platform from "platform";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as appSettings from "application-settings";
import { DrawerService } from "../../../shared/services/drawer.service";
import { Globals } from "../../../shared/global";
import { CardsService } from "../cards.service";
import { MemberListModel, CardModel, Copay } from "../memberList.model";

@Component({
    moduleId: module.id,
    templateUrl: "./cardDetail.component.html",
    styleUrls: ["./cardDetail.css"]
})

export class CardDetailComponent implements OnInit,AfterViewInit {

    selectedMember: MemberListModel;
    cardDetails: CardModel;
    screenWidth: number = platformModule.screen.mainScreen.widthPixels;
    screenHeight: number = platformModule.screen.mainScreen.heightPixels;
    screenScale: number = platformModule.screen.mainScreen.scale;
    scrHeight: number = (this.screenHeight / this.screenScale);
    scrWidth: number = (this.screenWidth / this.screenScale);

    constructor(private page: Page,
        private params: ModalDialogParams,
        private drawer: DrawerService,
        private _cardService: CardsService,
        public _globals: Globals) {
        // this.guideImages = [
        //     "~/jhg/.dfdsfasdsapng",
        //     h"~//adsfsd."sadsfdssdfdsfgfdasdsasdsadfds,
        //     "~//.png"asdsa
        // ];
        this.selectedMember = this._cardService.selectedMember;
        this.cardDetails = this._cardService.selectedMember.cardDetails;
    }

    ngOnInit() {       
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
              this._globals.hideLoader();
        }, 1000); 
    }

    closeCard() {
         this._cardService.isCardsPopUp = true;
        this.params.closeCallback();
        this.drawer.enableGesture(true);
    }

    callPhone(phoneNo) {
        this._globals.callPhone(phoneNo);
    }

}