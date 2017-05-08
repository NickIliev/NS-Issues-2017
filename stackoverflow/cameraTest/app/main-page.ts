import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Image } from "ui/image"
import * as camera from "nativescript-camera";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function takePhoto() {
    camera.takePicture({})
    .then(imageAsset => {
        var image = new Image();
        image.src = imageAsset;
    }).catch(err => {
        console.log(err.message);
    })
}