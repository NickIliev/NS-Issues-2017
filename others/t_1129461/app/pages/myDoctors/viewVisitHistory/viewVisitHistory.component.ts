import { Component, OnInit ,AfterViewInit} from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { MyDoctorsService } from "../myDoctors.service";
import { Page } from "ui/page";
import { Globals } from "../../../shared/global";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "./viewVisitHistory.component.html",
    styleUrls: ["./viewVisitHistory.css"]
})

export class ViewVisitHistoryComponent implements OnInit,AfterViewInit {
    public selectedMember;
    public selectedDoctor;

    public constructor(
        private modalParams: ModalDialogParams,
        private _doctorService: MyDoctorsService, public _globals: Globals,
        private page: Page) {
    }

    ngOnInit() {
        this.selectedMember = this._doctorService.selectedMember;
        this.selectedDoctor = this._doctorService.selectedDoctor;
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
              this._globals.hideLoader();
        }, 1000); 
    }

    public closeModal() {
        this.modalParams.closeCallback();
    }


}