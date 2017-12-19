import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { SearchBar } from "ui/search-bar";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    searchPhrase: string;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.searchPhrase = "some phrase";
    }

    onTextChanged(args) {
        console.log("onTextChanged");
        console.log("Old value: " + args.oldValue);
        console.log("New value: " + args.value);
    }
}