import { Component, ViewChild, OnInit, ElementRef,AfterViewInit, ViewContainerRef } from "@angular/core";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import * as listViewModule from "tns-core-modules/ui/list-view";
import * as app from "tns-core-modules/application";
import { SettingsService } from "./settings.service";
import { TextField } from "ui/text-field";
import { Page } from "ui/page";
import { Globals } from "../../shared/global";
import { Switch } from "ui/switch";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { FormValidationService } from "../../shared/services/formValidation.service";

@Component({
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.css"],
})
export class SettingsComponent implements OnInit, AfterViewInit {
    @ViewChild('currentPwd') currentPwd: ElementRef;
    @ViewChild('newPwd') newPwd: ElementRef;
    title: string = "Settings";

    public isEmailClicked: Boolean = false;
    public isMobileClicked: Boolean = false;
    public invalidEmailLbl: boolean = false;
    public invalidMobileLbl: boolean = false;
    public emailRequired: boolean = false;
    public emailid: string = "";
    public mobileNumber: number = null;
    public mobileText: number = 6171234567;

    public isProfileSettingsSelected:boolean = true;
    public isPreferenceSettingsSelected:boolean = false;
    public isPasswordValid:boolean = true;
    public isNewPasswordValid:boolean = true;
    public emailDisable:string = "Add your email address";
    public showPasswordBtn = {
        currentPwd: "Show",
        newPwd: "Show"
    };

    pageStartTime : number = 0;
    pageEndTime : number = 0;
    pageTimeDifference : number = 0;

    public constructor(public _globals: Globals,
        private _routerExtensions: RouterExtensions,
        private promoModal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private _formValidationService: FormValidationService,
        private page: Page) {
        this.pageStartTime = new Date().getTime();
    }

    public showPassword (currentField) {
        //this.el.nativeElement.secure = false;
        
        if (this.showPasswordBtn[currentField] === 'Show') {
            this[currentField].nativeElement.secure = false;
            this.showPasswordBtn[currentField] = "Hide"

        } else if (this.showPasswordBtn[currentField] === 'Hide') {
            this[currentField].nativeElement.secure = true;
            this.showPasswordBtn[currentField] = "Show"
        }

        if (app.android) {
            this.setCursorToEnd(currentField);
        }
    }

    formatMobileNumber(mobNumber: number) {
        return mobNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    public setCursorToEnd(currentField) {
        setTimeout(() => {
            android.text.Selection.setSelection(
                this[currentField].nativeElement.android.getText(),
                this[currentField].nativeElement.android.length()
            );
        }, 0);
    }

    saveEmail(emailid) {
        if (emailid === "") {
            return false;
        } else if (!(this._formValidationService.emailMatchValidator(emailid))) {
            this.invalidEmailLbl = true;
            return false;
        }
        this.invalidEmailLbl = false;
        this.isEmailClicked = false;
        this.emailDisable = emailid;
    }

    saveMobile(mobileNumber) {
        if (!(mobileNumber)) {
            return false;
        } else if (mobileNumber.length < 10) {
            this.invalidMobileLbl = true;
            return false;
        }
        this.invalidMobileLbl = false;
        this.isMobileClicked = false;
        this.mobileText = mobileNumber;
        //this.emailDisable = this.emailid;
    }

    ngOnInit() {

        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }

    public onSelectedIndexChange(tabName) {
        this.isProfileSettingsSelected = tabName == "profileSettings";
        this.isPreferenceSettingsSelected = tabName == "preferenceSettings"
    }

    public validateEmail(email) {
        if (email === "") {
            return false;
        } else {
            return this._formValidationService.passwordPatternValidator(this.newPwd.nativeElement.text);
        }
    }

    public updateClicked() {
        this.isPasswordValid = this.validateEmail(this.newPwd.nativeElement.text);
    }

    public goBack() {
        this._routerExtensions.back();
    }

     ngAfterViewInit() {
    // console.log(this.touchIDStack)
      setTimeout(() => {
              this._globals.hideLoader();
        }, 1000); 
      this.pageEndTime = new Date().getTime();
    this.pageTimeDifference = this.pageEndTime - this.pageStartTime;
  }

}