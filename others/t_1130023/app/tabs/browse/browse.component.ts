import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { DataItemService } from "./dataItem.service";

@Component({
    selector: "Browse",
    moduleId: module.id,
    providers:[DataItemService],
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    private _dataItems: ObservableArray<DataItem>;
    
        constructor(private _dataItemService: DataItemService) {
        }
    
        get dataItems(): ObservableArray<DataItem> {
            return this._dataItems;
        }
    
        ngOnInit() {
            this._dataItems = new ObservableArray(this._dataItemService.getDataItems());
        }
}

export class DataItem {
    constructor(public id?: number, public name?: string, public description?: string, public title?: string, public text?: string, public image?: string, public selected?: boolean, public type?: string) {
    }
}