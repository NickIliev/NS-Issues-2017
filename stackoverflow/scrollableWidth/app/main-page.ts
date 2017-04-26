import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { ScrollView } from "ui/scroll-view";

// Event handler for Page "navigatingTo" event attached in main-page.xml
var scroll;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    
scroll = <ScrollView>page.getViewById("scroll");

setTimeout(function() {
    console.log(scroll.scrollableWidth)
}, 300);

    page.bindingContext = new HelloWorldModel();
}