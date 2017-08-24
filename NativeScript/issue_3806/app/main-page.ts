import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as camera from "nativescript-camera";
import * as applicationModule from "application";

var permsPlugin = require("nativescript-permissions");

declare var android: any;
var REQUEST_REQUIRED_PERMISSIONS = 1234;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    permsPlugin.requestPermissions(["android.permission.WRITE_EXTERNAL_STORAGE"])
}

export function takePhoto() {
    camera.requestPermissions();

    setTimeout(function () {
        camera.takePicture().then(res => {
            console.log(res);
        })
    }, 500);
}
