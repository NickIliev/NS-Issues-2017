import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as http from "http";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function post() {
    var result;
    console.log("post");

    http.request({
        url: "https://httpbin.org/stream-bytes/55",
        method: "GET",
        headers: { "Content-Type": "arraybuffer" },
    }).then((response) => {
        console.log(response.content);
    }).catch(err => {
        console.log("err: " + err);
    })
}

// "https://httpbin.org/image/png"

//  "https://httpbin.org/bytes/4"