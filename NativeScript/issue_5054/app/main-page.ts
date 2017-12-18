import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ListView } from 'ui/list-view';
import { HelloWorldModel } from './main-view-model';

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    page.bindingContext = new HelloWorldModel();
}

export function onListLoaded(args) {
    let list = <ListView>args.object;

    // manually refreshing the ListView will apply all bindings

    // setTimeout(function() {
    //     list.refresh();
    // }, 200);
}