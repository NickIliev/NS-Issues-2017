import { Component, OnInit, ViewChild, ElementRef, } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { PersonalInfo } from "../../authentication/authentication.model";
// import { AuthenticatePromoComponent } from "../../registration/authenticatePromo/authenticatePromo.component";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ViewContainerRef } from "@angular/core";
import observableModule = require("data/observable");
import { Article } from "../../home/home.model";
import { RestrictedAccessComponent } from "../../../shared/restrictedAccess/restrictedAccess.component";
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();

// import {HomeService} from "../../home/home.service";
@Component({
    moduleId: module.id,
    templateUrl: "./registrationhome.component.html",
    styleUrls: ["./registrationhome.css","../../home/home.css"]
})
export class RegistrationHomeComponent implements OnInit {
    title: string = "Authentication";    
    healthyAricles: Article[] = [{
    "title": "Healthy Living",
    "subtitle": "Tannings allure",
    "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
    "category": "living",
    "imageURL": "~/images/redesign/article_healthyLiving.png",
    "titleImageURL": "~/images/redesign/healthy_living.png",
    "rowNum": 0
  },
  {
    "title": "Fitness",
    "subtitle": "Exercise program",
    "description": "It is a long established fact that a reader will be distracted by the readable content of a page.",
    "category": "living",
    "imageURL": "~/images/redesign/article_fitness.png",
    "titleImageURL": "~/images/redesign/fitness.png",
    "rowNum": 1
  }
  ];
    @ViewChild("firstNameField") firstNameField: ElementRef;
    @ViewChild("lastNameField") lastNameField: ElementRef;
    @ViewChild("congratsGrid") congratsGrid: ElementRef;
     @ViewChild("congratsShadow") congratsShadow: ElementRef;
    @ViewChild("DOBTextField") DOBTextField: ElementRef;
    @ViewChild("moTextField") moTextField: ElementRef;
    @ViewChild("emailTextField") emailTextField: ElementRef;
    
    public udate;
    public unumber;
    public currentDate;
    public currentNumber;
    public mbNumber;
    public hintText:string;
    public personForm: FormGroup;
    public reg_id: string;
    public register_type: string;
    public isValidEmail: Boolean = true;
    public isEmailFilled: Boolean = true;
    public isValidMobileNo: Boolean = true;
    public isFirstNameValid: Boolean = true;
    public isFirstNameFilled: Boolean = true;
    public isLastNameFilled: Boolean = true;
    public isLastNameValid: Boolean = true;
    public isDOBValid: Boolean = true;
    public isAgeValid: Boolean = true;
    public isMobileFilled: Boolean = true;
    public isDOBFilled: Boolean = true;
    public otherType: string;
    public firstName: string;
    public lastName: string;
    public dob: string;
    public mobileNum: string;
    public emailAddress: string;
    public oldDOB:string;
    public isAuthDismissed:Boolean;
    personalInfo = new PersonalInfo();
   
    public constructor(private route: ActivatedRoute,
        public _globals: Globals,
        public auth_service: AuthenticationService,
        private _formValidationService: FormValidationService,
        private router: Router,
        private fb: FormBuilder,
        private page: Page,
        private authPromoModal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private _routerExtensions: RouterExtensions) {
        this.personForm = fb.group({
           "firstName": ["", [Validators.required, ]],
            "lastName": ["", [Validators.required]],
            "emailAddress": ["", [Validators.required]],
            "mobileNum": ["", [Validators.required]],
            "dob": ["", [Validators.required]],
        });  


    }


