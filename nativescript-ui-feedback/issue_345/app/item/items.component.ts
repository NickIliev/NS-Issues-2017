import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { PropertyConverter } from "nativescript-pro-ui/dataform";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    currencyConverter: any;
    prices: any;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.prices = {"price": 3};
        this.currencyConverter = new CurrencyConverter(2);
    }
}

export class CurrencyConverter implements PropertyConverter {
    constructor(input: number) { }

    convertFrom(input: number) {
        console.log(input * 4);
        return input * 4;
    }

    convertTo(input: number) {
        console.log(input * 2);
        return input * 2;
    }
}