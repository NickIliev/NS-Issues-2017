import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ListView } from 'ui/list-view';
import { HelloWorldModel } from './main-view-model';

import { TextField } from "ui/text-field";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    var textField = page.getViewById("textField");

    page.bindingContext = new HelloWorldModel();

    textField.on(TextField.returnPressEvent, function(eventData: any){
        console.log("event happened");
    });
}

