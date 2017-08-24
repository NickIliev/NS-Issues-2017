import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { Observable as RxObservable } from "rxjs";
import { Http, Headers, Response, RequestOptions, ResponseContentType } from "@angular/http";

import "rxjs/add/operator/map";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private http: Http, private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();

        let res = this.loginUser();
        console.dir(res);
    }

    loginUser(): RxObservable<Response> {
        let options = this.createOptions();
        return this.http.post("https://httpbin.org/post", { "bodyContent": "some content" }, options)
            .map(res => res);
    }


    createOptions() {
        let headers = new Headers();
        headers.append("Content-Type", "application/xml");
        let options = new RequestOptions({ headers: headers });
        return options;
    }

}