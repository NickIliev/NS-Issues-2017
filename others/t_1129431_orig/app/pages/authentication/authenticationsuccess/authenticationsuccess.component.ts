import { Component, OnInit ,AfterViewInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { Validators, AbstractControl } from "@angular/forms";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { AuthenticationService } from "../authentication.service";
import { Globals } from "../../../shared/global";

import * as appSettingsModule from "application-settings";
import * as appSettings from "application-settings";
import * as app from "tns-core-modules/application";
import { Page } from "ui/page";


@Component({
  moduleId: module.id,
  templateUrl: "./authenticationsuccess.component.html",
  styleUrls: ["../authentication.css"],

})
export class AuthenticationSuccessComponent implements OnInit, AfterViewInit {
  title: string = "Authentication";
  public signInType: string;
  public signInTypeValue: string;
  public isUserNameEmpty: Boolean = false;
  public isUserNameInvalid: Boolean = false;
  public isPasswordEmpty: Boolean = false;
  public isPasswordInvalid: Boolean = false;
  public username: string;
  public password: string;
 

  public constructor( private formValidationService: FormValidationService, private page: Page, private _routerExtensions: RouterExtensions, private authService: AuthenticationService, private _globals: Globals, private _router: Router) {
  }
  ngOnInit() {
    if (app.ios) {
      this.page.css = "Page {background-image : none; margin-top: 0} ";
    }
    this.signInType = this.transform(this.authService.user_registration_type);
    this.signInTypeValue = this.transform(this.authService.user_name);
  }
  ngAfterViewInit() {      
       setTimeout(() => {
              this._globals.hideLoader();
        }, 1000);  

  }
  // Capitalize the first letter of the string
  public transform(value: any) {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
  // Validating all fields
  public validateUserInfo(): Boolean {
    let isError: Boolean = false;

    this.isUserNameEmpty = !this.formValidationService.fieldFilledValidator(this.username);
    this.isUserNameInvalid = !this.formValidationService.usernameValidator(this.username);
    this.isPasswordEmpty = !this.formValidationService.fieldFilledValidator(this.password);
    this.isPasswordInvalid = !this.formValidationService.passwordPatternValidator(this.password);
    if (this.isUserNameEmpty || this.isUserNameInvalid || this.isPasswordEmpty || this.isPasswordInvalid) {
      isError = true;
    }
    return isError;
  }
 public continueMyBlue(){
   this._globals.showLoader();
   this._routerExtensions.navigate(["/login"], {
                       animated: false
                    });
  
  }
  public continueToMyBluePage() {
    this._globals.showLoader();
    appSettingsModule.setString("firstName", "");
    appSettingsModule.setString("lastName", "");
    appSettingsModule.setString("dob", "");
    appSettingsModule.setString("emailAddress", "");
    appSettingsModule.setString("mobileNum", "");
    // Forward to my blue main page
    this._globals.isLoggedIn = true;
    this._globals.isUnauthenticated = false;
    this._globals.isanonymous = false;
    this._globals.isAuthenticationSuccess = true;
    this._globals.changeLogin();
    appSettings.setBoolean("isAuthenticated", true);
    appSettings.setNumber("isFirstTimeOpened", 1);
    this._globals.user_updatedusername = "";
    this._globals.user_updatedpassword = "";
    this._globals.authState="fully-authenticated";
    // appSettingsModule.setString("verify-unauthenticate", "fully-authenticated");
    this._globals.user_state="ANV";
    this._routerExtensions.navigate(["/login"], {
                        animated: false
                    });
     
    // this._routerExtensions.navigate(["/home/signedHome"], {
    //     animated: false
    //   });

  }

  public updateUserInformation() {
    if (!this.validateUserInfo()) {
      //  Call the backend API Service after the UI fields validation
      this._globals.user_updatedusername = this.username;
      this._globals.user_updatedpassword = this.password;
      this.close();

    }
  }

  // To close the modal-window
  public close() {
    this.continueToMyBluePage();
    

  }
}
