import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as EXIF from "exif-js";

let page;
export function navigatingTo(args: EventData) {
    page = <Page>args.object;
}

export function getExif() {
    var img = page.getViewById("img");
    EXIF.getData(img, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        console.log("make: " + make);
        console.log("model: " + model);
    });

    EXIF.getData(img, function() {
        var allMetaData = EXIF.getAllTags(this);
        console.dir(allMetaData);
    });
}