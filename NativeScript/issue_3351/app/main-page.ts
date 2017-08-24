import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as camera from "nativescript-camera";
import * as fs from "file-system";
import * as imageSourceModule from "image-source";
import * as imageAssetModule from "image-asset";
import * as bghttp from "nativescript-background-http";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    camera.requestPermissions();
}

export function takePhoto() {

     camera.takePicture({ width: 800, height: 800, keepAspectRatio: true }).then(imageAsset => {
        
        var savepath = fs.knownFolders.documents().path;
        var filename = 'img_by_sj_' + new Date().getTime() + '.jpg';
        var filepath = fs.path.join(savepath, filename);
        
        var imageSource:imageSourceModule.ImageSource;
        imageSourceModule.fromAsset(imageAsset).then(res => {
            imageSource = res;        
            var picsaved = imageSource.saveToFile(filepath, "jpg");

            console.log("filepath: " + filepath);

            if (picsaved) {
                console.log("Saved!");
                var session = bghttp.session("image-upload");
                var request = {
                    url: "http://posttestserver.com/post.php?dir=nativescript",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "File-Name": filename
                    },
                    description: "{ 'uploading': '" + filename + "' }"
                };

                var task = session.uploadFile(filepath, request);

                task.on("progress", logEvent);
                task.on("error", logEvent);
                task.on("complete", logEvent);
            } else {
                console.log("Failed To Save");
            }
        })
    });
}

function logEvent(e) {
    console.log(e.eventName);
}