import { Label } from "ui/label";
import { EventData } from 'data/observable';

export function onTap(args: EventData) {
    console.log("onTap from drawer-contents.ts");
    var lbl = <Label>args.object;

    lbl.text += " " + lbl.text;
}