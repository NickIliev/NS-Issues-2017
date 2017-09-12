import { Component, OnInit, ViewChild, ElementRef, NgModule,AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { SecurityQuestionOneComponent } from "../authenticationsecurityquestions/securityquestion1/securityQuestionOne.component";
import { ViewContainerRef } from "@angular/core";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { ActivityIndicator } from "ui/activity-indicator";
import { Globals } from "../../../shared/global";
import { Page } from "ui/page";
import { AuthenticationSuccessComponent } from "../authenticationsuccess/authenticationsuccess.component";
import * as app from "tns-core-modules/application";
import { SSNInfo } from "../authentication.model";
import { AuthenticationService } from "../authentication.service";

@Component({
    moduleId: module.id,
    templateUrl: "./verifyIdentity.component.html",
    styleUrls: ["../authentication.css"]
})
export class VerifyIdentityComponent implements OnInit, AfterViewInit {
    public activityIndicator: ActivityIndicator;
    @ViewChild("activityIndicator") ac: ElementRef;
    @ViewChild("ssnTextField") ssTextField: ElementRef;
    public busy: boolean;
   
    title: string = "Authentication";
    public isSnnClicked: Boolean = false;
    public isValidSSN: Boolean = true;
    public ssnId: string="";
    public isSSnFilled: Boolean = true;
    public isSSnValid: Boolean = true;
    ssninfo=new SSNInfo();
    public currentType: string;
    public otherType: string;
    public isTurnOff: boolean;

    public constructor(private router: Router, private page: Page,
        public _globals: Globals,
        private _formValidationService: FormValidationService,
        private _routerExtensions: RouterExtensions,
        private vcRef: ViewContainerRef,
        private securityQuestionModal: ModalDialogService, public auth_service: AuthenticationService, ) {
            this.isTurnOff = true;
            /*
            if (this._globals.isTurnOff) {
                this.isTurnOff = true;
            }
            */
    }
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
        this.activityIndicator = this.ac.nativeElement;
        this.busy = false;
        this._globals.user_ssn = "";
        this.currentType = this.auth_service.user_registration_type;
        if (this.currentType === "mobile") {
            this.otherType = "email";
        }
        else if (this.currentType = "email") {
            this.otherType = "mobile";
        }

    }
      ngAfterViewInit() {
          setTimeout(() => {
              this._globals.loader.hide();
        }, 1000);  
     }
    public inputSsn() {
        this.isSnnClicked = true;
    }
    public continueWithSSN(ssnId) {
        this.ssninfo.ssnid=ssnId;
        this.isSSnValid = this._formValidationService.snnNumberValidator(ssnId);
        this.isValidSSN = this._formValidationService.snnNumberValidator(ssnId) ;
        this.isSSnFilled = this._formValidationService.fieldFilledValidator(ssnId);
        if (this.isValidSSN && this.isSSnFilled) {
            this._globals.loader.show();
            this._globals.user_ssn = ssnId;
            let options = {
                context: {},
                fullscreen: true,
                viewContainerRef: this.vcRef
            };
            if(this.otherType===undefined || this.otherType===""){
                this.otherType="mobile";
            }
            this._routerExtensions.navigate(["/create/verification", this.otherType, "authenticate-verify"], {
                animated: false
            });
           
            // this.securityQuestionModal.showModal(AuthenticationSuccessComponent, options).then(res => {
            //     if (res === "true") {
            //         this._routerExtensions.navigate(["/home/signedHome"], {
            //              animated: false,
            //             clearHistory: true
            //         });
            //     }
            // });
        }
    }
    public onCancel() {
         this._globals.loader.show();
        this._routerExtensions.navigate(["/personal_info/error_page"], {
            animated: false
        });
    }
    public continueToQuestions() {
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.securityQuestionModal.showModal(SecurityQuestionOneComponent, options).then(res => {
            // Showing the authentication screen on click of submit button
            if (res === "true") {
                let options = {
                    context: {},
                    fullscreen: true,
                    viewContainerRef: this.vcRef
                };
                this.securityQuestionModal.showModal(AuthenticationSuccessComponent, options).then(res => {
                    if (res === "true") {
                        this._routerExtensions.navigate(["/home/signedHome"], {
                            animated: false,
                            clearHistory: true
                        });
                    }
                });
            }
        });
    }
    // back button
    public goBack() {
        this._routerExtensions.navigate(["/personal_info/member_info"], {
            animated: false
        });

    }
    public oncancelFn() {
        this._globals.is_auth_cancelled=true;
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        //  this._routerExtensions.navigate(["/home/signedHome"], {
        //      animated: false
        // });
        if(this._globals.user_state==="RNV"){
             this._globals.loader.show();
            this._routerExtensions.navigate(["/create/verification", this._globals.registration_mode, "maybelater"], {
                animated: false
            });
        }
        else if(this._globals.user_state==="RV"){
             this._globals.loader.show();
            this._routerExtensions.navigate(["/home/signedHome"], {
                animated: false
            });
        }
    }
    public validCheck(arg, type) {
        if (arg !== undefined && arg !== "") {
            switch (type) {
                case "ssnId":
                    this.isValidSSN = this._formValidationService.snnNumberValidator(arg);
                    this.isSSnFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isSSnValid = this._formValidationService.snnNumberValidator(arg);
                    break;

            }
        }

    }
}