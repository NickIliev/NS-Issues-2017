import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { ScrollView, ScrollEventData } from "ui/scroll-view";
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onScrollLoaded(args) {
    let scroll = <ScrollView>args.object;

    setTimeout(function() {
        console.log(scroll.scrollableHeight);
        console.log(scroll.getMeasuredHeight());
        console.log(scroll.getActualSize().height);
        console.log(scroll.getActualSize().width);
        console.log(scroll.getLocationOnScreen().x);
        console.log(scroll.getLocationOnScreen().y);
    }, 300);
}

export function onScrollEvent(args: ScrollEventData) {
    console.log("scrollX: " + args.scrollX);
    console.log("scrollY: " + args.scrollY);
}