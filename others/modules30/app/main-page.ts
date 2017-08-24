import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as application from "application";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;


    console.log(application.mainEntry);

    page.bindingContext = new HelloWorldModel();
}