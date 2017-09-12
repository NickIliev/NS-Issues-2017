import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { MedicationService } from "../medication.service";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./ViewPrescriptionModal.component.html",
    styleUrls: ["ViewPrescriptionModal.css"]
})

export class ViewPrescriptionModalComponent implements OnInit {
    medication: any;
    selectedUser: any;

    public constructor(private modalParams: ModalDialogParams,
        public _medicationservice: MedicationService,
        private page: Page) {
        this.selectedUser = this._medicationservice.selectedUser;
        this.medication = this._medicationservice.historySelectedMember;
    }

    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }

    public onApplyFilter() {
        this.modalParams.closeCallback();
    }

    public closeModal() {
        this.modalParams.closeCallback();
    }


}