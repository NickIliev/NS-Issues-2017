import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import * as fs from "file-system";
import * as bghttp from "nativescript-background-http";

let vm = new Observable();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    vm.set("uploadStatus", "File not uploaded yet!");
    page.bindingContext = vm;
}

export function getAndUploadPDF() {

    /* FILE PICK UP PART */
    // basic folder we can access via file-system (example for iOS but also valid for Android)
    let documents = fs.knownFolders.documents(); // documents folder on iOS device
    let currentApp = fs.knownFolders.currentApp(); // the current applicaiton "app" folder
    let temp = fs.knownFolders.temp(); // the device temp folder

    console.log("currentApp: " + currentApp.path);

    let file = currentApp.getFile("sample-pdf.pdf");
    console.log("file.path: " + file.path);


    /* UPLOAD PART */
    var session = bghttp.session("file-upload");
    var request = {
        url: "https://httpbin.org/post",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "sample-pdf.pdf"
        },
        description: "{ 'uploading': 'sample-pdf.pdf' }"
    };

    var task = session.uploadFile(file.path, request);
    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", done);
}

function logEvent(err) {
    console.dir(err);
}

function done() {
    vm.set("uploadStatus", "File uploaded!");
    console.log("complete");
}