import { Component, OnInit,AfterViewInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { MedicationService } from "../medication.service";
import { Page } from "ui/page";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./ViewPrescriptionModal.component.html",
    styleUrls: ["ViewPrescriptionModal.css"]
})

export class ViewPrescriptionModalComponent implements OnInit,AfterViewInit  {
    medication: any;
    selectedUser: any;

    public constructor(private modalParams: ModalDialogParams,
        public _medicationservice: MedicationService,public _globals: Globals,
        private page: Page) {
        this.selectedUser = this._medicationservice.selectedUser;
        this.medication = this._medicationservice.historySelectedMember;
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
    }

    public onApplyFilter() {
        this.modalParams.closeCallback();
    }

    public closeModal() {
        this.modalParams.closeCallback();
    }


}