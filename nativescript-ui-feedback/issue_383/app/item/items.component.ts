import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { AutoCompleteEventData, TokenModel } from "nativescript-pro-ui/autocomplete";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    private _footballers: ObservableArray<TokenModel>;

    get footballers(): ObservableArray<TokenModel> {
        return this._footballers;
    }

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        this.initAutocompleteItems();
    }

    onDidAutoComplete(args: AutoCompleteEventData) {
        const id = this.items.find((f) => f.name === args.text).id;
        this.router.navigate(["/item", id]);
    }

    private initAutocompleteItems() {
        this._footballers = new ObservableArray<TokenModel>();

        for (const fb of this.items) {
            this._footballers.push(new TokenModel(fb.name, undefined));
        }
    }
}