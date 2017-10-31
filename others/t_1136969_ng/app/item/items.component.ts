import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class Country {
    constructor(public Country?: string, public Amount?: number, public SecondVal?: number, public ThirdVal?: number, public Impact?: number, public Year?: number) {
    }
}

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    barSeries: string;
    lineSeries: string;
    areaSeries: string;

    private _categoricalSource: ObservableArray<Country>;

    constructor(private _dataService: ItemService) { 
        this.barSeries = "Bar Series";
        this.lineSeries = "Line Series";
        this.areaSeries = "Area Series";
    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    }

    ngOnInit() {
        this._categoricalSource = new ObservableArray(this._dataService.getCategoricalSource());
    }
}