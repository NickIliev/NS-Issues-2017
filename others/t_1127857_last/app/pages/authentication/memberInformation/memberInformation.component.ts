import { Component, OnInit ,ViewChild, ElementRef,} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Button } from "ui/button";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { RegistrationService } from "../../registration/registration.service";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { AuthenticationService } from "../authentication.service";
import { FormValidationService } from "../../../shared/services/formValidation.service";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";
import { TextField } from "ui/text-field";
import { MemberInfo } from "../authentication.model";
// registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
@Component({
    moduleId: module.id,
    templateUrl: "./memberInformation.component.html",
    styleUrls: ["../authentication.css"]
})
export class MemberInformationComponent implements OnInit {
    title: string = "Authentication";
    public idtypes: Array<any>;
    public selectedIndex: Number;
    public ddindex: Number;
    public showMemidTextField: Boolean;
    public showDebitnoTextField: Boolean;
    public showStudentidTextField: Boolean;
    public isErrorOccured: Boolean = false;
    public currentType: string;
    public otherType: string;
    public isMemIdValid: Boolean = true;
    public isDebitNumberValid: Boolean = true;
    public isStudentIdValid: Boolean = true;
    public memid: string="";
    public suffix:string="";
    public debitcardno: string;
    public studentid: string;
    public idType: string;
    public isMemIdFilled: Boolean = true;
    public isDebitNumberFilled: Boolean = true;
    public isStudentIdFilled: Boolean = true;
    public isBusy = false;
    public helpInfoHtml: string = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\" /><style> body{background-color: #efefef;font-family: Arial;}</style></head><body><p><span style=\"padding: 70;color:#000000;font-weight:bold;\">What is Member Information?</span></br>Nullam mollis, lectus at eleifend tincidunt, purus tortor aliquet felis, sit amet interdum velit ligula nec erat leifend tincidunt, purus tortor aliquet felis.</p>";
    public isHelpInfoVisible: Boolean = false;
    minfo=new MemberInfo();
    @ViewChild("txtfld1") txtfld1: ElementRef;
    @ViewChild("txtfld2") txtfld2: ElementRef;
    public constructor(private router: Router,
        private page: Page,
        public _globals: Globals,
        private _formValidationService: FormValidationService,
        public auth_service: AuthenticationService,
        private fb: FormBuilder,
        private _routerExtensions: RouterExtensions) {
        if (this._globals.isTurnOff) {
            this.showMemidTextField = true;
        }
        else {
            this.showMemidTextField = false;
        }
        this.showDebitnoTextField = false;
        this.showStudentidTextField = false;
    }
    ngOnInit() {
        this._globals.user_state = "RNV";
         this._globals.is_auth_cancelled=false;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        let iosSpecific = "ChooseOne";
        if (this._globals.isTurnOff) {
            this.idtypes = ["BCBSMA Member ID"];
            this.selectedIndex = 1;
        }
        else {
            this.idtypes = ["BCBSMA Member ID", "Financial Debit Card Number", "Student ID Number"];
        }

        if (app.ios) {
            this.idtypes.unshift(iosSpecific);
        }

        this.currentType = this.auth_service.user_registration_type;
        if (this.currentType === "mobile") {
            this.otherType = "email";
        }
        else if (this.currentType = "email") {
            this.otherType = "mobile";
        }
    }

    public onchange(args: SelectedIndexChangedEventData) {
        // ios
        this.ddindex = args.newIndex;
        if (app.ios) {
            this.ddindex = args.newIndex - 1;
        }

        if (this.ddindex === 0) {
            this.showMemidTextField = true;
            this.showDebitnoTextField = false;
            this.showStudentidTextField = false;
            this._globals.user_useridtype = "BCBSMA Member ID";
        }
        else if (this.ddindex === 1) {
            this.showDebitnoTextField = true;
            this.showMemidTextField = false;
            this.showStudentidTextField = false;
            this._globals.user_useridtype = "Financial Debit Card Number";
        }
        else if (this.ddindex === 2) {
            this.showStudentidTextField = true;
            this.showMemidTextField = false;
            this.showDebitnoTextField = false;
            this._globals.user_useridtype = "Student ID Number";
        }
        else {
            this.showMemidTextField = false;
            this.showDebitnoTextField = false;
            this.showStudentidTextField = false;
        }
    }

