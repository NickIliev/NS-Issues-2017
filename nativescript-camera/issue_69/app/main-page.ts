import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { takePicture, requestPermissions} from "nativescript-camera";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    requestPermissions();
}

export function takePhoto() {
    let options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: false };
    takePicture( options )
        .then( picture => {
            console.log("ok")
            //this.cameraImageSrc = picture;
            //this.searchItemsbyPicture(picture);
        }).catch((err) => {
        console.log("Error -> " + err.message);
    });
}