    ngOnInit() {  
        this.isAuthDismissed=this._globals.isAuthCancelled;    
        this.hintText="MM/DD/YYYY";       
        this.currentDate = "";
        this.currentNumber = "";
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0}";
        }
        this.route.params.subscribe((params) => {
            this.register_type = params["type"];
            this.reg_id = params["id"];
        });
        this.auth_service.user_registration_type = this.register_type;
        this.auth_service.user_name = this.reg_id;
        if (this.register_type === "mobile") {
            this.otherType = "email";
        }
        else if (this.register_type === "email") {
            this.otherType = "mobile";
        }
        loader.hide(); // jai workaround for demo 6.0 
        // setTimeout(() => {
        //     let firstNameField = <TextField>this.firstNameField.nativeElement;
        //     firstNameField.focus();
        // }, 1000);

    }
    public onContinue(firstName, lastName, mobileNum, emailAddress,dob) {
        // let num1 = this.currentNumber.substring(1, 4);
        // let num2 = this.currentNumber.substring(5, 8);
        // let num3 = this.currentNumber.substring(9, 13);
        // this.mbNumber = num1 + num2 + num3;
        this.isValidEmail = this._formValidationService.emailMatchValidator(emailAddress);
        this.isValidMobileNo = this._formValidationService.mobileNumberValidator(mobileNum);
        this.isFirstNameFilled = this._formValidationService.fieldFilledValidator(firstName);
        this.isLastNameFilled = this._formValidationService.fieldFilledValidator(lastName);
        this.isFirstNameValid = this._formValidationService.onlyAlphabetsValidator(firstName);
        this.isLastNameValid = this._formValidationService.onlyAlphabetsValidator(lastName);
        this.isAgeValid = this.isDOBValid && this._formValidationService.minimumAgeValidator(dob) && this.isDOBFilled;
        this.isDOBFilled = this._formValidationService.fieldFilledValidator(dob);
        this.isDOBValid = this._formValidationService.dateValidator(dob);

        this.isEmailFilled = this._formValidationService.fieldFilledValidator(emailAddress);
        this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(mobileNum);
        this._globals.user_fname = this.firstName;
        this._globals.user_lname = this.lastName;
        this._globals.user_dob = this.dob;
        this.personalInfo.fname = this.firstName;
        this.personalInfo.lname = this.lastName;
        this.personalInfo.dob = this.dob;

        if (this.register_type === "mobile") {

            if (this.isValidEmail && this.isAgeValid && this.isEmailFilled && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
              loader.show();
                this.personalInfo.email = this.emailAddress;
                this.personalInfo.mobile = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
               loader.hide();
            }
        } else if (this.register_type === "email") {
            if (this.isValidMobileNo && this.isAgeValid && this.isMobileFilled && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
               loader.show();
                this.personalInfo.mobile = this.currentNumber;
                this.personalInfo.email = this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                    animated: false
                });
                loader.hide();
            }
        }

    }
    public goBackFn() {
        // this.routerExtensions.back();
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        this._routerExtensions.navigate(["/home/signedHome"], {
            animated: false
        });
    }

    public onAuthenticateGridClose() {
       this._globals.isAuthCancelled=true;
       this.isAuthDismissed=this._globals.isAuthCancelled;
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        // this._globals.promoState = "fromRegistration";
        // this._routerExtensions.navigate(["/create/verification", this.register_type, "cancel-auth"], {
        //      animated: false
        // });
        // this.authPromoModal.showModal(AuthenticatePromoComponent, options).then((res) => {
        //     if (res === "fromreg") {
        //         if (this._globals.user_state === "RNV") {
        //             this._routerExtensions.navigate(["/create/verification", this.register_type, "signInVerify"], {
        //                 animated: false
        //             });
        //         }
        //         else if (this._globals.user_state === "RV") {
        //             this._routerExtensions.navigate(["/home/signedHome"], {
        //                 animated: false
        //             });
        //         }
        //     }
        // });
    }
    showRestrictedAccessPopup() {
    let options = {
      context: {},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.authPromoModal.showModal(RestrictedAccessComponent, options).then((res) => {

    });
  }
    public validCheck(arg, type) {
        if (arg !== undefined && arg !== "") {
            switch (type) {
                case "firstName":
                    this.isFirstNameFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isFirstNameValid = this._formValidationService.onlyAlphabetsValidator(arg);
                    break;
                case "lastName":
                    this.isLastNameFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isLastNameValid = this._formValidationService.onlyAlphabetsValidator(arg);
                    break;
                case "emailAddress":
                    this.isEmailFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isValidEmail = this._formValidationService.emailMatchValidator(arg);
                    break;
                case "dob":
                    this.isDOBFilled = this._formValidationService.fieldFilledValidator(arg);
                    this.isDOBValid = this._formValidationService.dateValidator(arg);
                    this.isAgeValid = this.isDOBValid && this._formValidationService.minimumAgeValidator(arg) &&  this.isDOBFilled;
                    break; 
                case "mobileNum":
                    this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(arg);
                    this.isValidMobileNo = this._formValidationService.mobileNumberValidator(arg);
                    break;
            }
        }
    }
    public setUpdatedDateValue(value) {
        this.udate = value;
        this.currentDate = this.udate;
        if (this.currentDate !== "") {
            if (this.currentDate.length === 10) {
                this.isDOBFilled = this._formValidationService.fieldFilledValidator(this.currentDate);
                this.isDOBValid = this._formValidationService.dateValidator(this.currentDate);
                this.isAgeValid = this.isDOBValid && this.isDOBFilled && this._formValidationService.minimumAgeValidator(this.currentDate);
            }
        }
    }
    public setUpdatedNumberValue(value) {
        this.unumber = value;
        this.currentNumber = this.unumber;
        if (this.currentNumber !== "") {
            if (this.currentNumber.length === 13) {
                let num1 = this.currentNumber.substring(1, 4);
                let num2 = this.currentNumber.substring(5, 8);
                let num3 = this.currentNumber.substring(9, 13);
                this.mbNumber = num1 + num2 + num3;
                this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator(this.mbNumber);
                this.isValidMobileNo = this._formValidationService.mobileNumberValidator(this.mbNumber);
            }
        }
    }

    public closeCongratsGrid() {
        this.congratsGrid.nativeElement.visibility = "collapse";
        this.congratsShadow.nativeElement.visibility = "collapse";
        
    }
    goToLastName() {
        this.lastNameField.nativeElement.focus();
    }
    goToDOB() {
        this.DOBTextField.nativeElement.focus();
    }
    goToMoEmail() {
        if (this.register_type === "mobile") {
            this.emailTextField.nativeElement.focus();
        } else if (this.register_type === "email") {
            this.moTextField.nativeElement.focus();
        }
    }
    
  articleDetail() {
    this._routerExtensions.navigate(["/home/articleDetail"], {
      animated: false
    });
  }
  contactUs() {
    // this._routerExtensions.navigate(["/contactUs"], {
    //   animated: false
    // });
    this.showRestrictedAccessPopup();
  }
  searchNow(){
      this.showRestrictedAccessPopup();
  }
   public autoFormat(dob){    
       let isErasing:boolean = false;
       if(this.oldDOB== undefined || this.oldDOB=="")
       {
           this.oldDOB = dob;
       }
      else{
         if(this.oldDOB.length>dob.length)
           {               
                isErasing = true;
                this.oldDOB = dob;               
           }
      } 
 
      if(! isErasing ){
         if(dob!==undefined && dob!==""){
        if(dob.length==3){
        // this.dob=this.dob+'/';
        if(dob.charAt(dob.length-1)!="/"){
             this.dob=dob.slice(0, dob.length-1) + "/" + dob.slice(dob.length-1);
         let nextTextField:TextField = <TextField> this.DOBTextField.nativeElement; 
        nextTextField.text = this.dob;       
        setTimeout (() => {
      nextTextField.android.setSelection(dob.length+1);
    }, 100)
        }       
    }    
    else if(dob.length==6){
        // this.dob=this.dob+'/';
        if(dob.charAt(dob.length-1)!="/"){
             this.dob=dob.slice(0, dob.length-1) + "/" + dob.slice(dob.length-1);
             let nextTextField:TextField = <TextField> this.DOBTextField.nativeElement; 
        nextTextField.text = this.dob;       
        setTimeout (() => {
      nextTextField.android.setSelection(dob.length+1);
    }, 100)
        }        
 }
 else if(dob.length==10){
     this.oldDOB=this.dob;
      }
   }
      }
    
    }
  
}