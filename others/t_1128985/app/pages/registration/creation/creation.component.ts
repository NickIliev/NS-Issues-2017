import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { CheckBox } from "nativescript-checkbox";
import { registerElement } from "nativescript-angular/element-registry";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { RouterExtensions } from "nativescript-angular/router";
import { WebView, LoadEventData } from "ui/web-view";
import { Button } from "ui/button";
import { TextField } from "ui/text-field";
import { RegistrationService } from "../registration.service";
import { CreateUser } from "../registration.model";
import { AuthenticatePromoComponent } from "../authenticatePromo/authenticatePromo.component";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import {LoadingIndicator} from "nativescript-loading-indicator";
import { Globals } from "../../../shared/global";
import * as appSettingsModule from "application-settings";
import { Switch } from "ui/switch";
import * as connectivity from "connectivity";
import * as app from "tns-core-modules/application";
var loader = new LoadingIndicator();
@Component({
  selector: "mb-create",
  moduleId: module.id,
  templateUrl: "./creation.component.html",
  styleUrls: ["../registration.css"],
  providers: [FormValidationService]
})

export class CreationComponent implements OnInit, AfterViewInit {
 
  @ViewChild("activityIndicator") ac: ElementRef;
 

  title: string = "Register";
  @ViewChild("CB1") acceptTermsMobileCheckBox: ElementRef;
  @ViewChild("CB2") marketingMobileCheckBox: ElementRef;
  @ViewChild("CB4") marketingEmailCheckBox: ElementRef;
  @ViewChild("CB3") acceptTermsEmailCheckBox: ElementRef;
  @ViewChild("mobNo") mobNo: ElementRef;
  @ViewChild("mobPwd") mobPwd: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("emailPwd") emailPwd: ElementRef;

  public highlightedDiv: string;
  public isMobileForm: Boolean;
  public mobileForm: FormGroup;
  public emailForm: FormGroup;
  public mobileCheckboxesChecked: Boolean;
  public emailCheckboxesChecked: Boolean;
  public mobileContinueClicked: Boolean;
  public emailContinueClicked: Boolean;
  public isValidEmail: Boolean;
  public isEmailFilled: Boolean;
  public isEmailPasswordValid: Boolean;
  public isEmailPasswordFilled: Boolean;
  public isValidMobileNumber: Boolean;
  public isMobileNumberFilled: Boolean;
  public isMobilePasswordValid: Boolean;
  public isMobilePasswordFilled: Boolean;
  public registerType: string;
  public mobileUserValid: Boolean;
  public emailUserValid: Boolean;
  mobileNo: string;
  mobilePassword: string;
  emailId: string;
  emailPswd: string;
  
  user = new CreateUser();
  public mobilecheckBoxAcceptTerms: boolean = false;
  public emailcheckBoxAcceptTerms: boolean = false;
  public isEmailPwdSecure: Boolean = true;
  public isMobilePwdSecure: Boolean = true;
  public showOrHideMobilePwdLabel: String = "Show";
  public showOrHideEmailPwdLabel: String = "Show";
    pageStartTime : number = 0;
  pageEndTime : number = 0;
  pageTimeDifference : number = 0;

  public constructor(private router: Router, public _globals: Globals, private authPromoModal: ModalDialogService, private vcRef: ViewContainerRef, private fb: FormBuilder, private routerExtensions: RouterExtensions, private _formValidationService: FormValidationService, private _registrationservice: RegistrationService) {
    this.mobileCheckboxesChecked = true;
    this.emailCheckboxesChecked = true;
    this.mobileContinueClicked = false;
    this.emailContinueClicked = false;
    this.isValidEmail = true;
    this.isEmailFilled = true;
    this.isEmailPasswordValid = true;
    this.isEmailPasswordFilled = true;
    this.isValidMobileNumber = true;
    this.isMobileNumberFilled = true;
    this.isMobilePasswordValid = true;
    this.isMobilePasswordFilled = true;
    this.mobileUserValid = false;
    this.emailUserValid = false;
    if (this._globals.isTurnOff) {
      this.highlightedDiv = "fromemail";
      this.isMobileForm = false;
      this.registerType = "email";
    }
    else {
      this.highlightedDiv = "fromemail";
      this.isMobileForm = false;
      this.registerType = "email";
    }
    this.mobileForm = fb.group({
      "mobileNo": ["", [Validators.required,]],
      "mobilePassword": ["", [Validators.required]],
    });
    this.emailForm = fb.group({
      "emailId": ["", [Validators.required,]],
      "emailPswd": ["", [Validators.required,]],
    });

  }
  ngOnInit() {
      this.pageStartTime = new Date().getTime();
    
  }

