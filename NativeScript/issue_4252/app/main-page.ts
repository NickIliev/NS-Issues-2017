import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "http";

export function navigatingTo(args: EventData) {
    patchHttp();
}

export function patchHttp() {
    console.log("patchHttp");

    http.request({
        url: "https://httpbin.org/patch",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        let result = response.content.toJSON();
        
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                var element = result[key];
                console.log(key + " " + element);
            }
        }

    }, function (e) {
        console.log("Error occurred " + e);
    });
}