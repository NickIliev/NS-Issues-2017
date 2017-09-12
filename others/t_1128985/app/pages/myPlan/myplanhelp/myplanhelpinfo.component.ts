import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    templateUrl: "myplanhelpinfo.component.html",
    styleUrls: ["../myPlan.css"]

})

export class MyPlanHelpInfoComponent implements OnInit  {
    public myplanInfoHtml: string = "<!DOCTYPE html><html><head><title>MyTitle</title><meta charset=\"utf-8\"/></head><body><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Overall Deductible</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">The dollar amount that a member must pay for health care services before a health plan will cover eligible services.<br></br>For example, if a member's deductible is $500, the member will pay that amount, out-of-pocket, before the health plan will cover any eligible services.</p></br><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Co-pay</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliguam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exerci tation ullamcorpor suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.</br> </p></br><span style=\"font-size:20;color:#5c91bb;font-weight:bold;\">Out of Pocket Maximum</span><p style=\"border-bottom: 1px solid #797979;\"></p><p style=\"font-size:18;color:#797979;\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliguam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exerci tation ullamcorpor suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate.</br></p></br></body></html>";
    public constructor(private params: ModalDialogParams, private modalParams: ModalDialogService,
        private vcRef: ViewContainerRef, private page: Page) {

    }
    ngOnInit() {
        if (app.ios) {
            this.page.css = "Page {background-image : none; } ";
        }
        if (app.android) {
             this.page.css = "Page {background-image : none; margin: 0 15 15 15} ";
        }
    }
    public closeHelpInfo() {
        this.params.closeCallback();
    }
}

