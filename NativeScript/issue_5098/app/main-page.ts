import * as camera from 'nativescript-camera';
import * as fs from 'file-system';
import { ImageSource, fromAsset } from 'image-source';
import { ImageAsset } from "image-asset";

import * as bghttp from 'nativescript-background-http';
let session = bghttp.session('image-upload');

export function onLoaded() {
    camera.requestPermissions();
}

export function takePhoto() {

    let options = {
        width: 300,
        height: 200
    };

    camera.takePicture(options)
        .then((imageAsset: ImageAsset) => {
            let hash = (new Date()).getTime() + Math.floor(Math.random() * 20);
            let folder = fs.knownFolders.documents();
            let path = fs.path.join(folder.path, `Test-${hash}.png`);

            fromAsset(imageAsset)
                .then((res: ImageSource) => {
                    let isSaved = res.saveToFile(path, 'png');

                    return isSaved;
                }).then(isSaved => {

                    if (isSaved) {
                        let request = {
                            url: "http://httpbin.org/post",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/octet-stream",
                                "File-Name": 'randomName'
                            },
                            description: "{ 'uploading': " + 'randomName' + " }"
                        };
    
                        var task = session.uploadFile(path, request);
    
                        task.on("progress", logEvent);
                        task.on("error", logEvent);
                        task.on("complete", logEvent);
                    }
                })
        }).catch((err) => {
            console.log(`Error -> ${err.message}`);
        });
}

function logEvent(e) {
    console.log("currentBytes: " + e.currentBytes);
    console.log("totalBytes: " + e.totalBytes);
    console.log("eventName: " + e.eventName);
}