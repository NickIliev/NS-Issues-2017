import { EventData , PropertyChangeData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { TextField } from "ui/text-field";
import { Switch } from "ui/switch";

export function navigatingTo(args: EventData) {
    
    let page = <Page>args.object;

    let tf = <TextField>page.getViewById("tf");
    let sw = <Switch>page.getViewById("sw");


    // the event name is concatanating the property name "text" with key word "Change" = "textChange"
    tf.on("textChange", (args: PropertyChangeData) => {
        console.log("text changed for text-field!");

        console.log(args.eventName); // textChange
        console.log(args.propertyName); // text
        console.log(args.object); // TextField<tf
        console.log(args.value); 
        console.log(args.oldValue); 
    })

    // the event name is concatanating the property name "checked" with key word "Change" = "checkedChange"
    sw.on("checkedChange", (args: PropertyChangeData) => {
        console.log("switch checked change!");

        console.log(args.eventName); // checkedChange
        console.log(args.propertyName); // checked
        console.log(args.object); // Switch<sw>
        console.log(args.value); 
        console.log(args.oldValue); 
    })

    page.bindingContext = new HelloWorldModel();
}