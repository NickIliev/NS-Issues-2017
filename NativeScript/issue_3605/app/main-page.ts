import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as cameraModule from "nativescript-camera";
import * as ImageSourceModule from "image-source";
import * as fs from "file-system";

let viewModel = new HelloWorldModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    cameraModule.requestPermissions();

    page.bindingContext = viewModel;
}

export function takePhoto() {
    cameraModule.takePicture({
        width: 1280, height: 720, keepAspectRatio: false, saveToGallery: false
    }).then(imageAsset => {
        console.log("Result is an image asset instance");
        viewModel.set("BoardingPassSource", imageAsset);

        var image = <ImageSourceModule.ImageSource>ImageSourceModule.fromNativeSource(imageAsset);
        
        console.log("image.android -> " + image.android);
        // var folder = fs.knownFolders.documents();
        // var path = fs.path.join(folder.path, "Test.png");
        // image.saveToFile(path, "jpeg");

        var base64 = image.toBase64String("jpeg"); // throws here

    }).catch(err => {
        console.log("Error -> " + err.message);
    });
}