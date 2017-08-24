import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

import { request } from "http";

export function navigatingTo(args: EventData) {


    let vm = new Observable();
    request({ url: "https://httpbin.org/get", method: "GET" }).then((response) => {
        //// Argument (response) is HttpResponse!
        var statusCode = response.statusCode;
        console.log("statusCode: " + statusCode);

        vm.set("statusCode", statusCode)
    }).catch(err => {
        console.log(err);
    })

    let page: any = args.object;
    page.bindingContext = vm;
}