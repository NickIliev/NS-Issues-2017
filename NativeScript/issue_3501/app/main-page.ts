import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import * as moment from "moment";


export function navigatingTo(args: EventData) {
    
    console.log(moment().format("dddd"));

    console.log(moment.locale("bg"))
    console.log(moment().locale());
}