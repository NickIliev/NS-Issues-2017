import { Component, OnInit, ViewContainerRef,AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RegistrationService } from "../../registration/registration.service";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";
import { Globals } from "../../../shared/global";

@Component({
    moduleId: module.id,
    templateUrl: "authenticatePromo.component.html",
    styleUrls: ["authenticatePromo.css"],
})

export class AuthenticatePromoComponent implements OnInit,AfterViewInit {
    public reg_type: string;
    public user_id: string;
    public authInfo = [];
    public constructor(private params: ModalDialogParams,
        private _registrationservice: RegistrationService,
        private modalParams: ModalDialogService,
        private _routerExtensions: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private page: Page,
        public _globals: Globals) {
        this.reg_type = this._registrationservice.registration_type;
        this.user_id = this._registrationservice.user_name;
    }
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; }";
        }
    }
     ngAfterViewInit() {
        setTimeout(() => {
              this._globals.hideLoader();
        }, 1000); 
    }
    // public authenticateMe() {
    //     this.params.closeCallback();

    //     let info = this._registrationservice.getAuthInfo();
    //     this.authInfo = info;
    //     this.authInfo.map((item) => {
    //         this._globals.user_state = item.userState;
    //         if (item.firstName === "" || item.firstName === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
    //                 animated: false
    //             });
    //         }
    //         else if (item.memberId === "" || item.memberId === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/member_info"], {
    //                 animated: false
    //             });
    //         }
    //         else if (item.ssn === "" || item.ssn === undefined) {
    //             this._routerExtensions.navigate(["/personal_info/verify_identity"], {
    //                 animated: false
    //             });
    //         }
    //     });

    //     this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
    //         animated: false
    //     });

    // }

    // public verifyMe() {
    //     this.params.closeCallback();
    //     this._routerExtensions.navigate(["/create/verification", this.reg_type, "maybelater"], {
    //         animated: false
    //     });
    // }

    public authenticateMe() {
        if (this._globals.promoState === "fromRegistration") {
            this.params.closeCallback();
        } else {
            this.params.closeCallback();

            let info = this._registrationservice.getAuthInfo();
            this.authInfo = info;
            this.authInfo.map((item) => {
                this._globals.user_state = item.userState;
                if (item.firstName === "" || item.firstName === undefined) {
                    this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
                        animated: false
                    });
                }
                else if (item.memberId === "" || item.memberId === undefined) {
                    this._routerExtensions.navigate(["/personal_info/member_info"], {
                        animated: false
                    });
                }
                else if (item.ssn === "" || item.ssn === undefined) {
                    this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                        animated: false
                    });
                }
            });

            this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
                animated: false
            });
        }
    }

    public verifyMe() {
        if (this._globals.promoState === "fromRegistration") {
            this.params.closeCallback("fromreg");
        } else {
            this.params.closeCallback();
            this._routerExtensions.navigate(["/create/verification", this.reg_type, "maybelater"], {
                animated: false
            });
        }
    }

    public close() {
        this.params.closeCallback();
    }
}