import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as dialogs from "ui/dialogs";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onLoaded(args: EventData) {
    var options = {
        title: "Race Selection",
        message: "Race Chosen: Elf",
        okButtonText: "OK"
    };
    var alertDialog: any = dialogs.alert(options);

    alertDialog.then(() => {
        console.log("Race Chosen!");
    });

    console.log("alertDialog");
    console.dir(alertDialog);

}