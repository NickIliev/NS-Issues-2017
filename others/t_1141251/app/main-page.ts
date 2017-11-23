import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function onItemTap(args) {
    console.log("onItemTap");
}

export function onItemSelected(args) {
    console.log("onItemSelected");
}

export function onItemDeselected(args) {
    console.log("onItemDeselected");
}