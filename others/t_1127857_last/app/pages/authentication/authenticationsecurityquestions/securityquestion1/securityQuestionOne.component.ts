import { Component, OnInit, ViewChild, ElementRef, NgModule } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Globals } from "../../../../shared/global";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { ViewContainerRef } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadioOption } from "./radio-option";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    moduleId: module.id,
    templateUrl: "./securityQuestionOne.component.html",
    styleUrls: ["../../authentication.css"]
})

export class SecurityQuestionOneComponent implements OnInit {

    public questionNo: string = "question1";
    public isGroup1Selected: Boolean = false;
    public isGroup2Selected: Boolean = false;
    public isGroup3Selected: Boolean = false;
    public option1Selected: Boolean = true;
    public option2Selected: Boolean = true;
    public option3Selected: Boolean = true;
    radioOptions?: Array<RadioOption>;
    radioOptions2?: Array<RadioOption>;
    radioOptions3?: Array<RadioOption>;
    public constructor(private params: ModalDialogParams,
        private page: Page,
        private _routerExtensions: RouterExtensions,
        private securityQuestionModal: ModalDialogService,
        private route: ActivatedRoute, private vcRef: ViewContainerRef,
        public _globals: Globals) {
        this.questionNo = "question1";


    }
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
        this.radioOptions = [
            new RadioOption("14 Zaxxon Circle"),
            new RadioOption("123 Galaga way"),
            new RadioOption("43 Yoshi street"),
            new RadioOption("None of the Above")
        ];

        this.radioOptions2 = [
            new RadioOption("14 Zaxxon Circle"),
            new RadioOption("123 Galaga way2"),
            new RadioOption("43 Yoshi street"),
            new RadioOption("None of the Above")
        ];

        this.radioOptions3 = [
            new RadioOption("14 Zaxxon Circle"),
            new RadioOption("123 Galaga way3"),
            new RadioOption("43 Yoshi street"),
            new RadioOption("None of the Above")
        ];

    }
    changeCheckedRadio(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;

        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
        this.radioOptions.forEach(option => {
            if (option.selected) {
                this.isGroup1Selected = true;
            }
        });
    }

    changeCheckedRadio2(radioOption2: RadioOption): void {
        radioOption2.selected = !radioOption2.selected;

        if (!radioOption2.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions2.forEach(option2 => {
            if (option2.text !== radioOption2.text) {
                option2.selected = false;
            }
        });
        this.radioOptions2.forEach(option => {
            if (option.selected) {
                this.isGroup2Selected = true;
            }
        });
    }

    changeCheckedRadio3(radioOption3: RadioOption): void {
        radioOption3.selected = !radioOption3.selected;

        if (!radioOption3.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions3.forEach(option3 => {
            if (option3.text !== radioOption3.text) {
                option3.selected = false;
            }
        });
        this.radioOptions3.forEach(option3 => {
            if (option3.selected) {
                this.isGroup3Selected = true;
            }
        });
    }


    // To close the modal-window
    public close() {
        this._routerExtensions.navigate(["/personal_info/verify_identity"], {
             animated: false
        });
        this.params.closeCallback();
    }
    public goToNextQuestion(index) {
        if (index === "two") {
            if (this.isGroup1Selected) {
                this.questionNo = "question2";
                this.changeCheckedRadio2;
            }
            else {
                this.option1Selected = false;
            }

        }
        else if (index === "three") {
            if (this.isGroup2Selected) {
                this.questionNo = "question3";
                this.changeCheckedRadio3;
            }
            else {
                this.option2Selected = false;
            }
        }
        else if (index === "submit") {
            if (this.isGroup3Selected) {
                this.params.closeCallback("true");
            }
            else {
                this.option3Selected = false;
            }
        }


    }
    public goBack() {
        this._routerExtensions.back();
    }

}
