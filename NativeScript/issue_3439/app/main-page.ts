import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Label } from "ui/label";
import * as enums from "ui/enums";



let lbl: Label;
let animation: Animation;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    lbl = <Label>page.getViewById("lbl");
}

import { Animation } from "ui/animation";

export function startAnimation() {
    animation = new Animation([ { translate: { x: 0, y: 300 } , duration: 5000, curve: enums.AnimationCurve.easeIn, target: lbl }], false);

    animation.play()
}

export function cancelAnimation() {
    animation.cancel()
}
