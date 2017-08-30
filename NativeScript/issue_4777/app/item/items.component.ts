import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Observable as RxObservable } from "rxjs/Observable";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    public myItems: RxObservable<Array<string>>;

    constructor(private service: ItemService) {
        let items = ["44", "55", "66"];
        
        let subscr;
        this.myItems = RxObservable.create(subscriber => {
            subscr = subscriber;
            subscriber.next(items);
            return function () {
                console.log("Unsubscribe called!");
            };
        });

        let tempItems = this.service.getPickerItems(); // mock service
        tempItems.forEach(element => {
            items.push(element); // pushing into the temp array
            // the subsriber will watch for changes and update myItems via the async pipe
        });
    }
}