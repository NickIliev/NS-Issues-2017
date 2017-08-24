import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { topmost , stack } from "ui/frame";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function getContext() {

    console.log("currentPage: " + topmost().currentPage); 
    console.log("stack: " + stack()); 
}

export function navigate() {
    topmost().navigate("sub-page");
}