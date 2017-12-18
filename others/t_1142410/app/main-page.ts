import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as camera from "nativescript-camera";
import { get} from "nativescript-camera/camera.common";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    camera.requestPermissions();
}

export function takePhoto() {
    camera.takePicture().then(res => {
        let imageAssset = res;
        console.log(imageAssset)
    })
}