    public onopen() {
        // console.log("Drop Down opened.");
    }
    public onContinue(memid, suffix) {
        this.minfo.memid=memid;
        this.minfo.suffix=suffix;
        var memberId=memid+suffix;
        

        this.isMemIdValid = (this._formValidationService.alphaNumericMemValidator(memberId) && this._formValidationService.memberIdValidator(memberId));
        // this.isDebitNumberValid = (this._formValidationService.onlyDigitsValidator(debitcardno) && this._formValidationService.debitCardNoValidator(debitcardno));
        // this.isStudentIdValid = (this._formValidationService.onlyDigitsValidator(studentid) && this._formValidationService.memberIdValidator(studentid));
       this.isMemIdFilled = this._formValidationService.fieldFilledValidator(memid);
      
        // this.isDebitNumberFilled = this._formValidationService.fieldFilledValidator(debitcardno);
        // this.isStudentIdFilled = this._formValidationService.fieldFilledValidator(studentid);
        // if (this._globals.user_useridtype === "Student ID Number") {
        //     this._globals.user_useridnum = studentid;
        // }
        // else if (this._globals.user_useridtype === "Financial Debit Card Number") {
        //     this._globals.user_useridnum = debitcardno;
        // }
        // else if (this._globals.user_useridtype === "BCBSMA Member ID") {
        //     this._globals.user_useridnum = memid;
        // }
        if ((memberId !== undefined && this.isMemIdValid && memberId!=="") ) {
                this.isBusy = true; 
            if (this._globals.isTurnOff) {
                   this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                     animated: false
                });
                this.isBusy = false;
            }
            else {
               
                // this._routerExtensions.navigate(["/create/verification", this.otherType, "authenticate-verify"], {
                //      animated: false
                // });
                 this._routerExtensions.navigate(["/personal_info/verify_identity"], {
                     animated: false
                });
                this.isBusy = false;
            }

        }
        else {
            this.isErrorOccured = true;
        }
    }
    public goBack() {
        this._routerExtensions.navigate(["/personal_info/personal_info", this._globals.registration_mode, this._globals.user_identity], {
             animated: false
        });
    }
    public oncancelFn() {
        this._globals.isUnauthenticated = true;
        this._globals.isanonymous = false;
        this._globals.isLoggedIn = false;
        this._globals.changeRegister();
        this._globals.is_auth_cancelled=true;
        // this._routerExtensions.navigate(["/home/signedHome"], {
        //      animated: false
        // });
        if(this._globals.user_state==="RNV"){
           this._routerExtensions.navigate(["/create/verification", this._globals.registration_mode, "maybelater"], {
             animated: false
        });
        }
        else if(this._globals.user_state==="RV"){
             this._routerExtensions.navigate(["/home/signedHome"], {
             animated: false
        });
        }
    }
    public showOrHideContextualHelp() {
        this.isHelpInfoVisible = !this.isHelpInfoVisible;
    }

    public happyNavigate() {
        this._routerExtensions.navigate(["/happy"], {
            animated: false
        });
    }

    public validCheck(memid, suffix) {
        let memberId=memid+suffix;
        if (memberId !== undefined && memberId !== "") {
            this.isMemIdValid = (this._formValidationService.alphaNumericMemValidator(memberId) && this._formValidationService.memberIdValidator(memberId));
            this.isMemIdFilled = this._formValidationService.fieldFilledValidator(memberId);
      
        }

    }
    public changeFocus(memid){
        if(memid.length===12){
              let nextTextField = <TextField>this.txtfld2.nativeElement;
              nextTextField.focus();
        }
    }
    goToSuffixField() {
        this.txtfld2.nativeElement.focus();
    }
}