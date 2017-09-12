import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { TextView } from "ui/text-view";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { RouterExtensions } from "nativescript-angular/router";
import { Button } from "ui/button";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Globals } from "../../../shared/global";
import { ViewContainerRef } from "@angular/core";
import { VerifyUser } from "../registration.model";
import { RegistrationService } from "../registration.service";
import { android } from "tns-core-modules/application";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { TextField } from "ui/text-field";
import * as appSettingsModule from "application-settings";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./verification.component.html",
    styleUrls: ["../registration.css"]

})
export class VerificationComponent implements OnInit {
    title: string = "Verification";
    public col1Input: string;
    public col2Input: string;
    public col3Input: string;
    public col4Input: string;
    public col5Input: string;
    public col6Input: string;
    public charLimit: Number;
    public verifyForm: FormGroup;
    public register_type: string;
    public verifytext: string;
    public reg_type: string;
    public user_id: string;
    public placeholder: string;
    public isBusy = false;



    user = new VerifyUser();
    @ViewChild("txtfield1") txtfield1: ElementRef;
    @ViewChild("txtfield2") txtfield2: ElementRef;
    @ViewChild("txtfield3") txtfield3: ElementRef;
    @ViewChild("txtfield4") txtfield4: ElementRef;
    @ViewChild("txtfield5") txtfield5: ElementRef;
    @ViewChild("txtfield6") txtfield6: ElementRef;

    public constructor(private route: ActivatedRoute,
        public _globals: Globals,
        private router: Router,
        private fb: FormBuilder,
        private page: Page,
        private _routerExtensions: RouterExtensions,
        private confirmationModal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private _registrationservice: RegistrationService) {

        this.col1Input = ""; this.col2Input = ""; this.col3Input = ""; this.col4Input = ""; this.col5Input = ""; this.col6Input = "";
        this.charLimit = 1;
        this.verifyForm = fb.group({
            "col1Input": ["", [Validators.required,]],
            "col2Input": ["", [Validators.required,]],
            "col3Input": ["", [Validators.required,]],
            "col4Input": ["", [Validators.required,]],
            "col5Input": ["", [Validators.required,]],
            "col6Input": ["", [Validators.required,]],
        });
        this.reg_type = this._registrationservice.registration_type;
        this.user_id = this._registrationservice.user_name;
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }

        this.route.params.subscribe((params) => {
            this.placeholder = params["placeholder"];
            if (this.placeholder == "authenticate-verify") {
                this.title = "Verify Your Account";
            }
            else
             this.title = "Verification";
            // if (this.placeholder == "signInVerify") {
            //     this.title = "Verification";
            // }
            this.register_type = params["name"];
            if (this.register_type === "mobile") {
                this.verifytext = " text message";
            }
            else if (this.register_type === "email") {
                this.verifytext = "email";
            }
        });
        if (this._globals.registration_mode === "mobile") {
            this.user.regtype = "MOBILE";
        }
        else if (this._globals.registration_mode === "email") {
            this.user.regtype = "EMAIL";
        }
		 if(this._globals.user_identity!==undefined && this._globals.user_reg_password!==undefined){
            this.user.userid = this._globals.user_identity;
        this.user.password = this._globals.user_reg_password;
		}
		else{
         this.user.userid = "1234567890";
        this.user.password = "password@123";
		}
        
