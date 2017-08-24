import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Observable as RxObservable } from "rxjs/Observable";
import { ObservableArray } from 'data/observable-array';

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    categoricalSource: ObservableArray<any>;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.test1();
    }

    test1() {
        this.categoricalSource = new ObservableArray([
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
        ]);
    }

}