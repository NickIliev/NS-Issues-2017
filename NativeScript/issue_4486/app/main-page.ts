import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as fs from "file-system";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function writeSync() {
    let documents = fs.knownFolders.documents();
    let path = fs.path.join(documents.path, "base.txt");
    let contents = "sample text content";
    let file = fs.File.fromPath(path);
    let error;

    file.writeSync(contents, (e) => {
        console.log("writeSync");
        console.log(e);

    })
}
export function readSync() {
    var destinationFile = fs.knownFolders.documents().getFile("base.txt");
    var source = destinationFile.readSync();
    console.log(source);
}
