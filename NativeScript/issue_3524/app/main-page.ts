import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Label } from "ui/label";

let page;

export function navigatingTo(args: EventData) {
    page = <Page>args.object;
}

export function onSecondLabelLoaded() {
    var lbl2 = <Label>page.getViewById("lbl2");
    lbl2.isUserInteractionEnabled = false;
}

export function onTappedLabelOne(args) {
    console.log("first label tapped!");

    var lbl = <Label>args.object;
    lbl.text += "ADD!";
}


export function onTappedLabelTWO(args) {
    console.log("SECOND label tapped!");

    var lbl = <Label>args.object;
    lbl.text += "ADD!";
}