import { Component, ViewChild, ElementRef, OnInit, Input,AfterViewInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../../shared/global";
import { LoginService } from "../login.service";
import { SecureStorage } from "nativescript-secure-storage";
import { alert } from "ui/dialogs";
import { getBoolean, setBoolean, getNumber, setNumber, getString, setString, hasKey, remove, clear } from "application-settings";
import * as appSettings from "application-settings";
import * as app from "tns-core-modules/application";
import { Page } from "ui/page";


@Component({
    moduleId: module.id,
    templateUrl: "./changeUser.component.html",
    styleUrls: ["changeUser.css"]

})

export class ChangeUserComponent implements OnInit,AfterViewInit {

    public title: string;
    public secureStorage = new SecureStorage();
    public userName: string;
    public isTouchIdEnable: boolean;
    constructor(private _router: RouterExtensions,
        private _globals: Globals,
        public _loginService: LoginService,
        public page: Page) {

    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.title = "Change Online ID";
        this.secureStorage.get({
            key: "UserName"
        }).then(value => {
            if (value) {
                this.userName = value.substring(0, 3) + value.substring(3).replace(/./g, "*");
            }
            else {
                this.userName = "";
            }
        });
        if (appSettings.getBoolean("isEnableTouchID") === true) {
            this.isTouchIdEnable = true;
            this._loginService.isEnablenotify = true;
        }
        else {
            this.isTouchIdEnable = false;
            this._loginService.isEnablenotify = false;
        }
    }
    ngAfterViewInit() {   
    setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
    
  }


    goBack() {
        this._router.back();
        this._globals.isShowTouchID = false;
    }

    diffUser() {
        this._loginService.isnotify = true;
        this._loginService.isuserChange = false;
        appSettings.setBoolean("isTouchIDdisableNotification", false);
        this._router.navigate(["/login"], {
            animated: false
        });
        appSettings.remove("isEnableTouchID");
        appSettings.remove("isRememberMe");
        this.secureStorage.remove({
            key: "UserName",
        });
        if (this.isTouchIdEnable) {
            alert({
                title: "For security, ‘Touch ID’ and ‘Remember Me’ has been reset",
                message: "You will need to re-enable it on your next sign in.",
                okButtonText: "OK"
            });
        }
        else {
            alert({
                title: "For security, 'Remember Me’ has been reset",
                message: "You will need to re-enable it on your next sign in.",
                okButtonText: "OK"
            });
        }
        this._globals.isShowTouchID = false;
    }


}
