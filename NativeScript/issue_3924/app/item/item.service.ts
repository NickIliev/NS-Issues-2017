import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class ItemService {
    private serverUrl = "https://httpbin.org/get";

    constructor(private http: Http) { }

    getData() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .map(res => {
                return res.json();
            });
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        return headers;
    }
}
