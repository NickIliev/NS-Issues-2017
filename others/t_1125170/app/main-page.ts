import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TextField } from "ui/text-field";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onTextFieldLoaded(args) {
    let tf = <TextField>args.object;
    setTimeout(function() {
        tf.focus();
    }, 500);
}