import { Component,AfterViewInit  } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Globals } from "../../../shared/global";
@Component({
    moduleId: module.id,
    templateUrl: "./claimModal.component.html",
    styleUrls: ["claimModal.css"]
})

export class ClaimModalComponent implements  AfterViewInit {

    public constructor(private modalParams: ModalDialogParams,public globals: Globals) {
    }
     ngAfterViewInit() {
        setTimeout(() => {
              this.globals.hideLoader();
        }, 1000); 
     }

    public onApplyFilter() {
        this.modalParams.closeCallback();
    }

    public onClose() {
        this.modalParams.closeCallback();
    }

    public sortingLookupList = [{
        "text": "Most Recent",
        "isSelected": true
    }, {
        "text": "Oldest First",
        "isSelected": false
    }];

    public sortItemSelected(item, lookupList) {
        lookupList.map((item) => item.isSelected = false);
        item.isSelected = true;
    }

    public memberLookupList = [{
        "text": "John Appleseed",
        "isSelected": true
    }, {
        "text": "Jane Appleseed",
        "isSelected": false
    }, {
        "text": "Steve Appleseed",
        "isSelected": false
    }];

    public visitTypeLookupList = [{
        "text": "Medical",
        "isSelected": true
    }, {
        "text": "Vision",
        "isSelected": true
    }, {
        "text": "Dental",
        "isSelected": true
    }];
    public statusLookupList = [{
        "text": "Adjusted",
        "isSelected": true
    }, {
        "text": "Completed",
        "isSelected": true
    }, {
        "text": "Denied",
        "isSelected": true
    }, {
        "text": "Pending",
        "isSelected": true
    }];

    public itemSelectUnselect(item, lookupList) {
        item.isSelected = !item.isSelected;
    }

    public isAllSelected(lookupList) {
        let selected = true;
        lookupList.forEach((item, index) => {
            if (!item.isSelected) {
                selected = false;
            }
        });
        return selected;
    }

    public onSelectAll(args, lookupList) {
        let isSelected = this.isAllSelected(lookupList);
        lookupList.forEach((item, index) => {
            item.isSelected = !isSelected;
        });
    }

    public getSelectedItems(lookupList) {
        let filteredItems = lookupList.filter(item => item.isSelected === true);
        return filteredItems;
    }
}