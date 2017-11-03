import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { Country, ItemService } from './item.service';


@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})

export class ItemDetailComponent implements OnInit {

    private _pieSource: ObservableArray<Country>;

    constructor(private _dataService: ItemService) { }

    get pieSource(): ObservableArray<Country> {
        return this._pieSource;
    }

    ngOnInit() {
        this._pieSource = new ObservableArray(this._dataService.getCategoricalSource());
    }

}
