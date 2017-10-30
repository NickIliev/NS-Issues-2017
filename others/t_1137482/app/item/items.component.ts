import { Component, OnInit, NgZone } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

import { ImageSource } from "image-source";
import * as imagepicker from "nativescript-imagepicker";
import * as fs from "file-system";
import * as permissions from "nativescript-permissions";

declare let android: any;

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    context = imagepicker.create({
        mode: "single" // use "multiple" for multiple selection
    });
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService, private zone: NgZone) { 
        permissions.requestPermission([(<any>android).Manifest.permission.READ_EXTERNAL_STORAGE]);
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    pick() {
        this.context
        .authorize()
        .then(() => {
            return this.context.present();
        })
        .then((selection) => {
            selection.forEach((selected) => {

                let imageSource: ImageSource;

                selected.getImage().then(imgSource => {
                    let folder = fs.knownFolders.documents().path;
                    // let downloads = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).toString();
                    let path = fs.path.join(folder, "test.png");
                    let saved = imgSource.saveToFile(path, "png");

                    this.zone.run(() => {
                        if(saved) {
                            let exif = new android.media.ExifInterface(path);
            
                            let orientation = exif.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);
                            let gpsTimestamps = exif.getAttribute(android.media.ExifInterface.TAG_GPS_TIMESTAMP);
                            
                            console.log("selected image orientation (EXIF) : " + orientation);
                            console.log("selected image gpsTimestamps (EXIF) : " + gpsTimestamps);
                        }
                    })
                })

                
            });
            
        }).catch((e) => {
            // process error
        });
    }
}