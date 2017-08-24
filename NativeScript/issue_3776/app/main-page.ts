import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TextField } from "ui/text-field";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    var textField = page.getViewById("textField");

    textField.on(TextField.returnPressEvent, eventData => {
        console.log("event happened");
    });
}