import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Label } from "ui/label";
import frame = require("ui/frame");

import * as app from "application";
import * as frameModule from "ui/frame";

var selected: number = -1;

export function onLoaded(args: EventData) {
    console.log(">>> main-page.onLoaded");
    //console.trace();
}

export function goToPageTwo() {
    frameModule.topmost().navigate({
        moduleName: "second-page",
        clearHistory: true
    });
}