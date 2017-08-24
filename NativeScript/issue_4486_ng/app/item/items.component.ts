import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import * as fs from "file-system";

import * as base64 from "base-64";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    writeSText() {
        let documents = fs.knownFolders.documents();
        let path = fs.path.join(documents.path, "base.txt");
        let contents = base64.decode("c2FtcGxlIGJhc2U2NCBzdHJpbmc=");
        let file = fs.File.fromPath(path);
        let error;


        file.writeText(contents).then(res => {
            file.readText().then(cont => {
                console.log(cont);
            })
        });
    }

    writeSync() {
        let documents = fs.knownFolders.documents();
        let path = fs.path.join(documents.path, "base.txt");
        let file = fs.File.fromPath(path);

        var source = file.readSync(e => { console.log(e) });

        let destPath = fs.path.join(documents.path, "dest.txt");
        let destinationFile = fs.File.fromPath(destPath);
        destinationFile.writeSync(source, e => { console.log(e) });

        setTimeout(function() {
            destinationFile.readText().then(content => {
                console.log(content);
            })
        }, 500);
    }

    readFile() {
        let documents = fs.knownFolders.documents();
        let myFile = documents.getFile("base.txt");

        let source = myFile.readSync(e => { console.log(e) });
    }

    checkIfFileExists() {
        let documents = fs.knownFolders.documents();
        var filePath = fs.path.join(documents.path, "base.txt");

        console.log(fs.File.exists(filePath));
    }
}
