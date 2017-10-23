import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { topmost } from "ui/frame";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onItemSelected(args) {
    console.log("onItemSelected");

    topmost().navigate("details-page");
}