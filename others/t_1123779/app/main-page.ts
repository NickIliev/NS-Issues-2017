import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Image } from "ui/image";
import { ImageSource } from "image-source";

import { getCurrentLocation } from "nativescript-geolocation";

var camera = require("nativescript-na-camera");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function capturePhoto() {
    camera.capturePhoto();
}
