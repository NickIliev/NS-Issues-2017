import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Label } from "ui/label";
import frame = require("ui/frame");

import * as app from "application";
import * as frameModule from "ui/frame";

var selected: number = -1;

export function onLoaded(args: EventData) {
    console.log(">>> second-page.onLoaded");

}

export function onTap(args: EventData) {
    let page = (<any>args.object).page;

    showModal(page, selected, false);
}

function showModal(page: Page, _selected: number, fullscreen?: boolean) {

    page.showModal("./modalView", _selected, function (selectedItem: number) {
        console.log("selected " + selectedItem);
        selected = selectedItem;
    }, fullscreen);
}
