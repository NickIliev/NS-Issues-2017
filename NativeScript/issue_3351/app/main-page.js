"use strict";
var camera = require("nativescript-camera");
var fs = require("file-system");
var imageSourceModule = require("image-source");
var bghttp = require("nativescript-background-http");
function navigatingTo(args) {
    var page = args.object;
    camera.requestPermissions();
}
exports.navigatingTo = navigatingTo;
function takePhoto() {
    camera.takePicture({ width: 800, height: 800, keepAspectRatio: true }).then(function (imageAsset) {
        var savepath = fs.knownFolders.documents().path;
        var filename = 'img_by_sj_' + new Date().getTime() + '.jpg';
        var filepath = fs.path.join(savepath, filename);
        var imageSource;
        imageSourceModule.fromAsset(imageAsset).then(function (res) {
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
            }
            else {
                console.log("Failed To Save");
            }
        });
    });
}
exports.takePhoto = takePhoto;
function logEvent(e) {
    console.log(e.eventName);
}
//# sourceMappingURL=main-page.js.map