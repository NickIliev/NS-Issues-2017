import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { ListView } from "ui/list-view";

export function onLoaded(args: EventData) {

    let page = <Page>args.object;

    // var lv = <ListView>page.getViewById("lv");
    // lv.android.setFastScrollAlwaysVisible(true);

    page.bindingContext = new HelloWorldModel();
}

export function onListLoaded(args) {
    var list = args.object;
    list.android.setFastScrollAlwaysVisible(true);
}