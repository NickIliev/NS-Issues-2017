import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as app from "application";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    app.getMainEntry();

    page.bindingContext = new HelloWorldModel();
}