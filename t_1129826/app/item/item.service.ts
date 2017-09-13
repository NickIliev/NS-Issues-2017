import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class ItemService {

    constructor(private http: Http) { }

    private items = new Array<any>();

    getItems() {
        return this.http.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&limit=50")
            .map(res => res.json());
    }
}
