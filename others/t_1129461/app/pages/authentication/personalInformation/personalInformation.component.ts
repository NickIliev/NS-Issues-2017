import { Component, OnInit, ViewChild, ElementRef,AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { AuthenticationService } from "../authentication.service";
import { Globals } from "../../../shared/global";
import * as appSettingsModule from "application-settings";
import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { PersonalInfo } from "../authentication.model";

// import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";


@Component({
    moduleId: module.id,
    templateUrl: "./personalInformation.component.html",
    styleUrls: ["../authentication.css"]
})
export class PersonalInformationComponent implements OnInit, AfterViewInit {
    title: string = "Authentication";
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
    public isMobileFilled: Boolean = true;
    public isDOBFilled: Boolean = true;
    public isAgeValid: Boolean = true;
    public otherType: string;
    public firstName: string;
    public lastName: string;
    public dob: string;
    public mobileNum: string;
    public emailAddress: string;
    public udate;
    public unumber;
    public currentDate;
    public currentNumber;
    public mbNumber;
    public oldDOB:string;
    public hintText:string;
    pinfo = new PersonalInfo();
    
    @ViewChild("firstNameField") firstNameField: ElementRef;
    @ViewChild("lastNameField") lastNameField: ElementRef;
    @ViewChild("DOBTextField") DOBTextField: ElementRef;
    @ViewChild("moField") moField: ElementRef;
    @ViewChild("emailField") emailField: ElementRef;
    
    

  //  @ViewChild("dob") dob1: ElementRef;

    public constructor(private route: ActivatedRoute,
        public _globals: Globals,
        public auth_service: AuthenticationService,
        private _formValidationService: FormValidationService,
        private router: Router,
        private fb: FormBuilder,
        private page: Page,
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
        this.hintText="MM/DD/YYYY";
        this.currentDate = "";
        this.currentNumber="";
        this._globals.user_state = "RNV";
        this._globals.is_auth_cancelled=false;
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
           
       
    }
     ngAfterViewInit() {
          setTimeout(() => {
              this._globals.hideLoader();
        }, 1000);  
     }
    public onContinue(firstName, lastName, emailAddress,dob,mobileNum) {         
      //on click of continue
        this.isValidEmail = this._formValidationService.emailMatchValidator(emailAddress);
        this.isValidMobileNo = this._formValidationService.mobileNumberValidator(mobileNum);
        this.isFirstNameFilled = this._formValidationService.fieldFilledValidator(firstName);
        this.isLastNameFilled = this._formValidationService.fieldFilledValidator(lastName);
        this.isFirstNameValid = this._formValidationService.onlyAlphabetsValidator(firstName);
        this.isLastNameValid = this._formValidationService.onlyAlphabetsValidator(lastName);
        this.isAgeValid = this.isDOBValid && this._formValidationService.minimumAgeValidator(dob) &&  this.isDOBFilled;
        this.isDOBFilled = this._formValidationService.fieldFilledValidator(dob);
        this.isDOBValid = this._formValidationService.dateValidator(dob);       
        this.isEmailFilled = this._formValidationService.fieldFilledValidator(emailAddress);
        this.isMobileFilled = this._formValidationService.mobileNumberFilledValidator( mobileNum);
        this._globals.user_fname = this.firstName;
        this._globals.user_lname = this.lastName;
        this._globals.user_dob = this.dob;
        this.pinfo.fname=this.firstName;
        this.pinfo.lname=this.lastName;
        this.pinfo.dob=this.dob;

        if (this.register_type === "mobile") {
            if (this.isValidEmail && this.isEmailFilled &&this.isAgeValid && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
            this._globals.showLoader();
               this.pinfo.email=this.emailAddress;
               this.pinfo.mobile=this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                     animated: false
                });
            
            }
        } else if (this.register_type === "email") {
            if (this.isValidMobileNo && this.isMobileFilled &&this.isAgeValid && this.isFirstNameValid && this.isLastNameValid && this.isDOBValid && this.isFirstNameFilled && this.isLastNameFilled && this.isDOBFilled) {
              this._globals.showLoader();
               this.pinfo.mobile=this.mobileNum;
               this.pinfo.email=this.reg_id;
                this._routerExtensions.navigate(["/personal_info/member_info"], {
                     animated: false
                });
               
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
    //on click of cancel
    public oncancelFn() {    
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        if(this._globals.user_state==="RNV"){
             this._globals.showLoader();
           this._routerExtensions.navigate(["/create/verification", this._globals.registration_mode, "maybelater"], {
             animated: false
        });
        }
        else if(this._globals.user_state==="RV"){
             this._globals.showLoader();
             this._routerExtensions.navigate(["/home/signedHome"], {
             animated: false
        });
        }      
    }
    // For dynamic validation 
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
   
    
    goToLastNameField() {
        this.lastNameField.nativeElement.focus();
    }
    goToDOBField() {
        this.DOBTextField.nativeElement.focus();
    }
    goToMoEmail() {
        if (this.register_type === "mobile") {
            this.emailField.nativeElement.focus();
        }
        else if (this.register_type === "email") {
            this.moField.nativeElement.focus();
        }
    }
    // To Autoformat the date of birth
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