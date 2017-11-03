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

                console.log("selected.fileUri: " + selected.fileUri);

                let exif = new android.media.ExifInterface(selected.fileUri);
                
                const TAG_ORIENTATION = exif.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);
                const TAG_GPS_TIMESTAMP = exif.getAttribute(android.media.ExifInterface.TAG_GPS_TIMESTAMP);
                const TAG_GPS_ALTITUDE = exif.getAttribute(android.media.ExifInterface.TAG_GPS_ALTITUDE);
                const TAG_GPS_ALTITUDE_REF = exif.getAttribute(android.media.ExifInterface.TAG_GPS_ALTITUDE_REF);
                const TAG_GPS_DATESTAMP = exif.getAttribute(android.media.ExifInterface.TAG_GPS_DATESTAMP);
                const TAG_GPS_DEST_LATITUDE = exif.getAttribute(android.media.ExifInterface.TAG_GPS_DEST_LATITUDE);
                const TAG_GPS_DEST_LONGITUDE = exif.getAttribute(android.media.ExifInterface.TAG_GPS_DEST_LONGITUDE);
                const TAG_GPS_LATITUDE = exif.getAttribute(android.media.ExifInterface.TAG_GPS_LATITUDE);

                console.log("selected image orientation (EXIF) : " + TAG_ORIENTATION);
                console.log("selected image TAG_GPS_TIMESTAMP (EXIF) : " + TAG_GPS_TIMESTAMP);
                console.log("selected image TAG_GPS_ALTITUDE (EXIF) : " + TAG_GPS_ALTITUDE);
                console.log("selected image TAG_GPS_ALTITUDE_REF (EXIF) : " + TAG_GPS_ALTITUDE_REF);
                console.log("selected image TAG_GPS_DATESTAMP (EXIF) : " + TAG_GPS_DATESTAMP);
                console.log("selected image TAG_GPS_DEST_LATITUDE (EXIF) : " + TAG_GPS_DEST_LATITUDE);
                console.log("selected image TAG_GPS_DEST_LONGITUDE (EXIF) : " + TAG_GPS_DEST_LONGITUDE);
                console.log("selected image TAG_GPS_LATITUDE (EXIF) : " + TAG_GPS_LATITUDE);

                selected.getImage().then(imgSource => {
                    let folder = fs.knownFolders.documents().path;
                    // let downloads = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).toString();
                    let path = fs.path.join(folder, "test.jpg");
                    let saved = imgSource.saveToFile(path, "jpg");
                })
                
            });
            
        }).catch((e) => {
            // process error
        });
    }
}