  public togglemobilecheckBoxAcceptTerms() {
    //  this.mobilecheckBoxAcceptTerms = ! this.mobilecheckBoxAcceptTerms;
    this.acceptTermsMobileCheckBox.nativeElement.checked = !this.acceptTermsMobileCheckBox.nativeElement.checked;
  }

   ngAfterViewInit() {
 

      this.pageEndTime = new Date().getTime();

    this.pageTimeDifference = this.pageEndTime - this.pageStartTime;

  }

  public toggleemailcheckBoxAcceptTerms() {
    // this.emailcheckBoxAcceptTerms = !this.emailcheckBoxAcceptTerms;
    this.acceptTermsEmailCheckBox.nativeElement.checked = !this.acceptTermsEmailCheckBox.nativeElement.checked;
  }
  // To clear all the fields
  public clearFields() {
    this.mobileNo = "";
    this.mobilePassword = "";
    this.mobileNo = "";
    this.emailId = "";
    this.emailPswd = "";
    this.mobilecheckBoxAcceptTerms = false;
    this.emailcheckBoxAcceptTerms = false;
    this.mobileCheckboxesChecked = true;
    this.emailCheckboxesChecked = true;
    this.mobileContinueClicked = false;
    this.emailContinueClicked = false;
    this.isValidEmail = true;
    this.isEmailFilled = true;
    this.isEmailPasswordValid = true;
    this.isEmailPasswordFilled = true;
    this.isValidMobileNumber = true;
    this.isMobileNumberFilled = true;
    this.isMobilePasswordValid = true;
    this.isMobilePasswordFilled = true;
    this.mobileUserValid = false;
    this.emailUserValid = false;
  }

  // On click of continue button
  public createUser(type, id, pwd) {
    appSettingsModule.setString("verify-unauthenticate", "registered-un-auth");
    let connectionType = connectivity.getConnectionType();
    switch (connectionType) {
      case connectivity.connectionType.none:
        this._globals.showToastMessage("No internet available, please connect!!", "longer");
        return;
      default:
        break;
    }

    this.dismissKeyBoard();

    appSettingsModule.setString("firstName", "");
    appSettingsModule.setString("lastName", "");
    appSettingsModule.setString("dob", "");
    appSettingsModule.setString("emailAddress", "");
    appSettingsModule.setString("mobileNum", "");

    if (type === "mobileNo") {
      this.mobileContinueClicked = true;
      this.isMobileNumberFilled = this._formValidationService.fieldFilledValidator(id);
      this.isValidMobileNumber = this._formValidationService.mobileNumberValidator(id);
      this.isMobilePasswordValid = this._formValidationService.passwordPatternValidator(pwd);
      this.isMobilePasswordFilled = this._formValidationService.fieldFilledValidator(pwd);
      this.mobileCheckboxesChecked = this.acceptTermsMobileCheckBox.nativeElement.checked;
      if (this.isMobileNumberFilled && this.isValidMobileNumber && this.isMobilePasswordValid && this.isMobilePasswordFilled && this.mobileCheckboxesChecked) {
        this.mobileUserValid = true;
      }
      else
        this.mobileUserValid = false;
    }
    else if (type === "emailId") {
      this.emailContinueClicked = true;
      this.isEmailFilled = this._formValidationService.fieldFilledValidator(id);
      this.isValidEmail = this._formValidationService.emailMatchValidator(id);
      this.isEmailPasswordValid = this._formValidationService.passwordPatternValidator(pwd);
      this.isEmailPasswordFilled = this._formValidationService.fieldFilledValidator(pwd);
      this.emailCheckboxesChecked = this.acceptTermsEmailCheckBox.nativeElement.checked;
      if (this.isEmailFilled && this.isValidEmail && this.isEmailPasswordValid && this.isEmailPasswordFilled && this.emailCheckboxesChecked)
        this.emailUserValid = true;
      else
        this.emailUserValid = false;
    }
    // To check if the form is valid and then continue
    if (this.mobileUserValid || this.emailUserValid) {
      
      loader.show();
      console.log("registerType--" + CreateUser);
      if (this.registerType === "mobile") {
        this.user.regtype = "MOBILE";
      }
      else if (this.registerType === "email") {
        this.user.regtype = "EMAIL";
      }
      // this.user.regtype = this.registerType;
      this._globals.registration_mode = this.registerType;
      this._registrationservice.registration_type = this.registerType;

      let options = {
        context: {},
        fullscreen: true,
        viewContainerRef: this.vcRef
      };
      if (this.mobileUserValid) {
        this.user.userid = this.mobileNo;
        this._globals.user_identity = this.mobileNo;
        this._globals.user_reg_password = this.mobilePassword;
      }
      else if (this.emailUserValid) {
        this.user.userid = this.emailId;
        this._globals.user_identity = this.emailId;
        this._globals.user_reg_password = this.emailPswd;
      }
       this._globals.user_state = "RNV";
          this._globals.isLoggedIn = false;
      this._globals.isUnauthenticated = true;
      this._globals.isAuthCancelled=false;
      this.routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.user.userid], {
        animated: false
      });
      loader.hide();

