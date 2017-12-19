import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as imagepicker from "nativescript-imagepicker";
import { ImageSource } from "image-source";

declare let CFBridgingRelease: any;

let context = imagepicker.create({
    mode: "single" // use "multiple" for multiple selection
});

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function selectImages() {
    context
        .authorize()
        .then(function () {
            return context.present();
        })
        .then(function (selection) {
            selection.forEach((selectedImage) => {

                let localPath = selectedImage.ios;
                (localPath);

                let myURL = NSURL.URLWithString(selectedImage.fileUri);
                console.log(myURL);

                let mySourceRef = CGImageSourceCreateWithURL(myURL, null);
                let myMetadata = CGImageSourceCopyPropertiesAtIndex(mySourceRef, 0, null);

                if (myMetadata) {
                    let metadataArray = CFBridgingRelease(CGImageMetadataCopyTags(myMetadata));
                    console.dir(metadataArray);
                } else {
                    console.log("metadata is null!");
                }
            });

        }).catch(function (e) {
            // process error
        });
}