        let firstTextField = <TextView>this.txtfield1.nativeElement;
        firstTextField.focus();
        if (app.android) {
            setTimeout(() => {
                let firstTxtFld = <TextView>this.txtfield1.nativeElement;
                firstTxtFld.focus();
            }, 1000);
        }

    }
    // on click of continue button
    public verifyUser() {
        this.user.code = this.col1Input + this.col2Input + this.col3Input + this.col4Input + this.col5Input + this.col6Input;

        if (this.user.code.length === 6) {
             this.isBusy = true;
            if (this.placeholder === "authenticate-verify") {
                //    this._routerExtensions.navigate(["/personal_info/verify_identity"]);
                this._registrationservice.verifyUser(this.user).subscribe((data) => {

                     this._routerExtensions.navigate(["/personal_info/authentication_success"], {
                     animated: false
                      });
                    appSettingsModule.setString("verify-unauthenticate", "auth-success");
                     this.isBusy = false;
                    // this._routerExtensions.navigate(["/login"], {
                    //     animated: false
                    // });
                },
                    error => {
                        console.dir(error);
                    });
            } else if (this.placeholder === "getauthenticated") {

                this._registrationservice.verifyUser(this.user).subscribe((data) => {
                    // this._routerExtensions.navigate(["/personal_info/personal_info", this.reg_type, this.user_id], {
                    //      animated: false
                    // });
                    appSettingsModule.setString("verify-unauthenticate", "goto-auth");
                    this._routerExtensions.navigate(["/login"], {
                        animated: false
                    });
                     this.isBusy = false;
                },
                    error => {
                        console.dir(error);
                    });
            } else if (this.placeholder === "maybelater") {
                appSettingsModule.setString("firstName", "");
                appSettingsModule.setString("lastName", "");
                appSettingsModule.setString("dob", "");
                appSettingsModule.setString("emailAddress", "");
                appSettingsModule.setString("mobileNum", "");
                this._globals.isUnauthenticated = true;
                this._globals.isanonymous = false;
                this._globals.isLoggedIn = false;
                this._globals.changeRegister();
                this._registrationservice.verifyUser(this.user).subscribe((data) => {
                    //    this._routerExtensions.navigate(["/home/signedHome"], {
                    //          animated: false
                    //     });
                    appSettingsModule.setString("verify-unauthenticate", "un-auth");
                    this._routerExtensions.navigate(["/login"], {
                        animated: false
                    });
                     this.isBusy = false;
                },
                    error => {
                        console.dir(error);
                    });
            } 
            else if (this.placeholder === "cancel-auth") {
                
                this._registrationservice.verifyUser(this.user).subscribe((data) => {
                    //    this._routerExtensions.navigate(["/home/signedHome"], {
                    //          animated: false
                    //     });
                    appSettingsModule.setString("verify-unauthenticate", "cancel-auth");
                    this._routerExtensions.navigate(["/login"], {
                        animated: false
                    });
                     this.isBusy = false;
                },
                    error => {
                        console.dir(error);
                    });
            } 
            

            else if (this.placeholder === "signInVerify") {
                appSettingsModule.setString("firstName", "");
                appSettingsModule.setString("lastName", "");
                appSettingsModule.setString("dob", "");
                appSettingsModule.setString("emailAddress", "");
                appSettingsModule.setString("mobileNum", "");
                this._globals.isUnauthenticated = true;
                this._globals.isanonymous = false;
                this._globals.isLoggedIn = false;
                this._globals.changeRegister();
                this._registrationservice.verifyUser(this.user).subscribe((data) => {
                    appSettingsModule.setString("verify-unauthenticate", "registered-un-auth");
                    this._globals.user_state="RV";
                     this._routerExtensions.navigate(["/login"], {
                        animated: false
                    });
                     this.isBusy = false;
                },
                    error => {
                        console.dir(error);
                    });


            }
        }
    }
    public goBack() {
        this._routerExtensions.back();
    }
    public changeFocus(input, id) {
        if (input.length === 1) {
            let nextTextField = <TextView>this.txtfield2.nativeElement;
            if (id === "2") {
                nextTextField = <TextView>this.txtfield2.nativeElement;
            }
            else if (id === "3") {
                nextTextField = <TextView>this.txtfield3.nativeElement;
            }
            else if (id === "4") {
                nextTextField = <TextView>this.txtfield4.nativeElement;
            }
            else if (id === "5") {
                nextTextField = <TextView>this.txtfield5.nativeElement;
            }
            else if (id === "6") {
                nextTextField = <TextView>this.txtfield6.nativeElement;
            }
            else if (id === "") {
                nextTextField = <TextView>this.txtfield6.nativeElement;
                this.verifyUser();
            }
            nextTextField.focus();
        }
    }
    happyNavigate() {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
    }
}