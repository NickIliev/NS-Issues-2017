import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { RadListView } from "nativescript-telerik-ui-pro/listview";

let vm = new HelloWorldModel();

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    page.bindingContext = vm;

    let list1 = <RadListView>page.getViewById("listviewCountries1");
    setTimeout(function() {
        list1.refresh();
    }, 500);
}