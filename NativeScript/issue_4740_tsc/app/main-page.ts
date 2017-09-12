import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as frame from "ui/frame";

import { Button } from 'ui/button';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onButtonLoaded(args) {
    console.log("onButtonLoaded");
    let btn = <Button>args.object;
    btn.
}

export function onTap() {
    frame.topmost().navigate("sub-page");
}