      // this._registrationservice.createUser(this.user)
      //   .subscribe((data) => {
      //     console.log("success---");
      //     this._globals.user_state = "RNV";
      //     this._globals.isLoggedIn = false;
      // this._globals.isUnauthenticated = true;
      // this._globals.isAuthCancelled=false;
      // this.routerExtensions.navigate(["/personal_info/reg_home", this._globals.registration_mode, this.user.userid], {
      //   animated: false
      // });
      // loader.hide();
         
      //   },
      //   error => {
      //     console.log("errorlll---");
      //     console.dir(error);
      //   });
      this._registrationservice.user_name = this.user.userid;
      this._globals.user_identity = this.user.userid;
      console.dir(this.user);
    }
  }
  // To switch from mobile form to email form
  public switchView(arg) {
    this.clearFields();
    if (!this._globals.isTurnOff) {
      if (arg === "frommobile") {
        this.registerType = "mobile";
        this.isMobileForm = true;
        this.highlightedDiv = arg;
      }
      else if (arg === "fromemail") {
        this.registerType = "email";
        this.isMobileForm = false;
        this.highlightedDiv = arg;
      }
    }
  }

  public login(){
     this.routerExtensions.navigate(["/login"], {
            animated: false
          });
  }
  // back button
  public goBack() {
    this.routerExtensions.back();
  }

  public dismissKeyBoard() {
    let mobNo = <TextField>this.mobNo.nativeElement;
    mobNo.dismissSoftInput();

    let mobPwd = <TextField>this.mobPwd.nativeElement;
    mobPwd.dismissSoftInput();

    let email = <TextField>this.email.nativeElement;
    mobNo.dismissSoftInput();

    let emailPwd = <TextField>this.emailPwd.nativeElement;
    emailPwd.dismissSoftInput();
  }
  public validCheck(arg, type) {
    if (arg !== undefined && arg !== "") {
      switch (type) {
        case "mobile":
          this.isMobileNumberFilled = this._formValidationService.fieldFilledValidator(arg);
          this.isValidMobileNumber = this._formValidationService.mobileNumberValidator(arg);
          break;
        case "mpassword":
          this.isMobilePasswordValid = this._formValidationService.passwordPatternValidator(arg);
          this.isMobilePasswordFilled = this._formValidationService.fieldFilledValidator(arg);
          break;
        case "emailId":
          this.isEmailFilled = this._formValidationService.fieldFilledValidator(arg);
          this.isValidEmail = this._formValidationService.emailMatchValidator(arg);
          break;
        case "epassword":
          this.isEmailPasswordValid = this._formValidationService.passwordPatternValidator(arg);
          this.isEmailPasswordFilled = this._formValidationService.fieldFilledValidator(arg);
          break;
      }
    }

  }



  showOrHideEmailPassword() {
    this.isEmailPwdSecure = !this.isEmailPwdSecure;
    if (this.isEmailPwdSecure) {
      this.showOrHideEmailPwdLabel = "Show";
    } else {
      this.showOrHideEmailPwdLabel = "Hide";
    }
    if (app.android) {
      this.retainCursorPosForEmailPwdField();
    }
  }

  showOrHideMobilePassword() {
    this.isMobilePwdSecure = !this.isMobilePwdSecure;
    if (this.isMobilePwdSecure) {
      this.showOrHideMobilePwdLabel = "Show";
    } else {
      this.showOrHideMobilePwdLabel = "Hide";
    }
    if (app.android) {
      this.retainCursorPosForMobilePwdField();
    }
  }

  public retainCursorPosForMobilePwdField() {
    setTimeout(() => {
      android.text.Selection.setSelection(
        this.mobPwd.nativeElement.android.getText(),
        this.mobPwd.nativeElement.android.length()
      );
    }, 0);
  }

  public retainCursorPosForEmailPwdField() {
    setTimeout(() => {
      android.text.Selection.setSelection(
        this.emailPwd.nativeElement.android.getText(),
        this.emailPwd.nativeElement.android.length()
      );
    }, 0);
  }
  goToMobPwd() {
    this.mobPwd.nativeElement.focus();
  }
  goToEmailPwd() {
    this.emailPwd.nativeElement.focus();
  }

}
