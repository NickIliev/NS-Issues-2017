import { Component, OnInit, ViewContainerRef,AfterViewInit  } from "@angular/core";

import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Globals } from "../../shared/global";
import { Page } from "ui/page";
import { HomeService } from "../../pages/home/home.service";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./restrictedAccess.component.html",
    styleUrls: ["./restrictedAccess.css"],

})

export class RestrictedAccessComponent implements OnInit ,AfterViewInit {
    public authInfo = [];
    constructor(private params: ModalDialogParams,
    private modalParams: ModalDialogService, public _homeService: HomeService,
    private _routerExtensions: RouterExtensions,
    private vcRef: ViewContainerRef,
    private page: Page,
    public _globals: Globals) {

    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
    }
 ngAfterViewInit() {   
    setTimeout(() => {
              this._globals.loader.hide();
        }, 1000);
    
  }
    authenticate() {
      
      this.params.closeCallback();
    
      
      // this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
      //                  animated: false
      //             });     
      setTimeout(() => {
        if (this._globals.is_auth_cancelled) {
          
          let info = this._homeService.getAuthInfo();
          this.authInfo = info;
        }
        else {
        let info = this._homeService.getNewUserAuthInfo();
          this.authInfo = info;
        }

        this.authInfo.map((item) => {
          this._globals.user_state = item.userState;
          if (item.firstName === "" || item.firstName === undefined) {
            this._globals.loader.show();
            this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
              animated: false
            });
          }
          else if (item.memberId === "" || item.memberId === undefined) {
            this._globals.loader.show();
            this._routerExtensions.navigate(["/personal_info/member_info"], {
              animated: false
            });
          }
          else if (item.ssn === "" || item.ssn === undefined) {
            this._globals.loader.show();
            this._routerExtensions.navigate(["/personal_info/verify_identity"], {
              animated: false
            });
          }
        });
      }, 700);
  
    }

    mayBeLater() {
        this.params.closeCallback();
    }

    goBack() {
        this.params.closeCallback();
    }
}