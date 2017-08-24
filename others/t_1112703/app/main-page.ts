import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { takePicture } from "nativescript-camera";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onTap() {
    takePicture().then(res => {
        console.log("photo taken");
    })
}