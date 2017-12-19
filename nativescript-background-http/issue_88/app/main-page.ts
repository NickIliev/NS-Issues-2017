/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as bgHttp from "nativescript-background-http";

let session = bgHttp.session("image-upload");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function  upload1() {
    
    var request = {
        url:         "http://localhost:8080/",
        method:      "POST",
        headers:     {
            "Content-Type": "application/octet-stream",
            "File-Name":    "bigpig.jpg"
        },
        description: "{ 'uploading': 'bigpig.jpg' }"
    };
    
    var task = session.uploadFile("/raw/a1.mp3", request);
 
}