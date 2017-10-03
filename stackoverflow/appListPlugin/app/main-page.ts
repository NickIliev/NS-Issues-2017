import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as AppList from "nativescript-applist";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    AppList.getInstalledApps(function (apps) {
        console.dir(apps);
        console.log("Second", "Test");
    }, { withIcons: true });

    page.bindingContext = new HelloWorldModel();
}