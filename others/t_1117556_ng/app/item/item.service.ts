import { Injectable } from "@angular/core";
import { Http, Headers, Response, ResponseContentType, ResponseType, RequestOptions } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class ItemService {
    private serverUrl = "https://httpbin.org/get";

    constructor(private http: Http) { }

binaryRequest() {
    let options = this.createOptionssAB();

    return this.http.get("https://httpbin.org/stream-bytes/55", options)
        .subscribe((res: Response) => {
            console.log("status: " + res.status);
            console.log("arrayBuffer: " + res.arrayBuffer);
            return res.arrayBuffer;
        })
}

private createOptionssAB() {
    let requestOptions = new RequestOptions();

    requestOptions.responseType = ResponseContentType.ArrayBuffer; // if this is set to ResponseContentType.Json ит воулд ворк

    return requestOptions;
}

}