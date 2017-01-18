import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as moment from "moment";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    
    console.log(moment().format("dddd"));

    page.bindingContext = new HelloWorldModel();
}